import { romeDateTimeFormat, romeParts, romeWallToDate } from './romeTime'

type Atom =
  | { kind: 'all' }
  | { kind: 'all-step'; step: number }
  | { kind: 'value'; value: number }
  | { kind: 'range'; start: number; end: number; step: number }

type FieldName = 'minute' | 'hour' | 'day' | 'month' | 'dow'

type Field = {
  name: FieldName
  raw: string
  star: boolean
  atoms: Atom[]
  values: number[]
}

const MONTHS: Record<string, number> = {
  jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6,
  jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12
}

const DOW: Record<string, number> = {
  sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6
}

const MONTH_LABEL = ['', 'gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre']
const DOW_LABEL = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato']

const LIMITS: Record<FieldName, { min: number; max: number; names?: Record<string, number> }> = {
  minute: { min: 0, max: 59 },
  hour: { min: 0, max: 23 },
  day: { min: 1, max: 31 },
  month: { min: 1, max: 12, names: MONTHS },
  dow: { min: 0, max: 7, names: DOW }
}

const tokenValue = (token: string, field: FieldName): number => {
  const names = LIMITS[field].names
  const named = names?.[token.toLowerCase()]
  if (named !== undefined) return named
  if (!/^\d+$/.test(token)) throw new Error(`Valore «${token}» non valido.`)
  return Number(token)
}

const parseAtom = (part: string, field: FieldName): Atom => {
  const bits = part.split('/')
  if (bits.length > 2 || !bits[0]) throw new Error(`Campo «${part}» non valido.`)
  const step = bits.length === 2 ? Number(bits[1]) : 1
  if (!Number.isInteger(step) || step < 1) throw new Error(`Passo «${bits[1]}» non valido.`)
  const base = bits[0]
  const { min, max } = LIMITS[field]
  if (base === '*') {
    if (bits.length === 1) return { kind: 'all' }
    return { kind: 'all-step', step }
  }
  if (base.includes('-')) {
    const [rawStart, rawEnd] = base.split('-')
    if (!rawStart || !rawEnd) throw new Error(`Intervallo «${base}» non valido.`)
    const start = tokenValue(rawStart, field)
    const end = tokenValue(rawEnd, field)
    if (start > end) throw new Error(`Intervallo «${base}» al contrario.`)
    return { kind: 'range', start, end, step }
  }
  const value = tokenValue(base, field)
  if (bits.length === 2) return { kind: 'range', start: value, end: max, step }
  if (value < min || value > max) throw new Error(`«${part}» fuori intervallo.`)
  return { kind: 'value', value }
}

const expand = (atom: Atom, field: FieldName): number[] => {
  const { min, max } = LIMITS[field]
  const values: number[] = []
  if (atom.kind === 'all') {
    for (let n = min; n <= (field === 'dow' ? 6 : max); n += 1) values.push(n)
    return values
  }
  if (atom.kind === 'all-step') {
    for (let n = min; n <= (field === 'dow' ? 6 : max); n += atom.step) values.push(n)
    return values
  }
  if (atom.kind === 'value') {
    const value = field === 'dow' && atom.value === 7 ? 0 : atom.value
    if (value < min || value > (field === 'dow' ? 6 : max)) throw new Error('Valore fuori intervallo.')
    return [value]
  }
  const end = field === 'dow' ? Math.min(atom.end, 7) : atom.end
  const start = field === 'dow' && atom.start === 7 ? 0 : atom.start
  if (start < min || end > max) throw new Error('Intervallo fuori dai limiti.')
  for (let n = start; n <= end; n += atom.step) values.push(field === 'dow' && n === 7 ? 0 : n)
  return values
}

const parseField = (raw: string, name: FieldName): Field => {
  const atoms = raw.split(',').filter(Boolean).map((part) => parseAtom(part, name))
  if (!atoms.length) throw new Error('Campo vuoto.')
  const values = [...new Set(atoms.flatMap((atom) => expand(atom, name)))].sort((a, b) => a - b)
  return { name, raw, star: raw === '*', atoms, values }
}

const joinIt = (parts: string[]): string => {
  if (parts.length <= 1) return parts[0] ?? ''
  return `${parts.slice(0, -1).join(', ')} e ${parts[parts.length - 1]}`
}

const describeAtom = (atom: Atom, field: FieldName): string => {
  if (field === 'minute') {
    if (atom.kind === 'all') return 'ogni minuto'
    if (atom.kind === 'all-step') return atom.step === 1 ? 'ogni minuto' : `ogni ${atom.step} minuti`
    if (atom.kind === 'value') return `al minuto ${atom.value}`
    if (atom.step === 1) return atom.start === atom.end ? `al minuto ${atom.start}` : `dal minuto ${atom.start} al ${atom.end}`
    return `ogni ${atom.step} minuti dal ${atom.start} al ${atom.end}`
  }
  if (field === 'hour') {
    const hh = (n: number) => String(n).padStart(2, '0')
    if (atom.kind === 'all') return 'ogni ora'
    if (atom.kind === 'all-step') return atom.step === 1 ? 'ogni ora' : `ogni ${atom.step} ore`
    if (atom.kind === 'value') return `alle ore ${hh(atom.value)}`
    if (atom.step === 1) return atom.start === atom.end ? `alle ore ${hh(atom.start)}` : `dalle ore ${hh(atom.start)} alle ${hh(atom.end)}`
    return `ogni ${atom.step} ore dalle ${hh(atom.start)} alle ${hh(atom.end)}`
  }
  if (field === 'day') {
    if (atom.kind === 'all') return 'ogni giorno del mese'
    if (atom.kind === 'all-step') return `ogni ${atom.step} giorni del mese`
    if (atom.kind === 'value') return `il giorno ${atom.value} del mese`
    if (atom.step === 1) return atom.start === atom.end ? `il giorno ${atom.start} del mese` : `dal giorno ${atom.start} al ${atom.end}`
    return `ogni ${atom.step} giorni dal ${atom.start} al ${atom.end}`
  }
  if (field === 'month') {
    const label = (n: number) => MONTH_LABEL[n] ?? String(n)
    if (atom.kind === 'all') return 'ogni mese'
    if (atom.kind === 'all-step') return `ogni ${atom.step} mesi`
    if (atom.kind === 'value') return `a ${label(atom.value)}`
    if (atom.step === 1) return atom.start === atom.end ? `a ${label(atom.start)}` : `da ${label(atom.start)} a ${label(atom.end)}`
    return `ogni ${atom.step} mesi da ${label(atom.start)} a ${label(atom.end)}`
  }
  const label = (n: number) => DOW_LABEL[n === 7 ? 0 : n] ?? String(n)
  if (atom.kind === 'all') return 'ogni giorno della settimana'
  if (atom.kind === 'all-step') return `ogni ${atom.step} giorni della settimana`
  if (atom.kind === 'value') return `di ${label(atom.value)}`
  if (atom.step === 1) return atom.start === atom.end ? `di ${label(atom.start)}` : `da ${label(atom.start)} a ${label(atom.end)}`
  return `ogni ${atom.step} giorni da ${label(atom.start)} a ${label(atom.end)}`
}

const describeField = (field: Field): string => joinIt(field.atoms.map((atom) => describeAtom(atom, field.name)))

export type CronExplanation = {
  sentence: string
  note: string
  next: string[]
  error: string
}

const dayMatches = (day: Field, dow: Field, dayOfMonth: number, weekday: number): boolean => {
  if (!day.star && !dow.star) return day.values.includes(dayOfMonth) || dow.values.includes(weekday)
  return day.values.includes(dayOfMonth) && dow.values.includes(weekday)
}

const nextRomeMidnight = (ts: number): number => {
  const parts = romeParts(new Date(ts))
  const noonAfter = new Date(romeWallToDate(parts.year, parts.month, parts.day, 12, 0).getTime() + 24 * 3600000)
  const next = romeParts(noonAfter)
  return romeWallToDate(next.year, next.month, next.day, 0, 0).getTime()
}

const nextRuns = (fields: Field[], from: number): string[] => {
  const minute = fields[0]
  const hour = fields[1]
  const day = fields[2]
  const month = fields[3]
  const dow = fields[4]
  if (!minute || !hour || !day || !month || !dow) return []
  const found: string[] = []
  let ts = Math.floor(from / 60000) * 60000 + 60000
  const limit = from + 4 * 366 * 24 * 3600000
  let guard = 0
  while (ts < limit && found.length < 5 && guard < 20000) {
    guard += 1
    const parts = romeParts(new Date(ts))
    const monthOk = month.values.includes(parts.month)
    const dateOk = dayMatches(day, dow, parts.day, parts.weekday)
    if (!monthOk || !dateOk) {
      ts = nextRomeMidnight(ts)
      continue
    }
    if (!hour.values.includes(parts.hour)) {
      const nextHour = hour.values.find((value) => value > parts.hour)
      ts = nextHour === undefined
        ? nextRomeMidnight(ts)
        : ts + (nextHour - parts.hour) * 3600000 - parts.minute * 60000
      continue
    }
    if (!minute.values.includes(parts.minute)) {
      const nextMinute = minute.values.find((value) => value > parts.minute)
      ts += nextMinute === undefined ? (60 - parts.minute) * 60000 : (nextMinute - parts.minute) * 60000
      continue
    }
    found.push(romeDateTimeFormat(new Date(ts)))
    ts += 60000
  }
  return found
}

export const explainCron = (expression: string, now = Date.now()): CronExplanation => {
  const parts = expression.trim().split(/\s+/).filter(Boolean)
  if (!parts.length) return { sentence: '', note: '', next: [], error: '' }
  if (parts.length !== 5) {
    return { sentence: '', note: '', next: [], error: 'Servono 5 campi: minuto ora giorno mese giorno-settimana.' }
  }
  try {
    const names: FieldName[] = ['minute', 'hour', 'day', 'month', 'dow']
    const fields = parts.map((raw, index) => parseField(raw, names[index] ?? 'minute'))
    const day = fields[2]
    const dow = fields[4]
    const note = day && dow && !day.star && !dow.star
      ? 'Giorno del mese e giorno della settimana sono in OR, come nel cron classico. Orari su Europe/Rome.'
      : 'Orari calcolati su Europe/Rome.'
    const sentence = fields.map(describeField).join(', ')
    return {
      sentence: sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.',
      note,
      next: nextRuns(fields, now),
      error: ''
    }
  } catch (err) {
    return {
      sentence: '',
      note: '',
      next: [],
      error: err instanceof Error ? err.message : 'Espressione non valida.'
    }
  }
}

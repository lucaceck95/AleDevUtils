export type RegexPiece = {
  source: string
  meaning: string
}

const quantifierMeaning = (body: string, lazy: boolean): string => {
  const pace = lazy ? ', il minimo possibile' : ', il più possibile'
  if (body === '+') return `una o più volte${pace}`
  if (body === '*') return `zero o più volte${pace}`
  if (body === '?') return `zero o una volta${pace}`
  const range = /^\{(\d+)(,(\d+)?)?\}$/.exec(body)
  if (!range) return `quantificatore «${body}»`
  const min = range[1]
  const hasComma = range[2] !== undefined
  const max = range[3]
  if (!hasComma) return `esattamente ${min} volte`
  if (!max) return `almeno ${min} volte${pace}`
  return `da ${min} a ${max} volte${pace}`
}

const readQuantifier = (pattern: string, index: number): { source: string; meaning: string; size: number } | null => {
  const char = pattern[index]
  if (char !== '+' && char !== '*' && char !== '?' && char !== '{') return null
  if (char === '{') {
    const match = /^\{(\d+)(,(\d+)?)?\}/.exec(pattern.slice(index))
    if (!match) return null
    const lazy = pattern[index + match[0].length] === '?'
    const source = match[0] + (lazy ? '?' : '')
    return { source, meaning: `ripete il pezzo precedente ${quantifierMeaning(match[0], lazy)}`, size: source.length }
  }
  const lazy = pattern[index + 1] === '?'
  const source = char + (lazy ? '?' : '')
  return { source, meaning: `ripete il pezzo precedente ${quantifierMeaning(char, lazy)}`, size: source.length }
}

const readClass = (pattern: string, index: number): { source: string; meaning: string; size: number } | null => {
  if (pattern[index] !== '[') return null
  let i = index + 1
  if (pattern[i] === '^') i += 1
  if (pattern[i] === ']') i += 1
  let escaped = false
  for (; i < pattern.length; i += 1) {
    const char = pattern[i]
    if (escaped) {
      escaped = false
      continue
    }
    if (char === '\\') {
      escaped = true
      continue
    }
    if (char === ']') {
      const source = pattern.slice(index, i + 1)
      const body = source.slice(1, -1)
      const negated = body.startsWith('^')
      const inner = negated ? body.slice(1) : body
      const meaning = negated
        ? `un carattere che non è in «${inner}»`
        : `un carattere in «${inner}»`
      return { source, meaning, size: source.length }
    }
  }
  return { source: pattern.slice(index), meaning: 'classe di caratteri non chiusa', size: pattern.length - index }
}

const ESCAPES: Record<string, string> = {
  d: 'una cifra',
  D: 'un carattere che non è una cifra',
  w: 'una lettera, una cifra o underscore',
  W: 'un carattere che non è lettera, cifra o underscore',
  s: 'uno spazio, una tabulazione o un a capo',
  S: 'un carattere che non è spazio',
  b: 'il confine di una parola',
  B: 'un punto che non è confine di parola',
  n: 'un a capo',
  r: 'un ritorno a capo',
  t: 'una tabulazione',
  f: 'un avanzamento pagina',
  v: 'una tabulazione verticale',
  '0': 'il carattere nullo'
}

export const explainRegex = (pattern: string, flags: string): RegexPiece[] => {
  const pieces: RegexPiece[] = []
  const multiline = flags.includes('m')
  const dotAll = flags.includes('s')
  let i = 0

  const push = (source: string, meaning: string): void => {
    pieces.push({ source, meaning })
  }

  while (i < pattern.length) {
    const rest = pattern.slice(i)

    if (rest.startsWith('(?<=')) {
      push('(?<=', 'da qui, alle spalle deve esserci…')
      i += 4
      continue
    }
    if (rest.startsWith('(?<!')) {
      push('(?<!', 'da qui, alle spalle non deve esserci…')
      i += 4
      continue
    }
    if (rest.startsWith('(?=')) {
      push('(?=', 'davanti deve esserci…')
      i += 3
      continue
    }
    if (rest.startsWith('(?!')) {
      push('(?!', 'davanti non deve esserci…')
      i += 3
      continue
    }
    if (rest.startsWith('(?:')) {
      push('(?:', 'inizia un gruppo senza cattura')
      i += 3
      continue
    }
    const named = /^\(\?<([^>]+)>/.exec(rest)
    if (named) {
      push(named[0], `inizia il gruppo «${named[1]}»`)
      i += named[0].length
      continue
    }
    if (rest.startsWith('(')) {
      push('(', 'inizia un gruppo di cattura')
      i += 1
      continue
    }
    if (rest.startsWith(')')) {
      push(')', 'chiude il gruppo')
      i += 1
      continue
    }

    const charClass = readClass(pattern, i)
    if (charClass) {
      push(charClass.source, charClass.meaning)
      i += charClass.size
      continue
    }

    if (rest.startsWith('\\')) {
      const next = pattern[i + 1]
      if (!next) {
        push('\\', 'escape incompleto')
        i += 1
        continue
      }
      if (/^\d$/.test(next)) {
        push(`\\${next}`, `il testo catturato dal gruppo ${next}`)
        i += 2
        continue
      }
      const known = ESCAPES[next]
      if (known) {
        push(`\\${next}`, known)
        i += 2
        continue
      }
      push(`\\${next}`, `il carattere «${next}»`)
      i += 2
      continue
    }

    const quant = readQuantifier(pattern, i)
    if (quant && (pattern[i] !== '{' || quant.source.startsWith('{'))) {
      push(quant.source, pieces.length ? quant.meaning : 'quantificatore senza un pezzo prima')
      i += quant.size
      continue
    }

    const char = pattern[i] ?? ''
    if (char === '^') push('^', multiline ? 'inizio di una riga' : 'inizio del testo')
    else if (char === '$') push('$', multiline ? 'fine di una riga' : 'fine del testo')
    else if (char === '.') push('.', dotAll ? 'un carattere qualsiasi, anche l\'a capo' : 'un carattere qualsiasi, tranne l\'a capo')
    else if (char === '|') push('|', 'oppure')
    else push(char, `testo fisso «${char}»`)
    i += 1
  }

  const merged: RegexPiece[] = []
  for (const piece of pieces) {
    const prev = merged[merged.length - 1]
    if (prev && prev.meaning.startsWith('testo fisso «') && piece.meaning.startsWith('testo fisso «')) {
      const text = prev.source + piece.source
      prev.source = text
      prev.meaning = `testo fisso «${text}»`
    } else {
      merged.push({ ...piece })
    }
  }
  return merged
}

export type RegexSegment = { text: string; match: boolean }
export type RegexGroup = { name: string; value: string }
export type RegexHit = { index: number; text: string; groups: RegexGroup[] }

export type RegexRun = {
  pieces: RegexPiece[]
  segments: RegexSegment[]
  hits: RegexHit[]
  truncated: boolean
  error: string
}

const EMPTY_MATCH_CAP = 100

export const runRegex = (pattern: string, flags: string, text: string): RegexRun => {
  const pieces = explainRegex(pattern, flags)
  if (!pattern) return { pieces, segments: [{ text, match: false }], hits: [], truncated: false, error: '' }
  let expression: RegExp
  try {
    const withGlobal = flags.includes('g') ? flags : `${flags}g`
    expression = new RegExp(pattern, withGlobal)
  } catch (err) {
    return {
      pieces,
      segments: [{ text, match: false }],
      hits: [],
      truncated: false,
      error: err instanceof Error ? err.message : 'Regex non valida.'
    }
  }

  const segments: RegexSegment[] = []
  const hits: RegexHit[] = []
  let cursor = 0
  let truncated = false
  for (const match of text.matchAll(expression)) {
    const index = match.index ?? 0
    if (match[0] === '') {
      if (index < text.length) expression.lastIndex = index + 1
      else break
      continue
    }
    if (hits.length >= EMPTY_MATCH_CAP) {
      truncated = true
      break
    }
    if (index > cursor) segments.push({ text: text.slice(cursor, index), match: false })
    segments.push({ text: match[0], match: true })
    cursor = index + match[0].length
    const groups: RegexGroup[] = []
    match.slice(1).forEach((value, groupIndex) => {
      if (value !== undefined) groups.push({ name: String(groupIndex + 1), value })
    })
    if (match.groups) {
      for (const [name, value] of Object.entries(match.groups)) {
        if (value !== undefined) groups.push({ name, value })
      }
    }
    hits.push({ index, text: match[0], groups })
  }
  if (cursor < text.length) segments.push({ text: text.slice(cursor), match: false })
  if (!segments.length) segments.push({ text, match: false })
  return { pieces, segments, hits, truncated, error: '' }
}

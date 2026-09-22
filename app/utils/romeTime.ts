export type RomeParts = {
  year: number
  month: number
  day: number
  hour: number
  minute: number
  second: number
  weekday: number
}

const WEEKDAY: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6
}

export const romeDateTimeFormat = (date: Date): string => {
  return new Intl.DateTimeFormat('it-IT', {
    timeZone: 'Europe/Rome',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(date)
}

export const utcDateTimeFormat = (date: Date): string => {
  return new Intl.DateTimeFormat('it-IT', {
    timeZone: 'UTC',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(date)
}

const romeFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Europe/Rome',
  hourCycle: 'h23',
  weekday: 'short',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
})

export const romeParts = (date: Date): RomeParts => {
  const map: Record<string, string> = {}
  for (const part of romeFormatter.formatToParts(date)) map[part.type] = part.value
  let hour = Number(map.hour)
  if (hour === 24) hour = 0
  return {
    year: Number(map.year),
    month: Number(map.month),
    day: Number(map.day),
    hour,
    minute: Number(map.minute),
    second: Number(map.second),
    weekday: WEEKDAY[map.weekday ?? ''] ?? 0
  }
}

const offsetMinutes = (date: Date): number => {
  const parts = romeParts(date)
  const wallAsUtc = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second)
  return Math.round((wallAsUtc - date.getTime()) / 60000)
}

export const romeWallToDate = (year: number, month: number, day: number, hour: number, minute: number): Date => {
  let ts = Date.UTC(year, month - 1, day, hour, minute, 0)
  for (let i = 0; i < 3; i += 1) {
    const next = Date.UTC(year, month - 1, day, hour, minute, 0) - offsetMinutes(new Date(ts)) * 60000
    if (next === ts) break
    ts = next
  }
  return new Date(ts)
}

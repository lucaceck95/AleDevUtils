import { COMUNI_BY_CODE, type ComuneItem } from '~/data/comuni'

const MONTH_CODES = ['A', 'B', 'C', 'D', 'E', 'H', 'L', 'M', 'P', 'R', 'S', 'T']
const ODD_MAP: Record<string, number> = {
  '0': 1, '1': 0, '2': 5, '3': 7, '4': 9, '5': 13, '6': 15, '7': 17, '8': 19, '9': 21,
  A: 1, B: 0, C: 5, D: 7, E: 9, F: 13, G: 15, H: 17, I: 19, J: 21, K: 2, L: 4, M: 18,
  N: 20, O: 11, P: 3, Q: 6, R: 8, S: 12, T: 14, U: 16, V: 10, W: 22, X: 25, Y: 24, Z: 23
}
const EVEN_MAP: Record<string, number> = {
  '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
  A: 0, B: 1, C: 2, D: 3, E: 4, F: 5, G: 6, H: 7, I: 8, J: 9, K: 10, L: 11, M: 12,
  N: 13, O: 14, P: 15, Q: 16, R: 17, S: 18, T: 19, U: 20, V: 21, W: 22, X: 23, Y: 24, Z: 25
}

const normalizeName = (value: string): string => value.replace(/[^A-Za-z]/g, '').toUpperCase()

const extractCodeFromText = (value: string): string | null => {
  const match = value.toUpperCase().match(/[A-Z]\d{3}/)
  return match ? match[0] : null
}

const surnameCode = (surname: string): string => {
  const normalized = normalizeName(surname)
  const consonants = normalized.replace(/[AEIOU]/g, '')
  const vowels = normalized.replace(/[^AEIOU]/g, '')
  return (consonants + vowels + 'XXX').slice(0, 3)
}

const nameCode = (name: string): string => {
  const normalized = normalizeName(name)
  const consonants = normalized.replace(/[AEIOU]/g, '')
  const vowels = normalized.replace(/[^AEIOU]/g, '')
  if (consonants.length >= 4) return `${consonants[0]}${consonants[2]}${consonants[3]}`
  return (consonants + vowels + 'XXX').slice(0, 3)
}

const calculateControlChar = (partial: string): string => {
  let sum = 0
  for (let i = 0; i < partial.length; i += 1) {
    const char = partial[i] ?? '0'
    sum += (i + 1) % 2 === 0 ? EVEN_MAP[char] ?? 0 : ODD_MAP[char] ?? 0
  }
  return String.fromCharCode((sum % 26) + 65)
}

export const useCodiceFiscale = () => {
  const generateCodiceFiscale = (payload: {
    nome: string
    cognome: string
    dataNascita: string
    sesso: 'M' | 'F'
    comune: ComuneItem
  }): string => {
    const birthDate = new Date(payload.dataNascita)
    const year = String(birthDate.getFullYear()).slice(-2)
    const month = MONTH_CODES[birthDate.getMonth()]
    const dayValue = birthDate.getDate() + (payload.sesso === 'F' ? 40 : 0)
    const day = String(dayValue).padStart(2, '0')

    const partial = `${surnameCode(payload.cognome)}${nameCode(payload.nome)}${year}${month}${day}${payload.comune.codiceCatastale}`
    return `${partial}${calculateControlChar(partial)}`
  }

  const validateCodiceFiscale = (value: string): { valid: boolean; reason?: string } => {
    const cf = value.trim().toUpperCase()
    if (!/^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/.test(cf)) {
      return { valid: false, reason: 'Formato Codice Fiscale non valido.' }
    }

    const comuneCode = cf.slice(11, 15)
    if (!COMUNI_BY_CODE.has(comuneCode)) {
      return { valid: false, reason: 'Codice catastale non presente tra i comuni italiani.' }
    }

    const expectedControl = calculateControlChar(cf.slice(0, 15))
    if (expectedControl !== cf[15]) {
      return { valid: false, reason: 'Carattere di controllo non valido.' }
    }
    return { valid: true }
  }

  return {
    extractCodeFromText,
    generateCodiceFiscale,
    validateCodiceFiscale
  }
}

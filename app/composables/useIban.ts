const IBAN_LENGTHS: Record<string, number> = {
  IT: 27,
  DE: 22,
  FR: 27,
  ES: 24,
  NL: 18
}

const SUPPORTED_IBAN_COUNTRIES = Object.keys(IBAN_LENGTHS)

const randomDigits = (length: number): string => {
  return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('')
}

const randomLetters = (length: number): string => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  return Array.from({ length }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join('')
}

const generateBban = (country: string): string => {
  switch (country) {
    case 'IT':
      return `X${randomDigits(5)}${randomDigits(5)}${randomLetters(12)}`
    case 'DE':
      return `${randomDigits(8)}${randomDigits(10)}`
    case 'FR':
      return `${randomDigits(5)}${randomDigits(5)}${randomDigits(11)}${randomDigits(2)}`
    case 'ES':
      return `${randomDigits(4)}${randomDigits(4)}${randomDigits(2)}${randomDigits(10)}`
    case 'NL':
      return `${randomLetters(4)}${randomDigits(10)}`
    default:
      return randomDigits(20)
  }
}

const charToNumber = (char: string): string => {
  const code = char.charCodeAt(0)
  if (code >= 65 && code <= 90) return String(code - 55)
  return char
}

export const normalizeIban = (value: string): string => value.replace(/\s+/g, '').toUpperCase()

export const calculateIbanChecksum = (country: string, bban: string): string => {
  const moved = `${bban}${country}00`
  const numeric = moved.split('').map(charToNumber).join('')

  let remainder = 0
  for (const digit of numeric) {
    remainder = (remainder * 10 + Number(digit)) % 97
  }
  const checksum = 98 - remainder
  return checksum.toString().padStart(2, '0')
}

export const isIbanValid = (ibanInput: string): { valid: boolean; reason?: string } => {
  const iban = normalizeIban(ibanInput)
  if (!/^[A-Z]{2}[0-9]{2}[A-Z0-9]+$/.test(iban)) {
    return { valid: false, reason: 'Formato non valido. Usa solo lettere e numeri.' }
  }
  const country = iban.slice(0, 2)
  const expectedLength = IBAN_LENGTHS[country]
  if (!expectedLength) {
    return { valid: false, reason: `Stato ${country} non supportato.` }
  }
  if (iban.length !== expectedLength) {
    return { valid: false, reason: `Lunghezza errata per ${country}: attesa ${expectedLength}.` }
  }

  const rearranged = `${iban.slice(4)}${iban.slice(0, 4)}`
  const numeric = rearranged.split('').map(charToNumber).join('')
  let remainder = 0
  for (const digit of numeric) {
    remainder = (remainder * 10 + Number(digit)) % 97
  }
  if (remainder !== 1) {
    return { valid: false, reason: 'Checksum mod97 non valido.' }
  }
  return { valid: true }
}

export const useIban = () => {
  const supportedCountries = SUPPORTED_IBAN_COUNTRIES

  const generateIban = (country: string): string => {
    const normalizedCountry = country.toUpperCase()
    if (!supportedCountries.includes(normalizedCountry)) {
      throw new Error(`Stato non supportato: ${normalizedCountry}`)
    }
    const bban = generateBban(normalizedCountry)
    const checksum = calculateIbanChecksum(normalizedCountry, bban)
    return `${normalizedCountry}${checksum}${bban}`
  }

  return {
    supportedCountries,
    generateIban,
    validateIban: isIbanValid
  }
}

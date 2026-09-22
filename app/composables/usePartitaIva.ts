export type VatCountryCode =
  | 'IT' | 'AT' | 'BE' | 'BG' | 'CY' | 'HR' | 'DK' | 'EE' | 'FI' | 'FR' | 'DE' | 'EL'
  | 'IE' | 'XI' | 'LV' | 'LT' | 'LU' | 'MT' | 'NL' | 'PL' | 'PT' | 'GB' | 'CZ' | 'RO'
  | 'SK' | 'SI' | 'ES' | 'SE' | 'HU'

type VatCountryItem = { code: VatCountryCode; name: string; example: string }

const VAT_COUNTRIES: VatCountryItem[] = [
  { code: 'IT', name: 'Italia', example: '12345678901' },
  { code: 'AT', name: 'Austria', example: 'ATU12345678' },
  { code: 'BE', name: 'Belgio', example: 'BE0123456789' },
  { code: 'BG', name: 'Bulgaria', example: 'BG123456789' },
  { code: 'CY', name: 'Cipro', example: 'CY12345678A' },
  { code: 'HR', name: 'Croazia', example: 'HR12345678901' },
  { code: 'DK', name: 'Danimarca', example: 'DK12345678' },
  { code: 'EE', name: 'Estonia', example: 'EE123456789' },
  { code: 'FI', name: 'Finlandia', example: 'FI12345678' },
  { code: 'FR', name: 'Francia', example: 'FRAB123456789' },
  { code: 'DE', name: 'Germania', example: 'DE123456789' },
  { code: 'EL', name: 'Grecia', example: 'EL123456789' },
  { code: 'IE', name: 'Irlanda', example: 'IE1234567A' },
  { code: 'XI', name: 'Irlanda del Nord', example: 'XI123456789' },
  { code: 'LV', name: 'Lettonia', example: 'LV12345678901' },
  { code: 'LT', name: 'Lituania', example: 'LT123456789' },
  { code: 'LU', name: 'Lussemburgo', example: 'LU12345678' },
  { code: 'MT', name: 'Malta', example: 'MT12345678' },
  { code: 'NL', name: 'Paesi Bassi', example: 'NL123456789B01' },
  { code: 'PL', name: 'Polonia', example: 'PL1234567890' },
  { code: 'PT', name: 'Portogallo', example: 'PT123456789' },
  { code: 'GB', name: 'Regno Unito', example: 'GB123456789' },
  { code: 'CZ', name: 'Repubblica Ceca', example: 'CZ12345678' },
  { code: 'RO', name: 'Romania', example: 'RO123456' },
  { code: 'SK', name: 'Slovacchia', example: 'SK1234567890' },
  { code: 'SI', name: 'Slovenia', example: 'SI12345678' },
  { code: 'ES', name: 'Spagna', example: 'ESA1234567Z' },
  { code: 'SE', name: 'Svezia', example: 'SE123456789012' },
  { code: 'HU', name: 'Ungheria', example: 'HU12345678' }
]

const VAT_PATTERNS: Record<VatCountryCode, RegExp> = {
  IT: /^\d{11}$/,
  AT: /^ATU\d{8}$/,
  BE: /^BE0?\d{9}$/,
  BG: /^BG\d{9,10}$/,
  CY: /^CY\d{8}[A-Z]$/,
  HR: /^HR\d{11}$/,
  DK: /^DK\d{8}$/,
  EE: /^EE\d{9}$/,
  FI: /^FI\d{8}$/,
  FR: /^FR[A-Z0-9]{2}\d{9}$/,
  DE: /^DE\d{9}$/,
  EL: /^EL\d{9}$/,
  IE: /^IE\d{7}[A-Z]{1,2}$/,
  XI: /^XI\d{9}$/,
  LV: /^LV\d{11}$/,
  LT: /^LT(\d{9}|\d{12})$/,
  LU: /^LU\d{8}$/,
  MT: /^MT\d{8}$/,
  NL: /^NL\d{9}B\d{2}$/,
  PL: /^PL\d{10}$/,
  PT: /^PT\d{9}$/,
  GB: /^GB(\d{9}|\d{12}|GD\d{3}|HA\d{3})$/,
  CZ: /^CZ\d{8,10}$/,
  RO: /^RO\d{2,10}$/,
  SK: /^SK\d{10}$/,
  SI: /^SI\d{8}$/,
  ES: /^ES([A-Z]\d{7}[A-Z0-9]|\d{8}[A-Z])$/,
  SE: /^SE\d{12}$/,
  HU: /^HU\d{8}$/
}

const randomDigits = (length: number): string => {
  return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('')
}

const randomAlphaNum = (length: number): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

const generateItalianVat = (): string => {
  const digits = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10))
  let sum = 0
  for (let i = 0; i < 10; i += 1) {
    let n = digits[i] ?? 0
    if (i % 2 === 1) {
      n *= 2
      if (n > 9) n -= 9
    }
    sum += n
  }
  const checkDigit = (10 - (sum % 10)) % 10
  return `${digits.join('')}${checkDigit}`
}

const normalizeVat = (value: string): string => value.replace(/\s+/g, '').toUpperCase()

const validateItalianVat = (input: string): { valid: boolean; reason?: string; strict: boolean } => {
  const vat = normalizeVat(input).replace(/^IT/, '')
  if (!/^\d{11}$/.test(vat)) {
    return { valid: false, reason: 'Per IT inserisci 11 cifre (prefisso IT opzionale).', strict: true }
  }

  let sum = 0
  for (let i = 0; i < 10; i += 1) {
    let n = Number(vat[i] ?? '0')
    if (i % 2 === 1) {
      n *= 2
      if (n > 9) n -= 9
    }
    sum += n
  }

  const checkDigit = (10 - (sum % 10)) % 10
  if (checkDigit !== Number(vat[10])) {
    return { valid: false, reason: 'Checksum non valido per Partita IVA italiana.', strict: true }
  }
  return { valid: true, strict: true }
}

export const usePartitaIva = () => {
  const countries = VAT_COUNTRIES

  const generatePartitaIva = (country: VatCountryCode): string => {
    switch (country) {
      case 'IT':
        return generateItalianVat()
      case 'DE':
        return `DE${randomDigits(9)}`
      case 'FR':
        return `FR${randomAlphaNum(2)}${randomDigits(9)}`
      case 'ES':
        return `ES${randomAlphaNum(1)}${randomDigits(7)}${randomAlphaNum(1)}`
      case 'NL':
        return `NL${randomDigits(9)}B${randomDigits(2)}`
      case 'BE':
        return `BE0${randomDigits(9)}`
      case 'PT':
        return `PT${randomDigits(9)}`
      case 'AT':
        return `ATU${randomDigits(8)}`
      case 'BG':
        return `BG${randomDigits(Math.random() > 0.5 ? 9 : 10)}`
      case 'CY':
        return `CY${randomDigits(8)}${randomAlphaNum(1).replace(/[0-9]/g, 'A')}`
      case 'HR':
        return `HR${randomDigits(11)}`
      case 'DK':
        return `DK${randomDigits(8)}`
      case 'EE':
        return `EE${randomDigits(9)}`
      case 'FI':
        return `FI${randomDigits(8)}`
      case 'EL':
        return `EL${randomDigits(9)}`
      case 'IE':
        return `IE${randomDigits(7)}${randomAlphaNum(1).replace(/[0-9]/g, 'A')}`
      case 'XI':
        return `XI${randomDigits(9)}`
      case 'LV':
        return `LV${randomDigits(11)}`
      case 'LT':
        return `LT${randomDigits(Math.random() > 0.5 ? 9 : 12)}`
      case 'LU':
        return `LU${randomDigits(8)}`
      case 'MT':
        return `MT${randomDigits(8)}`
      case 'PL':
        return `PL${randomDigits(10)}`
      case 'GB':
        return `GB${randomDigits(9)}`
      case 'CZ':
        return `CZ${randomDigits(8)}`
      case 'RO':
        return `RO${randomDigits(6)}`
      case 'SK':
        return `SK${randomDigits(10)}`
      case 'SI':
        return `SI${randomDigits(8)}`
      case 'SE':
        return `SE${randomDigits(12)}`
      case 'HU':
        return `HU${randomDigits(8)}`
      default:
        return generateItalianVat()
    }
  }

  const detectVatCountry = (input: string): VatCountryCode | null => {
    const vat = normalizeVat(input)
    if (/^(IT)?\d{11}$/.test(vat)) return 'IT'
    const match = vat.match(/^([A-Z]{2})/)
    if (!match) return null
    const prefix = match[1] ?? ''
    if (!prefix) return null
    const detected = countries.find((country) => country.code === prefix)
    return detected ? detected.code : null
  }

  const validatePartitaIva = (input: string, country: VatCountryCode): { valid: boolean; reason?: string; strict: boolean } => {
    if (country === 'IT') return validateItalianVat(input)

    const vat = normalizeVat(input)
    const pattern = VAT_PATTERNS[country]
    if (!pattern.test(vat)) {
      return {
        valid: false,
        reason: `Formato non valido per ${country}. Esempio: ${countries.find((c) => c.code === country)?.example}`,
        strict: false
      }
    }
    return {
      valid: true,
      reason: `Formato valido per ${country} (controllo formale).`,
      strict: false
    }
  }

  return {
    countries,
    detectVatCountry,
    generatePartitaIva,
    validatePartitaIva
  }
}

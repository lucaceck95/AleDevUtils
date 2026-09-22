import { COMUNI, type ComuneItem } from '~/data/comuni'
import { useCodiceFiscale } from '~/composables/useCodiceFiscale'
import { usePartitaIva } from '~/composables/usePartitaIva'

export interface FatturazioneCliente {
  Nome: string
  Cognome: string
  RagioneSociale: string
  CodiceFiscale: string
  PartitaIva: string
  Indirizzo: string
  Cap: string
  Citta: string
  Provincia: string
  Nazione: string
  CodiceSdi: string
  PecSdi: string
  Azienda: boolean
}

export interface FatturazioneSpedizione {
  Intestatario: string
  Indirizzo: string
  Cap: string
  Citta: string
  Provincia: string
  Nazione: string
  Telefono: string
  Email: string
}

const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)] as T

const slugify = (value: string): string => {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9]+/g, '')
}

const randomFrom = (list: string[]): string => pick(list)

const randomStreet = (): string => {
  const streets = [
    'Via Roma',
    'Via Garibaldi',
    'Via Dante Alighieri',
    'Via Giuseppe Verdi',
    'Viale Europa',
    'Viale Italia',
    'Corso Cavour',
    'Corso Italia',
    'Piazza del Popolo',
    'Via delle Magnolie',
    'Via dei Fiori',
    'Via Aldo Moro'
  ]
  const number = 1 + Math.floor(Math.random() * 220)
  return `${randomFrom(streets)} ${number}`
}

const randomCap = (comune: ComuneItem): string => {
  if (comune.cap?.length) return pick(comune.cap).toString()
  // fallback: 5 cifre (cap italiano)
  const n = 10000 + Math.floor(Math.random() * 89999)
  return String(n)
}

const randomPhoneIt = (): string => {
  // numero mobile IT: 10 cifre, formato 3XX + 7 cifre
  const prefix = pick(['320', '328', '329', '331', '333', '334', '335', '336', '337', '338', '339', '340', '347', '348', '349', '360', '366', '370', '380', '388', '389', '391', '392', '393'])
  const rest = String(Math.floor(Math.random() * 10000000)).padStart(7, '0')
  return `${prefix}${rest}`
}

const randomCodeSdi = (): string => {
  // SDI (codice destinatario) tipicamente 7 caratteri alfanumerici
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  return Array.from({ length: 7 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

const randomEmail = (localPart: string): string => {
  const base = slugify(localPart)
  const domain = pick(['example.com', 'demo.it', 'mail.test'])
  const suffix = String(Math.floor(Math.random() * 900) + 100)
  return `${base || 'user'}${suffix}@${domain}`
}

const buildCompanyName = (): string => {
  const a = ['Tech', 'Logi', 'Nova', 'Senza', 'Aurea', 'Blue', 'Red', 'Green', 'Alpha', 'Beta']
  const b = ['Systems', 'Services', 'Italia', 'Group', 'Solutions', 'Trading', 'Works', 'Consulting']
  return `${randomFrom(a)} ${randomFrom(b)} S.r.l.`
}

export const useFatturazioneGenerator = () => {
  const { generateCodiceFiscale } = useCodiceFiscale()
  const { generatePartitaIva } = usePartitaIva()

  const generate = (azienda: boolean): { cliente: FatturazioneCliente; spedizione: FatturazioneSpedizione } => {
    const sesso = Math.random() > 0.5 ? 'M' : 'F'
    const year = 1970 + Math.floor(Math.random() * 35)
    const month = 1 + Math.floor(Math.random() * 12)
    const day = 1 + Math.floor(Math.random() * 28) // evita problemi di date
    const dataNascita = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`

    const firstNamesM = ['Marco', 'Luca', 'Matteo', 'Davide', 'Gabriele', 'Alessandro', 'Andrea']
    const firstNamesF = ['Giulia', 'Sofia', 'Francesca', 'Chiara', 'Martina', 'Laura', 'Elisa']
    const lastNames = ['Rossi', 'Bianchi', 'Romano', 'Esposito', 'Conti', 'Gallo', 'Ferrari', 'Ricci']

    const nome = pick(sesso === 'M' ? firstNamesM : firstNamesF)
    const cognome = pick(lastNames)

    const comune = pick(COMUNI)
    const cap = randomCap(comune)
    const indirizzo = randomStreet()

    const codiceFiscale = generateCodiceFiscale({
      nome,
      cognome,
      dataNascita,
      sesso,
      comune
    })

    const partitaIva = azienda ? generatePartitaIva('IT') : ''
    const ragioneSociale = azienda ? buildCompanyName() : ''

    const codiceSdi = randomCodeSdi()
    const pecSdi = `${slugify(codiceSdi)}@pec.${pick(['sdi', 'fattura', 'inbox'])}.it`

    const cliente: FatturazioneCliente = {
      Nome: nome,
      Cognome: cognome,
      RagioneSociale: ragioneSociale,
      CodiceFiscale: codiceFiscale,
      PartitaIva: partitaIva,
      Indirizzo: indirizzo,
      Cap: cap,
      Citta: comune.nome,
      Provincia: comune.sigla,
      Nazione: 'IT',
      CodiceSdi: codiceSdi,
      PecSdi: pecSdi,
      Azienda: azienda
    }

    const intestatario = azienda ? ragioneSociale : `${nome} ${cognome}`

    const spedizione: FatturazioneSpedizione = {
      Intestatario: intestatario,
      Indirizzo: indirizzo,
      Cap: cap,
      Citta: comune.nome,
      Provincia: comune.sigla,
      Nazione: 'IT',
      Telefono: randomPhoneIt(),
      Email: randomEmail(intestatario)
    }

    return { cliente, spedizione }
  }

  return { generate }
}


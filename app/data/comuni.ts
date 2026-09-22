import comuniRaw from 'comuni-json/comuni.json'

export interface ComuneItem {
  nome: string
  sigla: string
  codiceCatastale: string
  label: string
  cap: string[]
  provinciaNome: string
}

type ComuneRaw = {
  nome: string
  sigla: string
  codiceCatastale: string
  cap?: string[]
  provincia?: { nome: string }
}

export const COMUNI: ComuneItem[] = (comuniRaw as ComuneRaw[]).map((item) => ({
  nome: item.nome,
  sigla: item.sigla,
  codiceCatastale: item.codiceCatastale,
  label: `${item.nome} (${item.sigla}) - ${item.codiceCatastale}`,
  cap: item.cap ?? [],
  provinciaNome: item.provincia?.nome ?? item.sigla
}))

export const COMUNI_BY_CODE = new Map(COMUNI.map((item) => [item.codiceCatastale, item]))

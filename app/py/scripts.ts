export type PythonScriptDef = {
  filename: string
  title: string
  description: string
  enabled: boolean
}

export const PYTHON_SCRIPTS: PythonScriptDef[] = [
  {
    filename: 'test.py',
    title: 'Hello World (test.py)',
    description: 'Stampa un saluto e tre righe numeriche.',
    enabled: true
  },
  {
    filename: 'test2.py',
    title: 'Test (test2.py)',
    description: 'Esempio extra (disabilitato di default).',
    enabled: false
  }
]


import { defineEventHandler } from 'h3'
import { PYTHON_SCRIPTS } from '../../app/py/scripts'

export default defineEventHandler(() => {
  const scripts = PYTHON_SCRIPTS
    .filter((s) => s.enabled)
    .map((s) => ({
      filename: s.filename,
      title: s.title,
      description: s.description
    }))

  return { scripts }
})


import { defineEventHandler, readBody, createError } from 'h3'
import { spawn } from 'node:child_process'
import { join, resolve } from 'node:path'
import { PYTHON_SCRIPTS } from '../../app/py/scripts'

type ExecRequest = {
  script: string
  args?: string[]
}

type ExecResponse = {
  stdout: string
  stderr: string
  exitCode: number
}

const MAX_CODE_CHARS = 30000
const MAX_OUTPUT_CHARS = 80000
const TIMEOUT_MS = 3000
const MAX_ARGS = 20

const trimLimit = (value: string, limit: number): string => {
  if (value.length <= limit) return value
  return value.slice(0, limit) + '\n[troncato]'
}

const runPythonOnce = (command: string, filePath: string, args: string[]): Promise<ExecResponse> => {
  return new Promise((resolve, reject) => {
    const child = spawn(command, [filePath, ...args], {
      stdio: ['ignore', 'pipe', 'pipe']
    })

    let stdout = ''
    let stderr = ''
    let resolved = false

    child.stdout?.on('data', (chunk: unknown) => {
      const text = (chunk as any)?.toString?.('utf8') ?? String(chunk)
      stdout += text
    })
    child.stderr?.on('data', (chunk: unknown) => {
      const text = (chunk as any)?.toString?.('utf8') ?? String(chunk)
      stderr += text
    })

    const timeout = setTimeout(() => {
      try {
        child.kill()
      } catch {
        // no-op
      }
      if (resolved) return
      resolved = true
      resolve({
        stdout: trimLimit(stdout, MAX_OUTPUT_CHARS),
        stderr: trimLimit(stderr + '\n[timeout]', MAX_OUTPUT_CHARS),
        exitCode: -1
      })
    }, TIMEOUT_MS)

    child.on('error', (err: unknown) => {
      clearTimeout(timeout)
      if (resolved) return
      resolved = true
      reject(err)
    })

    child.on('close', (codeExit: number | null) => {
      clearTimeout(timeout)
      if (resolved) return
      resolved = true
      resolve({
        stdout: trimLimit(stdout, MAX_OUTPUT_CHARS),
        stderr: trimLimit(stderr, MAX_OUTPUT_CHARS),
        exitCode: codeExit ?? 0
      })
    })
  })
}

const runPython = async (filePath: string, args: string[]): Promise<ExecResponse> => {
  try {
    return await runPythonOnce('python', filePath, args)
  } catch {
    return await runPythonOnce('py', filePath, args)
  }
}

export default defineEventHandler(async (event) => {
  const body = (await readBody(event)) as ExecRequest | undefined
  const script = body?.script
  const args = body?.args ?? []

  if (typeof script !== 'string' || !script.trim()) {
    throw createError({ statusCode: 400, statusMessage: 'Parametro `script` mancante.' })
  }
  if (!/^[a-zA-Z0-9_.-]+\.py$/.test(script)) {
    throw createError({ statusCode: 400, statusMessage: 'Nome script non valido.' })
  }
  if (!Array.isArray(args)) {
    throw createError({ statusCode: 400, statusMessage: '`args` deve essere un array di stringhe.' })
  }
  if (args.length > MAX_ARGS) {
    throw createError({ statusCode: 413, statusMessage: `Troppi argomenti (max ${MAX_ARGS}).` })
  }

  const pyDir = resolve(process.cwd(), 'app', 'py')
  const allowed = new Set(PYTHON_SCRIPTS.filter((s) => s.enabled).map((s) => s.filename))

  if (!allowed.has(script)) {
    throw createError({ statusCode: 403, statusMessage: 'Script non consentito.' })
  }

  const filePath = join(pyDir, script)

  // Sanitizzazione base args: limiti lunhezza per evitare input enormi
  const safeArgs = args.map((a) => {
    const str = typeof a === 'string' ? a : String(a)
    if (str.length > MAX_CODE_CHARS) return str.slice(0, MAX_CODE_CHARS)
    return str
  })

  try {
    return await runPython(filePath, safeArgs)
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: err instanceof Error ? err.message : 'Impossibile eseguire lo script.'
    })
  }
})


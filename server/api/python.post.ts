import { defineEventHandler, readBody, createError } from 'h3'
import { spawn } from 'node:child_process'

type PythonRunRequest = {
  code: string
}

type PythonRunResponse = {
  stdout: string
  stderr: string
  exitCode: number
}

const MAX_CODE_CHARS = 30000
const MAX_OUTPUT_CHARS = 80000
const TIMEOUT_MS = 3000

const trimLimit = (value: string, limit: number): string => {
  if (value.length <= limit) return value
  return value.slice(0, limit) + '\n[troncato]'
}

const runPythonOnce = (command: string, code: string): Promise<PythonRunResponse> => {
  return new Promise((resolve, reject) => {
    const child = spawn(command, ['-'], {
      stdio: ['pipe', 'pipe', 'pipe']
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
        // SIGKILL non sempre disponibile su Windows; fallback a SIGTERM/default.
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

    child.stdin?.write(code)
    child.stdin?.end()
  })
}

const runPython = async (code: string): Promise<PythonRunResponse> => {
  try {
    return await runPythonOnce('python', code)
  } catch {
    // Fallback Windows: some systems expose python as `py`
    return await runPythonOnce('py', code)
  }
}

export default defineEventHandler(async (event) => {
  const body = (await readBody(event)) as PythonRunRequest | undefined
  const code = body?.code ?? ''

  if (typeof code !== 'string' || !code.trim()) {
    throw createError({ statusCode: 400, statusMessage: 'Codice Python mancante.' })
  }
  if (code.length > MAX_CODE_CHARS) {
    throw createError({ statusCode: 413, statusMessage: `Codice troppo lungo (max ${MAX_CODE_CHARS} caratteri).` })
  }

  try {
    return await runPython(code)
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: err instanceof Error ? err.message : 'Impossibile eseguire Python.'
    })
  }
})


const bytesToBinary = (bytes: Uint8Array): string => {
  let binary = ''
  const chunk = 0x8000
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk))
  }
  return binary
}

export const encodeBase64 = (text: string): string => {
  const bytes = new TextEncoder().encode(text)
  return btoa(bytesToBinary(bytes))
}

export const normalizeBase64 = (value: string): string => {
  const trimmed = value.trim()
  const marker = 'base64,'
  const markerAt = trimmed.indexOf(marker)
  const raw = trimmed.startsWith('data:') && markerAt !== -1
    ? trimmed.slice(markerAt + marker.length)
    : trimmed
  return raw.replace(/\s/g, '')
}

export type Base64Decoded = {
  bytes: Uint8Array
  text: string
  binary: boolean
}

export const decodeBase64 = (value: string): Base64Decoded => {
  const normalized = normalizeBase64(value)
  if (!normalized) return { bytes: new Uint8Array(), text: '', binary: false }
  if (!/^[A-Za-z0-9+/]*={0,2}$/.test(normalized) || normalized.length % 4 === 1) {
    throw new Error('Base64 non valido.')
  }
  const binary = atob(normalized)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i)
  try {
    const text = new TextDecoder('utf-8', { fatal: true }).decode(bytes)
    return { bytes, text, binary: false }
  } catch {
    return { bytes, text: '', binary: true }
  }
}

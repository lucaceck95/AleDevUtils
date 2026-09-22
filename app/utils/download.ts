export const downloadBytes = (bytes: Uint8Array, filename: string, mime = 'application/octet-stream'): void => {
  const copy = new Uint8Array(bytes.byteLength)
  copy.set(bytes)
  const blob = new Blob([copy.buffer], { type: mime })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename.trim() || 'download'
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

export const downloadText = (text: string, filename: string): void => {
  downloadBytes(new TextEncoder().encode(text), filename, 'text/plain;charset=utf-8')
}

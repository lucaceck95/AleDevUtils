export const useClipboard = () => {
  const copiedKey = ref('')
  let timer: ReturnType<typeof setTimeout> | undefined

  const copyText = async (value: string, key = 'default'): Promise<void> => {
    if (!value) return
    try {
      await navigator.clipboard.writeText(value)
      copiedKey.value = key
      clearTimeout(timer)
      timer = setTimeout(() => {
        copiedKey.value = ''
      }, 1400)
    } catch {
      copiedKey.value = ''
    }
  }

  return { copiedKey, copyText }
}

<template>
  <section class="row g-4">
    <div class="col-12 col-xl-6">
      <div class="card tool-card h-100">
        <div class="card-body">
          <h1 class="h4 mb-2">Base64</h1>
          <p class="text-secondary mb-3">Codifica testo UTF-8 oppure decodifica. Puoi scaricare il risultato.</p>
          <div class="btn-group mb-3" role="group" aria-label="Modalità Base64">
            <button class="btn" :class="mode === 'encode' ? 'btn-primary' : 'btn-outline-light'" type="button" @click="mode = 'encode'">Codifica</button>
            <button class="btn" :class="mode === 'decode' ? 'btn-primary' : 'btn-outline-light'" type="button" @click="mode = 'decode'">Decodifica</button>
          </div>
          <label class="form-label">{{ mode === 'encode' ? 'Testo' : 'Base64' }}</label>
          <textarea v-model="input" class="form-control tool-mono" rows="14" spellcheck="false" />
          <p v-if="error" class="text-danger mt-3 mb-0">{{ error }}</p>
          <p v-else-if="binary" class="text-info-emphasis mt-3 mb-0">Non è testo UTF-8. Scarica il file decodificato.</p>
        </div>
      </div>
    </div>
    <div class="col-12 col-xl-6">
      <div class="card tool-card h-100">
        <div class="card-body">
          <h2 class="h5 mb-3">Risposta</h2>
          <pre class="output-pre tool-mono mb-3">{{ output || '—' }}</pre>
          <label class="form-label">Nome file</label>
          <input v-model="filename" class="form-control mb-3" type="text" spellcheck="false">
          <div class="d-flex flex-wrap gap-2">
            <button class="btn btn-outline-light" type="button" :disabled="!output" @click="copyText(output, 'b64')">
              {{ copiedKey === 'b64' ? 'Copiato' : 'Copia' }}
            </button>
            <button class="btn btn-primary" type="button" :disabled="!canDownload" @click="downloadOutput">Scarica</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { decodeBase64, encodeBase64 } from '~/utils/base64'
import { downloadBytes, downloadText } from '~/utils/download'

const mode = ref<'encode' | 'decode'>('encode')
const input = ref('')
const filename = ref('risposta.txt')
const { copiedKey, copyText } = useClipboard()

const decoded = computed(() => {
  if (mode.value !== 'decode' || !input.value.trim()) return null
  try {
    return { value: decodeBase64(input.value), error: '' }
  } catch (err) {
    return { value: null, error: err instanceof Error ? err.message : 'Base64 non valido.' }
  }
})

const error = computed(() => decoded.value?.error ?? '')
const binary = computed(() => decoded.value?.value?.binary ?? false)

const output = computed(() => {
  if (!input.value) return ''
  if (mode.value === 'encode') return encodeBase64(input.value)
  return decoded.value?.value?.text ?? ''
})

const canDownload = computed(() => {
  if (mode.value === 'encode') return !!output.value
  return !!decoded.value?.value && !error.value
})

watch(mode, (value) => {
  filename.value = value === 'encode' ? 'risposta.txt' : 'file.bin'
})

const downloadOutput = (): void => {
  if (mode.value === 'encode') {
    downloadText(output.value, filename.value || 'risposta.txt')
    return
  }
  const bytes = decoded.value?.value?.bytes
  if (!bytes) return
  const name = filename.value || (binary.value ? 'file.bin' : 'risposta.txt')
  if (binary.value) downloadBytes(bytes, name)
  else downloadText(decoded.value?.value?.text ?? '', name)
}
</script>

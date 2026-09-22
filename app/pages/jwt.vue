<template>
  <section class="row g-4">
    <div class="col-12 col-xl-5">
      <div class="card tool-card h-100">
        <div class="card-body">
          <h1 class="h4 mb-2">JWT</h1>
          <p class="text-secondary mb-3">Decodifica header e payload. La firma non viene verificata.</p>
          <textarea v-model="token" class="form-control tool-mono" rows="14" spellcheck="false" placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." />
          <p v-if="error" class="text-danger mt-3 mb-0">{{ error }}</p>
        </div>
      </div>
    </div>
    <div class="col-12 col-xl-7">
      <div class="card tool-card h-100">
        <div class="card-body">
          <h2 class="h5 mb-3">Header</h2>
          <pre class="output-pre tool-mono mb-4">{{ headerText || '—' }}</pre>
          <h2 class="h5 mb-3">Payload</h2>
          <pre class="output-pre tool-mono mb-3">{{ payloadText || '—' }}</pre>
          <ul v-if="dates.length" class="mb-3">
            <li v-for="item in dates" :key="item.label">{{ item.label }}: {{ item.value }}</li>
          </ul>
          <button class="btn btn-outline-light" type="button" :disabled="!payloadText" @click="copyText(payloadText, 'jwt')">
            {{ copiedKey === 'jwt' ? 'Copiato' : 'Copia payload' }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { romeDateTimeFormat } from '~/utils/romeTime'

const token = ref('')
const { copiedKey, copyText } = useClipboard()

const decodePart = (part: string): unknown => {
  const pad = part.length % 4 === 0 ? '' : '='.repeat(4 - (part.length % 4))
  const b64 = part.replace(/-/g, '+').replace(/_/g, '/') + pad
  const binary = atob(b64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i)
  return JSON.parse(new TextDecoder().decode(bytes))
}

const parsed = computed(() => {
  const raw = token.value.trim()
  if (!raw) return { header: null, payload: null, error: '' }
  const parts = raw.split('.')
  if (parts.length < 2 || !parts[0] || !parts[1]) return { header: null, payload: null, error: 'Token incompleto.' }
  try {
    return { header: decodePart(parts[0]), payload: decodePart(parts[1]), error: '' }
  } catch {
    return { header: null, payload: null, error: 'JWT non decodificabile.' }
  }
})

const error = computed(() => parsed.value.error)
const headerText = computed(() => parsed.value.header ? JSON.stringify(parsed.value.header, null, 2) : '')
const payloadText = computed(() => parsed.value.payload ? JSON.stringify(parsed.value.payload, null, 2) : '')

const dates = computed(() => {
  const payload = parsed.value.payload
  if (!payload || typeof payload !== 'object') return []
  const record = payload as Record<string, unknown>
  return (['iat', 'nbf', 'exp'] as const).flatMap((key) => {
    const value = record[key]
    if (typeof value !== 'number') return []
    const label = key === 'iat' ? 'Emesso' : key === 'nbf' ? 'Valido da' : 'Scade'
    return [{ label, value: `${romeDateTimeFormat(new Date(value * 1000))} (Roma)` }]
  })
})
</script>

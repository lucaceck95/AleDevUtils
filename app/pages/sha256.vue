<template>
  <section class="row g-4">
    <div class="col-12 col-xl-6">
      <div class="card tool-card h-100">
        <div class="card-body">
          <h1 class="h4 mb-2">SHA-256</h1>
          <p class="text-secondary mb-3">Hash del testo UTF-8, calcolato mentre scrivi.</p>
          <textarea v-model="input" class="form-control tool-mono" rows="14" spellcheck="false" />
        </div>
      </div>
    </div>
    <div class="col-12 col-xl-6">
      <div class="card tool-card h-100">
        <div class="card-body">
          <h2 class="h5 mb-3">Hex</h2>
          <pre class="output-pre tool-mono mb-3">{{ hash || '—' }}</pre>
          <button class="btn btn-outline-light" type="button" :disabled="!hash" @click="copyText(hash, 'sha')">
            {{ copiedKey === 'sha' ? 'Copiato' : 'Copia' }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const input = ref('')
const hash = ref('')
const { copiedKey, copyText } = useClipboard()

let hashTicket = 0
watch(input, async (value) => {
  const ticket = ++hashTicket
  const bytes = new TextEncoder().encode(value)
  const digest = await crypto.subtle.digest('SHA-256', bytes)
  if (ticket !== hashTicket) return
  hash.value = [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('')
}, { immediate: true })
</script>

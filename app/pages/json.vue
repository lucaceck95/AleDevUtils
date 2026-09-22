<template>
  <section class="row g-4">
    <div class="col-12">
      <div class="card tool-card">
        <div class="card-body">
          <h1 class="h4 mb-2">JSON</h1>
          <p class="text-secondary mb-3">Valida mentre scrivi. Formatta o comprimi quando ti serve.</p>
          <textarea v-model="input" class="form-control tool-mono mb-3" rows="16" spellcheck="false" placeholder="{ &quot;ok&quot;: true }" />
          <p class="mb-3" :class="error ? 'text-danger' : 'text-info-emphasis'">
            {{ status }}
          </p>
          <div class="d-flex flex-wrap gap-2">
            <button class="btn btn-primary" type="button" :disabled="!!error || !input.trim()" @click="formatJson">Formatta</button>
            <button class="btn btn-outline-light" type="button" :disabled="!!error || !input.trim()" @click="minifyJson">Comprimi</button>
            <button class="btn btn-outline-light" type="button" :disabled="!input" @click="copyText(input, 'json')">
              {{ copiedKey === 'json' ? 'Copiato' : 'Copia' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const input = ref('')
const { copiedKey, copyText } = useClipboard()

const error = computed(() => {
  if (!input.value.trim()) return ''
  try {
    JSON.parse(input.value)
    return ''
  } catch (err) {
    return err instanceof Error ? err.message : 'JSON non valido.'
  }
})

const status = computed(() => {
  if (!input.value.trim()) return 'Incolla un JSON.'
  return error.value || 'JSON valido.'
})

const formatJson = (): void => {
  input.value = JSON.stringify(JSON.parse(input.value), null, 2)
}

const minifyJson = (): void => {
  input.value = JSON.stringify(JSON.parse(input.value))
}
</script>

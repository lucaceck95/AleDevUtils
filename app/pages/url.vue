<template>
  <section class="row g-4">
    <div class="col-12 col-xl-6">
      <div class="card tool-card h-100">
        <div class="card-body">
          <h1 class="h4 mb-2">URL encode / decode</h1>
          <p class="text-secondary mb-3">Si aggiorna mentre scrivi, da una parte e dall'altra.</p>
          <label class="form-label">Modalità</label>
          <select v-model="kind" class="form-select mb-3">
            <option value="component">Componente (encodeURIComponent)</option>
            <option value="full">URL intera (encodeURI)</option>
          </select>
          <label class="form-label">Testo</label>
          <textarea v-model="plain" class="form-control tool-mono" rows="12" spellcheck="false" />
        </div>
      </div>
    </div>
    <div class="col-12 col-xl-6">
      <div class="card tool-card h-100">
        <div class="card-body">
          <label class="form-label">Codificato</label>
          <textarea v-model="coded" class="form-control tool-mono mb-3" rows="12" spellcheck="false" />
          <p v-if="error" class="text-danger">{{ error }}</p>
          <button class="btn btn-outline-light" type="button" :disabled="!coded" @click="copyText(coded, 'url')">
            {{ copiedKey === 'url' ? 'Copiato' : 'Copia codificato' }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const kind = ref<'component' | 'full'>('component')
const plain = ref('')
const coded = ref('')
const error = ref('')
const syncing = ref(false)
const { copiedKey, copyText } = useClipboard()

const encode = (value: string): string => kind.value === 'component' ? encodeURIComponent(value) : encodeURI(value)
const decode = (value: string): string => kind.value === 'component' ? decodeURIComponent(value) : decodeURI(value)

watch(plain, (value) => {
  if (syncing.value) return
  syncing.value = true
  error.value = ''
  coded.value = encode(value)
  syncing.value = false
})

watch(coded, (value) => {
  if (syncing.value) return
  syncing.value = true
  try {
    plain.value = decode(value)
    error.value = ''
  } catch {
    error.value = 'Sequenza codificata non valida.'
  }
  syncing.value = false
})

watch(kind, () => {
  syncing.value = true
  error.value = ''
  coded.value = encode(plain.value)
  syncing.value = false
})
</script>

<template>
  <section class="row g-4">
    <div class="col-12 col-xl-4">
      <div class="card tool-card h-100">
        <div class="card-body">
          <h1 class="h4 mb-2">UUID</h1>
          <p class="text-secondary mb-3">Versione 4, casuali.</p>
          <label class="form-label">Quanti</label>
          <input v-model.number="count" class="form-control mb-3" type="number" min="1" max="50">
          <div class="d-flex flex-wrap gap-2">
            <button class="btn btn-primary" type="button" @click="generate">Genera</button>
            <button class="btn btn-outline-light" type="button" :disabled="!output" @click="copyText(output, 'uuid')">
              {{ copiedKey === 'uuid' ? 'Copiato' : 'Copia' }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 col-xl-8">
      <div class="card tool-card h-100">
        <div class="card-body">
          <h2 class="h5 mb-3">Output</h2>
          <pre class="output-pre tool-mono mb-0">{{ output || 'Premi Genera.' }}</pre>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const count = ref(1)
const output = ref('')
const { copiedKey, copyText } = useClipboard()

const generate = (): void => {
  const total = Math.min(50, Math.max(1, Math.floor(count.value || 1)))
  count.value = total
  const ids: string[] = []
  for (let i = 0; i < total; i += 1) ids.push(crypto.randomUUID())
  output.value = ids.join('\n')
}

generate()
</script>

<template>
  <section class="row g-4">
    <div class="col-12 col-xl-5">
      <div class="card tool-card h-100">
        <div class="card-body">
          <h1 class="h4 mb-2">Cron</h1>
          <p class="text-secondary mb-3">5 campi: minuto ora giorno mese giorno-settimana.</p>
          <input v-model="expression" class="form-control tool-mono mb-3" type="text" spellcheck="false" placeholder="0 9 * * 1-5">
          <div class="d-flex flex-wrap gap-2">
            <button v-for="sample in samples" :key="sample" class="btn btn-sm btn-outline-light" type="button" @click="expression = sample">
              {{ sample }}
            </button>
          </div>
          <p v-if="result.error" class="text-danger mt-3 mb-0">{{ result.error }}</p>
        </div>
      </div>
    </div>
    <div class="col-12 col-xl-7">
      <div class="card tool-card h-100">
        <div class="card-body">
          <h2 class="h5 mb-3">Significato</h2>
          <p class="mb-2">{{ result.sentence || '—' }}</p>
          <p class="text-secondary">{{ result.note }}</p>
          <h2 class="h5 mb-3">Prossime 5</h2>
          <ol v-if="result.next.length" class="mb-0">
            <li v-for="item in result.next" :key="item">{{ item }}</li>
          </ol>
          <p v-else class="text-secondary mb-0">Nessuna esecuzione trovata.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { explainCron } from '~/utils/cronIt'

const expression = ref('0 9 * * 1-5')
const samples = ['*/15 * * * *', '0 9 * * 1-5', '0 0 1 * *', '30 18 * * 5']
const result = computed(() => explainCron(expression.value))
</script>

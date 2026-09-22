<template>
  <section class="row g-4">
    <div class="col-12 col-xl-5">
      <div class="card tool-card h-100">
        <div class="card-body">
          <h1 class="h4 mb-2">Regex</h1>
          <p class="text-secondary mb-3">La regola si spiega da sola. I pulsanti inseriscono nel punto del cursore.</p>
          <label class="form-label">Pattern</label>
          <textarea
            ref="patternEl"
            v-model="pattern"
            class="form-control tool-mono mb-3"
            rows="3"
            spellcheck="false"
          />
          <div class="d-flex flex-wrap gap-3 mb-3">
            <label v-for="flag in flagOptions" :key="flag.id" class="form-check mb-0">
              <input v-model="flags" class="form-check-input" type="checkbox" :value="flag.id">
              <span class="form-check-label">{{ flag.label }}</span>
            </label>
          </div>
          <p class="small text-secondary mb-2">Inserimenti</p>
          <div class="d-flex flex-wrap gap-2 mb-3">
            <button
              v-for="item in inserts"
              :key="item.label"
              class="btn btn-sm btn-outline-light"
              type="button"
              @click="insert(item.value)"
            >
              {{ item.label }}
            </button>
          </div>
          <p class="small text-secondary mb-2">Esempi</p>
          <div class="d-flex flex-wrap gap-2">
            <button
              v-for="item in examples"
              :key="item.label"
              class="btn btn-sm btn-outline-info"
              type="button"
              @click="applyExample(item)"
            >
              {{ item.label }}
            </button>
          </div>
          <p v-if="result.error" class="text-danger mt-3 mb-0">{{ result.error }}</p>
        </div>
      </div>
    </div>

    <div class="col-12 col-xl-7">
      <div class="card tool-card mb-4">
        <div class="card-body">
          <h2 class="h5 mb-3">Cosa fa la regola</h2>
          <ol v-if="result.pieces.length" class="mb-0">
            <li v-for="(piece, index) in result.pieces" :key="`${piece.source}-${index}`">
              <code class="tool-mono">{{ piece.source }}</code>
              <span class="text-secondary"> — {{ piece.meaning }}</span>
            </li>
          </ol>
          <p v-else class="text-secondary mb-0">Scrivi un pattern.</p>
        </div>
      </div>
      <div class="card tool-card">
        <div class="card-body">
          <label class="form-label">Testo di prova</label>
          <textarea v-model="sample" class="form-control tool-mono mb-3" rows="5" spellcheck="false" />
          <div class="output-pre tool-mono mb-3">
            <span v-for="(segment, index) in result.segments" :key="index" :class="{ 'regex-hit': segment.match }">{{ segment.text }}</span>
          </div>
          <p v-if="result.truncated" class="text-info-emphasis">Mostro solo le prime 100 corrispondenze.</p>
          <ul v-if="result.hits.length" class="mb-0">
            <li v-for="(hit, index) in result.hits" :key="`${hit.index}-${index}`">
              {{ hit.index }}: «{{ hit.text }}»
              <span v-if="hit.groups.length" class="text-secondary">
                — <span v-for="group in hit.groups" :key="group.name">{{ group.name }}={{ group.value }} </span>
              </span>
            </li>
          </ul>
          <p v-else class="text-secondary mb-0">Nessuna corrispondenza.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { runRegex } from '~/utils/regexExplain'

const pattern = ref('\\d+')
const sample = ref('ordine 42, poi 7 e basta')
const flags = ref<string[]>(['g'])
const patternEl = ref<HTMLTextAreaElement | null>(null)

const flagOptions = [
  { id: 'g', label: 'g tutte' },
  { id: 'i', label: 'i ignora maiuscole' },
  { id: 'm', label: 'm per riga' },
  { id: 's', label: 's il punto include a capo' }
]

const inserts = [
  { label: 'inizio', value: '^' },
  { label: 'fine', value: '$' },
  { label: 'cifra', value: '\\d' },
  { label: 'parola', value: '\\w' },
  { label: 'spazio', value: '\\s' },
  { label: 'confine', value: '\\b' },
  { label: 'uno o più', value: '+' },
  { label: 'zero o più', value: '*' },
  { label: 'opzionale', value: '?' },
  { label: 'ripeti', value: '{2,4}' },
  { label: 'gruppo', value: '()' },
  { label: 'oppure', value: '|' },
  { label: 'classe', value: '[a-z]' },
  { label: 'esclusi', value: '[^0-9]' }
]

const examples = [
  { label: 'email', pattern: '[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}', sample: 'scrivi a ada@example.com oppure no' },
  { label: 'UUID', pattern: '[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}', sample: 'id 550e8400-e29b-41d4-a716-446655440000 ok' },
  { label: 'data ISO', pattern: '\\d{4}-\\d{2}-\\d{2}', sample: 'rilascio 2026-09-22 alle 10' },
  { label: 'intero', pattern: '-?\\d+', sample: 'saldo -12 e poi 3' }
]

const flagText = computed(() => flags.value.join(''))
const result = computed(() => runRegex(pattern.value, flagText.value, sample.value))

const insert = async (value: string): Promise<void> => {
  const el = patternEl.value
  const start = el?.selectionStart ?? pattern.value.length
  const end = el?.selectionEnd ?? start
  pattern.value = pattern.value.slice(0, start) + value + pattern.value.slice(end)
  await nextTick()
  el?.focus()
  const pos = start + value.length
  el?.setSelectionRange(pos, pos)
}

const applyExample = (item: { pattern: string; sample: string }): void => {
  pattern.value = item.pattern
  sample.value = item.sample
}
</script>

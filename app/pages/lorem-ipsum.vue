<template>
  <section class="row g-4">
    <div class="col-12 col-xl-4">
      <div class="card tool-card h-100">
        <div class="card-body">
          <h1 class="h4 mb-3">Lorem Ipsum Generator</h1>
          <p class="text-secondary mb-3">
            Genera testo placeholder su richiesta, utile per test UI e contenuti.
          </p>

          <div class="mb-3">
            <label class="form-label">Paragrafi</label>
            <input v-model.number="paragraphs" class="form-control" type="number" min="1" max="20">
          </div>

          <div class="mb-3">
            <label class="form-label">Parole per paragrafo</label>
            <input v-model.number="wordsPerParagraph" class="form-control" type="number" min="5" max="200">
          </div>

          <div class="form-check mb-3">
            <input id="startLorem" v-model="startWithLorem" class="form-check-input" type="checkbox">
            <label class="form-check-label" for="startLorem">Inizia con &quot;Lorem ipsum&quot;</label>
          </div>

          <div class="d-flex flex-wrap gap-2">
            <button class="btn btn-primary" type="button" @click="generateText">Genera</button>
            <button class="btn btn-outline-light" type="button" :disabled="!outputText" @click="copyText">
              {{ copied ? 'Copiato' : 'Copia' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="col-12 col-xl-8">
      <div class="card tool-card h-100">
        <div class="card-body">
          <h2 class="h5 mb-3">Output</h2>
          <pre class="output-pre mb-0">{{ outputText || 'Premi "Genera" per creare il testo.' }}</pre>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do',
  'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua', 'enim',
  'minim', 'veniam', 'quis', 'nostrud', 'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip',
  'commodo', 'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate', 'velit'
]

const paragraphs = ref(3)
const wordsPerParagraph = ref(50)
const startWithLorem = ref(true)
const outputText = ref('')
const copied = ref(false)

const clamp = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value))

const capitalize = (value: string): string => value.charAt(0).toUpperCase() + value.slice(1)

const buildParagraph = (count: number): string => {
  const words: string[] = []
  for (let i = 0; i < count; i += 1) {
    const word = WORDS[Math.floor(Math.random() * WORDS.length)] ?? 'lorem'
    words.push(word)
  }
  return `${capitalize(words.join(' '))}.`
}

const generateText = (): void => {
  copied.value = false
  const pCount = clamp(Math.floor(paragraphs.value || 0), 1, 20)
  const wCount = clamp(Math.floor(wordsPerParagraph.value || 0), 5, 200)

  const list: string[] = []
  for (let p = 0; p < pCount; p += 1) {
    list.push(buildParagraph(wCount))
  }

  if (startWithLorem.value && list.length) {
    const first = list[0]
    if (first) list[0] = first.replace(/^[A-Z][a-z]+ [a-z]+/, 'Lorem ipsum')
  }

  outputText.value = list.join('\n\n')
}

const copyText = async (): Promise<void> => {
  if (!outputText.value) return
  try {
    await navigator.clipboard.writeText(outputText.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 1400)
  } catch {
    copied.value = false
  }
}
</script>


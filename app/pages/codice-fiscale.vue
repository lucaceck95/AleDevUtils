<template>
  <section class="row g-4">
    <div class="col-12 col-xl-7">
      <div class="card tool-card h-100">
        <div class="card-body">
          <h1 class="h4 mb-3">Generazione Codice Fiscale IT</h1>
          <form class="row g-3" @submit.prevent="onGenerate">
            <div class="col-md-6"><label class="form-label">Nome</label><input v-model="form.nome" class="form-control" required></div>
            <div class="col-md-6"><label class="form-label">Cognome</label><input v-model="form.cognome" class="form-control" required></div>
            <div class="col-md-6"><label class="form-label">Data di nascita</label><input v-model="form.dataNascita" class="form-control" type="date" required></div>
            <div class="col-md-6">
              <label class="form-label">Sesso</label>
              <select v-model="form.sesso" class="form-select"><option value="M">Maschio</option><option value="F">Femmina</option></select>
            </div>
            <div class="col-12 position-relative">
              <label class="form-label">Comune di nascita</label>
              <input v-model="comuneQuery" class="form-control" placeholder="Es. Roma" autocomplete="off" @focus="isAutocompleteOpen = true">
              <div v-if="isAutocompleteOpen && filteredComuni.length" class="autocomplete-menu list-group mt-1">
                <button v-for="comune in filteredComuni" :key="comune.codiceCatastale" type="button" class="list-group-item list-group-item-action" @click="selectComune(comune)">
                  {{ comune.label }}
                </button>
              </div>
            </div>
            <div class="col-12 d-flex flex-wrap gap-2">
              <button class="btn btn-primary" type="submit">Genera Codice Fiscale</button>
              <button class="btn btn-outline-light" type="button" @click="onGenerateRandom">Genera random</button>
            </div>
          </form>

          <div v-if="generatedCf" class="mt-3"><label class="form-label">Codice Fiscale generato</label><input :value="generatedCf" class="form-control" readonly></div>
          <p v-if="generateMessage" class="mt-2 mb-0 text-danger">{{ generateMessage }}</p>
        </div>
      </div>
    </div>

    <div class="col-12 col-xl-5">
      <div class="card tool-card h-100">
        <div class="card-body">
          <h2 class="h4 mb-3">Verifica Codice Fiscale</h2>
          <div class="mb-3"><label class="form-label">Codice Fiscale</label><input v-model="cfToValidate" class="form-control" placeholder="RSSMRA85M01H501Z"></div>
          <button class="btn btn-outline-info" @click="onValidate">Verifica</button>
          <p v-if="validateMessage" class="mt-3 mb-0" :class="isValid ? 'text-success' : 'text-danger'">{{ validateMessage }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useCodiceFiscale } from '~/composables/useCodiceFiscale'
import { COMUNI, type ComuneItem } from '~/data/comuni'

const { generateCodiceFiscale, validateCodiceFiscale } = useCodiceFiscale()

const form = reactive({ nome: '', cognome: '', dataNascita: '', sesso: 'M' as 'M' | 'F' })
const comuneQuery = ref('')
const selectedComune = ref<ComuneItem | null>(null)
const isAutocompleteOpen = ref(false)
const generatedCf = ref('')
const generateMessage = ref('')
const cfToValidate = ref('')
const validateMessage = ref('')
const isValid = ref(false)
const isSelectingComune = ref(false)

const filteredComuni = computed(() => {
  const query = comuneQuery.value.trim().toLowerCase()
  if (query.length < 2) return []
  return COMUNI.filter((item) => item.nome.toLowerCase().includes(query)).slice(0, 20)
})

const selectComune = (comune: ComuneItem): void => {
  isSelectingComune.value = true
  selectedComune.value = comune
  comuneQuery.value = comune.label
  isAutocompleteOpen.value = false
  queueMicrotask(() => {
    isSelectingComune.value = false
  })
}

const onGenerate = (): void => {
  if (!selectedComune.value) {
    generateMessage.value = 'Seleziona un comune valido dalla lista autocomplete.'
    return
  }
  generatedCf.value = generateCodiceFiscale({ ...form, comune: selectedComune.value })
  generateMessage.value = ''
}

const onGenerateRandom = (): void => {
  const firstNames: { nome: string; sesso: 'M' | 'F' }[] = [
    { nome: 'Luca', sesso: 'M' },
    { nome: 'Marco', sesso: 'M' },
    { nome: 'Matteo', sesso: 'M' },
    { nome: 'Davide', sesso: 'M' },
    { nome: 'Alessandro', sesso: 'M' },
    { nome: 'Francesco', sesso: 'M' },
    { nome: 'Andrea', sesso: 'M' },
    { nome: 'Simone', sesso: 'M' },
    { nome: 'Giulia', sesso: 'F' },
    { nome: 'Sofia', sesso: 'F' },
    { nome: 'Francesca', sesso: 'F' },
    { nome: 'Chiara', sesso: 'F' },
    { nome: 'Martina', sesso: 'F' },
    { nome: 'Elena', sesso: 'F' },
    { nome: 'Sara', sesso: 'F' },
    { nome: 'Valentina', sesso: 'F' },
    { nome: 'Gabriele', sesso: 'M' },
    { nome: 'Emanuele', sesso: 'M' },
    { nome: 'Nicolo', sesso: 'M' },
    { nome: 'Tommaso', sesso: 'M' },
    { nome: 'Federico', sesso: 'M' },
    { nome: 'Stefano', sesso: 'M' },
    { nome: 'Paolo', sesso: 'M' },
    { nome: 'Michele', sesso: 'M' },
    { nome: 'Laura', sesso: 'F' },
    { nome: 'Alessia', sesso: 'F' },
    { nome: 'Federica', sesso: 'F' },
    { nome: 'Ilaria', sesso: 'F' },
    { nome: 'Silvia', sesso: 'F' },
    { nome: 'Noemi', sesso: 'F' },
    { nome: 'Beatrice', sesso: 'F' },
    { nome: 'Camilla', sesso: 'F' }
  ]
  const lastNames = [
    'Rossi', 'Bianchi', 'Romano', 'Conti', 'Esposito', 'Gallo', 'Moretti', 'Fontana',
    'Ricci', 'Marino', 'Greco', 'Bruno', 'Galli', 'Costa', 'Mancini', 'Lombardi',
    'Ferrari', 'Caruso', 'Colombo', 'Santoro', 'Rinaldi', 'Leone', 'Longo', 'Gentile',
    'Vitale', 'De Luca', 'Pellegrini', 'Rizzi', 'Ferri', 'Barbieri', 'Sanna', 'Serra'
  ]
  const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)] ?? { nome: 'Mario', sesso: 'M' as const }
  const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)] ?? 'Rossi'
  const randomComune = COMUNI[Math.floor(Math.random() * COMUNI.length)]
  const year = 1970 + Math.floor(Math.random() * 40)
  const month = 1 + Math.floor(Math.random() * 12)
  const day = 1 + Math.floor(Math.random() * 28)
  const birthDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`

  form.nome = randomFirstName.nome
  form.cognome = randomLastName
  form.dataNascita = birthDate
  form.sesso = randomFirstName.sesso

  if (!randomComune) {
    generateMessage.value = 'Nessun comune disponibile per la generazione random.'
    return
  }

  selectComune(randomComune)
  generatedCf.value = generateCodiceFiscale({ ...form, comune: randomComune })
  generateMessage.value = ''
}

const onValidate = (): void => {
  const result = validateCodiceFiscale(cfToValidate.value)
  isValid.value = result.valid
  validateMessage.value = result.valid ? 'Codice Fiscale valido.' : result.reason ?? 'Codice Fiscale non valido.'
}

watch(comuneQuery, () => {
  if (isSelectingComune.value) return
  selectedComune.value = null
})
</script>
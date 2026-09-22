<template>
  <section class="row g-4">
    <div class="col-12">
      <div class="card tool-card">
        <div class="card-body">
          <h1 class="h4 mb-3">Generatore Dati Fatturazione</h1>
          <p class="text-secondary mb-3">
            Genera due oggetti coerenti: <span class="fw-semibold">cliente</span> e <span
              class="fw-semibold">spedizione</span>.
            Nessun dato viene generato all&apos;apertura.
          </p>

          <div class="mb-3">
            <label class="form-label">Tipo soggetto</label>
            <select v-model="azienda" class="form-select">
              <option :value="true">Azienda</option>
              <option :value="false">Persona</option>
            </select>
          </div>

          <div class="d-flex flex-wrap gap-2 mt-2">
            <button class="btn btn-primary" :disabled="isGenerating" type="button" @click="onGenerate">
              {{ isGenerating ? 'Generazione...' : 'Genera random' }}
            </button>
            <button class="btn btn-outline-light" :disabled="isGenerating" type="button" @click="onReset">
              Reset
            </button>
            <div class="ms-auto">
              <button class="btn" :class="{ 'btn-light text-dark': showJson, 'btn-outline-light': !showJson }" type="button" @click="showJson = !showJson">
                {{ showJson ? 'Nascondi JSON' : 'Mostra JSON' }}
              </button>
            </div>
          </div>

          <p v-if="!generated" class="mt-3 mb-0 text-info-emphasis">
            Premi <span class="fw-semibold">Genera random</span> per vedere gli oggetti.
          </p>
        </div>
      </div>
    </div>

    <div class="col-12">
      <div v-if="generated" class="vstack gap-4">
        <div class="card tool-card">
          <div class="card-body">
            <div class="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
              <h2 class="h5 mb-0">Cliente (FatturazioneCliente)</h2>
            </div>

            <div class="row g-3">
              <div class="col-12 col-md-6">
                <label class="form-label">Nome</label>
                <input v-model="clienteForm.Nome" class="form-control" type="text">
              </div>
              <div class="col-12 col-md-6">
                <label class="form-label">Cognome</label>
                <input v-model="clienteForm.Cognome" class="form-control" type="text">
              </div>
              <div class="col-12 col-md-6">
                <label class="form-label">Ragione Sociale</label>
                <input v-model="clienteForm.RagioneSociale" class="form-control" type="text">
              </div>
              <div class="col-12 col-md-6">
                <label class="form-label">Azienda</label>
                <div class="form-check mt-2">
                  <input v-model="clienteForm.Azienda" class="form-check-input" type="checkbox" id="aziendaCheck">
                  <label class="form-check-label" for="aziendaCheck">{{ clienteForm.Azienda ? 'Sì' : 'No' }}</label>
                </div>
              </div>
              <div class="col-12 col-md-6">
                <label class="form-label">Codice Fiscale</label>
                <input v-model="clienteForm.CodiceFiscale" class="form-control" type="text">
              </div>
              <div class="col-12 col-md-6">
                <label class="form-label">Partita IVA</label>
                <input v-model="clienteForm.PartitaIva" class="form-control" type="text">
              </div>
              <div class="col-12">
                <label class="form-label">Indirizzo</label>
                <input v-model="clienteForm.Indirizzo" class="form-control" type="text">
              </div>
              <div class="col-6 col-md-3">
                <label class="form-label">CAP</label>
                <input v-model="clienteForm.Cap" class="form-control" type="text">
              </div>
              <div class="col-6 col-md-5">
                <label class="form-label">Città</label>
                <input v-model="clienteForm.Citta" class="form-control" type="text">
              </div>
              <div class="col-6 col-md-4">
                <label class="form-label">Provincia</label>
                <input v-model="clienteForm.Provincia" class="form-control" type="text">
              </div>
              <div class="col-12 col-md-6">
                <label class="form-label">Nazione</label>
                <input v-model="clienteForm.Nazione" class="form-control" type="text">
              </div>
              <div class="col-12 col-md-6">
                <label class="form-label">Codice SDI</label>
                <input v-model="clienteForm.CodiceSdi" class="form-control" type="text">
              </div>
              <div class="col-12">
                <label class="form-label">PEC SDI</label>
                <input v-model="clienteForm.PecSdi" class="form-control" type="text">
              </div>
            </div>
          </div>
        </div>

        <div class="card tool-card">
          <div class="card-body">
            <h2 class="h5 mb-3">Spedizione (FatturazioneSpedizione)</h2>

            <div class="row g-3">
              <div class="col-12 col-md-6">
                <label class="form-label">Intestatario</label>
                <input v-model="spedizioneForm.Intestatario" class="form-control" type="text">
              </div>
              <div class="col-12 col-md-6">
                <label class="form-label">Telefono</label>
                <input v-model="spedizioneForm.Telefono" class="form-control" type="text">
              </div>
              <div class="col-12 col-md-12">
                <label class="form-label">Email</label>
                <input v-model="spedizioneForm.Email" class="form-control" type="text">
              </div>
              <div class="col-12">
                <label class="form-label">Indirizzo</label>
                <input v-model="spedizioneForm.Indirizzo" class="form-control" type="text">
              </div>
              <div class="col-6 col-md-3">
                <label class="form-label">CAP</label>
                <input v-model="spedizioneForm.Cap" class="form-control" type="text">
              </div>
              <div class="col-6 col-md-5">
                <label class="form-label">Città</label>
                <input v-model="spedizioneForm.Citta" class="form-control" type="text">
              </div>
              <div class="col-6 col-md-4">
                <label class="form-label">Provincia</label>
                <input v-model="spedizioneForm.Provincia" class="form-control" type="text">
              </div>
              <div class="col-12">
                <label class="form-label">Nazione</label>
                <input v-model="spedizioneForm.Nazione" class="form-control" type="text">
              </div>
            </div>
          </div>
        </div>

        <div v-if="showJson" class="card tool-card">
          <div class="card-body">
            <h2 class="h5 mb-3">JSON risultante</h2>
            <div class="row g-3">
              <div class="col-12 col-md-6">
                <div class="text-info-emphasis mb-2">cliente</div>
                <pre class="output-pre mb-0">{{ clienteJson }}</pre>
              </div>
              <div class="col-12 col-md-6">
                <div class="text-info-emphasis mb-2">spedizione</div>
                <pre class="output-pre mb-0">{{ spedizioneJson }}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-secondary">Nessun dato generato.</div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useFatturazioneGenerator, type FatturazioneCliente, type FatturazioneSpedizione } from '~/composables/useFatturazioneGenerator'

const { generate } = useFatturazioneGenerator()

const azienda = ref(true)
const isGenerating = ref(false)

const emptyCliente: FatturazioneCliente = {
  Nome: '',
  Cognome: '',
  RagioneSociale: '',
  CodiceFiscale: '',
  PartitaIva: '',
  Indirizzo: '',
  Cap: '',
  Citta: '',
  Provincia: '',
  Nazione: 'IT',
  CodiceSdi: '',
  PecSdi: '',
  Azienda: true
}

const emptySpedizione: FatturazioneSpedizione = {
  Intestatario: '',
  Indirizzo: '',
  Cap: '',
  Citta: '',
  Provincia: '',
  Nazione: 'IT',
  Telefono: '',
  Email: ''
}

const clienteForm = ref<FatturazioneCliente>({ ...emptyCliente })
const spedizioneForm = ref<FatturazioneSpedizione>({ ...emptySpedizione })

const showJson = ref(false)

const clienteJson = computed(() => JSON.stringify(clienteForm.value, null, 2))
const spedizioneJson = computed(() => JSON.stringify(spedizioneForm.value, null, 2))

const generated = computed(() => Boolean(clienteForm.value.CodiceFiscale && spedizioneForm.value.Intestatario))

watch(
  () => clienteForm.value.Azienda,
  (value) => {
    azienda.value = value
  }
)

const onReset = (): void => {
  clienteForm.value = { ...emptyCliente, Azienda: azienda.value }
  spedizioneForm.value = { ...emptySpedizione }
}

const onGenerate = (): void => {
  isGenerating.value = true
  const res = generate(azienda.value)
  clienteForm.value = res.cliente
  spedizioneForm.value = res.spedizione
  isGenerating.value = false
}
</script>

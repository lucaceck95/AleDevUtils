<template>
  <section class="row g-4">
    <div class="col-12 col-xl-6">
      <div class="card tool-card h-100">
        <div class="card-body">
          <h1 class="h4 mb-3">Generazione Partita IVA</h1>
          <div class="mb-3">
            <label class="form-label">Nazione</label>
            <select v-model="selectedCountry" class="form-select">
              <option v-for="country in countries" :key="country.code" :value="country.code">
                {{ country.code }} - {{ country.name }}
              </option>
            </select>
          </div>
          <button class="btn btn-primary mb-3" @click="onGenerate">Genera Partita IVA</button>

          <div class="mb-3">
            <label class="form-label">Partita IVA generata</label>
            <input :value="generatedVat" class="form-control" :placeholder="placeholderText" readonly>
          </div>
        </div>
      </div>
    </div>

    <div class="col-12 col-xl-6">
      <div class="card tool-card h-100">
        <div class="card-body">
          <h2 class="h4 mb-3">Validazione Partita IVA</h2>
          <div class="mb-3">
            <label class="form-label">Partita IVA da validare</label>
            <input v-model="vatToValidate" class="form-control" placeholder="Es. 12345678901 oppure DE123456789">
          </div>
          <button class="btn btn-outline-info mb-3" @click="onValidate">Verifica</button>

          <p v-if="detectedCountryLabel" class="mb-2 text-info">
            Nazione rilevata: {{ detectedCountryLabel }}
          </p>
          <p v-if="message" class="mb-0" :class="isValid ? 'text-success' : 'text-danger'">{{ message }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { usePartitaIva, type VatCountryCode } from '~/composables/usePartitaIva'

const { countries, detectVatCountry, generatePartitaIva, validatePartitaIva } = usePartitaIva()

const selectedCountry = ref<VatCountryCode>('IT')
const generatedVat = ref('')
const vatToValidate = ref('')
const message = ref('')
const isValid = ref(false)
const detectedCountryLabel = ref('')

const placeholderText = computed(() => {
  const country = countries.find((item) => item.code === selectedCountry.value)
  return country?.example ?? 'Inserisci Partita IVA'
})

const onGenerate = (): void => {
  generatedVat.value = generatePartitaIva(selectedCountry.value)
  message.value = ''
}

const onValidate = (): void => {
  detectedCountryLabel.value = ''
  const detectedCountry = detectVatCountry(vatToValidate.value)
  if (!detectedCountry) {
    isValid.value = false
    message.value = 'Impossibile rilevare la nazione dalla Partita IVA inserita.'
    return
  }

  const countryInfo = countries.find((country) => country.code === detectedCountry)
  detectedCountryLabel.value = countryInfo ? `${countryInfo.code} - ${countryInfo.name}` : detectedCountry

  const result = validatePartitaIva(vatToValidate.value, detectedCountry)
  isValid.value = result.valid
  if (result.valid && result.strict) {
    message.value = 'Partita IVA valida con controllo checksum.'
    return
  }
  if (result.valid) {
    message.value = result.reason ?? 'Partita IVA formalmente valida.'
    return
  }
  message.value = result.reason ?? 'Partita IVA non valida.'
}

watch(selectedCountry, () => {
  generatedVat.value = ''
  message.value = ''
})
</script>

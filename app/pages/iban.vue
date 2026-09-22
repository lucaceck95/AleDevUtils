<template>
  <section class="row g-4">
    <div class="col-12 col-lg-6">
      <div class="card tool-card h-100">
        <div class="card-body">
          <h1 class="h4 mb-3">Generazione IBAN</h1>
          <div class="mb-3">
            <label class="form-label">Stato</label>
            <select v-model="selectedCountry" class="form-select">
              <option v-for="country in supportedCountries" :key="country" :value="country">{{ country }}</option>
            </select>
          </div>
          <button class="btn btn-primary" @click="onGenerate">Genera IBAN</button>
          <div v-if="generatedIban" class="mt-3">
            <label class="form-label">IBAN generato</label>
            <input :value="generatedIban" class="form-control" readonly>
          </div>
        </div>
      </div>
    </div>

    <div class="col-12 col-lg-6">
      <div class="card tool-card h-100">
        <div class="card-body">
          <h2 class="h4 mb-3">Verifica IBAN</h2>
          <div class="mb-3">
            <label class="form-label">Inserisci IBAN</label>
            <input v-model="ibanToVerify" class="form-control" placeholder="IT60X0542811101000000123456">
          </div>
          <button class="btn btn-outline-info" @click="onValidate">Verifica</button>
          <p v-if="validationMessage" class="mt-3 mb-0" :class="isValid ? 'text-success' : 'text-danger'">{{ validationMessage }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useIban } from '~/composables/useIban'

const { supportedCountries, generateIban, validateIban } = useIban()

const selectedCountry = ref('IT')
const generatedIban = ref('')
const ibanToVerify = ref('')
const validationMessage = ref('')
const isValid = ref(false)

const onGenerate = (): void => {
  generatedIban.value = generateIban(selectedCountry.value)
}

const onValidate = (): void => {
  const result = validateIban(ibanToVerify.value)
  isValid.value = result.valid
  validationMessage.value = result.valid ? 'IBAN valido.' : result.reason ?? 'IBAN non valido.'
}
</script>
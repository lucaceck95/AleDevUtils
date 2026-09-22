<template>
  <section class="row g-4">
    <div class="col-12 col-xl-6">
      <div class="card tool-card h-100">
        <div class="card-body">
          <h1 class="h4 mb-2">Unix time</h1>
          <p class="text-secondary mb-3">10 cifre = secondi, 13 = millisecondi. Le date sono in Europe/Rome.</p>
          <label class="form-label">Timestamp</label>
          <input v-model="raw" class="form-control tool-mono mb-3" type="text" inputmode="numeric" spellcheck="false">
          <p class="text-info-emphasis">{{ unitLabel }}</p>
          <button class="btn btn-primary" type="button" @click="useNow">Adesso</button>
        </div>
      </div>
    </div>
    <div class="col-12 col-xl-6">
      <div class="card tool-card h-100">
        <div class="card-body">
          <h2 class="h5 mb-3">Data</h2>
          <p v-if="error" class="text-danger">{{ error }}</p>
          <template v-else-if="instant">
            <p class="mb-1">Roma</p>
            <pre class="output-pre mb-3">{{ romeLabel }}</pre>
            <p class="mb-1">UTC</p>
            <pre class="output-pre mb-3">{{ utcLabel }}</pre>
            <p class="mb-1">ISO</p>
            <pre class="output-pre mb-3">{{ instant.toISOString() }}</pre>
          </template>
          <p v-else class="text-secondary">Inserisci un numero.</p>
          <div class="row g-2 mb-3">
            <div class="col-7">
              <label class="form-label">Data Roma</label>
              <input v-model="wallDate" class="form-control" type="date">
            </div>
            <div class="col-5">
              <label class="form-label">Ora</label>
              <input v-model="wallTime" class="form-control" type="time" step="1">
            </div>
          </div>
          <button class="btn btn-outline-light" type="button" @click="fromWall">Da questa data</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { romeDateTimeFormat, romeWallToDate, utcDateTimeFormat } from '~/utils/romeTime'

const raw = ref('')
const wallDate = ref('')
const wallTime = ref('00:00:00')

const parsed = computed(() => {
  const text = raw.value.trim()
  if (!text) return { date: null, unit: '', error: '' }
  if (!/^-?\d+$/.test(text)) return { date: null, unit: '', error: 'Solo cifre.' }
  const value = Number(text)
  if (!Number.isSafeInteger(value)) return { date: null, unit: '', error: 'Numero troppo grande.' }
  const ms = Math.abs(value) >= 1e12 ? value : value * 1000
  const date = new Date(ms)
  if (Number.isNaN(date.getTime())) return { date: null, unit: '', error: 'Data non valida.' }
  return { date, unit: Math.abs(value) >= 1e12 ? 'millisecondi' : 'secondi', error: '' }
})

const instant = computed(() => parsed.value.date)
const error = computed(() => parsed.value.error)
const unitLabel = computed(() => parsed.value.unit ? `Letto come ${parsed.value.unit}.` : 'In attesa di un timestamp.')
const romeLabel = computed(() => instant.value ? romeDateTimeFormat(instant.value) : '')
const utcLabel = computed(() => instant.value ? utcDateTimeFormat(instant.value) : '')

const useNow = (): void => {
  raw.value = String(Math.floor(Date.now() / 1000))
}

const fromWall = (): void => {
  if (!wallDate.value) return
  const [year, month, day] = wallDate.value.split('-').map(Number)
  const [hour, minute, second] = `${wallTime.value || '00:00:00'}`.split(':').map(Number)
  if (!year || !month || !day) return
  const date = romeWallToDate(year, month, day, hour || 0, minute || 0)
  const withSeconds = new Date(date.getTime() + (second || 0) * 1000)
  raw.value = String(Math.floor(withSeconds.getTime() / 1000))
}

useNow()
</script>

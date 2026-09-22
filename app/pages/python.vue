<template>
  <section class="row g-4">
    <div class="col-12">
      <div class="card tool-card h-100">
        <div class="card-body">
          <h1 class="h4 mb-3">Python (cartella `app/py`)</h1>
          <p class="text-secondary mb-3">
            Esegui solo gli script abilitati in `app/py/scripts.ts`. Nessun codice viene eseguito all&apos;apertura.
            Su GitHub Pages gli script non partono: serve il server locale (`npm run dev`).
          </p>

          <div v-if="scripts.length" class="row g-3">
            <div
              v-for="s in scripts"
              :key="s.filename"
              class="col-12 col-md-6"
            >
              <button
                type="button"
                class="card tool-card script-card text-start  w-100"
                :disabled="isRunning"
                @click="runScript(s.filename)"
              >
                <div class="card-body">
                  <div class="d-flex justify-content-between align-items-start gap-2">
                    <div class="fw-semibold">{{ s.title }}</div>
                    <span class="badge text-bg-info">Esegui</span>
                  </div>
                  <div class="small text-secondary mt-2">{{ s.description }}</div>
                </div>
              </button>
            </div>
          </div>

          <div v-else class="text-secondary">Nessuno script trovato.</div>

          <div v-if="isRunning" class="mt-3 text-info-emphasis">Esecuzione...</div>
        </div>
      </div>
    </div>

    <div class="col-12">
      <div class="card tool-card h-100">
        <div class="card-body">
          <h2 class="h4 mb-3">Output</h2>

          <div class="mb-3">
            <div class="text-info-emphasis mb-1">Stdout</div>
            <pre class="output-pre mb-0">{{ stdout || '—' }}</pre>
          </div>

          <div class="mb-2">
            <div class="text-info-emphasis mb-1">Stderr</div>
            <pre class="output-pre mb-0">{{ stderr || '—' }}</pre>
          </div>

          <p v-if="runError" class="mt-3 mb-0 text-danger">
            {{ runError }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
type ScriptItem = { filename: string; title: string; description: string }

const scripts = ref<ScriptItem[]>([])
const stdout = ref('')
const stderr = ref('')
const runError = ref('')
const isRunning = ref(false)

type ScriptsResponse = { scripts: ScriptItem[] }
type ExecResponse = { stdout: string; stderr: string; exitCode: number }

const loadScripts = async (): Promise<void> => {
  try {
    const res = await $fetch<ScriptsResponse>('/api/python-scripts')
    scripts.value = res.scripts ?? []
  } catch (err) {
    // Se fallisce la lista, mostriamo la UI vuota + errore in output
    runError.value = err instanceof Error ? err.message : 'Impossibile caricare la lista script.'
  }
}

onMounted(() => {
  loadScripts()
})

const runScript = async (script: string): Promise<void> => {
  if (!script) return

  isRunning.value = true
  stdout.value = ''
  stderr.value = ''
  runError.value = ''

  try {
    const res = await $fetch<ExecResponse>('/api/python-exec', {
      method: 'POST',
      body: { script }
    })
    stdout.value = res.stdout ?? ''
    stderr.value = res.stderr ?? ''
  } catch (err) {
    runError.value = err instanceof Error ? err.message : 'Errore durante l\'esecuzione.'
  } finally {
    isRunning.value = false
  }
}
</script>


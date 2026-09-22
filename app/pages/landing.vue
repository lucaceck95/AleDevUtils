<template>
  <div class="lp">

    <!-- ══════ NAVBAR ══════ -->
    <nav class="lp-nav">
      <div class="lp-container d-flex align-items-center justify-content-between">
        <div class="lp-logo">
          <span class="logo-spark">⚡</span>
          <span>Syntra</span>
        </div>
        <ul class="nav-links d-none d-lg-flex list-unstyled mb-0 gap-4 align-items-center">
          <li><a href="#features">Funzionalità</a></li>
          <li><a href="#how">Come funziona</a></li>
          <li><a href="#pricing">Prezzi</a></li>
          <li><a href="#faq">FAQ</a></li>
        </ul>
        <div class="d-flex gap-2 align-items-center">
          <a href="#" class="nav-signin d-none d-md-inline">Accedi</a>
          <a href="#pricing" class="btn-nav-cta">Prova gratis</a>
        </div>
      </div>
    </nav>

    <!-- ══════ HERO ══════ -->
    <section class="hero-section">
      <div class="glow glow-left" aria-hidden="true"></div>
      <div class="glow glow-right" aria-hidden="true"></div>

      <div class="lp-container">
        <div class="row align-items-center hero-row">

          <!-- TEXT -->
          <div class="col-lg-6">
            <div class="hero-badge">
              <span class="pulse-dot"></span>
              Nuovo: Integrazioni Slack · Notion · 50+ app
            </div>
            <h1 class="hero-h1 mt-4">
              Il tuo team lavora di più.<br>
              <span class="grad-text">Syntra lo fa lavorare meglio.</span>
            </h1>
            <p class="hero-sub mt-4">
              Automatizza i flussi ripetitivi, sincronizza tutti i tuoi tool e ottieni insight in tempo reale sulla produttività del team — tutto con l'AI, senza una riga di codice.
            </p>
            <div class="d-flex flex-wrap gap-3 mt-5">
              <a href="#pricing" class="btn-hero-primary">
                Inizia gratis — 14 giorni
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
              <a href="#" class="btn-hero-ghost">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                Guarda la demo
              </a>
            </div>
            <div class="hero-proof mt-5">
              <div class="avatar-stack">
                <div v-for="av in avatarList" :key="av.letter" class="av-circle" :style="`background: hsl(${av.hue},60%,46%)`">
                  {{ av.letter }}
                </div>
              </div>
              <span class="proof-text">
                <strong>12.000+</strong> team in 50 paesi &nbsp;·&nbsp;
                <span class="proof-stars">★★★★★ 4.9</span>
              </span>
            </div>
          </div>

          <!-- MOCKUP -->
          <div class="col-lg-6 d-none d-lg-block">
            <div class="mockup-wrap">
              <!-- Browser frame -->
              <div class="browser-frame">
                <div class="browser-chrome">
                  <div class="b-dots">
                    <span class="bd bd-r"></span>
                    <span class="bd bd-y"></span>
                    <span class="bd bd-g"></span>
                  </div>
                  <div class="b-url">syntra.io/dashboard</div>
                </div>
                <!-- Dashboard body -->
                <div class="dash-body">
                  <aside class="dash-side">
                    <div class="ds-logo"></div>
                    <div v-for="n in 5" :key="n" class="ds-item" :class="{ 'ds-active': n === 1 }"></div>
                    <div class="ds-gap"></div>
                    <div class="ds-av"></div>
                  </aside>
                  <div class="dash-main">
                    <div class="dm-topbar">
                      <div class="dm-title"></div>
                      <div class="d-flex gap-2">
                        <div class="dm-btn"></div>
                        <div class="dm-btn dm-btn-accent"></div>
                      </div>
                    </div>
                    <!-- KPIs -->
                    <div class="kpi-row">
                      <div v-for="k in kpis" :key="k.label" class="kpi-card">
                        <div class="kpi-lbl">{{ k.label }}</div>
                        <div class="kpi-val" :style="`color:${k.color}!important`">{{ k.val }}</div>
                        <div class="kpi-trend trend-up">{{ k.trend }}</div>
                      </div>
                    </div>
                    <!-- Chart -->
                    <div class="chart-box">
                      <div class="chart-title-mock"></div>
                      <div class="bars-wrap">
                        <div
                          v-for="(h, i) in barHeights"
                          :key="i"
                          class="bar-item"
                          :style="`height:${h}%; animation-delay:${i * 70}ms`"
                        ></div>
                      </div>
                    </div>
                    <!-- Tasks -->
                    <div class="tasks-box">
                      <div v-for="t in mockTasks" :key="t.status" class="task-row">
                        <div class="t-dot" :style="`background:${t.color}`"></div>
                        <div class="t-bar"></div>
                        <div class="t-chip" :style="`background:${t.color}28;color:${t.color}!important`">{{ t.status }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Floating badges -->
              <div class="float-badge fb-top">
                <span class="fb-icon">⚡</span>
                <div>
                  <div class="fb-title">Automazione attivata</div>
                  <div class="fb-sub">Invoice → Notion → Slack</div>
                </div>
              </div>
              <div class="float-badge fb-bot">
                <div class="fb-big">+38%</div>
                <div class="fb-sub">Produttività mensile</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════ TRUSTED BY ══════ -->
    <section class="trusted-section">
      <div class="lp-container text-center">
        <p class="trusted-label">Scelto dai team più veloci d'Italia e d'Europa</p>
        <div class="logo-strip">
          <span v-for="logo in trustedLogos" :key="logo" class="fake-logo">{{ logo }}</span>
        </div>
      </div>
    </section>

    <!-- ══════ FEATURES ══════ -->
    <section id="features" class="lp-section">
      <div class="lp-container">
        <div class="text-center mb-5 pb-2">
          <div class="sec-pill">Funzionalità</div>
          <h2 class="sec-h2 mt-3">Tutto ciò di cui hai bisogno.<br><span class="grad-text">Niente di superfluo.</span></h2>
          <p class="sec-sub mt-3">Syntra si adatta al tuo stack esistente e sostituisce il caos di tool frammentati con un'unica piattaforma intelligente.</p>
        </div>
        <div class="row g-4">
          <div v-for="f in features" :key="f.title" class="col-12 col-md-6 col-lg-4">
            <div class="feat-card h-100">
              <div class="feat-icon-box" :style="`background:${f.color}1a`">
                <i :class="`bi ${f.icon}`" :style="`color:${f.color}!important;font-size:1.4rem`"></i>
              </div>
              <h3 class="feat-title mt-3">{{ f.title }}</h3>
              <p class="feat-body">{{ f.body }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════ HOW IT WORKS ══════ -->
    <section id="how" class="lp-section lp-alt">
      <div class="lp-container">
        <div class="text-center mb-5 pb-2">
          <div class="sec-pill">Come funziona</div>
          <h2 class="sec-h2 mt-3">Operativo in <span class="grad-text">meno di 5 minuti</span></h2>
          <p class="sec-sub mt-3">Nessun codice, nessuna configurazione complessa. Solo risultati immediati.</p>
        </div>
        <div class="steps-grid">
          <div v-for="(step, i) in steps" :key="i" class="step-card">
            <div class="step-num">0{{ i + 1 }}</div>
            <h3 class="step-title mt-3">{{ step.title }}</h3>
            <p class="step-body">{{ step.body }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════ STATS ══════ -->
    <section class="stats-section">
      <div class="lp-container">
        <div class="row g-4 text-center">
          <div v-for="s in stats" :key="s.label" class="col-6 col-lg-3">
            <div class="stat-val grad-text">{{ s.val }}</div>
            <div class="stat-lbl">{{ s.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════ PRICING ══════ -->
    <section id="pricing" class="lp-section">
      <div class="lp-container">
        <div class="text-center mb-5 pb-2">
          <div class="sec-pill">Prezzi</div>
          <h2 class="sec-h2 mt-3">Parti gratis. <span class="grad-text">Scala senza sorprese.</span></h2>
          <p class="sec-sub mt-3">Nessun costo nascosto. Cancella in qualsiasi momento.</p>
          <!-- Toggle mensile/annuale -->
          <div class="billing-toggle mt-4">
            <span class="toggle-lbl" :class="{ 'tlbl-on': !isAnnual }">Mensile</span>
            <button
              class="toggle-track"
              :class="{ 'track-on': isAnnual }"
              @click="isAnnual = !isAnnual"
              :aria-pressed="isAnnual"
              aria-label="Cambia frequenza di fatturazione"
            >
              <span class="toggle-thumb"></span>
            </button>
            <span class="toggle-lbl" :class="{ 'tlbl-on': isAnnual }">
              Annuale
              <span class="save-chip">-34%</span>
            </span>
          </div>
        </div>

        <div class="row g-4 justify-content-center">
          <div v-for="plan in plans" :key="plan.name" class="col-12 col-md-8 col-lg-4">
            <div class="plan-card" :class="{ 'plan-featured': plan.featured }">
              <div v-if="plan.featured" class="plan-badge">✦ Più scelto</div>
              <div class="plan-name">{{ plan.name }}</div>
              <div class="plan-price-row">
                <span v-if="plan.price !== 'Custom'" class="p-curr">€</span>
                <span class="p-num">{{ plan.price }}</span>
                <span v-if="plan.price !== 'Custom'" class="p-per">/mese</span>
              </div>
              <p class="plan-desc">{{ plan.desc }}</p>
              <a href="#" class="plan-cta" :class="plan.featured ? 'plan-cta-fill' : 'plan-cta-outline'">
                {{ plan.cta }}
              </a>
              <ul class="plan-list">
                <li v-for="f in plan.features" :key="f">
                  <span class="plan-check">✓</span> {{ f }}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p class="text-center mt-5 guarantee-note">
          🛡️ Garanzia soddisfatti o rimborsati 30 giorni &nbsp;·&nbsp; Nessuna carta per il piano Free
        </p>
      </div>
    </section>

    <!-- ══════ TESTIMONIALS ══════ -->
    <section class="lp-section lp-alt">
      <div class="lp-container">
        <div class="text-center mb-5 pb-2">
          <div class="sec-pill">Testimonianze</div>
          <h2 class="sec-h2 mt-3">Cosa dicono i nostri <span class="grad-text">clienti</span></h2>
        </div>
        <div class="row g-4">
          <div v-for="t in testimonials" :key="t.name" class="col-12 col-md-4">
            <div class="testi-card d-flex flex-column h-100">
              <div class="testi-stars">★★★★★</div>
              <p class="testi-quote mt-3">"{{ t.quote }}"</p>
              <div class="d-flex align-items-center gap-3 mt-auto pt-4">
                <div class="testi-av" :style="`background:linear-gradient(135deg,${t.c1},${t.c2})`">
                  {{ t.name.charAt(0) }}
                </div>
                <div>
                  <div class="testi-name">{{ t.name }}</div>
                  <div class="testi-role">{{ t.role }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════ FAQ ══════ -->
    <section id="faq" class="lp-section">
      <div class="faq-wrap">
        <div class="text-center mb-5 pb-2">
          <div class="sec-pill">FAQ</div>
          <h2 class="sec-h2 mt-3">Domande <span class="grad-text">frequenti</span></h2>
        </div>
        <div class="faq-list">
          <div v-for="(faq, i) in faqs" :key="i" class="faq-item" :class="{ 'faq-open': openFaq === i }">
            <button class="faq-q" @click="toggleFaq(i)">
              <span>{{ faq.q }}</span>
              <span class="faq-ico">{{ openFaq === i ? '−' : '+' }}</span>
            </button>
            <div v-show="openFaq === i" class="faq-a">{{ faq.a }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════ FINAL CTA ══════ -->
    <section class="cta-final">
      <div class="cta-final-glow" aria-hidden="true"></div>
      <div class="lp-container text-center" style="position:relative;z-index:1">
        <h2 class="cta-h2">Pronto a trasformare il modo di lavorare del tuo team?</h2>
        <p class="cta-sub mt-3">Inizia con il piano Free. Nessuna carta di credito richiesta.</p>
        <div class="d-flex flex-wrap gap-3 justify-content-center mt-5">
          <a href="#" class="btn-hero-primary">
            Inizia gratis ora
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
          <a href="#" class="btn-hero-ghost">Parla con un esperto</a>
        </div>
        <div class="cta-reassure mt-4">
          <span>✓ 14 giorni di trial Pro</span>
          <span>✓ Setup in 5 minuti</span>
          <span>✓ Cancella quando vuoi</span>
        </div>
      </div>
    </section>

    <!-- ══════ FOOTER ══════ -->
    <footer class="lp-footer">
      <div class="lp-container">
        <div class="row g-5 mb-5">
          <div class="col-12 col-lg-4">
            <div class="lp-logo mb-3">
              <span class="logo-spark">⚡</span><span>Syntra</span>
            </div>
            <p class="footer-tagline">Il tuo copilota AI per flussi di lavoro più smart e team più produttivi.</p>
            <div class="social-row mt-4">
              <a href="#" class="soc-link" aria-label="Twitter/X">𝕏</a>
              <a href="#" class="soc-link" aria-label="LinkedIn">in</a>
              <a href="#" class="soc-link" aria-label="GitHub">⌥</a>
            </div>
          </div>
          <div v-for="col in footerCols" :key="col.title" class="col-6 col-lg-2">
            <h6 class="footer-col-h">{{ col.title }}</h6>
            <ul class="footer-links">
              <li v-for="l in col.links" :key="l"><a href="#">{{ l }}</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© 2026 Syntra Inc. Tutti i diritti riservati.</span>
          <div class="d-flex gap-4">
            <a href="#">Privacy</a>
            <a href="#">Termini</a>
            <a href="#">Cookie</a>
          </div>
        </div>
      </div>
    </footer>

  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

useHead({
  title: 'Syntra — Automatizza i flussi del tuo team con AI',
  meta: [
    { name: 'description', content: 'Piattaforma AI per automatizzare i flussi di lavoro del team. Zero codice, risultati immediati.' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ],
  link: [
    { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css' },
  ],
})

const isAnnual = ref(false)
const openFaq = ref<number | null>(null)
const toggleFaq = (i: number) => { openFaq.value = openFaq.value === i ? null : i }

const avatarList = [
  { letter: 'M', hue: 215 }, { letter: 'S', hue: 275 }, { letter: 'L', hue: 150 },
  { letter: 'A', hue: 35 }, { letter: 'R', hue: 340 },
]

const kpis = [
  { label: 'Task', val: '1.247', trend: '↑12%', color: '#4d7cff' },
  { label: 'Ore saved', val: '38h', trend: '↑8%', color: '#34d399' },
  { label: 'Automazioni', val: '94', trend: '↑22%', color: '#a78bfa' },
  { label: 'Revenue', val: '€18k', trend: '↑15%', color: '#f59e0b' },
]

const barHeights = [42, 60, 50, 75, 63, 85, 70, 90, 78, 95]

const mockTasks = [
  { color: '#4d7cff', status: 'AI' },
  { color: '#34d399', status: 'Fatto' },
  { color: '#f59e0b', status: 'Review' },
]

const trustedLogos = ['Scalapay', 'Bending Spoons', 'Musixmatch', 'Satispay', 'Casavo', 'Subito']

const features = [
  { icon: 'bi-stars', title: 'Automazione AI', body: 'Descrivi in linguaggio naturale cosa vuoi automatizzare. L\'AI costruisce il flusso per te, senza una riga di codice.', color: '#4d7cff' },
  { icon: 'bi-diagram-3', title: 'Orchestrazione Task', body: 'Visualizza e gestisci pipeline di progetto con dipendenze, blocchi e milestone in tempo reale.', color: '#22d3ee' },
  { icon: 'bi-plug', title: '50+ Integrazioni', body: 'Connetti Slack, Notion, Jira, Salesforce, HubSpot e tutti i tuoi tool preferiti in pochi click.', color: '#a78bfa' },
  { icon: 'bi-bar-chart-line', title: 'Analytics Avanzati', body: 'Dashboard personalizzabili con KPI su produttività, costi del team e output per reparto.', color: '#34d399' },
  { icon: 'bi-shield-lock', title: 'Enterprise Security', body: 'SSO, audit log completi, permessi granulari e conformità GDPR + SOC2 out-of-the-box.', color: '#f59e0b' },
  { icon: 'bi-people', title: 'Collaborazione Live', body: 'Commenti contestuali, menzioni, notifiche smart e presenza real-time sul workspace del team.', color: '#f472b6' },
]

const steps = [
  { title: 'Connetti i tuoi tool', body: 'Collega Slack, Jira, Notion e il tuo CRM con un click. Nessuna configurazione tecnica, nessun IT coinvolto.' },
  { title: 'Descrivi cosa vuoi', body: 'Scrivi in italiano cosa vuoi automatizzare. L\'AI interpreta il testo e costruisce il flusso completo per te.' },
  { title: 'Monitora e ottimizza', body: 'Syntra traccia ogni automazione, misura l\'impatto e ti suggerisce ottimizzazioni basate sui dati reali.' },
]

const stats = [
  { val: '12.000+', label: 'Team attivi' },
  { val: '38%', label: 'Tempo risparmiato' },
  { val: '50+', label: 'Integrazioni native' },
  { val: '4.9★', label: 'Rating G2' },
]

const plans = computed(() => [
  {
    name: 'Free', price: '0', featured: false,
    desc: 'Per freelance e piccoli team che vogliono iniziare senza rischi.',
    cta: 'Inizia gratis',
    features: ['3 workspace', '10 automazioni/mese', '5 integrazioni', 'Analytics base', 'Community support'],
  },
  {
    name: 'Pro', price: isAnnual.value ? '49' : '69', featured: true,
    desc: 'Per team in crescita che vogliono automatizzare ogni processo.',
    cta: 'Prova 14 giorni gratis',
    features: ['Workspace illimitati', 'Automazioni illimitate', '50+ integrazioni', 'Analytics avanzati', 'Supporto prioritario', 'SSO + permessi avanzati'],
  },
  {
    name: 'Enterprise', price: 'Custom', featured: false,
    desc: 'Per aziende con esigenze avanzate di sicurezza e compliance.',
    cta: 'Contattaci',
    features: ['Tutto di Pro', 'SLA 99.9% garantito', 'Audit log completi', 'GDPR & SOC2', 'Account Manager dedicato', 'Onboarding personalizzato'],
  },
])

const testimonials = [
  {
    quote: 'Syntra ha ridotto del 60% il tempo che passavo sui report manuali. Ora mi concentro su ciò che conta davvero.',
    name: 'Marco Rossi', role: 'Head of Operations — Scalapay', c1: '#4d7cff', c2: '#6a5cff',
  },
  {
    quote: 'In 3 mesi abbiamo automatizzato 40+ processi manuali. Il ROI è stato immediato e misurabile al centesimo.',
    name: 'Sofia Lenti', role: 'CTO — Bending Spoons', c1: '#22d3ee', c2: '#a78bfa',
  },
  {
    quote: 'L\'onboarding è rapidissimo. Il team l\'ha adottato senza formazione. Non avevo mai visto una cosa del genere.',
    name: 'Luca Ferraro', role: 'Product Lead — Musixmatch', c1: '#34d399', c2: '#22d3ee',
  },
]

const faqs = [
  { q: 'Devo installare qualcosa?', a: 'No, Syntra è completamente cloud-based. Accedi dal browser e sei operativo in meno di 5 minuti, senza alcuna installazione.' },
  { q: 'Posso descrivere le automazioni in italiano?', a: 'Sì, il motore AI è addestrato in italiano. Puoi descrivere flussi complessi in linguaggio naturale e l\'AI li traduce automaticamente.' },
  { q: 'Cosa succede dopo i 14 giorni di trial?', a: 'Se non acquisti un piano a pagamento, passi automaticamente al piano Free senza perdere nessun dato né configurazione.' },
  { q: 'I miei dati sono al sicuro?', a: 'Syntra è conforme GDPR con data center certificati in Europa, crittografia end-to-end e audit log completi su ogni azione.' },
  { q: 'Posso migrare dal mio tool attuale?', a: 'Sì, offriamo supporto di migrazione gratuito per i piani Pro ed Enterprise, gestito dal nostro team di onboarding in meno di 24h.' },
  { q: 'Esiste un\'API per sviluppatori?', a: 'Sì, offriamo API REST complete e Webhook configurabili per integrazioni custom, documentate su docs.syntra.io con SDK per JS, Python e Go.' },
]

const footerCols = [
  { title: 'Prodotto', links: ['Funzionalità', 'Integrazioni', 'Roadmap', 'Changelog'] },
  { title: 'Azienda', links: ['Chi siamo', 'Blog', 'Careers', 'Press'] },
  { title: 'Risorse', links: ['Documentazione', 'API', 'Community', 'Status'] },
]
</script>

<style scoped>
/* ─── TOKENS ─── */
:root {
  --bg: #0a0f1f;
  --surface: rgba(18, 24, 44, 0.72);
  --border: rgba(255, 255, 255, 0.1);
  --accent: #4d7cff;
  --accent2: #6a5cff;
  --text: #eef3ff;
  --muted: rgba(180, 200, 240, 0.6);
  --radius: 1.1rem;
}

/* ─── RESET / BASE ─── */
*, *::before, *::after { box-sizing: border-box; }

.lp {
  background: #0a0f1f;
  color: #eef3ff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  min-height: 100vh;
  overflow-x: hidden;
}

.lp-container {
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* ─── GRAD TEXT ─── */
.grad-text {
  background: linear-gradient(130deg, #4d7cff 0%, #a78bfa 60%, #22d3ee 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ─── NAV ─── */
.lp-nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 200;
  padding: 1rem 0;
  background: rgba(6, 10, 22, 0.8);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border-bottom: 1px solid rgba(255,255,255,0.08);
}

.lp-logo {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #eef3ff !important;
  text-decoration: none;
}

.logo-spark { color: #f59e0b !important; font-size: 1.1em; }

.nav-links a {
  color: rgba(200, 215, 250, 0.75) !important;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s;
}
.nav-links a:hover { color: #eef3ff !important; }

.nav-signin {
  color: rgba(200, 215, 250, 0.75) !important;
  text-decoration: none;
  font-size: 0.9rem;
  padding: 0.45rem 1rem;
  border-radius: 0.75rem;
  transition: background 0.2s;
}
.nav-signin:hover { background: rgba(255,255,255,0.06); }

.btn-nav-cta {
  background: linear-gradient(135deg, #4d7cff, #6a5cff);
  color: #fff !important;
  text-decoration: none;
  padding: 0.48rem 1.2rem;
  border-radius: 0.75rem;
  font-size: 0.9rem;
  font-weight: 600;
  box-shadow: 0 4px 14px rgba(77,124,255,0.35);
  transition: transform 0.18s, box-shadow 0.18s;
}
.btn-nav-cta:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(77,124,255,0.5); }

/* ─── HERO ─── */
.hero-section {
  position: relative;
  overflow: hidden;
  padding-top: 6rem;
}

.hero-row {
  min-height: calc(100vh - 5rem);
  padding: 4rem 0 5rem;
  gap: 3rem;
}

.glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  pointer-events: none;
}
.glow-left {
  width: 600px; height: 600px;
  background: rgba(77, 124, 255, 0.18);
  top: -100px; left: -200px;
}
.glow-right {
  width: 500px; height: 500px;
  background: rgba(167, 139, 250, 0.14);
  top: 100px; right: -150px;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(77,124,255,0.12);
  border: 1px solid rgba(77,124,255,0.3);
  color: #a5bdff !important;
  padding: 0.4rem 1rem;
  border-radius: 100px;
  font-size: 0.82rem;
  font-weight: 500;
}

.pulse-dot {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: #4d7cff;
  box-shadow: 0 0 0 0 rgba(77,124,255,0.6);
  animation: pulse-ring 2s infinite;
  flex-shrink: 0;
}
@keyframes pulse-ring {
  0%   { box-shadow: 0 0 0 0 rgba(77,124,255,0.6); }
  70%  { box-shadow: 0 0 0 8px rgba(77,124,255,0); }
  100% { box-shadow: 0 0 0 0 rgba(77,124,255,0); }
}

.hero-h1 {
  font-size: clamp(2rem, 4.5vw, 3.4rem);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.03em;
  color: #eef3ff !important;
}

.hero-sub {
  font-size: 1.05rem;
  line-height: 1.7;
  color: rgba(180,200,240,0.75) !important;
  max-width: 520px;
}

.btn-hero-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #4d7cff 0%, #6a5cff 100%);
  color: #fff !important;
  text-decoration: none;
  padding: 0.8rem 1.8rem;
  border-radius: 0.9rem;
  font-weight: 700;
  font-size: 0.97rem;
  box-shadow: 0 8px 24px rgba(77,124,255,0.4);
  transition: transform 0.2s, box-shadow 0.2s;
}
.btn-hero-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(77,124,255,0.55); }

.btn-hero-ghost {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(200,215,255,0.85) !important;
  text-decoration: none;
  padding: 0.8rem 1.5rem;
  border-radius: 0.9rem;
  border: 1.5px solid rgba(255,255,255,0.15);
  font-weight: 600;
  font-size: 0.97rem;
  background: rgba(255,255,255,0.04);
  transition: background 0.2s, border-color 0.2s;
}
.btn-hero-ghost:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.25); }

.hero-proof {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  flex-wrap: wrap;
}

.avatar-stack {
  display: flex;
}
.av-circle {
  width: 34px; height: 34px;
  border-radius: 50%;
  border: 2px solid #0a0f1f;
  margin-left: -8px;
  font-size: 0.72rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff !important;
}
.av-circle:first-child { margin-left: 0; }

.proof-text {
  font-size: 0.85rem;
  color: rgba(180,200,240,0.7) !important;
}
.proof-text strong { color: #eef3ff !important; }
.proof-stars { color: #f59e0b !important; }

/* ─── DASHBOARD MOCKUP ─── */
.mockup-wrap {
  position: relative;
  animation: float-y 5s ease-in-out infinite;
}
@keyframes float-y {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.browser-frame {
  background: rgba(13, 18, 35, 0.9);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 1.1rem;
  overflow: hidden;
  box-shadow: 0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(77,124,255,0.08);
}

.browser-chrome {
  background: rgba(8, 12, 24, 0.95);
  padding: 0.6rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  border-bottom: 1px solid rgba(255,255,255,0.07);
}

.b-dots { display: flex; gap: 5px; }
.bd { width: 11px; height: 11px; border-radius: 50%; }
.bd-r { background: #ff5f57; }
.bd-y { background: #febc2e; }
.bd-g { background: #28c840; }

.b-url {
  background: rgba(255,255,255,0.07);
  border-radius: 0.4rem;
  padding: 0.2rem 0.8rem;
  font-size: 0.72rem;
  color: rgba(180,200,240,0.5) !important;
  flex: 1;
  text-align: center;
}

.dash-body {
  display: flex;
  height: 320px;
}

.dash-side {
  width: 48px;
  background: rgba(8, 12, 24, 0.7);
  border-right: 1px solid rgba(255,255,255,0.06);
  padding: 0.8rem 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.ds-logo {
  width: 26px; height: 26px;
  background: linear-gradient(135deg, #4d7cff, #6a5cff);
  border-radius: 6px;
  margin-bottom: 0.5rem;
}

.ds-item {
  width: 26px; height: 6px;
  background: rgba(255,255,255,0.12);
  border-radius: 3px;
}
.ds-item.ds-active {
  background: rgba(77,124,255,0.7);
  width: 100%;
}

.ds-gap { flex: 1; }
.ds-av { width: 26px; height: 26px; border-radius: 50%; background: linear-gradient(135deg,#f59e0b,#f472b6); }

.dash-main {
  flex: 1;
  padding: 0.8rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.dm-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.2rem;
}
.dm-title { width: 80px; height: 8px; background: rgba(255,255,255,0.18); border-radius: 4px; }
.dm-btn { width: 44px; height: 18px; background: rgba(255,255,255,0.1); border-radius: 5px; }
.dm-btn-accent { background: linear-gradient(135deg,#4d7cff,#6a5cff); }

.kpi-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.4rem;
}
.kpi-card {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 0.5rem;
  padding: 0.4rem 0.5rem;
}
.kpi-lbl { font-size: 0.55rem; color: rgba(180,200,240,0.5) !important; margin-bottom: 2px; }
.kpi-val { font-size: 0.78rem; font-weight: 700; }
.kpi-trend { font-size: 0.55rem; }
.trend-up { color: #34d399 !important; }

.chart-box {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 0.5rem;
  padding: 0.5rem;
  flex: 1;
}
.chart-title-mock { width: 60px; height: 6px; background: rgba(255,255,255,0.12); border-radius: 3px; margin-bottom: 0.5rem; }
.bars-wrap { display: flex; align-items: flex-end; gap: 3px; height: 55px; }
.bar-item {
  flex: 1;
  border-radius: 3px 3px 0 0;
  background: linear-gradient(180deg, #4d7cff, #6a5cff55);
  animation: bar-grow 0.6s ease both;
}
@keyframes bar-grow {
  from { transform: scaleY(0); transform-origin: bottom; }
  to   { transform: scaleY(1); transform-origin: bottom; }
}

.tasks-box { display: flex; flex-direction: column; gap: 4px; }
.task-row { display: flex; align-items: center; gap: 6px; }
.t-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
.t-bar { flex: 1; height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; }
.t-chip { font-size: 0.55rem; font-weight: 600; padding: 1px 6px; border-radius: 100px; white-space: nowrap; }

/* floating badges */
.float-badge {
  position: absolute;
  background: rgba(14, 20, 40, 0.92);
  border: 1px solid rgba(255,255,255,0.12);
  backdrop-filter: blur(12px);
  border-radius: 0.85rem;
  padding: 0.6rem 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  box-shadow: 0 8px 28px rgba(0,0,0,0.4);
}
.fb-top { top: -16px; right: -20px; }
.fb-bot { bottom: 20px; left: -24px; }
.fb-icon { font-size: 1.2rem; }
.fb-title { font-size: 0.78rem; font-weight: 600; color: #eef3ff !important; }
.fb-sub { font-size: 0.68rem; color: rgba(180,200,240,0.6) !important; }
.fb-big { font-size: 1.4rem; font-weight: 800; background: linear-gradient(135deg,#34d399,#22d3ee); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }

/* ─── TRUSTED ─── */
.trusted-section {
  padding: 3rem 0;
  border-top: 1px solid rgba(255,255,255,0.06);
  border-bottom: 1px solid rgba(255,255,255,0.06);
  background: rgba(255,255,255,0.02);
}
.trusted-label {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(180,200,240,0.45) !important;
  margin-bottom: 1.5rem;
}
.logo-strip { display: flex; flex-wrap: wrap; justify-content: center; gap: 2rem 3rem; }
.fake-logo {
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: rgba(180,200,240,0.35) !important;
  text-transform: uppercase;
  transition: color 0.2s;
}
.fake-logo:hover { color: rgba(180,200,240,0.65) !important; }

/* ─── SECTIONS ─── */
.lp-section { padding: 6rem 0; }
.lp-alt { background: rgba(255,255,255,0.025); }

.sec-pill {
  display: inline-block;
  background: rgba(77,124,255,0.12);
  border: 1px solid rgba(77,124,255,0.25);
  color: #93b4ff !important;
  padding: 0.3rem 0.9rem;
  border-radius: 100px;
  font-size: 0.78rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.07em;
}

.sec-h2 {
  font-size: clamp(1.8rem, 3.5vw, 2.6rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #eef3ff !important;
}

.sec-sub {
  font-size: 1rem;
  color: rgba(180,200,240,0.65) !important;
  max-width: 580px;
  margin: 0 auto;
  line-height: 1.7;
}

/* ─── FEATURES ─── */
.feat-card {
  background: rgba(18, 24, 44, 0.6);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 1.1rem;
  padding: 1.8rem;
  transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
}
.feat-card:hover {
  transform: translateY(-4px);
  border-color: rgba(77,124,255,0.25);
  box-shadow: 0 16px 40px rgba(0,0,0,0.3);
}

.feat-icon-box {
  width: 52px; height: 52px;
  border-radius: 0.85rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feat-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: #eef3ff !important;
  margin-bottom: 0.5rem;
}

.feat-body {
  font-size: 0.9rem;
  line-height: 1.65;
  color: rgba(180,200,240,0.65) !important;
  margin: 0;
}

/* ─── HOW IT WORKS ─── */
.steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
  position: relative;
}
.steps-grid::before {
  content: '';
  position: absolute;
  top: 2rem;
  left: calc(16.66% + 1rem);
  right: calc(16.66% + 1rem);
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(77,124,255,0.3), rgba(167,139,250,0.3), transparent);
  pointer-events: none;
}

.step-card {
  background: rgba(18, 24, 44, 0.55);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 1.1rem;
  padding: 2rem 1.8rem;
  text-align: center;
}

.step-num {
  font-size: 2.8rem;
  font-weight: 900;
  line-height: 1;
  background: linear-gradient(135deg, rgba(77,124,255,0.35), rgba(167,139,250,0.35));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.step-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: #eef3ff !important;
  margin-bottom: 0.6rem;
}

.step-body {
  font-size: 0.9rem;
  line-height: 1.65;
  color: rgba(180,200,240,0.65) !important;
  margin: 0;
}

/* ─── STATS ─── */
.stats-section {
  padding: 5rem 0;
  background: linear-gradient(135deg, rgba(31,58,119,0.4) 0%, rgba(10,15,31,0) 100%);
  border-top: 1px solid rgba(255,255,255,0.06);
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.stat-val {
  font-size: clamp(2.2rem, 4vw, 3.2rem);
  font-weight: 900;
  letter-spacing: -0.04em;
}
.stat-lbl {
  font-size: 0.88rem;
  color: rgba(180,200,240,0.6) !important;
  margin-top: 0.3rem;
}

/* ─── PRICING ─── */
.billing-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
}
.toggle-lbl {
  font-size: 0.9rem;
  color: rgba(180,200,240,0.55) !important;
  transition: color 0.2s;
}
.tlbl-on { color: #eef3ff !important; font-weight: 600; }

.toggle-track {
  width: 44px; height: 24px;
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 100px;
  cursor: pointer;
  position: relative;
  transition: background 0.25s;
  outline: none;
}
.toggle-track.track-on { background: linear-gradient(135deg,#4d7cff,#6a5cff); border-color: transparent; }
.toggle-thumb {
  position: absolute;
  top: 3px; left: 3px;
  width: 16px; height: 16px;
  background: #fff;
  border-radius: 50%;
  transition: transform 0.25s;
}
.track-on .toggle-thumb { transform: translateX(20px); }

.save-chip {
  background: rgba(52,211,153,0.15);
  color: #34d399 !important;
  border: 1px solid rgba(52,211,153,0.3);
  padding: 0.15rem 0.5rem;
  border-radius: 100px;
  font-size: 0.72rem;
  font-weight: 700;
  margin-left: 0.4rem;
}

.plan-card {
  background: rgba(18, 24, 44, 0.6);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 1.3rem;
  padding: 2.2rem;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, box-shadow 0.2s;
}
.plan-card:hover { transform: translateY(-4px); box-shadow: 0 20px 50px rgba(0,0,0,0.35); }

.plan-featured {
  border-color: rgba(77,124,255,0.45);
  background: rgba(20, 28, 60, 0.8);
  box-shadow: 0 0 0 1px rgba(77,124,255,0.2), 0 20px 60px rgba(77,124,255,0.15);
}

.plan-badge {
  position: absolute;
  top: -13px; left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #4d7cff, #6a5cff);
  color: #fff !important;
  padding: 0.28rem 1rem;
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 700;
  white-space: nowrap;
}

.plan-name {
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(180,200,240,0.7) !important;
  margin-bottom: 0.8rem;
}

.plan-price-row {
  display: flex;
  align-items: flex-end;
  gap: 0.15rem;
  margin-bottom: 0.8rem;
}
.p-curr { font-size: 1.4rem; font-weight: 700; color: #eef3ff !important; align-self: flex-start; padding-top: 0.4rem; }
.p-num { font-size: 3.2rem; font-weight: 900; line-height: 1; color: #eef3ff !important; letter-spacing: -0.04em; }
.p-per { font-size: 0.85rem; color: rgba(180,200,240,0.55) !important; margin-bottom: 0.4rem; }

.plan-desc {
  font-size: 0.87rem;
  color: rgba(180,200,240,0.6) !important;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.plan-cta {
  display: block;
  text-align: center;
  padding: 0.75rem 1rem;
  border-radius: 0.8rem;
  font-weight: 700;
  font-size: 0.9rem;
  text-decoration: none;
  margin-bottom: 1.5rem;
  transition: transform 0.18s, box-shadow 0.18s;
}
.plan-cta:hover { transform: translateY(-1px); }

.plan-cta-fill {
  background: linear-gradient(135deg, #4d7cff, #6a5cff);
  color: #fff !important;
  box-shadow: 0 6px 20px rgba(77,124,255,0.4);
}
.plan-cta-fill:hover { box-shadow: 0 8px 28px rgba(77,124,255,0.55); }
.plan-cta-outline {
  background: transparent;
  border: 1.5px solid rgba(255,255,255,0.15);
  color: rgba(200,215,250,0.85) !important;
}
.plan-cta-outline:hover { border-color: rgba(255,255,255,0.3); background: rgba(255,255,255,0.05); }

.plan-list {
  list-style: none;
  padding: 0; margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.plan-list li {
  font-size: 0.88rem;
  color: rgba(200,215,250,0.8) !important;
}
.plan-check {
  color: #34d399 !important;
  font-weight: 700;
  margin-right: 0.5rem;
}

.guarantee-note {
  font-size: 0.85rem;
  color: rgba(180,200,240,0.5) !important;
}

/* ─── TESTIMONIALS ─── */
.testi-card {
  background: rgba(18, 24, 44, 0.6);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 1.1rem;
  padding: 1.8rem;
  transition: transform 0.2s;
}
.testi-card:hover { transform: translateY(-4px); }

.testi-stars { color: #f59e0b !important; font-size: 1rem; letter-spacing: 2px; }

.testi-quote {
  font-size: 0.95rem;
  line-height: 1.7;
  color: rgba(200,215,250,0.85) !important;
  font-style: italic;
  flex: 1;
}

.testi-av {
  width: 44px; height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 1rem;
  color: #fff !important;
  flex-shrink: 0;
}

.testi-name {
  font-size: 0.9rem;
  font-weight: 700;
  color: #eef3ff !important;
}
.testi-role {
  font-size: 0.78rem;
  color: rgba(180,200,240,0.55) !important;
}

/* ─── FAQ ─── */
.faq-wrap {
  max-width: 700px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.faq-list { display: flex; flex-direction: column; gap: 0.6rem; }

.faq-item {
  background: rgba(18, 24, 44, 0.55);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 0.9rem;
  overflow: hidden;
  transition: border-color 0.2s;
}
.faq-item.faq-open { border-color: rgba(77,124,255,0.3); }

.faq-q {
  width: 100%;
  background: none;
  border: none;
  padding: 1.1rem 1.4rem;
  text-align: left;
  font-size: 0.95rem;
  font-weight: 600;
  color: #eef3ff !important;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}
.faq-q:hover { background: rgba(255,255,255,0.03); }

.faq-ico {
  font-size: 1.4rem;
  color: rgba(180,200,240,0.5) !important;
  line-height: 1;
  flex-shrink: 0;
}
.faq-open .faq-ico { color: #4d7cff !important; }

.faq-a {
  padding: 0 1.4rem 1.1rem;
  font-size: 0.9rem;
  line-height: 1.7;
  color: rgba(180,200,240,0.7) !important;
}

/* ─── FINAL CTA ─── */
.cta-final {
  padding: 7rem 0;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(31,58,119,0.35) 0%, rgba(10,15,31,0) 60%);
  border-top: 1px solid rgba(77,124,255,0.15);
}

.cta-final-glow {
  position: absolute;
  top: -150px; left: 50%;
  transform: translateX(-50%);
  width: 700px; height: 400px;
  background: radial-gradient(ellipse, rgba(77,124,255,0.2) 0%, transparent 70%);
  pointer-events: none;
}

.cta-h2 {
  font-size: clamp(1.8rem, 3.5vw, 2.8rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #eef3ff !important;
  max-width: 700px;
  margin: 0 auto;
}

.cta-sub {
  font-size: 1.05rem;
  color: rgba(180,200,240,0.65) !important;
}

.cta-reassure {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.5rem;
  font-size: 0.85rem;
  color: rgba(180,200,240,0.55) !important;
}
.cta-reassure span { color: rgba(180,200,240,0.55) !important; }

/* ─── FOOTER ─── */
.lp-footer {
  padding: 5rem 0 2.5rem;
  background: rgba(4, 7, 16, 0.95);
  border-top: 1px solid rgba(255,255,255,0.07);
}

.footer-tagline {
  font-size: 0.9rem;
  line-height: 1.65;
  color: rgba(180,200,240,0.5) !important;
}

.social-row { display: flex; gap: 0.7rem; }
.soc-link {
  width: 34px; height: 34px;
  border-radius: 0.6rem;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  color: rgba(180,200,240,0.6) !important;
  text-decoration: none;
  transition: background 0.2s, color 0.2s;
}
.soc-link:hover { background: rgba(77,124,255,0.15); color: #eef3ff !important; }

.footer-col-h {
  font-size: 0.82rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(200,215,250,0.6) !important;
  margin-bottom: 1rem;
}

.footer-links { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.55rem; }
.footer-links a {
  font-size: 0.88rem;
  color: rgba(180,200,240,0.5) !important;
  text-decoration: none;
  transition: color 0.2s;
}
.footer-links a:hover { color: rgba(200,215,250,0.85) !important; }

.footer-bottom {
  padding-top: 2rem;
  margin-top: 2rem;
  border-top: 1px solid rgba(255,255,255,0.07);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.82rem;
  color: rgba(180,200,240,0.4) !important;
}
.footer-bottom a {
  color: rgba(180,200,240,0.4) !important;
  text-decoration: none;
  transition: color 0.2s;
}
.footer-bottom a:hover { color: rgba(200,215,250,0.7) !important; }
</style>

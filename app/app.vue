<template>
  <div class="toolbox-app">
    <NuxtRouteAnnouncer />
    <header ref="headerRef" class="app-header fixed-top border-bottom border-secondary-subtle">
      <nav class="navbar navbar-expand-lg navbar-dark">
        <div class="container">
          <NuxtLink class="navbar-brand fw-semibold" to="/" @click="closeAllMenus">
            Utils Toolbox
          </NuxtLink>

          <button
            class="navbar-toggler border-0"
            type="button"
            aria-label="Apri menu"
            :aria-expanded="isMobileMenuOpen"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
          >
            <span class="navbar-toggler-icon" />
          </button>

          <div class="d-none d-lg-flex ms-auto align-items-center gap-3">
            <div
              v-for="category in categories"
              :key="category.name"
              class="position-relative"
              @mouseenter="desktopOpen = category.name"
              @mouseleave="desktopOpen = null"
            >
              <button class="btn btn-sm btn-outline-light dropdown-toggle">
                {{ category.name }}
              </button>
              <ul v-show="desktopOpen === category.name" class="dropdown-menu dropdown-menu-dark show glass-menu">
                <li v-for="item in category.items" :key="item.to">
                  <NuxtLink class="dropdown-item" :to="item.to">
                    {{ item.label }}
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>

    <div
      v-if="isMobileMenuOpen"
      class="offcanvas-backdrop fade show"
      aria-hidden="true"
      @click="closeAllMenus"
    />
    <aside
      ref="mobileMenuRef"
      class="offcanvas offcanvas-end text-bg-dark"
      :class="{ show: isMobileMenuOpen }"
      tabindex="-1"
      aria-modal="true"
      role="dialog"
    >
      <div class="offcanvas-header border-bottom border-secondary">
        <h5 class="offcanvas-title">Categorie</h5>
        <button type="button" class="btn-close btn-close-white" aria-label="Chiudi" @click="closeAllMenus" />
      </div>
      <div class="offcanvas-body">
        <div v-for="category in categories" :key="`mobile-${category.name}`" class="mb-3">
          <h6 class="text-info-emphasis">{{ category.name }}</h6>
          <div class="list-group">
            <NuxtLink
              v-for="item in category.items"
              :key="`mobile-${item.to}`"
              class="list-group-item list-group-item-action bg-transparent text-light border-secondary"
              :to="item.to"
              @click="closeAllMenus"
            >
              {{ item.label }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </aside>

    <main class="app-main container py-4">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const headerRef = ref<HTMLElement | null>(null)
const mobileMenuRef = ref<HTMLElement | null>(null)

const isMobileMenuOpen = ref(false)
const desktopOpen = ref<string | null>(null)

const categories = [
  {
    name: 'Fisco & Business',
    items: [
      { label: 'Partita IVA IT', to: '/partita-iva' },
      { label: 'Codice Fiscale IT', to: '/codice-fiscale' },
      { label: 'Generatore Dati', to: '/generatore-dati' }
    ]
  },
  {
    name: 'Bancario & Pagamenti',
    items: [{ label: 'IBAN', to: '/iban' }]
  },
  {
    name: 'Utility Dev',
    items: [
      { label: 'JSON', to: '/json' },
      { label: 'JWT', to: '/jwt' },
      { label: 'Base64', to: '/base64' },
      { label: 'URL Encode', to: '/url' },
      { label: 'Unix Time', to: '/unix' },
      { label: 'UUID', to: '/uuid' },
      { label: 'SHA-256', to: '/sha256' },
      { label: 'Cron', to: '/cron' },
      { label: 'Regex', to: '/regex' },
      { label: 'Lorem Ipsum', to: '/lorem-ipsum' }
    ]
  },
]

const closeAllMenus = (): void => {
  isMobileMenuOpen.value = false
  desktopOpen.value = null
}

watch(
  () => route.fullPath,
  () => closeAllMenus()
)

const onWindowBlur = (): void => closeAllMenus()
const onWindowKeydown = (event: KeyboardEvent): void => {
  if (event.key === 'Escape') closeAllMenus()
}
const onDocumentClick = (event: MouseEvent): void => {
  const target = event.target as Node
  const clickInsideHeader = headerRef.value?.contains(target) ?? false
  const clickInsideMobileMenu = mobileMenuRef.value?.contains(target) ?? false
  if (!clickInsideHeader && !clickInsideMobileMenu) closeAllMenus()
}

onMounted(() => {
  window.addEventListener('blur', onWindowBlur)
  window.addEventListener('keydown', onWindowKeydown)
  document.addEventListener('mousedown', onDocumentClick)
})

onBeforeUnmount(() => {
  window.removeEventListener('blur', onWindowBlur)
  window.removeEventListener('keydown', onWindowKeydown)
  document.removeEventListener('mousedown', onDocumentClick)
})
</script>

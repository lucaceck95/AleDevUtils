<template>
  <section>
    <div class="hero-card p-4 p-md-5 mb-4">
      <h1 class="display-6 fw-bold mb-2">Utils Toolbox</h1>
      <p class="text-secondary mb-0">Coltellino svizzero di utility pratiche: fisco, pagamenti e strumenti dev.</p>
    </div>

    <div class="row g-4">
      <div v-for="category in categories" :key="category.name" class="col-12 col-lg-4">
        <article class="tool-card h-100 card border-0">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h2 class="h5 mb-0">{{ category.name }}</h2>
              <span v-if="category.badge" class="badge text-bg-info">{{ category.badge }}</span>
            </div>
            <div class="d-grid gap-2">
              <NuxtLink
                v-for="item in category.items"
                :key="item.to"
                class="btn btn-outline-light text-start"
                :to="item.to"
              >
                {{ item.label }}
              </NuxtLink>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Category {
  name: string
  items: { label: string; to: string }[]
  badge?: string
}

const categories: Category[] = [
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
    badge: 'Soon',
    items: [
      { label: 'Codice Python', to: '/python' },
      { label: 'Lorem Ipsum', to: '/lorem-ipsum' }
    ]
  }
]
</script>
// https://nuxt.com/docs/api/configuration/nuxt-config
const baseURL = process.env.NUXT_APP_BASE_URL || '/'

export default defineNuxtConfig({
  compatibilityDate: '2026-03-23',
  devtools: { enabled: true },
  css: ['~/assets/styles/main.scss'],
  app: {
    baseURL
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      ignore: ['/api/**'],
      routes: [
        '/',
        '/iban',
        '/partita-iva',
        '/codice-fiscale',
        '/generatore-dati',
        '/lorem-ipsum',
        '/python',
        '/landing'
      ]
    }
  }
})

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['bootstrap/dist/css/bootstrap.min.css'],
  plugins: ['~/plugins/fontawesome.ts', '~/plugins/apollo.client.ts'],
runtimeConfig: {
    public: {
      apiToken: process.env.API_TOKEN,
    },
  },
})

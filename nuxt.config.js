export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  ssr: 'false',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'vue-coke-sample',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    './assets/scss/app.scss'
  ],

  styleResources: {
    scss: [
      '~/assets/scss/base/*.scss',
      '~/assets/scss/elements/*.scss',
      '~/assets/scss/blocks/*.scss',
      '~/assets/scss/global/*.scss',
      '~/assets/scss/pages/*.scss',
    ]
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/style-resources',
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['gsap']
  },
  router: {
    base: '/',
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'home',
        path: '/',
        component: resolve(__dirname, 'pages/Index.vue')
      })
      routes.push({
        name: 'slide-eclipse',
        path: 'slide-eclipse',
        component: resolve(__dirname, 'pages/SlideEclipse.vue'),
      })
    }
  }
}

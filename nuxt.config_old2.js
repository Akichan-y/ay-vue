import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - 22Jan',
    title: '22Jan',
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
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',

    [
      '@nuxtjs/firebase',
      {
        config: {
          
          //------------------------------------------------
          // apiKey: "AIzaSyAKgWSKFjgjV-s2wHKCzRf6y-cZIPZzdY4",
          // authDomain: "fca-ebadc.firebaseapp.com",
          // databaseURL: "https://fca-ebadc.firebaseio.com",
          // projectId: "fca-ebadc",
          // storageBucket: "fca-ebadc.appspot.com",
          // messagingSenderId: "641706189724",
          // appId: "1:641706189724:web:95d45fbed0deca1d419e59",
          // measurementId: "G-CDXHBFYEBF"
          //------------------------------------------------
          // apiKey: "AIzaSyBlUkcBYUeZSYBeLLNePZMqNbguHrUu_W0",
          // authDomain: "ay-vue.firebaseapp.com",
          // databaseURL: "https://ay-vue.firebaseio.com",
          // projectId: "ay-vue",
          // storageBucket: "ay-vue.appspot.com",
          // messagingSenderId: "312074200731",
          // appId: "1:312074200731:web:eaeaf1a9436245fb37483e",
          // measurementId: "G-60NTK74TJM"

          //-----------------------------------------------
          apiKey: "AIzaSyAe0Ox3WbazBfA-3wfV1ACmYUoJWtqxsAA",
          authDomain: "akilog.firebaseapp.com",
          projectId: "akilog",
          storageBucket: "akilog.appspot.com",
          messagingSenderId: "719266269268",
          appId: "1:719266269268:web:3c81da714391501bfdc5c1",
          measurementId: "G-PZNZYTNBYJ"
          //-----------------------------------------------

        },
        services: {
          // auth: true // Just as example. Can be any other service.
           auth: true,
            firestore: true,
            functions: true,
            storage: true,
            database: true,
            messaging: true,
            performance: true,
            analytics: true,
            remoteConfig: true
        }
      }
      
    ]
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}

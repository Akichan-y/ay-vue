import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head

 

  head: {
    titleTemplate: '%s - NishioCoM4',
    title: 'NishioCoM4',
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

  generate: {
    dir:'public'
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
    // ['vue-web-cam/nuxt'],
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: "AIzaSyBlUkcBYUeZSYBeLLNePZMqNbguHrUu_W0",
          authDomain: "ay-vue.firebaseapp.com",
          databaseURL: "https://ay-vue.firebaseio.com",
          projectId: "ay-vue",
          storageBucket: "ay-vue.appspot.com",
          messagingSenderId: "312074200731",
          appId: "1:312074200731:web:eaeaf1a9436245fb37483e",
          measurementId: "G-60NTK74TJM"
        },
        services: {
          auth: true, // Just as example. Can be any other service.
          firestore:true,
          database: true,
          storage: true,
        }
      }
    ]
  ],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  // vuetify: {
    
  //   customVariables: ['~/assets/variables.scss'],
  //   theme: {
  //     dark: false,
  //     themes: {
  //       dark: {
  //         primary: colors.blue.darken2,
  //         accent: colors.grey.darken3,
  //         secondary: colors.amber.darken3,
  //         info: colors.teal.lighten1,
  //         warning: colors.amber.base,
  //         error: colors.deepOrange.accent4,
  //         success: colors.green.accent3
  //       }
  //     }
  //   }
  // },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}

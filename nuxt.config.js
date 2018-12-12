const pkg = require('./package')
const { resolve } = require('path')

const nuxtWebpack = require('webpack-monitor')

module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: pkg.description
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },

  /*
   ** Global CSS
   */
  css: ['element-ui/lib/theme-chalk/index.css'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/element-ui',
    {
      src: '~/plugins/cube-ui',
      ssr: false
    }
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/webpackmonitor',
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios'
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      
      config.plugins.push(
        new nuxtWebpack({
          capture: true,
          target: resolve('./.monitor/stats.json'),
          launch: process.argv.indexOf('--monitor') !== -1,
          port: 3030
        })
      )
      config.resolve.alias['cube-ui'] = 'cube-ui/lib'
    }
  }
}

require('dotenv').config()

export default {
    mode: 'universal',
   head: {
     title: 'Treejer',


     meta: [
       {charset: 'utf-8'},
       {name: 'content', content: 'Treejer description'},
       {name: 'robots', content: 'width=device-width, initial-scale=1'},
       {name: 'google-site-verification', content: 'tASRdlQWe-O2j5boAlfazXb4-CEyAUfCwx_30gA383U'},
       {name: 'msapplication-TileColor', content: '#ffffff'},
       {name: 'theme-color', content: '#67B68C'},
       {hid: 'description', name: 'description', content: 'Treejer'},
       {property: 'og:type', content: 'website'},
       {property: 'og:title', content: 'Home - Treejer'},
       // { property: 'og:url', content: process.env.websiteUrl },
       {property: 'og:site_name', content: 'Treejer'},
       {property: 'twitter:card', content: 'summary_large_image'},
       {property: 'twitter:title', content: 'Home - Treejer'},
       {property: 'og:locale:alternate', content: 'en'}
     ],

     link: [
       {rel: 'apple-touch-icon', sizes: '180x180', type: 'image/png', href: '/apple-touch-icon.png'},
       {rel: 'icon', sizes: '32x32', type: 'image/png', href: '/favicon-32x32.png'},
       {rel: 'icon', sizes: '16x16', type: 'image/png', href: '/favicon-16x16.png'},
       {rel: 'manifest', href: '/site.webmanifest'},
       {rel: 'mask-icon', href: '//safari-pinned-tab.svg', color: '#5bbad5'},

     ]

   },
  env: {
    baseUrl: process.env.BASE_URL || 'https://treejer.com/',
    contractGBFactoryAddress: process.env.CONTRACT_GBFACTORY_ADDRESS,
    contractTreeTypeAddress: process.env.CONTRACT_TRRETYPE_ADDRESS,
    contractTreeFactoryAddress: process.env.CONTRACT_TREEFACTORY_ADDRESS,
    contractUpdateFactoryAddress: process.env.CONTRACT_UPDATEFACTORY_ADDRESS,
    contractO2FactoryAddress: process.env.CONTRACT_O2FACTORY_ADDRESS,
    contractTreeSaleAddress: process.env.CONTRACT_TREESALE_ADDRESS,
    contractFundAddress: process.env.CONTRACT_FUND_ADDRESS,
    contractO1FactoryAddress: process.env.CONTRACT_O1FACTORY_ADDRESS,
    etherscanApiKEY: process.env.ETHERSCAN_API_KEY,
    apiUrl: process.env.API_URL || 'https://api.treejer.com',

  },
  router: {
    linkActiveClass: 'active-link'
  },

  loading: {
    color: 'rgba(103,182,140,0.62)',
    failedColor: 'rgba(238,45,14,0.69)',
    height: '6px'
  },

  /*
   ** Global CSS
   */
    css: [
        '@/assets/main.scss'
    ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    // {src: '~plugins/metaMask.js', mode: 'client', ssr: false},
    {src: '~plugins/swiper.js', mode: 'client', ssr: false},
    {src: '~plugins/typer.js', mode: 'client', ssr: false},
    {src: '~plugins/maps.js', ssr: false},
    {src: '~plugins/eth.js', ssr: false},
    {src: '~plugins/vueFormulate.js', ssr: false},
    {src: '~plugins/web3.js', ssr: false},
    {src: '~plugins/metamaskExtensionProvider.js', ssr: false,mode: 'client'},
  ],
  buildModules: [
    ['@nuxtjs/dotenv', {filename: '.env'}]
  ],
  module: {


    rules: [{
      test: /\.scss$/,
      use: [{
        loader: 'style-loader',
        options: {
          sourceMap: true
        }
      }, {
        loader: 'css-loader',
                    options: {
                        sourceMap: true
                    }
                }, {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true
                    }
                }]
            },
            // {
            //   test: /\.vue$/,
            //   loader: 'vue-loader',
            //   options: {
            //     loaders: {
            //       i18n: '@kazupon/vue-i18n-loader'
            //     }
            //   }
            // },
            {
                test: /\.(png|jpe?g|gif|svg|webp)$/,
                loader: 'url-loader',
                query: {
                    // limit: 1000, // 1kB
                    name: 'img/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    // limit: 1000, // 1kB
                    name: 'fonts/[name].[hash:7].[ext]'
                }
            }
        ]
    },
    /*
     ** Nuxt.js modules
     */
    modules: [
      'bootstrap-vue/nuxt',
      'nuxt-clipboard2',
      'cookie-universal-nuxt',
      [
        '@nuxtjs/recaptcha'
      ],
      'vue-ethereum/nuxt',
      '@nuxtjs/axios',
      '@nuxtjs/pwa',
      '@nuxtjs/style-resources', ['nuxt-fontawesome'],
      'nuxt-i18n', ['@nuxtjs/google-gtag'],
      ['@nuxtjs/sitemap', {}],
      ['@netsells/nuxt-hotjar', {
        id: '1662889',
            sv: '6',
        }],
      ['nuxt-gmaps', {
        key: process.env.GOOGLE_MAP_API_KEY,
        //you can use libraries: ['places']
      }]

    ],
    i18n: {
        locales: [{
                name: 'English',
                code: 'en',
                iso: 'en-US',
                file: 'en.js'
            },
            {
                name: 'Farsi',
                code: 'fa',
                iso: 'fa-FA',
                file: 'fa.js'
            },
            {
                name: 'Turkish',
                code: 'tr',
                iso: 'tr-TR',
                file: 'tr.js'
            },
            {
                name: 'Arabic',
                code: 'ar',
                iso: 'ar-AR',
              file: 'ar.js'
            }
        ],
      defaultLocale: 'en',
      loadLanguagesAsync: true,
      lazy: true,
      seo: true,
      langDir: 'lang/',
      detectBrowserLanguage: false
    },
  // 'google-gtag': {
  //     id: 'G-LDTVYYF6V4',
  //     config: {
  //         anonymize_ip: false, // anonymize IP
  //         send_page_view: false // might be necessary to avoid duplicated page track on page reload
  //             // linker: {
  //             //   domains:  ['domain.com','domain.org']
  //             // }
  //     },
  //     debug: process.env.ENVIRONMENT !== 'production', // enable to track in dev mode
  //     disableAutoPageTrack: false, // disable if you don't want to track each page route with router.afterEach(...).
  //     // additionalAccounts: [{
  //     //   id: 'G-LDTVYYF6V4', // required if you are adding additional accounts
  //     //   config: {
  //     //     send_page_view: false // optional configurations
  //     //   }
  //     // }]
  // },
  //

  fontawesome: {
    component: 'fa',
    imports: [{
      set: '@fortawesome/free-solid-svg-icons', // Solid icons
      icons: ['faEye', 'faPlaneDeparture', 'faExternalLinkAlt', 'faLifeRing', 'faTrophy', 'faBell', 'faTree', 'faCalendarAlt', 'faCaretDown', 'faBars', 'faCaretRight', 'faTimes', 'faAngleRight', 'faPhoneSquareAlt', 'faEnvelope', 'faAngleDown', 'faArrowCircleDown', 'faArrowCircleUp', 'faUser', 'faShoppingCart', 'faSearch', 'faUsers', 'faAngleDoubleDown', 'faAngleDoubleUp']
    },
      {
        set: '@fortawesome/free-brands-svg-icons', // Brand icons
        icons: ['faEthereum', 'faCcStripe', 'faCcVisa', 'faFacebook', 'faInstagram', 'faTelegram', 'faWhatsapp', 'faTwitter', 'faLinkedinIn']
      }
    ]
  },
  recaptcha: {
    hideBadge: true, // Hide badge element (v3 & v2 via size=invisible)
    siteKey: '6Lck6LUZAAAAABnazIRRkNGZW9Nal9vhUbhSlIjI', // Site key for requests
    version: 3, // Version
    size: 'invisible' // Size: 'compact', 'normal', 'invisible' (v2)
  },

  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    vendor: ['web3'],
    /*
      ** You can extend webpack config here
      */
    extend(config, ctx) {}
    }
}

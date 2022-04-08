require('dotenv').config()

export default {
  buildDir: 'nuxt-dist',
  mode: 'universal',
  head: {
    title: 'Treejer | Planters Without Borders',
    meta: [
      { charset: 'utf-8' },
      { name: 'google-site-verification', content: 'tASRdlQWe-O2j5boAlfazXb4-CEyAUfCwx_30gA383U' },

      { hid: 'content', name: 'content', content: 'Treejer website content' },
      { hid: 'robots', name: 'robots', content: 'width=device-width, initial-scale=1' },
      { hid: 'msapplication-TileColor', name: 'msapplication-TileColor', content: '#ffffff' },
      { hid: 'theme-color', name: 'theme-color', content: '#67B68C' },
      { hid: 'description', name: 'description', content: 'Plant a forest and support rural communities worldwide. Treejer uses Web3 to unlock new opportunities in Climate Finance.' },

      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'Treejer' },


      { hid: 'og:title', property: 'og:title', content: 'Treejer | Planters Without Borders' },
      { hid: 'og:description', name: 'og:description', content: 'Plant a forest and support rural communities worldwide. Treejer uses Web3 to unlock new opportunities in Climate Finance.' },
      { hid: 'og:url', property: 'og:url', content: 'https://treejer.com' },
      { hid: 'og:image', property: 'og:image', content: 'https://treejer.com/featureImage/jake-hills.jpg' },

      { hid: 'twitter:card', property: 'twitter:card', content: 'summary_large_image' },
      { hid: 'twitter:title', property: 'twitter:title', content: 'Treejer | Planters Without Borders' },

      { hid: 'og:locale:alternate', property: 'og:locale:alternate', content: 'en' }


    ],
    script: [{
      src: 'https://code.responsivevoice.org/responsivevoice.js?key=U26BzgW7',
      name: 'responsivevoice'
    }],
    link: [
      { rel: 'apple-touch-icon', sizes: '180x180', type: 'image/png', href: '/apple-touch-icon.png' },
      { rel: 'icon', sizes: '32x32', type: 'image/png', href: '/favicon-32x32.png' },
      { rel: 'icon', sizes: '16x16', type: 'image/png', href: '/favicon-16x16.png' },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'mask-icon', href: '//safari-pinned-tab.svg', color: '#5bbad5' },
    ]
  },
  env: {
    baseUrl: process.env.BASE_URL || 'https://treejer.com',
    ethPrice: process.env.ETH_PRICE,
    contractAuctionAddress: process.env.CONTRACT_TREE_AUCTION_ADDRESS,
    contractIncrementalSale: process.env.CONTRACT_INCREMENTAL_SELL_ADDRESS,
    contractTreeRegularSale: process.env.CONTRACT_REGULAR_SELL_ADDRESS,
    contractHonoraryTree: process.env.CONTRACT_COMMUNITY_GIFTS_ADDRESS,
    treeAddress: process.env.CONTRACT_TREE_ADDRESS,
    treeboxContractAddress: process.env.CONTRACT_TREE_BOX_ADDRESS,
    treeboxPaymasterContractAddress: process.env.CONTRACT_PAYMASTER_TREE_BOX,
    daiTokenAddress: process.env.DAI_TOKEN_ADDRESS_RINKEBY,
    wethTokenAddress: process.env.WETH_TOKEN_ADDRESS_RINKEBY,
    etherscanApiKEY: process.env.ETHERSCAN_API_KEY,
    apiUrl: process.env.API_URL || 'https://api.treejer.com',
    ipfsPostUrl: process.env.IPFS_POST_URL || 'https://ipfs.treejer.com/api/v0/add',
    ipfsGetUrl: process.env.IPFS_GET_URL || 'https://ipfs.treejer.com/ipfs/',
    fortmatic: process.env.FORTMATIC,
    gravatar: process.env.GRAVATAR,
    transakApiKey: process.env.TRANSAK_API_KEY, // Your API Key
    transakEnvironment: process.env.TRANSAK_ENV, // STAGING/PRODUCTION
    transakNetworks: process.env.TRANSAK_NETWROKS,
    transakDefaultNetwork: process.env.TRANSAK_DEFAULT_NETWROK,
    etherScanUrl: process.env.ETHERSCAN_URL,
    graphqlUrl: process.env.GRAPHQL_URL,
    zeroAddress: "0x0000000000000000000000000000000000000000",
    networkName: process.env.NETWORK_NAME,
    networkId: process.env.NETWORK_ID

  },

  loading: {
    color: 'rgba(103,182,140,0.62)',
    failedColor: 'rgba(238,45,14,0.69)',
    height: '4px',
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 8px 16px'
  },

  /*
   ** Global CSS
   */
  css: [
    '@/assets/main.scss'
  ],
  middleware: ['urlParamToCookie'],
  router: {
    linkActiveClass: 'active-link'
  },

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~plugins/swiper.js', ssr: false },
    { src: '~plugins/typer.js', ssr: false },
    { src: '~plugins/maps.js', ssr: false },
    { src: '~plugins/vueFormulate.js', ssr: false },
    { src: '~plugins/web3.js', ssr: false },
    { src: '~plugins/accountSlice.js', ssr: false },
    { src: '~plugins/num.js' },
    { src: '~plugins/avatar.js' },
    { src: '~plugins/axios.js' }

  ],
  buildModules: [
    ['@nuxtjs/dotenv', { filename: '.env' }],
    ['@nuxtjs/pwa'],
    '@nuxtjs/google-analytics',
    ['@netsells/nuxt-hotjar', { 
      id: process.env.HOTJAR_ID, 
      sv: process.env.HOTJAR_SV,
  }],
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
      test: /\.(png|jpe?g|gif|svg|webp|txt)$/,
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
    ['nuxt-clipboard', { autoSetContainer: true }],
    // 'nuxt-clipboard',
    'cookie-universal-nuxt',
    '@nuxtjs/axios',

    '@nuxtjs/style-resources', ['nuxt-fontawesome'],
    'nuxt-i18n',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    // ['@netsells/nuxt-hotjar', {
    //   id: '1662889',
    //       sv: '6',
    //   }],
    ['nuxt-gmaps', {
      key: process.env.GOOGLE_MAP_API_KEY,
      //you can use libraries: ['places']
    }],
    '@nuxtjs/apollo',
    ['@nuxtjs/moment', {
      plugins: [
        'moment-strftime'
      ]
    }]
  ],
  sitemap: {
    hostname: 'https://treejer.com',
    gzip: true,
    sitemaps: [
      {
        path: '/sitemap-static.xml',
        exclude: [
          '/spend',
          '/spend/*',
          '/stats',
        ],
        routes: [
          {
            url: '/',
            changefreq: 'monthly',
            priority: 1,
            lastmod: '2022-01-19T13:30:00.000Z'
          },
          {
            url: '/genesis',
            changefreq: 'monthly',
            priority: 0.9,
            lastmod: '2022-01-19T13:30:00.000Z'
          },
          {
            url: '/partnerships',
            changefreq: 'monthly',
            priority: 0.8,
            lastmod: '2022-01-19T13:30:00.000Z'
          },
          {
            url: '/forest/referral',
            changefreq: 'monthly',
            priority: 0.8,
            lastmod: '2022-01-19T13:30:00.000Z'
          },
          {
            url: '/about',
            changefreq: 'monthly',
            priority: 0.7,
            lastmod: '2022-01-19T13:30:00.000Z'
          },
          {
            url: '/contact',
            changefreq: 'monthly',
            priority: 0.7,
            lastmod: '2022-01-19T13:30:00.000Z'
          }
        ]
      },
      {
        path: '/sitemap-trees.xml',
        exclude: ['/**'], //exlcude all static routes
        routes: () => {
          let treeRoutes = []
          for (let i = 1; i <= 10; i++) {
            treeRoutes.push(`/tree/${i}`);
          }
          return treeRoutes;
        },
        // routes: async () => {
        //   const { data } = await axios.get('/trees')
        //   return data.map((user) => `/tree/${user.username}`)
        // }
      }
    ]
  },
  robots: {
    UserAgent: '*',
    Allow: '/',
    Sitemap: 'https://treejer.com/sitemapindex.xml'
  },
  clipboard: {
    autoSetContainer: true
  },
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: process.env.GRAPHQL_URL
      }
    }
  },
  pwa: {
    manifest: {
      short_name: "Treejer",
      name: 'Treejer',
      lang: 'en'
    }
  },

  i18n: {
    locales: [{
      name: 'English',
      code: 'en',
      iso: 'en-US',
      file: 'en.js'
    },
      // {
      //   name: 'Farsi',
      //   code: 'fa',
      //   iso: 'fa-FA',
      //   file: 'fa.js'
      // },
      // {
      //   name: 'Turkish',
      //   code: 'tr',
      //   iso: 'tr-TR',
      //   file: 'tr.js'
      // },
      // {
      //   name: 'Arabic',
      //   code: 'ar',
      //   iso: 'ar-AR',
      //   file: 'ar.js'
      // }
    ],
    defaultLocale: 'en',
    loadLanguagesAsync: true,
    lazy: true,
    seo: true,
    langDir: 'lang/',
    detectBrowserLanguage: false
  },
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
  axios: {
    common: {
      'Accept': 'application/json, text/plain, */*',
      'Access-Control-Allow-Origin': '*/*',

    },
  },
  googleAnalytics: {
    id: process.env.GOOGLE_ANALYTICS_ID, // Use as fallback if no runtime config is provided
  },
  publicRuntimeConfig: {
    googleAnalytics: {
      id: process.env.GOOGLE_ANALYTICS_ID
    }
  },
  /*
   ** Build configuration
   */
  build: {

    /*
      ** You can extend webpack config here
      */
    extend(config, ctx) {
    },
    extend: function (config, { isDev, isClient }) {
      config.node = {
        fs: "empty"
      };
    }
  }
}

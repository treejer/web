import Vue from 'vue'

import VueEthereum from 'vue-ethereum'

Vue.use(VueEthereum)

new Vue({
  // your vue config
  eth: new VueEthereum(),
})

<template>
  <div class="head">
    <div class="networkname text-center d-flex align-items-center justify-content-center " style="height: 32px;background: #424242;">
      <p class="param-sm text-white mb-0">
        Treejer is now live on  testnet. Connect your wallet to Ropsten  Test Network and start your forest! !
        <a class="text-white" target="_blank" href="https://blog.treejer.com/tree-funding-and-climate-credit-earning-modules-on-testnet/ " >👉 Read More 👈</a>
      </p>

    </div>
    <div class="headers container"  style="min-height:5vh">
      <keep-alive>
        <b-navbar toggleable="lg">
          <b-navbar-brand
            class="pointer-event position-relative"
            :to="localePath('index')"
          >
            <img
              class="img-fluid pointer-event"
              alt="logo"
              name="treejer"
              src="/logo/treejer.png"
            />
          </b-navbar-brand>
          <b-navbar-nav>
            <client-only>
              <div class="d-lg-none d-block">
                <Metamask @showModal="showModal"/>

              </div>

            </client-only>
          </b-navbar-nav>
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>


          <b-collapse
            class="text-right justify-content-between"
            id="nav-collapse"
            is-nav
          >
            <!-- Right aligned nav items -->

            <b-navbar-nav class="header-menu">
              <!--            <b-nav-item  :class="{ 'active': activeIndex === index }"-->
              <!--                         v-for="(item,index) in items" :name="item.name" :key="index" :to="item.href"-->
              <!--                         @click="activeMenu(item,index)">-->
              <!--              {{item.name}}-->
              <!--            </b-nav-item>-->
            </b-navbar-nav>
            <client-only>
              <div class="d-lg-block d-none">
                <Metamask @showModal="showModal"/>
              </div>
            </client-only>
          </b-collapse>
        </b-navbar>


      </keep-alive>
      <b-modal
        centered
        hide-footer
        id="five" title=" ">
        <Wallets/>
      </b-modal>
      <b-modal id="netName" hide-footer class="justify-content-center text-center" size="md" ok-only no-stacking>
        <div class="text-center justify-content-center m-auto">
          <h4 class="title-md tr-gray-one mb-4">Error occurred</h4>
          <p class="param tr-gray-three">Metamask should be on <strong>Ropsten </strong> network.</p>
          <p class="param tr-gray-three">Currently it on {{ $store.state.netWorkName }} instead</p>
        </div>

      </b-modal>

    </div>

  </div>

</template>

<script>

import Metamask from "../components/Metamask";
import Wallets from "../components/Wallets";

export default {
  layout: 'dashboard',
  name: "TreejerHeader",
  components: {
    Wallets,
    Metamask,
  },
  data() {
    return {
      wallets: [
        {name: "Metamask", step: 1},
        {name: "Wallet Connect", step: 2},
        {name: "Trezor", step: 3},
        {name: "Ledger Nano", step: 4},
        {name: "Coinbase Wallet", step: 5}
      ],
      activeWallet: 0,
      formError: null,
      account: null,
      user: false,
      activeIndex: 0,
      items: [
        {name: "About", step: 1, href: 'about'},
        {name: "Blog", step: 2},
        {name: "For Business", step: 3, href: 'business'},
        {name: "Find My Tree", step: 4, href: 'find'},
      ]
    };
  },
  async mounted() {
    let self = this
    await self.accountChange()
    await this.$store.dispatch('networkNames')
    setTimeout(()=>{
      self.$store.state.netWorkName !== 'ropsten' ? self.$bvModal.show('netName') : null
    },1000)




  },
  computed: {},
  methods: {
    showModal(e) {
      this.$bvModal.show('five')
    },
    async accountChange() {
      if(this.$cookies.get('walletName') === 'metamask'){
        if(process.client){
        let self =this
          await window.ethereum.on('accountsChanged', function (accounts) {
            if(self.$cookies.get(accounts) !== accounts[0]){
              self.$store.commit('SET_USER',accounts[0])
              self.$cookies.set('account',accounts[0])
              const history = self.$router.history.current.fullPath
              self.$router.push(history)
              self.$forceUpdate()
            }

          });
      }}
    },
    activeWallets(item, index) {
      this.activeWallet = index;
    },
    loginToast(variant, title, message, href) {
      this.$bvToast.toast(message, {
        title: title,
        variant: variant,
        href: href
      });
    },
    makeToast(variant = null) {
      this.$bvToast.toast('install metamask from here', {
        title: `https://metamask.io/' ${variant || 'default'}`,
        href: 'https://metamask.io/',
        variant: variant,
        solid: true
      })
    },
    activeMenu(item, index) {
      if (item.name === 'Blog') {
        window.open('https://blog.treejer.com/', '_blank')
      } else {
        this.activeIndex = index;
      }
    },
  },
  created() {

  },

};
</script>

<style lang="scss">
  @media (max-width: 1023px) {
    .headers {
      padding: 0 10px;

      .header-menu {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 0!important;
      }

      .navbar-light .navbar-toggler-icon {
        background-image: url("../assets/images/home/burger.svg");
        background-size: auto;
      }

      .navbar-light .navbar-toggler {
        color: rgba(0, 0, 0, 0.5);
        border-color: transparent;
      }

      .navbar {

        padding: 0;
      }
    }
  }
</style>

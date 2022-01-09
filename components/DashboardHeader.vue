<template>
  <div class="head">
    <div
      class="networkname text-center d-flex align-items-center justify-content-center"
      style="height: 32px; background: #424242"
    >
      <p class="param-sm text-white mb-0">
        Treejer is now live on testnet. Connect your wallet to {{ networkName }} Test
        Network and start your forest! !
        <a
          class="text-white"
          href="https://blog.treejer.com/tree-funding-and-climate-credit-earning-modules-on-testnet/ "
          target="_blank"
        >
          <img
            alt="read more"
            class="d-inline-flex align-self-start"
            height="15px"
            src="../assets/images/all/hand-right.png"
            width="15px"/>
          Read More
          <img
            alt="read more"
            height="15px"
            src="../assets/images/all/hand-left.png"
            width="15px"
          /></a>
      </p>
    </div>
    <div class="headers container" style="min-height: 5vh">
      <keep-alive>
        <b-navbar toggleable="lg">
          <b-navbar-brand
            :to="localePath('index')"
            class="pointer-event position-relative"
          >
            <img
              alt="logo"
              class="img-fluid pointer-event"
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
            id="nav-collapse"
            class="text-right justify-content-between"
            is-nav
          >
            <b-navbar-nav class="header-menu"></b-navbar-nav>
            <client-only>
              <div class="d-lg-block d-none">
                <Metamask @showModal="showModal"/>
              </div>
            </client-only>
          </b-collapse>
        </b-navbar>
      </keep-alive>
      <b-modal id="five" centered hide-footer title=" ">
        <Wallets/>
      </b-modal>
      <b-modal
        id="netName"
        class="justify-content-center text-center"
        hide-footer
        no-stacking
        ok-only
        size="md"
      >
        <div class="text-center justify-content-center m-auto">
          <h4 class="title-md tr-gray-one mb-4">Error occurred</h4>
          <p class="param tr-gray-three">
            Metamask should be on <strong> {{ networkName }} </strong> network.
          </p>
          <p class="param tr-gray-three">
            Currently it on {{ $store.state.netWorkName }} instead
          </p>
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
      ],
      networkName: process.env.NETWORK_NAME
    };
  },
  async mounted() {
    let self = this
    // await web3.eth.getAccounts().then(res => {
    self.account = this.$cookies.get('account')
    await this.$store.dispatch('networkNames')
    // })
    await self.accountChange()
    setTimeout(() => {

      if(this.$web3.givenProvider === null) {
        return;
      }

      this.$web3.eth.net.getId().then(netId => {

        if (netId.toString() === process.env.NETWORK_ID.toString()) {
          return
        }
        self.$bvToast.toast('Switch to ' + process.env.NETWORK_NAME + ' Network', {
          title: `Wrong network`,
          href: 'https://blog.treejer.com/tree-funding-and-climate-credit-earning-modules-on-testnet/',
          variant: 'danger',
          solid: true,
          toaster: 'b-toaster-bottom-left',
          noAutoHide: true,
        })
      })
    }, 1000)
  },
  computed: {},
  methods: {
    showModal(e) {
      this.$bvModal.show('five')
    },
    async accountChange() {
      if (this.$cookies.get('walletName') === 'metamask') {
        let self = this
        if (process.client) {
          await window.ethereum.on('accountsChanged', function (accounts) {
            if (self.account !== accounts[0]) {
              self.$store.commit('SET_USER', accounts[0])
              self.$cookies.set('account', accounts[0])
              let routeData = self.$router.resolve({path: `/forest/${accounts[0]}`, params: {id: accounts[0]}});
              window.open(routeData.href, '_Self');

            }
          });
        }
      }
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
      margin: 0 !important;
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

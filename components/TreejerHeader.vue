<template>
  <div class="headers container" style="min-height: 10vh">
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
            <b-nav-item
                        v-for="(item,index) in items" :name="item.name" :key="index" :to="item.href"
                        @click="activeMenu(item,index)">
              {{item.name}}
            </b-nav-item>
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
      hide-footer
      id="five" title=" ">
      <Wallets />
    </b-modal>


  </div>
</template>

<script>

import Metamask from "../components/Metamask";
import Wallets from "../components/Wallets";

export default {
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
          {name: "Find My Tree", step: 4, href: 'find'},
          {name: "For Business", step: 3, href: 'business'},
          {name: "Blog", step: 2},
          {name: "About", step: 1, href: 'about'},
        ]
      };
    },
    computed: {

    },
    methods: {
      showModal(e){

        this.$bvModal.show('five')
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
      async accountChange() {
        if (process.client) {
          let self = this
          if (typeof window.ethereum !== 'undefined') {
            await window.ethereum.on('accountsChanged', function (accounts) {
              // Time to reload your interface with accounts[0]!
              self.$store.commit('SET_USER', accounts[0])
              self.$cookies.set('account', accounts[0])
              self.$router.push('/')
            });
          }

        }
      },
      activeMenu(item, index) {
        if (item.name === 'Blog') {
          window.open('https://blog.treejer.com/', '_blank')
        } else {
          this.activeIndex = index;
        }
      },
    },
    mounted() {
      this.accountChange()
    }
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

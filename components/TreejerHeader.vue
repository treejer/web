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
        <b-navbar-nav class="mobile-navbar">
        
          <client-only>
            <div class="d-lg-none d-block w-md-100">
              <Metamask @showModal="showModal" />
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
            <NuxtLink to="/genesis" class="nav-item">
              <span class="nav-link">Genesis</span>
            </NuxtLink>
            <NuxtLink to="/partnerships" class="nav-item">
              <span class="nav-link">Partnerships</span>
            </NuxtLink>
            <a href="https://blog.treejer.com" target="_blank" class="nav-item">
              <span name="Blog" class="nav-link"> Blog </span>
            </a>
            <NuxtLink to="/about" class="nav-item">
              <span class="nav-link">About</span>
            </NuxtLink>
          </b-navbar-nav>
          <client-only>
            <div class="d-lg-block d-none w-md-100">
              <Metamask @showModal="showModal" />
            </div>
          </client-only>
        </b-collapse>
      </b-navbar>
    </keep-alive>
    <b-modal hide-footer id="five" title=" ">
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
        { name: "Metamask", step: 1 },
        { name: "Wallet Connect", step: 2 },
        { name: "Trezor", step: 3 },
        { name: "Ledger Nano", step: 4 },
        { name: "Coinbase Wallet", step: 5 },
      ],
      activeWallet: 0,
      formError: null,
      account: null,
      user: false,
    };
  },
  computed: {},
  methods: {
    showModal(e) {
      this.$bvModal.show("five");
    },
    activeWallets(item, index) {
      this.activeWallet = index;
    },
    loginToast(variant, title, message, href) {
      this.$bvToast.toast(message, {
        title: title,
        variant: variant,
        href: href,
      });
    },
    makeToast(variant = null) {
      this.$bvToast.toast("install metamask from here", {
        title: `https://metamask.io/' ${variant || "default"}`,
        href: "https://metamask.io/",
        variant: variant,
        solid: true,
      });
    },
    async accountChange() {
      if (this.$cookies.get("walletName") === "metamask") {
        if (process.client) {
          let self = this;
          await window.ethereum.on("accountsChanged", function (accounts) {
            if (self.account !== accounts[0]) {
              self.$store.commit("SET_USER", accounts[0]);
              self.$cookies.set("account", accounts[0]);

              let history = self.$router.currentRoute.fullPath;
              let routeData = self.$router.resolve({ path: history });
              window.open(routeData.href, "_Self");
            }
          });
        }
      }
    },
  },
  async mounted() {
    let self = this;
    self.account = this.$cookies.get("account");
    await this.accountChange();
  },
};
</script>

<style lang="scss">
.headers {
  a {
    transition: all ease-in 0.2s;
    text-align: left;
  }

  a:hover {
    text-decoration: none;
    color: #67b68c;
  }
}
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

@media screen and (max-width: 768px) {
  .headers {
    .mobile-navbar {
      width: 64%;
    }

    .navbar-brand {
      margin-right: 0;
    }
  }
  
}
  
</style>

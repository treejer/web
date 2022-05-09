<template>
  <div class="headers container" style="min-height: 10vh">
    <keep-alive>
      <b-navbar toggleable="lg">
        <b-navbar-brand
          class="pointer-event position-relative d-flex d-lg-block"
        >
          <nuxt-link :to="localePath('/')">
            <img
              class="img-fluid pointer-event"
              alt="logo"
              name="treejer"
              src="/logo/treejer.png"
          /></nuxt-link>
          <!-- <Flags class="d-block d-lg-none ml-3" /> -->
        </b-navbar-brand>
        <!-- <b-navbar-nav class="mobile-navbar">
          <client-only>
            <div class="d-lg-none d-block w-md-100">
              <Metamask @showModal="showModal" />
            </div>
          </client-only>
        </b-navbar-nav> -->
        <b-navbar-toggle
          target="nav-collapse"
          @click="showMobileSidebar()"
        ></b-navbar-toggle>
        <b-collapse
          class="text-right justify-content-between d-none d-lg-flex"
          id="nav-collapse"
          is-nav
        >
          <!-- Right aligned nav items -->
          <b-navbar-nav class="header-menu">
            <NuxtLink :to="localePath('/genesis')" class="nav-item">
              <span class="nav-link"> {{ $t("header.genesis") }}</span>
            </NuxtLink>
            <NuxtLink :to="localePath('/partnerships')" class="nav-item">
              <span class="nav-link">{{ $t("header.partnerships") }}</span>
            </NuxtLink>
            <a href="https://blog.treejer.com" target="_blank" class="nav-item">
              <span name="Blog" class="nav-link">
                {{ $t("header.blog") }}
              </span>
            </a>
            <NuxtLink :to="localePath('/about')" class="nav-item">
              <span class="nav-link">{{ $t("header.about") }}</span>
            </NuxtLink>
            <Flags class="d-none d-lg-block" />
          </b-navbar-nav>
          <client-only>
            <div class="d-lg-block d-none w-md-100">
              <Metamask @showModal="showModal" />
            </div>
          </client-only>
        </b-collapse>
      </b-navbar>
    </keep-alive>
    <div class="landing-mobile-box-header">
      <LandingMobileHeader
        :landingMobileHeaderStatus="$store.state.showMobileSidebarLanding"
      />
    </div>
    <b-modal hide-footer id="five" title=" ">
      <Wallets />
    </b-modal>
  </div>
</template>

<script>
import Metamask from "../components/Metamask";
import Wallets from "../components/Wallets";
// import Flags from "../components/Flags.vue";
import LandingMobileHeader from "../components/LandingMobileHeader.vue";

export default {
  name: "TreejerHeader",
  components: {
    Wallets,
    Metamask,
    // Flags,
    LandingMobileHeader,
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
      innerWidth: 1440,
      setLandingMobileHeader: false,
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
      this.$bvToast.toast(this.$t("alert.installmetamask"), {
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
    showMobileSidebar() {
      this.setLandingMobileHeader=!this.setLandingMobileHeader
      this.$store.commit("SET_LANDING_MOBILE_SIDEBAR", this.setLandingMobileHeader);
    },
  },
  async mounted() {
    let self = this;
    if (process.client) {
      this.innerWidth = window.innerWidth;
      window.addEventListener("resize", (size) => {
        this.innerWidth = window.innerWidth;
        console.log(this.innerWidth, "self.innerWidth");
      });
    }
    self.account = this.$cookies.get("account");
    await this.accountChange();
  },
  created() {},
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
.mobile-headers {
  .navbar-nav,
  .navbar-toggler {
    z-index: +9999;
  }
  #nav-collapse {
    background: #212121;
    border-radius: 32px 0px 0px 32px;
    height: 100vh;
    width: 100vw;
    z-index: +8888;
    right: 0;
    position: fixed;
    top: 0px;
    transition: none;
    .navbar-nav.header-menu {
      flex-direction: column;
      padding-top: 96px;
      a {
        margin: 15px 25px;

        span {
          color: white;

          height: 100%;
          padding: 0;
          align-items: center;
          vertical-align: center;
          display: flex;
        }
      }
      a.nuxt-link-exact-active {
        font-weight: bolder;
        background: #67b68c;
        border-radius: 10px;
        width: 75%;
        display: flex;
        color: #faf8f1;
        float: left;
        margin: 15px 25px;
        text-align: left;
        justify-content: flex-start;
        height: 64px;
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .headers {
    .mobile-navbar {
      width: 50%;
    }

    .navbar-brand {
      margin-right: 0;
    }
  }
}
@media screen and (max-width: 320px) {
  .headers {
    .mobile-navbar {
      width: 43%;
    }

    .navbar-brand {
      margin-right: 0;
    }
  }
}
@media (min-width: 100px) and (max-width: 1024px) and (orientation: landscape) {
}
</style>

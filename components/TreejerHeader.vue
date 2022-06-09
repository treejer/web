<template>
  <div class="headers container" style="min-height: 10vh">
    <b-navbar toggleable="lg">
      <b-navbar-brand class="pointer-event position-relative d-flex d-lg-block">
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
        target="none"
        @click.prevent="showMobileSidebar()"
      ></b-navbar-toggle>
      <b-collapse
        v-if="innerWidth > 991"
        class="text-right justify-content-between"
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
          <!-- <Flags class="d-none d-lg-block" /> -->
        </b-navbar-nav>
        <client-only>
          <div class="d-lg-block d-none w-md-100">
            <Metamask @showModal="showModal" />
          </div>
        </client-only>
      </b-collapse>
    </b-navbar>
    <div
      class="landing-mobile-box-header"
      v-show="$store.state.showMobileSidebarLanding"
    >
      <div
        class="landing-mobile-header"
        :class="$cookies.get('account') ? 'with-account' : 'no-account'"
      >
        <div class="head-nav p-4">
          <Metamask
            class="landing-mobile-header-metamask"
            @showModal="showModal()"
          />
          <img
            id="burger"
            src="../assets/images/sidebar/close.svg"
            class="pointer-event"
            @click.prevent="showMobileSidebar()"
            alt=""
          />
        </div>

        <div
          class="header-items"
          v-for="(item, index) in headerItems"
          :key="index"
        >
          <li v-if="item.label !== 'blog'" @click.prevent="showMobileSidebar()">
            <nuxt-link :id="index" :to="item.path">
              {{ item.name }}
            </nuxt-link>
          </li>
          <li v-if="item.label === 'blog'" @click.prevent="showMobileSidebar()">
            <a :href="item.href" target="_blank" class="pointer-event">{{
              item.name
            }}</a>
          </li>
        </div>
      </div>
      <!-- <LandingMobileHeader /> -->
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
      headerItems: [
        {
          href: "",
          label: "home",
          name: this.$t("header.home"),
          path: this.localePath("/"),
          icon: "",
        },
        {
          href: "",
          label: "genesis",
          name: this.$t("header.genesis"),
          path: this.localePath("/genesis"),
          icon: "",
        },
        {
          href: "",
          label: "partnerships",
          name: this.$t("header.partnerships"),
          path: this.localePath("/partnerships"),
          icon: "",
        },
        {
          href: "",
          label: "about",
          name: this.$t("header.about"),
          path: this.localePath("/about"),
          icon: "",
        },
        {
          label: "blog",
          name: this.$t("header.blog"),
          path: "",
          href: "https://blog.treejer.com",
          icon: "",
        },
      ],
    };
  },
  computed: {},
  methods: {
    showModal() {
      this.$store.commit("SET_LANDING_MOBILE_SIDEBAR", false);
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
    async showMobileSidebar() {
      this.setLandingMobileHeader = !this.setLandingMobileHeader;
      await this.$store.commit(
        "SET_LANDING_MOBILE_SIDEBAR",
        this.setLandingMobileHeader
      );
    },
  },
  async mounted() {
    let self = this;
    if (process.client) {
      this.innerWidth = window.innerWidth;
      window.addEventListener("resize", (size) => {
        this.innerWidth = window.innerWidth;
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
      padding: 15px 5px 15px 25px;
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
.landing-mobile-header {
  background: #212121;
  border-radius: 32px 0px 0px 32px;
  height: 100vh;
  width: 100vw;
  z-index: +8888;
  right: 0;
  position: fixed;
  top: 0px;
  .head-nav {
    display: flex;
    justify-content: space-between;
    margin-bottom: 34px;
  }
  .header-items {
    height: 64px;
    position: relative;
    margin-bottom: 16px;

    li {
      margin-left: 32px;
      display: flex;
      align-items: center;
      a {
        align-items: center;
        margin: auto;
        width: 75%;
        height: 64px;
        text-align: left;
        color: #faf8f1 !important;
        padding: 20px 0 0 15px;
      }
      a.nuxt-link-exact-active {
        background: #67b68c;
        border-radius: 10px;

        color: #faf8f1 !important;
        float: left;

        height: 64px;
      }
    }
  }
}
.landing-mobile-header.no-account {
  width: 80vw;
}
@media (min-width: 100px) and (max-width: 1024px) and (orientation: landscape) {
  .landing-mobile-header {
    .head-nav {
      margin-bottom: 5px;
    }

    .header-items {
      height: 30px;
      padding: 5px;
      margin-bottom: 5px;
      li {
        a {
          padding: 0 5px;
        }
        a.nuxt-link-exact-active {
          height: 30px;
          padding: 0 5px;
        }
      }
    }
  }
}
</style>

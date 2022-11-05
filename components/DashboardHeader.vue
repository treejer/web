<template>
  <div class="head-treejer-dashborad">
    <!-- <div
      class="networkname text-center d-flex align-items-center justify-content-center"
    >
      <p class="param-sm text-white mb-0"> -->
    <!--        Treejer is now live on testnet. Connect your wallet to {{ networkName }} Test-->
    <!--        Network and start your forest! !-->
    <!-- Announcing the launch of Treejer Protocol with Genesis Trees
        <a
          class="text-white"
          href="https://blog.treejer.com/announcing-the-launch-of-treejer-protocol-with-genesis-trees/"
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
    </div> -->
    <div class="headers container dashboard-header" style="min-height: 5vh">
      <b-navbar>
        <b-navbar-brand
          :to="localePath('index')"
          class="pointer-event position-relative"
          @click.prevent="$store.commit('SET_LANDING_MOBILE_SIDEBAR', false)"
        >
          <img
            alt="logo"
            class="img-fluid pointer-event"
            name="treejer"
            src="/logo/treejer.png"
          />
        </b-navbar-brand>
        <ChangeNetworkerMobile :dashboard='true' />

        <b-navbar-nav class="dahsboard-nav d-lg-block d-none">
          <client-only>
            <Metamask @showModal="showModal" />
          </client-only>
        </b-navbar-nav>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      </b-navbar>
      <b-modal id="five" centered hide-footer title=" ">
        <Wallets />
      </b-modal>
    </div>
  </div>
</template>

<script>
import Metamask from "../components/Metamask";
import Wallets from "../components/Wallets";
import ChangeNetworkerMobile from "@/components/ChangeNetworkerMobile";

export default {
  layout: "dashboard",
  name: "TreejerHeader",
  components: {
    Wallets,
    Metamask,
    ChangeNetworkerMobile,
  },
  data() {
    return {
      formError: null,
      account: null,
      user: false,
      activeIndex: 0,
      items: [
        { name: "About", step: 1, href: "about" },
        { name: "Blog", step: 2 },
        { name: "For Business", step: 3, href: "business" },
        { name: "Find My Tree", step: 4, href: "find" },
      ],
    };
  },
  async mounted() {
    let self = this;
    // await web3.eth.getAccounts().then(res => {
    self.account = this.$cookies.get("account");
    await this.$store.dispatch("networkNames");
    // })
    await self.accountChange();
  },
  computed: {},
  methods: {
    showModal(e) {
      this.$bvModal.show("five");
    },
    async accountChange() {
      if (this.$cookies.get("walletName") === "metamask") {
        let self = this;
        if (process.client) {
          await window.ethereum.on("accountsChanged", function (accounts) {
            if (self.account !== accounts[0]) {
              self.$store.commit("SET_USER", accounts[0]);
              self.$cookies.set("account", accounts[0]);
              let routeData = self.$router.resolve({
                path: `/forest/${accounts[0]}`,
                params: { id: accounts[0] },
              });
              window.open(routeData.href, "_Self");
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
    activeMenu(item, index) {
      if (item.name === "Blog") {
        window.open("https://blog.treejer.com/", "_blank");
      } else {
        this.activeIndex = index;
      }
    },
  },
  created() {},
};
</script>

<style lang="scss">
.head-treejer-dashborad {
  .networkname {
    background: linear-gradient(90deg, #649173 0%, #cec99c 100%);
    height: 34px;
    z-index: +999;
  }
  .dahsboard-nav {
    width: 100%;

    ul {
      width: 100%;
      justify-content: flex-end;
    }
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
  .dahsboard-nav {
    width: 100%;

    ul {
      margin-right: 45px;
    }
  }
}
</style>

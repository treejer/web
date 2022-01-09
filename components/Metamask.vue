<template>
  <b-navbar-nav ref="page" class="metamask">
    <b-nav-form v-if="!$cookies.get('account')">
      <b-button class="connect-button m-auto" @click.prevent="showModal()">
        {{ "Connect Wallet" }}
      </b-button>
      <span class="position-relative">
        <img
          alt="tree"
          class="img-fluid tree pointer-event"
          name="tree"
          src="/tree.svg"
          @click="goToDashboard('/forest')"
        />
        <Badge />
      </span>

    </b-nav-form>

    <b-nav-form
      v-if="$cookies.get('account')"
      class="pointer-event"
    >
      <div
        class="pointer-event accounting-card d-flex align-items-center align-self-center pointer-event"
        @click.prevent="logout()"
      >
        <span v-coin class="param-sm tr-gray-three">{{
            $cookies.get("account")
          }}</span>
        <span class="img"
        ><img
          :src="icon"
          alt="accounting"
          class="img-fluid bg-white d-none d-md-block rounded-circle"
          height="42"
          style="border: solid 2px white"
          width="42"
        /></span>
      </div>
      <span class="position-relative">
      <img
        alt="tree"
        class="img-fluid tree pointer-event"
        name="tree"
        src="/tree.svg"
        @click="goToDashboard(`/forest/${$cookies.get('account')}`)"
      />
        <Badge /></span>

    </b-nav-form>
    <b-modal
      id="seven"
      hide-footer
      @close="$bvModal.hide('seven')"
      @hide="$bvModal.hide('seven')"
    >
      <ul v-if="$cookies.get('walletName')" class="list-style-none seven">
        <li
          class="param-18 tr-gray-two font-weight-bold text-center mt-3 mb-4 text-center"
        >
          Connected with
        </li>
        <li class="pointer-event mb-2">
          <p
            class="tr-gray-three param font-weight-bold d-flex justify-content-between"
            style="
              border: 1px solid #bdbdbd;
              background: #e5e7db;
              padding: 15px 25px;
              width: 75%;
              margin: auto;
              border-radius: 7px;
            "
          >
            <span class="name text-capitalize">
              {{ $cookies.get("walletName") }}
            </span>
            <span class="icon">
              <img
                v-if="$cookies.get('walletName')"
                :alt="$cookies.get('walletName')"
                :src="
                  require(`~/assets/images/wallets/${$cookies.get(
                    'walletName'
                  )}.svg`)
                "
                class="img-fluid bg-white"
              />
            </span>
          </p>
        </li>
        <li
          class="param font-weight-bold tr-gray-two text-center mt-3 whatis position-relative"
        >
          <span style="letter-spacing: -3px"
          >-------------------------------------</span
          ><span style="padding: 0 10px">Your Address</span
        ><span style="letter-spacing: -3px"
        >-------------------------------------</span
        >
        </li>
        <li class="d-flex mt-4 align-items-center justify-content-center">
          <CopyToClipBoard/>
        </li>
        <li class="d-flex mt-4 justify-content-center text-center">
          <button
            class="btn-green param pr-4 pl-4 pt-2 pb-2"
            @click="changeWallet()"
          >
            Change Wallet
          </button>
        </li>
      </ul>
    </b-modal>
  </b-navbar-nav>
</template>

<script>
import Wallets from "./Wallets";
import CopyToClipBoard from "./CopyToClipBoard.vue";
import Badge from '@/components/Badge'

export default {
  components: {Wallets, CopyToClipBoard,Badge},
  props: ["wallets"],

  data() {
    return {
      icon: null,
      account: null,
      hasAccount: false,
      hasAccountSrc: `${this.$cookies.get("account")}`,
      loading: false,
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.account;
    },
  },
  mounted() {
    if (this.$cookies.get("account")) {
      this.changeEthereum();
    } else {
      return null;
    }
  },
  methods: {
    async changeEthereum() {
      let self = this;
      self.icon = `${process.env.gravatar}${this.$cookies
        .get("account")
       }`;
      // await ethereum.on("chainChanged", () => {
      //   document.location.reload();
      // });
    },
    changeWallet() {
      let self = this
      this.$store.dispatch("logout").then(() => {
        window.location.reload()
        // self.$router.push(`/`);
      });
      this.$bvModal.hide("seven");
      this.$bvModal.show("five");
    },
    logout() {
      this.$bvModal.show("seven");
    },
    goToDashboard(item) {
      this.$router.push(`/forest/guest`);
    },
    copyClipboard(e) {
    },
    showModal() {
      this.$emit("showModal");
    },
    activeMenu(item, index) {
      if (item.name === "Blog") {
        window.open("https://blog.treejer.com/", "_blank");
      } else {
        this.activeIndex = index;
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.metamask {
}
</style>

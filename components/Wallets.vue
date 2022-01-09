<template>
  <ul class="wallets tr-gray-three list-style-none d-block position-relative">
    <li class="param-18 tr-gray-two font-weight-bold text-center mt-3 mb-4">
      Select Wallet
    </li>
    <li
      v-for="(item, index) in wallets"
      :key="index"
      class="pointer-event mb-2"
    >
      <client-only>
        <p
          @click.prevent="activeWallets(item, index, $event)"
          class="tr-gray-three param font-weight-bold"
          :key="index"
          :name="item.name"
        >
          <span v-if="item.name === 'Metamask'" class=""
            ><a
              href="https://metamask.io/"
              target="_blank"
              class="tr-gray-three has-metamask"
              >{{ hasMetaMask ? item.name : "Install Metamask" }}
            </a>
          </span>
          <span v-else class="name text-capitalize">{{ item.name }}</span>
          <span class="icon">
            <img :src="item.src" :alt="item.name" class="img-fluid" />
          </span>
        </p>
      </client-only>
    </li>
    <li
      class="param font-weight-bold tr-gray-two text-center mt-3 whatis position-relative"
    >
      <span style="letter-spacing: -3px"
        >-------------------------------------</span
      ><span style="padding: 0 10px">What is a wallet? </span
      ><span style="letter-spacing: -3px"
        >-------------------------------------</span
      >
    </li>
    <li class="d-flex justify-content-center mt-4">
      <button
        @click="
          goTo(
            'https://discuss.treejer.com/question/how-can-i-use-treejer-on-ropsten-test-network-5f21a1bd9afffd3fb1092276'
          )
        "
        class="btn-gray param-sm text-white"
        style="margin: 0 15px; background: #424242"
      >
        Learn more
      </button>
      <button
        @click="goTo('https://discuss.treejer.com/')"
        class="btn-gray param-sm text-white"
        style="margin: 0 15px; background: #424242"
      >
        Get help
      </button>
    </li>
    <li
      class="param-sm justify-content-center mt-4 terms text-center font-weight-bold"
    >
      By connecting your wallet you agree to our
      <span class="tr-green"
        ><a
          class="d-inline-flex pointer-event tr-green"
          href="https://docs.treejer.com/legal/terms-of-service"
          target="_blank"
          >Terms of Service </a
        >,<a
          class="d-inline-flex pointer-event tr-green"
          href="https://docs.treejer.com/legal/privacy-policy"
          target="_blank"
        >
          Privacy</a
        >
      </span>
      and
      <span class="tr-green"
        ><a
          target="_blank"
          class="d-inline-flex pointer-event tr-green"
          href="https://docs.treejer.com/legal/cookie-policy"
          >Cookie Policy</a
        >.</span
      >
    </li>
    <b-modal hide-footer centered id="six">
      <ul
        class="list-style-none six"
        v-if="connectingWallet || $cookies.get('walletName')"
      >
        <li
          class="param-18 tr-gray-two font-weight-bold text-center mt-3 mb-4 text-center"
        >
          Connecting to
        </li>
        <li class="pointer-event mb-2">
          <p class="tr-gray-three param font-weight-bold">
            <span class="name text-capitalize">{{
              connectingWallet || $cookies.get("walletName")
            }}</span>
            <span class="icon">
              <img
                v-if="connectingWallet || $cookies.get('walletName')"
                :src="
                  require(`~/assets/images/wallets/${
                    connectingWallet || $cookies.get('walletName')
                  }.svg`)
                "
                :alt="connectingWallet || $cookies.get('walletName')"
                class="img-fluid"
              />
            </span>
          </p>
        </li>
        <li class="text-center m-auto pt-5 d-flex justify-content-center">
          <BeatLoader />
        </li>
      </ul>
    </b-modal>
  </ul>
</template>

<script>
import BeatLoader from "vue-spinner/src/BeatLoader.vue";
import Web3 from "web3";

export default {
  name: "Wallets",
  components: {
    BeatLoader,
  },
  data() {
    return {
      wallets: [
        {
          name: "Metamask",
          step: 1,
          src: require("~/assets/images/wallets/metamask.svg"),
        },
        {
          name: "Torus",
          step: 2,
          src: require("~/assets/images/wallets/torus.svg"),
        },
        {
          name: "Fortmatic",
          step: 3,
          src: require("~/assets/images/wallets/fortmatic.svg"),
        },
        {
          name: "Wallet Connect",
          step: 4,
          src: require("~/assets/images/wallets/walletconnect.svg"),
        },
        {
          name: "Portis",
          step: 5,
          src: require("~/assets/images/wallets/portis.svg"),
        },
      ],
      activeWallet: 0,
      screenX: null,
      screenY: null,
      hasMetaMask: false,
      connectingWallet: null,
      account: this.$cookies.get("account"),
    };
  },
  computed: {},
  methods: {
    async activeWallets(item, index, event) {
      let self = this;
      self.activeWallet = index;
      self.connectingWallet = item.name.toLowerCase();
      switch (item.name) {
        case "Metamask":
          if (self.hasMetaMask) {
            this.$store.commit("SET_WALLET", "metamask");
            this.$cookies.set("walletName", "metamask");
            if (window.ethereum !== "undefined") {
              this.$bvModal.show("six");
              this.$store
                .dispatch("metaMask")
                .then(() => {
                  self.$bvModal.hide("six");
                  self.$bvModal.hide("five");
                })
                .then(() => {});
            } else {
              self.makeToast("danger");
            }
          } else {
            window.open("https://metamask.io/", "_blank");
          }

          break;
        case "Wallet Connect":
          this.$bvModal.show("six");
          this.$store
            .dispatch("walletConnect")
            .then(() => self.$bvModal.hide("six"))
            .catch((err) => {
              self.$bvModal.hide("six");
              self.$bvModal.hide("five");
            })
            .then(() => {});
          break;
        case "Fortmatic":
          const Fortmatic = require("fortmatic");
          const fm = await new Fortmatic(process.env.FORTMATIC, process.env.NETWORK_NAME);
          const web3 = await new Web3(fm.getProvider());
          web3.currentProvider.enable();

          this.$bvModal.show("six");
          if (process.client) {
            this.$store
              .dispatch("fortmatic", {
                fm: fm,
                web3: web3,
              })
              .then(() => {
                self.$bvModal.hide("six");
                self.$bvModal.hide("five");
                window.location.reload();
              });
            if (this.$store.state.modalFive === false) {
              this.$bvModal.hide("five");
              this.$bvModal.hide("six");
            }
          }
          break;
        case "Portis":
          if (process.client) {
            const Portis = require("@portis/web3");
            let self = this;
            const portis = new Portis(process.env.PORTIS, process.env.NETWORK_NAME, {
              scope: ["email"],
            });

            const web3 = new Web3(portis.provider);
            await web3.currentProvider.enable();

            this.$bvModal.show("six");
            this.$store
              .dispatch("portis", {
                portis: portis,
                web3: web3,
              })
              .then(() => {
                self.$bvModal.hide("six");
                self.$bvModal.hide("five");
                window.location.reload();
              })
              .catch((err) => {
                self.$bvModal.hide("six");
                self.$bvModal.hide("five");
              })
              .then(() => {});
          }
          break;

        case "Torus":
          this.$bvModal.show("six");

          if (process.client) {
            const Torus = require("@toruslabs/torus-embed");

            let self = this;
            const torus = new Torus();
            await torus.init();
            await torus.login(); // await torus.ethereum.enable()
            
            const web3 = new Web3(torus.provider);

            await web3.currentProvider.enable();
            await torus.ethereum.enable();

            this.$store
              .dispatch("torus", {
                torus: torus,
                web3: web3,
              })
              .then(() => {
                self.$bvModal.hide("six");
                self.$bvModal.hide("five");
                window.location.reload();
              })
              .catch((err) => {
                self.$bvModal.hide("six");
                self.$bvModal.hide("five");
              });
          }

          break;
      }
    },
    // log() {
    //   this.$store.commit('SET_WALLET', 'metamask')
    //   this.$cookies.set('walletName', 'metamask')
    //   this.$bvModal.show('six');
    //   if (ethereum !== 'undefined') {
    //     this.getAccount();
    //   } else {
    //     this.makeToast()
    //   }
    // },
    makeToast(variant = null) {
      if (this.$store.state.toast) {
        return this.$bvToast.toast("install metamask from here", {
          title: `https://metamask.io/'`,
          href: "https://metamask.io/",
          variant: variant,
          solid: true,
        });
      }
    },
    goTo(item) {
      window.open(item, "_blank");
    },
  },
  mounted() {
    console.log(this.$cookies.get("account"), "accountwallets");
    if (process.client) {
      if (
        window.ethereum === "undefined" ||
        window.ethereum === null ||
        !window.ethereum
      ) {
        this.hasMetaMask = false;
      } else {
        this.hasMetaMask = true;
      }
    }
  },
};
</script>

<style lang="scss">
.wallets {
  .has-metamask {
    text-decoration: none;
  }
  p:hover {
    color: #424242;
  }
  .border {
    border: solid 1px #d04f45;
  }
  p {
    width: 70%;
    border-radius: 6px;
    border: solid 1px #bdbdbd;
    background-color: transparent;
    padding: 10px 15px;
    margin: 0 auto;
    text-align: center;
  }
  p:hover,
  .has-metamask:hover {
    color: #424242;
  }
  .terms {
    width: 70%;
    margin: auto;
  }

  p.active {
    width: 70%;
    border-radius: 6px;
    border: solid 1px #bdbdbd;
    background-color: #e5e7db;
    padding: 10px 15px;
    margin: 0 auto;
    transition: 0.5s ease-all;
  }
}

.six .pointer-event p {
  margin: auto;
  width: 70%;
  border: solid 1px #bdbdbd;
  display: flex;
  background-color: #e5e7db;
  padding: 15px 25px;
  border-radius: 6px;
}
</style>

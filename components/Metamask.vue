<template>
  <b-navbar-nav ref="page" class="metamask">
    <b-nav-form v-if="!$cookies.get('account')">
      <b-button class="connect-button m-auto" @click.prevent="showModal()">
        {{ "Connect Wallet" }}
      </b-button>

      <NuxtLink :to="localePath('/forest/guest')" class="position-relative">
        <img
          alt="tree"
          class="img-fluid tree pointer-event"
          name="tree"
          src="/tree.svg"
        />
        <Badge />
      </NuxtLink>
    </b-nav-form>

    <b-nav-form class="pointer-event" v-if="$cookies.get('account')">
      <div
        v-if="connectedNetwrokID != runningNetworkID"
        class="
          pointer-event
          accounting-card
          d-flex
          align-items-center align-self-center
          pointer-event
        "
        @click.prevent="switchNetwork()"
      >
        <b-button class="connect-button switch-wallet"> Switch to {{ runningNetwrokName }} </b-button>
      </div>

      <div
        class="
          pointer-event
          accounting-card
          d-flex
          align-items-center align-self-center
          pointer-event
        "
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

      <NuxtLink
        :to="`/forest/${$cookies.get('account')}`"
        class="position-relative"
      >
        <img
          alt="tree"
          class="img-fluid tree pointer-event"
          name="tree"
          src="/tree.svg"
        />
        <Badge />
      </NuxtLink>
    </b-nav-form>
    <b-modal
      id="seven"
      hide-footer
      @close="$bvModal.hide('seven')"
      @hide="$bvModal.hide('seven')"
    >
      <ul v-if="$cookies.get('walletName')" class="list-style-none seven">
        <li
          class="
            param-18
            tr-gray-two
            font-weight-bold
            text-center
            mt-3
            mb-4
            text-center
          "
        >
          Connected with
        </li>
        <li class="pointer-event mb-2">
          <p
            class="
              tr-gray-three
              param
              font-weight-bold
              d-flex
              justify-content-between
            "
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
          class="
            param
            font-weight-bold
            tr-gray-two
            text-center
            mt-3
            whatis
            position-relative
          "
        >
          <span style="letter-spacing: -3px"
            >-------------------------------------</span
          ><span style="padding: 0 10px">Your Address</span
          ><span style="letter-spacing: -3px"
            >-------------------------------------</span
          >
        </li>
        <li class="d-flex mt-4 align-items-center justify-content-center">
          <CopyToClipBoard />
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
import Badge from "@/components/Badge";

export default {
  components: { Wallets, CopyToClipBoard, Badge },
  props: ["wallets"],

  data() {
    return {
      icon: null,
      account: null,
      hasAccount: false,
      hasAccountSrc: `${this.$cookies.get("account")}`,
      loading: false,
      runningNetworkID: parseInt(process.env.NETWORK_ID),
      runningNetwrokName: process.env.NETWORK_NAME,

      connectedNetwrokID: parseInt(process.env.NETWORK_ID),
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.account;
    },
  },
  async mounted() {
    if (this.$cookies.get("account")) {
      this.changeEthereum();
    } else {
      return null;
    }

    let self = this;
    setTimeout(async () => {
      if (process.client && self.$web3.givenProvider) {
        self.connectedNetwrokID = await self.$web3.eth.net.getId();
      }
    }, 500);

    if (process.client && window.ethereum) {
     
      window.ethereum.on('networkChanged', function(networkId){
        console.log('networkChanged',networkId);
        self.connectedNetwrokID = networkId;
        window.location.reload();
      });
    } 


  },

  methods: {

    async switchNetwork() {
      // this.$web3.currentProvider.enable();
      await this.$web3.currentProvider.enable();

      try {


        await this.$web3.currentProvider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: this.$dec2hex(process.env.NETWORK_ID) }],
        });

        window.location.reload();

      } catch (error) {
        if (error.code === 4902) {
          try {

            if(process.env.NETWORK_ID.toString() ==='137') {

              await this.$web3.currentProvider.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: "0x137",
                    chainName: "Polygon Mainnet",
                    rpcUrls: ["https://polygon-rpc.com", "https://rpc.matic.today"],
                    nativeCurrency: {
                      name: "Matic",
                      symbol: "Matic",
                      decimals: 18,
                    },
                    blockExplorerUrls: ["https://polygonscan.com"],
                  },
                ],
              });

            }
            
          } catch (error) {
            console.log(error.message, "error");
          }
        }
      }
    },
    async changeEthereum() {
      let self = this;
      self.icon = `${process.env.gravatar}${this.$cookies.get("account")}`;
      // await ethereum.on("chainChanged", () => {
      //   document.location.reload();
      // });
    },
    changeWallet() {
      let self = this;
      this.$store.dispatch("logout").then(() => {
        window.location.reload();
        // self.$router.push(`/`);
      });
      this.$bvModal.hide("seven");
      this.$bvModal.show("five");
    },
    logout() {
      this.$bvModal.show("seven");
    },
    goToDashboard(item) {
      this.$router.push(this.localePath(`/forest/guest`));
    },
    copyClipboard(e) {},
    showModal() {
      this.$emit("showModal");
    },
    activeMenu(item, index) {
      if (item.name === "Blog") {
        window.open("https://blog.treejer.com/", "_blank");
      } else {
        this.activeIndex = index;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.metamask {
  .switch-wallet {
    margin-right: 100px;
    width: 142px;
  }


  @media screen and (max-width: 767px) {
    .switch-wallet {
      margin-right: 0;
      width: 80px;
      position: absolute;
      left: 80px;
      z-index: +10;
      padding: 0;

    }

    .tree {
      margin: 0;
    }
  }


  
}
</style>

<template>
  <section
    class="
      position-relative
      pt-5
      checkout-advancefund
      position-relative
      col-lg-10 col-12
      mb-5
    "
  >
    <div class="container-fluid">
      <div class="row tree-count">
        <!-- {{ $route.params }} -->
        <div class="box-left col-lg-9">
          <div class="row">
            <div
              class="mb-3 col-lg-4 col-12"
              v-for="(item, index) in shoppingList"
              :key="index + item.model.id"
            >
              <CardAdvanceFund
                :showCount="true"
                :counts="item.count"
                :model="item.model"
                :change="true"
                :mainPage="false"
              />
            </div>
          </div>
        </div>
        <div class="box-right col-lg-3 text-center mt-4">
          <img src="~/assets/images/treebox/tree.png" alt="tree-treebox" />

          <div class="advance-fund-totall-box bg-yellow-checkout mt-3">
            <div class="row">
              <div
                class="col-6 p-md-0 text-left text-md-center checkout-border"
              >
                <p class="param-xl tr-gray-two font-weight-bolder">
                  {{ totalCounts }}
                </p>
                <p class="param tr-gray-four font-weight-bolder mb-0">Tree</p>
              </div>
              <div class="col-6 p-md-0 mb-direction">
                <p class="param-xl text-center tr-gray-two font-weight-bolder">
                  <span class="param-xl tr-gray-two font-weight-bolder">
                    $ {{ totalPrices }}
                  </span>
                </p>
                <p
                  class="param text-center tr-gray-four font-weight-bolder mb-0"
                >
                  Total DAI
                </p>
              </div>
            </div>
          </div>

          <div>
            <button
              v-if="daiBalance <= 0"
              @click="buyDai()"
              :class="{ disable: loading }"
              class="btn-green-md mt-4 mb-3"
            >
              <BSpinner class="mr-2" type="grow" small v-if="loading"
                >loading
              </BSpinner>
              {{ loading ? "Loading" : " Buy Dai" }}
            </button>
            <button
              v-if="daiBalance > 0 && isAllowedSpendDai"
              @click="fundTree()"
              :class="{ disable: loading }"
              class="btn-green-md mt-4 mb-3"
            >
              <BSpinner class="mr-2" type="grow" small v-if="loading"
                >loading
              </BSpinner>
              {{ loading ? "Loading" : " Confirm" }}
            </button>

            <button
              v-if="daiBalance > 0 && !isAllowedSpendDai"
              @click="allowSpendDai()"
              :class="{ disable: loading }"
              class="btn-green-md mt-4 mb-3"
            >
              <BSpinner class="mr-2" type="grow" small v-if="loading"
                >loading
              </BSpinner>
              {{ loading ? "Loading" : " Approve" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import CardAdvanceFund from "@/components/advanceFund/CardAdvanceFund.vue";
import transakSDK from "@transak/transak-sdk";

export default {
  components: { CardAdvanceFund },
  layout: "dashboard",

  head() {
    return {
      title: `Treejer`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: "",
        },
        {
          hid: "keywords",
          name: "keywords",
          content: "",
        },
      ],
    };
  },
  data() {
    return {
      approved: false,
      daiBalance: 0,
      isAllowedSpendDai: false,
      loading: false,
      treePrice: null,
      daiUSDPrice: 1.01,
      model: null,
      countries: require("~/static/data/countries.min.json"),
      recipient: null,
    };
  },

  computed: {
    shoppingList() {
      return this.$store.state.advanceFund.shoppingList;
    },
    totalCounts() {
      return this.$store.state.advanceFund.totalCounts;
    },
    totalPrices() {
      return this.$store.state.advanceFund.totalPrices;
    },
  },

  async mounted() {},

  async created() {
    let self = this;
    setTimeout(async () => {
      await self.checkItems();
      await self.setDaiBalance();
      await self.setIsAllowance();
    }, 1000);
  },
  methods: {
    pushCountreisToData(numcode) {
      this.countries.map((item, index) => {
        this.optionsCountries.push({
          value: item.id,
          iso: item.iso,
          iso3: item.iso3,
          name: item.name,
          text: item.nicename,
          numcode: item.numcode,
          phonecode: item.phonecode,
        });
      });
    },
    async allowSpendDai(silent = false) {
      if (silent === false) {
        this.loading = true;
      }
      let self = this;

      console.log({
        tokenAddress: this.$cookies.get("config").daiTokenAddress,
        spenderContract: this.$cookies.get("config").marketPlaceAddress,
        amount: self.totalPrices,
        context: self,
      });

      const transaction = await self.$store.dispatch("erc20/approve", {
        tokenAddress: this.$cookies.get("config").daiTokenAddress,
        spenderContract: this.$cookies.get("config").marketPlaceAddress,
        amount: self.totalPrices,
        context: self,
      });

      if (transaction !== null) {
        this.setIsAllowance();
        this.$bvToast.toast([self.$t("alert.transactionsuccessfull")], {
          toaster: "b-toaster-bottom-left",
          title: self.$t("alert.youapprovedtospenddai"),
          variant: "success",
          href: `${this.$cookies.get("config").explorerUrl}/tx/${
            transaction.transactionHash
          }`,
        });

        if (silent === false) {
          this.loading = false;
        }

        await this.fundTree();
      }
    },
    async setDaiBalance() {
      if (!this.$cookies.get("account")) {
        return;
      }

      this.daiBalance = await this.$store.dispatch("dai/balanceOf", {
        account: this.$cookies.get("account"),
      });

      console.log(this.daiBalance);
    },

    async setIsAllowance(silent = false) {
      if (silent === false) {
        this.loading = true;
      }

      let allowance = await this.$store.dispatch("erc20/allowance", {
        tokenAddress: this.$cookies.get("config").daiTokenAddress,
        spenderContract: this.$cookies.get("config").marketPlaceAddress,
      });

      this.isAllowedSpendDai =
        parseFloat(allowance) >= parseFloat(this.totalPrices);

      if (silent === false) {
        this.loading = false;
      }
    },
    async checkNetwork() {
      let connectedNetwrokID = await this.$web3.eth.net
        .getId()
        .then((networkId) => {
          return networkId;
        })
        .catch((err) => {
          console.log(err.message, "error checkNetwork");
          return 0;
        });

      if (
        connectedNetwrokID ==
        this.$hex2Dec(this.$cookies.get("activeNetwork").chainId)
      ) {
        return true;
      }

      this.$bvToast.toast(
        [
          this.$t("alert.pleaseconnect") +
            this.$cookies.get("config").chainName.toUpperCase() +
            " " +
            this.$t("alert.network"),
        ],
        {
          toaster: "b-toaster-bottom-left",
          title: "Wrong network",
          variant: "danger",
          noAutoHide: true,
        }
      );
      return false;
    },
    async fundTree() {
      if ((await this.checkNetwork()) === false) {
        return;
      }

      if (parseFloat(this.totalPrices) > parseFloat(this.daiBalance)) {
        this.$bvToast.toast(
          [this.$t("alert.insufficientbalance") + this.totalPrices],
          {
            toaster: "b-toaster-bottom-left",
            title: this.$t("alert.notenoughDAI"),
            variant: "danger",
            noAutoHide: true,
          }
        );
        return;
      }

      this.loading = true;
      let self = this;

      if (this.sendAsGiftChecked && this.recipient) {
        try {
          this.recipient = this.$web3.utils.toChecksumAddress(this.recipient);
        } catch (e) {
          self.$bvToast.toast([e.message], {
            toaster: "b-toaster-bottom-left",
            title: this.$t("alert.invalidrecipient"),
            variant: "danger",
            to: "genesis/checkout",
          });
          console.error("invalid ethereum address", e.message);
          this.loading = false;
          return;
        }
      }

      console.log({
        models: self.shoppingList,
        recipient: this.recipient,
      });

      this.transferReceipt = await self.$store.dispatch(
        "advanceFund/fundTree",
        {
          models: self.shoppingList,
          recipient: this.recipient,
        }
      );

      if (this.transferReceipt !== null) {
        self.$bvToast.toast(this.$t("alert.yourpaymentwassuccessful"), {
          toaster: "b-toaster-bottom-left",
          title: this.$t("alert.treesaddedtoforest"),
          variant: "success",
          href: `${
            this.$cookies.get("config").explorerUrl
          }/address/${self.$cookies.get("account")}`,
        });

        await self.$store.dispatch("advanceFund/emptyShoppingList");

        this.$router.push(
          this.localePath(
            `/forest/advanceFund/success/${this.transferReceipt.transactionHash}`
          )
        );
      }
      this.loading = false;
    },

    async buyDai() {
      let self = this;
      let transak = new transakSDK({
        apiKey: this.$cookies.get("config").transakApiKey, // Your API Key
        environment: this.$cookies.get("config").transakEnvironment, // STAGING/PRODUCTION
        defaultCryptoCurrency: "Dai",
        // defaultCryptoAmount: this.treePrice * this.count,
        walletAddress: this.$cookies.get("account"), // Your customer's wallet address
        themeColor: "000000", // App theme color
        fiatCurrency: "USD", // INR/GBP
        email: "", // Your customer's email address
        redirectURL: "",
        hostURL: window.location.origin,
        widgetHeight: "550px",
        widgetWidth: "450px",
        networks: this.$cookies.get("config").transakNetworks,
        defaultNetwork: this.$cookies.get("config").transakDefaultNetwork,
      });

      transak.init();

      // To get all the events
      transak.on(transak.ALL_EVENTS, (data) => {});

      // This will trigger when the user marks payment is made.
      transak.on(transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (orderData) => {
        self.$bvToast.toast([self.$t("alert.yourpaymentwassuccessful")], {
          toaster: "b-toaster-bottom-left",
          title: self.$t("alert.charged"),
          variant: "success",
          href: `${
            this.$cookies.get("config").explorerUrl
          }/address/${self.$cookies.get("account")}`,
        });
        self.setDaiBalance();
        transak.close();
      });
    },
    async setShoppingListToSidebar() {
      await this.$store.commit("advanceFund/SET_SIDEBAR_ADVANCEFUND", true);
    },
    async checkItems() {
      console.log(
        this.$cookies.get("shoppingList"),
        ' this.$cookies.get("shoppingList")'
      );
      let self = this;
      if (
        self.$cookies.get("shoppingList") &&
        self.$store.state.advanceFund.shoppingList.length <= 0
      ) {
        await self.$store.commit(
          "advanceFund/EDIT_LIST",
          self.$cookies.get("shoppingList")
        );
        await self.$store.commit("advanceFund/SUM_TOTALL_PRICE_AND_COUNT");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.checkout-advancefund {
  .advance-fund-totall-box {
    background: #f0e5c8;
    border: 1px solid #bdbdbd;
    box-sizing: border-box;
    border-radius: 8px;
    min-height: 96px;
    padding: 17px 30px;
    position: relative;
    text-align: center;
    .checkout-border {
      border-right: solid 1px #757575;
    }
    .btn-green-md {
      box-shadow: drop-shadow(0px 4px 11px rgba(0, 0, 0, 0.161));
    }
  }
  @media (max-width: 678px) {
    .tree-count {
      flex-direction: column-reverse;
      .box-right {
        margin-bottom: 45px;
      }
    }
  }
}
</style>

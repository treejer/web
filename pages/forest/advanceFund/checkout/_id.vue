<template>
  <section class="position-relative pt-5 col-12 checkout-advancefund mb-5 pb-5">
    <div class="container-fluid">
      <div class="row tree-count">
        <!-- {{ $route.params }} -->
        <div class="box-left col-lg-8">
          <div class="row">
            <div
              class="mb-3 col-lg-4 col-12"
              v-for="(item, index) in listItems"
              :key="index"
            >
              <CardAdvanceFund
                :showCount="true"
                :counts="item.count"
                :fund="item.list"
                :change="true"
                :mainPage="false"
              />
            </div>
          </div>
        </div>
        <div class="box-right col-lg-4 text-right mt-4">
          <img src="~/assets/images/treebox/tree.png" alt="tree-treebox" />
          <h1 class="tr-gray-two title-md font-weight-bolder">
            {{ totalCounts }}
            <br />
            {{ totalPrices }}
            DAI
          </h1>
          <p class="param-md tr-gray-four">{{ "Total Trees to Buy" }}</p>

          <div>
            <button
              v-if="daiBalance <= 0"
              @click="buyDai()"
              :class="{ disable: localLoading }"
              class="btn-green-md mt-4 mb-3"
            >
              <BSpinner class="mr-2" type="grow" small v-if="localLoading"
                >loading
              </BSpinner>
              {{ localLoading ? "Loading" : " Buy Dai" }}
            </button>
            <button
              v-if="daiBalance > 0 && isAllowedSpendDai"
              @click="requestTrees()"
              :class="{ disable: localLoading }"
              class="btn-green-md mt-4 mb-3"
            >
              <BSpinner class="mr-2" type="grow" small v-if="localLoading"
                >loading
              </BSpinner>
              {{ localLoading ? "Loading" : " Confirm" }}
            </button>

            <button
              v-if="daiBalance > 0 && !isAllowedSpendDai"
              @click="allowSpendDai()"
              :class="{ disable: localLoading }"
              class="btn-green-md mt-4 mb-3"
            >
              <BSpinner class="mr-2" type="grow" small v-if="localLoading"
                >loading
              </BSpinner>
              {{ localLoading ? "Loading" : " Approve" }}
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
  layout: "checkout",

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
      localLoading: this.loading,
      treePrice: null,
      daiUSDPrice: 1.01,
      model: null,
      countries: require("~/static/data/countries.min.json"),
    };
  },

  computed: {
    listItems() {
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
    await this.checkItems();
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

      const transaction = await self.$store.dispatch("dai/approve", {
        count: self.totalCounts,
        context: self,
      });

      if (transaction !== null) {
        this.setIsAllowance(self.totalCounts);
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

        await self.$store.dispatch("advanceFund/fundTree", {
          listItems: self.listItems,
          totalCounts: self.totalCounts,
          totalPrices: self.totalPrices,
        });
      }
    },
    async setDaiBalance() {
      if (!this.$cookies.get("account")) {
        return;
      }

      this.daiBalance = await this.$store.dispatch("dai/balanceOf", {
        account: this.$cookies.get("account"),
      });
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
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.checkout-advancefund {
}
</style>

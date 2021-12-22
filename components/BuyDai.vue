<template>
<div>
 <button 
    v-if="daiBalance <= 0"
    @click="buyDai()"
    :class="{ disable: localLoading }" 
    class="btn-green-md mt-4 mb-3">
                    <BSpinner class="mr-2" type="grow" small v-if="localLoading"
                    >loading
                    </BSpinner
                    >
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
                    </BSpinner
                    >
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
                    </BSpinner
                    >
                    {{ localLoading ? "Loading" : " Approve" }}
                           </button>

</div>

 
</template>

<script>
import transakSDK from "@transak/transak-sdk";

export default {
  
  name: "BuyDai",
  components:{},
  props:{

    count:{
      type:Number,
      default:1
    }
  
  },
  data(){
    return {
      daiBalance: 0,
      isAllowedSpendDai: false,
      localLoading:this.loading,
      treePrice: null,
      daiUSDPrice: 1.01,

    }
  },
  async  mounted(){
   await this.getPrice();
   await this.setDaiBalance();
   await  this.setIsAllowance(this.count);

    let self = this;

    // setTimeout(() => {
    //   this.getPrice();
    //   self.setIsAllowance(self.count, true);
    //   self.setDaiBalance();
    // }, 1000);

    // setInterval(() => {
    //   this.getPrice();
    //   self.setIsAllowance(self.count, true);
    //   self.setDaiBalance();
    // }, 3000);
  },
  async created(){
    this.daiUSDPrice = 1.01;

  },
  methods:{
     async allowSpendDai(silent = false) {
      if (silent === false) {
        this.loading = true;
      }
      let self = this;

      const transaction = await this.$store.dispatch("dai/approve", {
        count: this.count,
        context: self,
      });

      if (transaction !== null) {
        this.setIsAllowance(this.count);
        this.$bvToast.toast(["Transaction successfull"], {
          toaster: "b-toaster-bottom-left",
          title: "You approved to spend dai",
          variant: "success",
          href: `${process.env.etherScanUrl}/tx/${transaction.transactionHash}`,
        });

        if (silent === false) {
          this.loading = false;
        }

        await this.requestTrees();
      }
    },
    async setDaiBalance() {
      if(!this.$cookies.get("account")) {
        return;
      }

      this.daiBalance = await this.$store.dispatch("dai/balanceOf", {
        'account': this.$cookies.get("account")
      });
    },
     async buyDai() {
      let self = this;
      let transak = new transakSDK({
        apiKey: process.env.transakApiKey, // Your API Key
        environment: process.env.transakEnvironment, // STAGING/PRODUCTION
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
        networks: process.env.transakNetworks,
        defaultNetwork: process.env.transakDefaultNetwork,
      });

      transak.init();

      // To get all the events
      transak.on(transak.ALL_EVENTS, (data) => {
        console.log(data);
      });

      // This will trigger when the user marks payment is made.
      transak.on(transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (orderData) => {
        console.log(orderData);
        self.$bvToast.toast(["Your payment was successful"], {
          toaster: "b-toaster-bottom-left",
          title: "Your wallet charged",
          variant: "success",
          href: `${process.env.etherScanUrl}/address/${self.$cookies.get(
            "account"
          )}`,
        });
        self.setDaiBalance();
        transak.close();
      });
    },
     async allowSpendDai(silent = false) {
      if (silent === false) {
        this.loading = true;
      }
      let self = this;

      const transaction = await this.$store.dispatch("dai/approve", {
        count: this.count,
        context: self,
      });

      if (transaction !== null) {
        this.setIsAllowance(this.count);
        this.$bvToast.toast(["Transaction successfull"], {
          toaster: "b-toaster-bottom-left",
          title: "You approved to spend dai",
          variant: "success",
          href: `${process.env.etherScanUrl}/tx/${transaction.transactionHash}`,
        });

        if (silent === false) {
          this.loading = false;
        }

        await this.requestTrees();
      }
    },
    async setDaiBalance() {
      if(!this.$cookies.get("account")) {
        return;
      }
      
      this.daiBalance = await this.$store.dispatch("dai/balanceOf", {
        'account': this.$cookies.get("account")
      });
    },
    async buyDai() {

      let self = this;
      if (!self.$cookies.get("account")) {
        self.$bvToast.toast("you're not login", {
          toaster: "b-toaster-bottom-left",
          solid: true,
          headerClass: "hide",
          variant: "danger",
        });
        self.$bvModal.show("five");
        return
      }

      let transak = new transakSDK({
        apiKey: process.env.transakApiKey, // Your API Key
        environment: process.env.transakEnvironment, // STAGING/PRODUCTION
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
        networks: process.env.transakNetworks,
        defaultNetwork: process.env.transakDefaultNetwork,
      });

      transak.init();

      // To get all the events
      transak.on(transak.ALL_EVENTS, (data) => {
        console.log(data);
      });

      // This will trigger when the user marks payment is made.
      transak.on(transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (orderData) => {
        console.log(orderData);
        self.$bvToast.toast(["Your payment was successful"], {
          toaster: "b-toaster-bottom-left",
          title: "Your wallet charged",
          variant: "success",
          href: `${process.env.etherScanUrl}/address/${self.$cookies.get(
            "account"
          )}`,
        });
        self.setDaiBalance();
        transak.close();
      });
    },
    async requestTrees() {
      this.loading = true;
      let self = this;

      this.transferReceipt = await this.$store.dispatch("regularSell/requestTrees", {
        count: this.count,
        context: self,
      });
      if (this.transferReceipt !== null) {
        this.activeIndex = 3;
        self.$bvToast.toast(["Your payment was successful"], {
          toaster: "b-toaster-bottom-left",
          title: "Trees added to forest",
          variant: "success",
          href: `${process.env.etherScanUrl}/tx/${this.transferReceipt.transactionHash}`,
        });
        const history = this.$router.currentRoute.matched;
        let res = null;
        history.map((item, index) => {
          let name = item.name;
          res = name.match(/forest-id/g);
          if (res === "forest-id") {
            this.$router.push(`/forest/${this.$cookies.get("account")}`);
          }
        });
      }
      this.loading = false;
    },
    async getPrice() {
      this.treePrice = await this.$store.dispatch('regularSell/getPrice')
    },
    async setIsAllowance(count, silent = false) {
      if (silent === false) {
        this.loading = true;
      }

      let allowance = await this.$store.dispatch("dai/allowance");

      this.isAllowedSpendDai =
        parseInt(allowance) >= parseInt(count * this.treePrice);

      if (silent === false) {
        this.loading = false;
      }
    },

  },
   watch: {
    async count(newCount, oldCount) {
      this.setIsAllowance(newCount);

      // Our fancy notification (2).
      // console.log(`We have ${newCount} fruits now, yay!`)
    },
  },

}
</script>

<style lang="scss" scoped>

</style>

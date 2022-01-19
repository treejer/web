<template>
  <div>
    <button
      v-if="erc20Balance <= 0"
      @click="buyERC20()"
      :class="{ disable: localLoading }"
      class="btn-green-md mt-4 mb-3"
    >
      <BSpinner class="mr-2" type="grow" small v-if="localLoading"
        >loading
      </BSpinner>
      {{ localLoading ? "Loading" : `Buy ${tokenName}` }}
    </button>
    <button
      v-if="erc20Balance > 0 && isAllowedSpendERC20"
      :class="{ disable: localLoading }"
      class="btn-green-md mt-4 mb-3"
    >
      APPROVED
    </button>

    <button
      v-if="erc20Balance > 0 && !isAllowedSpendERC20"
      @click="allowSpendERC20()"
      :class="{ disable: localLoading }"
      class="btn-green-md mt-4 mb-3"
    >
      <BSpinner class="mr-2" type="grow" small v-if="localLoading"
        >loading
      </BSpinner>
      {{ localLoading ? "Loading" : " Approve" }}
    </button>
  </div>
</template>

<script>
import transakSDK from "@transak/transak-sdk";

export default {
  name: "BuyERC20",
  components: {},
  props: {
    amount: {
      type: Number,
      default: 0,
    },
    tokenName: {
      type: String,
      default: "DAI",
    },
    
  },
  data() {
    return {
      erc20Balance: 0,
      isAllowedSpendERC20: false,
      localLoading: this.loading,
      treePrice: null,
      erc20USDPrice: 1.01,
      tokenAddress: null,
      localAmount: this.amount,
    };
  },
  async mounted() {
    

    await this.setERC20Balance();
    await this.setIsAllowance();

    let self = this;

    // setTimeout(() => {
    //   this.getPrice();
    //   self.setIsAllowance(self.count, true);
    //   self.setERC20Balance();
    // }, 1000);

    // setInterval(() => {
    //   this.getPrice();
    //   self.setIsAllowance(self.count, true);
    //   self.setERC20Balance();
    // }, 3000);
  },
  async created() {
    this.tokenName
 
    console.log(this.tokenAddress, "this.tokenAddress")
    console.log(this.localAmount, "this.localAmount")
    this.erc20USDPrice = 1.01;
  },
  methods: {
    checkTokenName(){
    if (this.tokenName === "DAI") {
      this.tokenAddress = process.env.daiTokenAddress;
    } else if (this.tokenName === "WETH") {
      this.tokenAddress = process.env.wethTokenAddress;
    } else {
      console.log("TOKEN IS NOT defined!");
    }
    },
    async allowSpendERC20(silent = false) {
      if (silent === false ) {
        this.loading = true;
      }
      let self = this;

      console.log({
        amount: this.localAmount,
        spenderContract: this.spenderContract,
        tokenAddress: this.tokenAddress
      }, "allowSpendERC20");

      const transaction = await this.$store.dispatch("erc20/approve", {
        amount: this.localAmount,
        spenderContract: this.spenderContract,
        tokenAddress: this.tokenAddress
      });

      if(!transaction.hasError) {
        this.setIsAllowance();
        this.$bvToast.toast(["Transaction successfull"], {
          toaster: "b-toaster-bottom-left",
          title: "You approved to spend erc20",
          variant: "success",
          href: `${process.env.etherScanUrl}/tx/${transaction.transactionHash}`,
        });

        if (silent === false) {
          this.loading = false;
        }
      } else {
        this.loading = false;
      }
      
    },
    async setERC20Balance() {
      console.log(this.tokenAddress, "this.tokenAddress")
      this.erc20Balance = await this.$store.dispatch("erc20/balanceOf", {
        tokenAddress: this.tokenAddress,
      });
      console.log(this.erc20Balance, "this.erc20Balance")
    },
    async buyERC20() {
      let self = this;
      let transak = new transakSDK({
        apiKey: process.env.transakApiKey, // Your API Key
        environment: process.env.transakEnvironment, // STAGING/PRODUCTION
        defaultCryptoCurrency: this.tokenName,
        // defaultCryptoAmount: this.treePrice * this.localAmount,
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
        self.setERC20Balance();
        transak.close();
      });
    },
    async getPrice() {
      if (tokenName == "DAI") {
        this.treePrice = await this.$store.dispatch("regularSell/getPrice");
      }
    },
    async setIsAllowance(silent = false) {
      if (silent === false) {
        this.loading = true;
      }
      console.log(this.localAmount ,"this localAmount")

      let allowance = await this.$store.dispatch("erc20/allowance", {
        tokenAddress: this.tokenAddress,
        spenderContract: this.spenderContract,
      });
      console.log(allowance, this.amount)
      console.log("allowance, this.amount")

      this.isAllowedSpendERC20 = allowance >= this.amount;

      console.log(this.isAllowedSpendERC20)

      if (silent === false) {
        this.loading = false;
      }
    },
  },
  watch: {
    async localAmount(newlocalAmount, oldlocalAmount) {
      this.setIsAllowance(newlocalAmount);

      // Our fancy notification (2).
      // console.log(`We have ${newCount} fruits now, yay!`)
    },
  },
};
</script>

<style lang="scss" scoped>
</style>

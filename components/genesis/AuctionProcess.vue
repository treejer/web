<template>
  <div class="text-center mt-md-5 mt-3 auction-process-steps col-12">
    <button
      v-show="placeBidStep"
      class="btn-green font-white param-md m-auto py-2 pr-5 pl-5"
      @click.prevent="placeBid('one')"
    >
      {{ !loading ? "Place a bid" : "Loading..." }}
    </button>
    <!--    <h1 v-if="auction" v-text="new Date(auction.expireDate * 1000)"></h1>-->

    <div v-show="placeBidStepTwo" class="w-100 row place-bid-step-two pt-5">
      <div class="col-md-6 border-right-bid text-left">
        <p class="mb-0 param tr-gray-two">Current bid</p>
        <input
          v-model.number="bidValue"
          class="auction-bid-input tr-gray-two param-18 mt-3 font-weight-bolder"
          placeholder="0 eth"
          type="text"
          @keyup.enter="placeBid('two')"
        />
      </div>
      <div v-if="expireDates" class="col-md-6 pb-4 text-left">
        <p class="mb-0 param tr-gray-two">Ending in</p>
        <p v-if="checkExpireDateText" id="timer" class="mb-0  param font-weight-bolder tr-gray-one mt-3">

          This auction is over in <br>{{expireDates}}

        </p>
         <p v-if="!checkExpireDateText" id="timer" class="mb-0 param-xl font-weight-bolder tr-gray-one mt-3">

          <CountDown
          :date="expireDates"></CountDown>

        </p>
      </div>

      <div class="col-12 p-0">
        <button
          v-if="!erc20Balance"
          :class="{ disable: loading }"
          class="btn-green-md mt-4 mb-3 w-100 h-100"
          @click.prevent="buyERC20"
        >
          <BSpinner v-if="loading" class="mr-2" small type="grow"
            >loading
          </BSpinner>
          {{ loading ? "Loading" : `Buy WETH` }}
        </button>
        <button
          v-if="erc20Balance"
          :class="{ disable: loading }"
          class="btn-green-md mt-4 mb-3 w-100 h-100"
          @click.prevent="placeBid('two')"
        >
          <BSpinner v-if="loading" class="mr-2" small type="grow"
            >loading
          </BSpinner>
          <span v-if="!checkExpireDateText">     {{ loading && checkExpireDateText ? "Loading" : `PlaceBid` }}</span>
          <span v-if="checkExpireDateText">     {{loading && !checkExpireDateText ? "Loading"  : "Auction is over." }}</span>


        </button>
      </div>
    </div>
    <div v-show="placeBidStepThree" class="w-100 place-bid-step-three pt-3">
      <p class="tr-gray-three title-md">
        <span>{{ bidValue }}</span
        ><span class="tr-gray-two"> ETH</span>
      </p>
      <p class="tr-gray-four param-18">
        <strong>$ {{ parseInt(ethPrice * bidValue) }}</strong> Reserve Price:
        <strong>{{ bidValue }}</strong> ETH
      </p>
      <div class="row">
        <div class="col-md-6 pr-md-0">
          <span class="btn-gray" @click.prevent="backToStep()">Back</span>
        </div>
        <div class="col-md-6 pl-md-0">
          <button
            v-if="erc20Balance > 0 && !isAllowedSpendERC20"
            :class="{ disable: loading }"
            class="btn-green"
            @click="allowSpendERC20()"
          >
            <BSpinner v-if="loading" class="mr-2" small type="grow"
              >loading
            </BSpinner>
            {{ loading ? "Loading" : " Approve" }}
          </button>
        </div>
      </div>
    </div>
    <div v-show="placeBidStepFour" class="w-100 place-bid-step-three pt-3">
      <p class="tr-gray-three title-md">
        <span v-if="bidValue">{{ bidValue }}</span
        ><span class="tr-gray-two"> ETH</span>
      </p>
      <p class="tr-gray-four param-18 ">
        <strong>$ {{ parseInt(ethPrice * bidValue) }}</strong> Reserve Price:
        <strong>{{ bidValue }}</strong> ETH
      </p>
      <div class="row">
        <div class="col-md-6 pr-md-0">
          <span class="btn-gray" @click.prevent="backToStep()">Back</span>
        </div>
        <div class="col-md-6 pl-md-0">
          <button
            v-if="erc20Balance > 0 && isAllowedSpendERC20"
            :class="{ disable: loading }"
            class="btn-green"
            @click="bidAction()"
          >
            <BSpinner v-if="loading" class="mr-2" small type="grow"
              >loading
            </BSpinner>
            {{ loading ? "Loading" : " Confirm" }}
          </button>
        </div>
      </div>
    </div>

    <div v-show="placeBidStepFive" class="w-100 place-bid-step-three pt-3 pb-3">
      <p class="tr-gray-three title-md mb-0">
        <span class="tr-gray-two font-weight-bolder">Please Wait...</span>
      </p>
      <p class="tr-gray-four param-18 mt-2" v-on:onload="getTime($event, id)">
        This may take {{ timer }} seconds
      </p>
    </div>
    <div v-show="placeBidStepSix" class="w-100 place-bid-step-three pt-3">
      <p class="tr-gray-three param-xl step-seven">
        Your bid was placed successfully. Congrats!
      </p>

      <div class="row">
        <div class="col-md-6 pr-md-0">
          <span class="btn-gray" @click="goToHere()">Not now</span>
        </div>
        <div class="col-md-6 pl-md-0">
          <span id="social" class="btn-green" @click="shareModal()">Share</span>
          <b-modal id="social-target" centered hide-footer size="md">
            <Socials />
          </b-modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Socials from "~/components/Socials.vue";
import CountDown from "~/components/CountDown.vue";
import transakSDK from "@transak/transak-sdk";
import moment from "moment"




export default {
  components: {
    CountDown,
    Socials
  },
  props:{
    expireDates:{
      type:String,
      default:"2022-07-06 08:15:00"
    },
    expireDateText:{
      type:String,
      default:""
    }
  },
  computed:{
    checkExpireDateText(){
      if(this.expireDateText === 'This auction is over.'){
        return true
      }
      if (this.expireDateText !== 'This auction is over.'){
        return false
      }
    }
  },

  data() {
    return {
      bidValueStep: false,
      placeBidStep: true,
      placeBidStepTwo: false,
      placeBidStepThree: false,
      placeBidStepFour: false,
      placeBidStepFive: false,
      placeBidStepSix: false,
      placeBidStepSeven: false,
      timer: 20,
      loading: false,
      endingTimeBid:this.expireDate,
      bidValue: null,
      dataAuctions: null,
      dataAuction: null,
      spenderContract: process.env.treeAuctionAddress,
      tokenAddress: process.env.wethTokenAddress,
      erc20Balance: null,
      isAllowedSpendERC20: false,
      treePrice: null,
      erc20USDPrice: 1.01,
      ethPrice: null
    };
  },
  async created() {
    if (!this.erc20Balance) {
      await this.setERC20Balance();
    }
    console.log(process.env.ethPrice, "process.env.ethPrice");
    this.$axios.$get(process.env.ethPrice).then(res => {
      this.ethPrice = res.result.ethusd;
    });
    // const ethPrices = await this.$store.dispatch('ethPrices')
    // console.log(ethPrices)
  },
  methods: {
    async buyERC20() {
      let self = this;
      let transak = new transakSDK({
        apiKey: process.env.transakApiKey, // Your API Key
        environment: process.env.transakEnvironment, // STAGING/PRODUCTION
        defaultCryptoCurrency: "WETH",
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
        defaultNetwork: process.env.transakDefaultNetwork
      });

      transak.init();

      // To get all the events
      transak.on(transak.ALL_EVENTS, data => {
        console.log(data);
      });

      // This will trigger when the user marks payment is made.
      transak.on(transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, orderData => {
        console.log(orderData);
        self.$bvToast.toast(["Your payment was successful"], {
          toaster: "b-toaster-bottom-left",
          title: "Your wallet charged",
          variant: "success",
          href: `${process.env.etherScanUrl}/tx/${self.$cookies.get("account")}`
        });
        self.setERC20Balance();
        transak.close();
      });
    },
    async allowSpendERC20(silent = false) {
      if (silent === false) {
        this.loading = true;
      }
      let self = this;

      const transaction = await this.$store.dispatch("erc20/approve", {
        amount: this.bidValue,
        spenderContract: this.spenderContract,
        tokenAddress: this.tokenAddress
      });
      console.log(transaction, "transaction is here");
      if (transaction.code === 4001) {

          self.loading = false;


      }
      else if (transaction) {
        this.setIsAllowance();
        this.$bvToast.toast(["Transaction successfull"], {
          toaster: "b-toaster-bottom-left",
          title: "You approved to spend erc20",
          variant: "success",
          href: `${process.env.etherScanUrl}/tx/${transaction.hash}`
        });

        if (silent === false) {
          this.loading = false;
          this.placeBidStepFour = true;
          this.placeBidStepThree = false;
          this.placeBidStepTwo = false;
          this.placeBidStep = false;
        }
      }
    },
    async setERC20Balance() {
      console.log(this.tokenAddress, "this.tokenAddress");
      this.erc20Balance = await this.$store.dispatch("erc20/balanceOf", {
        tokenAddress: this.tokenAddress
      });
      console.log(this.erc20Balance, "this.erc20Balance");
    },

    async setIsAllowance(silent = false) {
      if (silent === false) {
        this.loading = true;
      }

      let allowance = await this.$store.dispatch("erc20/allowance", {
        tokenAddress: this.tokenAddress,
        spenderContract: this.spenderContract
      });
      console.log(allowance, this.bidValue);
      console.log("allowance, this.amount");

      this.isAllowedSpendERC20 = allowance >= this.bidValue;

      console.log(this.isAllowedSpendERC20);

      if (silent === false) {
        this.loading = false;
        this.placeBidStepThree = false;
        this.placeBidStepTwo = false;
        this.placeBidStepFour = true;
      }
    },
    async bidAction() {
      this.loading = true;

      let tx = await this.$store.dispatch("treeAuction/bid", {
        auctionId: this.$route.params.id,
        bidValue: this.bidValue
      });
      console.log(tx, "txis here");
      if (tx !== null) {
        self.$bvToast.toast(["Your bid was successful"], {
          toaster: "b-toaster-bottom-left",
          title: "Trees added to forest",
          variant: "success",
          href: `${process.env.etherScanUrl}/tx/${self.$cookies.get("account")}`
        });
      }
      this.loading = false;
    },
    toast() {
      this.$bvToast.toast(["Please fill the input"], {
        toaster: "b-toaster-bottom-left",
        title: "Transaction failed",
        variant: "danger",
        noAutoHide: true,
        bodyClass: "fund-error"
      });
    },
    async placeBid(id) {
      if (id === "one") {
        this.placeBidStep = false;
        this.placeBidStepTwo = true;
      }
      if (id === "two") {
        if (this.bidValue) {
          this.placeBidStepTwo = false;
          this.placeBidStepThree = true;
        } else {
          this.toast();
        }
      }
      if (id === "finish") {
        this.placeBidStepSix = true;
        this.placeBidStepFive = false;
        this.placeBidStepFour = false;
        this.placeBidStepThree = false;
        this.getTime();
      }
    },
    backToStep() {
      this.placeBidStepTwo = false;
      this.placeBidStepThree = false;
      this.placeBidStepFour = false;
      this.placeBidStepFive = false;
      this.placeBidStep = true;
    },
    getTime() {
      setInterval(() => {
        if (this.timer <= 18) {
          this.placeBidStepSix = false;
          this.placeBidStepSeven = true;
        } else {
          this.timer--;
        }
      }, 1000);
    },
    goToHere() {
      window.location.reload();
    },
    shareModal() {
      this.$bvModal.show("social-target");
    },

  },

};
</script>

<style lang="scss">
.auction-process-steps {
  .disable:hover {
    pointer-events: unset;
  }
  .step-seven {
    display: flex;
    line-height: 110px;
    vertical-align: middle;
    text-align: center;
    padding: 5px 15px;
    @media (max-width: 767px) {
      margin-bottom: 35px;
      line-height: inherit;
      vertical-align: middle;
    }
  }

  .place-bid-step-two {
    background: rgba(208, 169, 69, 0.25);
    border-radius: 12px;
    transition: all 0.3 ease;

    button {
      border-radius: 0px 0px 12px 12px;
    }

    .border-right-bid::after {
      border-right: 2px solid #757575;
      position: absolute;
      right: 20px;
      content: "";
      width: 1px;
      height: 68px;
      top: 0;
    }
  }

  .place-bid-step-three {
    transition: all 0.3 ease;
    background: #f0e4c6;
    border-radius: 12px;

    .btn-gray,
    .btn-green {
      background: #757575;
      border-radius: 0px 0px 0px 12px;
      width: 100%;
      height: 51px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;

      &:hover {
        cursor: pointer;
      }
    }

    .btn-green {
      background: #67b68c;
      border-radius: 0px 0px 12px 0px;
    }
  }

  #btn-finish {
    border-radius: 0px 0px 12px 12px;
  }

  @media (max-width: 767px) {
    margin-bottom: 35px;
  }

  .social-target {
    .row {
      display: flex;
      justify-content: space-between;
    }

    color: white;
  }

  .auction-bid-input {
    border: none;
    background: transparent;
    width: 100px;
  }
}
</style>

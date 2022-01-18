<template>
  <div class="text-center mt-md-5 mt-3 auction-process-steps col-12">
    <div
      v-if="started && !ended && auction.isActive && placeBidStep"
      class="btn-green font-white param-md m-auto py-2 pr-5 pl-5"
    >
      This auction starts on <br />{{
        $moment(auction.startDate * 1000).strftime("%b %d, %Y at %I:%M %p")
      }}
    </div>

    <button
      v-if="!started && !ended && auction.isActive && placeBidStep"
      class="btn-green font-white param-md m-auto py-2 pr-5 pl-5"
      @click.prevent="placeBid('enterBidValueStep')"
    >
      {{ !loading ? "Place a bid" : "Loading..." }}
    </button>
    <button
      v-if="!started && ended && auction.isActive && placeBidStep"
      class="btn-green font-white param-md m-auto py-2 pr-5 pl-5"
      @click.prevent="endAuction()"
    >
      {{
        !loading
          ? auction.bids.length > 0
            ? "Settle Auction"
            : "End Auction"
          : "Loading..."
      }}
    </button>

    <!--    <h1 v-if="auction" v-text="new Date(auction.expireDate * 1000)"></h1>-->

    <div v-if="enterBidValueStep" class="w-100 row place-bid-step-two pt-5">
      <div class="col-md-6 border-right-bid text-left">
        <p class="mb-0 param tr-gray-two cursor-pointer" @click="bidValue = parseFloat($web3.utils.fromWei(minBidValue.toString())).toFixed(4)">
          Min bid
          {{
            parseFloat($web3.utils.fromWei(minBidValue.toString())).toFixed(4)
          }}
          WETH
        </p>
        <input
          v-model.number="bidValue"
          class="auction-bid-input tr-gray-two param-18 mt-3 font-weight-bolder"
          placeholder="Enter bid amount"
          type="text"
          @keyup.enter="placeBid('approveOrConfirm')"
        />
      </div>
      <div class="col-md-6 pb-4 text-left">
        <p class="mb-0 param tr-gray-two" v-if="!ended">Ending in</p>
        <p class="mb-0 param tr-gray-two" v-if="ended">Auction ended</p>

        <p
          v-if="ended"
          class="mb-0 timer param font-weight-bolder tr-gray-one mt-3"
        >
          This auction is over in <br />{{
            $moment(auction.endDate * 1000).strftime("%b %d, %Y at %I:%M %p")
          }}
        </p>
        <p
          v-else
          class="mb-0 timer param-xl font-weight-bolder tr-gray-one mt-3"
        >
          <CountDown
            :date="
              $moment(auction.endDate * 1000).strftime('%Y-%m-%d %H:%M:%S')
            "
          ></CountDown>
        </p>
      </div>

      <div class="col-12 p-0">
        <!-- <button
          v-if="erc20Balance <= 0"
          :class="{ disable: loading }"
          class="btn-green-md mt-4 mb-3 w-100 h-100"
          @click.prevent="buyERC20"
        >
          <BSpinner v-if="loading" class="mr-2" small type="grow"
            >loading
          </BSpinner>
          {{ loading ? "Loading" : `Buy WETH` }}
        </button> -->
        <button
          :class="{ disable: loading }"
          class="btn-green-md mt-4 mb-3 w-100 h-100"
          @click.prevent="placeBid('approveOrConfirm')"
        >
          <BSpinner v-if="loading" class="mr-2" small type="grow"
            >loading
          </BSpinner>
          {{ loading ? "Loading" : "Place Bid" }}
        </button>
      </div>
    </div>
    <div v-if="approveStep" class="w-100 place-bid-step-three pt-3">
      <p class="tr-gray-three title-md">
        <span>{{ bidValue }}</span
        ><span class="tr-gray-two"> WETH</span>
      </p>
      <p class="tr-gray-four param-18">
        <strong>$ {{ Number(ethPrice * bidValue) }}</strong> Reserve Price:
        <strong>{{ bidValue }}</strong> WETH
      </p>
      <div class="row">
        <div class="col-md-6 pr-md-0">
          <span class="btn-gray" @click.prevent="backToStep()">Back</span>
        </div>
        <div class="col-md-6 pl-md-0">
          <button
            v-if="erc20Balance > 0"
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
    <div v-if="confirmStep" class="w-100 place-bid-step-three pt-3">
      <p class="tr-gray-three title-md">
        <span v-if="bidValue">{{ bidValue }}</span
        ><span class="tr-gray-two"> WETH</span>
      </p>
      <p class="tr-gray-four param-18">
        <strong>$ {{ Number(ethPrice * bidValue) }}</strong> Reserve Price:
        <strong>{{ bidValue }}</strong> WETH
      </p>
      <div class="row">
        <div class="col-md-6 pr-md-0">
          <span class="btn-gray" @click.prevent="backToStep()">Back</span>
        </div>
        <div class="col-md-6 pl-md-0">
          <button
            :class="{ disable: loading }"
            class="btn-green"
            @click="bid()"
          >
            <BSpinner v-if="loading" class="mr-2" small type="grow"
              >loading
            </BSpinner>
            {{ loading ? "Loading" : " Confirm" }}
          </button>
        </div>
      </div>
    </div>

    <div v-if="successStep" class="w-100 place-bid-step-three pt-3">
      <p class="tr-gray-three param-xl step-seven">
        Your bid was placed successfully. Congrats!
      </p>

      <div class="row">
        <div class="col-md-6 pr-md-0">
          <span class="btn-gray" @click="refreshPage()">Not now</span>
        </div>
        <div class="col-md-6 pl-md-0">
          <span id="social" class="btn-green" @click="shareModal()">Share</span>
          <b-modal id="social-target" centered hide-footer size="md">
            <ShareAuction />
          </b-modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ShareAuction from "~/components/ShareAuction.vue";
import CountDown from "~/components/CountDown.vue";
import transakSDK from "@transak/transak-sdk";

export default {
  components: {
    CountDown,
    ShareAuction,
  },
  props: {
    auction: {
      type: Object,
    },
  },
  computed: {
    ethPrice() {
      return this.$store.state.ethPrice;
    },
  },

  data() {
    return {
      placeBidStep: true,
      enterBidValueStep: false,
      approveStep: false,
      confirmStep: false,
      successStep: false,

      timer: 20,
      loading: false,
      endingTimeBid: this.expireDate,
      bidValue: null,
      dataAuctions: null,
      dataAuction: null,
      spenderContract: process.env.contractAuctionAddress,
      tokenAddress: process.env.wethTokenAddress,
      erc20Balance: null,
      isAllowedSpendERC20: false,
      treePrice: null,
      erc20USDPrice: 1.01,
      minBidValue: 0,
      started: false,
      ended: false,
    };
  },
  async created() {

    const priceJump = Number(this.auction.priceInterval) * Number(this.auction.highestBid) / 10000;

    this.minBidValue =
      Number(this.auction.highestBid) +
      Number(
        priceJump > this.$web3.utils.toWei("0.1")
          ? priceJump
          : this.$web3.utils.toWei("0.1")
      );

    this.ended = this.auction.endDate * 1000 < new Date().getTime();
    this.started = this.auction.startDate * 1000 > new Date().getTime();


    if(!this.started && !this.ended && this.auction.isActive) {
      this.resetAllStepAndGo("enterBidValueStep");
    } 

    // await this.$store.dispatch("setEthPrice");
    await this.setERC20Balance();

  },
  methods: {
    async buyERC20() {
      window.open(
        "https://global.transak.com/?defaultCryptoCurrency=WETH&fiatCurrency=USD&defaultNetwork=polygon",
        "_blank"
      );
      return;

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
    async allowSpendERC20(silent = false) {
      if(await this.checkNetwork() === false) {
        return;
      }

      if (silent === false) {
        this.loading = true;
      }
      let self = this;

      const transaction = await this.$store.dispatch("erc20/approve", {
        amount: this.bidValue,
        spenderContract: this.spenderContract,
        tokenAddress: this.tokenAddress,
      });
      if (transaction.code === 4001) {
        self.loading = false;
      } else if (transaction) {
        this.resetAllStepAndGo("confirmStep");


        await this.setIsAllowance(true);

        this.$bvToast.toast(["Transaction successfull"], {
          toaster: "b-toaster-bottom-left",
          title: "You approved to spend erc20",
          variant: "success",
          href: `${process.env.etherScanUrl}/tx/${transaction.transactionHash}`,
        });

        if (silent === false) {
          this.loading = false;
        }


      }
    },
    async setERC20Balance() {
      this.erc20Balance = await this.$store.dispatch("erc20/balanceOf", {
        tokenAddress: this.tokenAddress,
      });
    },
    async setIsAllowance(silent = false) {
      if (silent === false) {
        this.loading = true;
      }

      let allowance = await this.$store.dispatch("erc20/allowance", {
        tokenAddress: this.tokenAddress,
        spenderContract: this.spenderContract,
      });

      this.isAllowedSpendERC20 = parseFloat(allowance) >= parseFloat(this.bidValue);

      if (silent === false) {
        this.loading = false;
      }
    },
    async bid() {
      if(await this.checkNetwork() === false) {
        return;
      }

      this.loading = true;

      let tx = await this.$store.dispatch("auction/bid", {
        auctionId: this.$hex2Dec(this.auction.id),
        bidValue: this.bidValue,
      });
      if (tx !== null) {
        this.resetAllStepAndGo("successStep");

        this.$bvToast.toast(["Your bid was successful"], {
          toaster: "b-toaster-bottom-left",
          title: "Your placed successfully",
          variant: "success",
          href: `${process.env.etherScanUrl}/tx/${tx.transactionHash}`,
        });

      }
      this.loading = false;
    },
    async endAuction() {
      if(await this.checkNetwork() === false) {
        return;
      }

      this.loading = true;

      let tx = await this.$store.dispatch("auction/end", {
        auctionId: this.$hex2Dec(this.auction.id),
      });
      if (tx !== null) {
        this.auction.isActive = false;

        this.$bvToast.toast(["Auction ended successfully"], {
          toaster: "b-toaster-bottom-left",
          title: "Auction ended successfully",
          variant: "success",
          href: `${process.env.etherScanUrl}/tx/${tx.transactionHash}`,
        });
      }
      this.loading = false;
    },
    toast(
      msg = "Please fill the input",
      title = "Transaction failed",
      variant = "danger"
    ) {
      this.$bvToast.toast([msg], {
        toaster: "b-toaster-bottom-left",
        title: title,
        variant: variant,
        noAutoHide: true,
        bodyClass: "fund-error",
      });
    },
    async placeBid(goToStep) {
      if (this.$cookies.get("account") == null) {
        this.$bvToast.toast("you're not login", {
          toaster: "b-toaster-bottom-left",
          solid: true,
          headerClass: "hide",
          variant: "danger",
        });
        this.$bvModal.show("five");
        return;
      }

      if(await this.checkNetwork() === false) {
        return;
      }

      if (goToStep === "enterBidValueStep") {
        this.resetAllStepAndGo("enterBidValueStep");
        return;
      }

      if (goToStep === "approveOrConfirm") {
        if (this.ended) {
          this.toast("Auction ended", "Auction ended");
          return;
        }

        if (this.auction.isActive === false) {
          this.toast("Auction is not active", "Auction inactive");
          return;
        }

        if (!this.bidValue || this.bidValue <= 0) {
          this.toast("Bid value is empty", "Value Error");
          return;
        }

        console.log(parseFloat(this.bidValue),
          parseFloat(this.$web3.utils.fromWei(this.minBidValue.toString())));


        if (
          parseFloat(this.bidValue) <
          parseFloat(this.$web3.utils.fromWei(this.minBidValue.toString()))
        ) {
          this.toast(
            "You have to bid more than the min bid value: " +
              parseFloat(this.$web3.utils.fromWei(this.minBidValue.toString())),
            "Value Error"
          );
          return;
        }

        await this.setERC20Balance();

        if (parseFloat(this.bidValue) > parseFloat(this.erc20Balance)) {
          this.toast(
            "Insufficient Balance, Your weth balance: " +
              parseFloat(this.erc20Balance).toFixed(4),
            "Value Error"
          );
          return;
        }

        await this.setIsAllowance(true);

        if (this.isAllowedSpendERC20) {
          this.resetAllStepAndGo("confirmStep");
        } else {
          this.resetAllStepAndGo("approveStep");
        }
        return;
      }
    },
    backToStep() {
      this.resetAllStepAndGo("enterBidValueStep");
    },
    refreshPage() {
      window.location.reload();
    },
    shareModal() {
      this.$bvModal.show("social-target");
    },
    resetAllStepAndGo(step) {
      if (step == "placeBidStep") {
        this.placeBidStep = true;
      } else {
        this.placeBidStep = false;
      }

      if (step == "enterBidValueStep") {
        this.enterBidValueStep = true;
      } else {
        this.enterBidValueStep = false;
      }

      if (step == "approveStep") {
        this.approveStep = true;
      } else {
        this.approveStep = false;
      }

      if (step == "confirmStep") {
        this.confirmStep = true;
      } else {
        this.confirmStep = false;
      }

      if (step == "successStep") {
        this.successStep = true;
      } else {
        this.successStep = false;
      }
    },
    async checkNetwork() {
      let connectedNetwrokID = await this.$web3.eth.net.getId()
      .then((networkId) => {
        return networkId;
      })
      .catch((err) => {
        console.log(err.message, "error checkNetwork");
        return 0;
      });

      if(connectedNetwrokID == process.env.networkId) {
        return true;
      }

      this.$bvToast.toast(['Please connect to ' + process.env.networkName.toUpperCase() + ' Network!'], {
        toaster: "b-toaster-bottom-left",
        title: 'Wrong network',
        variant: 'danger',
        noAutoHide: true,
      });
      return false;

    }
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
    transition: all 0.3s ease;

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
    transition: all 0.3s ease;
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
    // border: none;
    background: transparent;
    width: 80%;
  }
}
</style>

<template>
  <div class="text-center mt-md-5 mt-3 auction-process-steps col-12">
    <button
      v-show="placeBidStep"
      class="btn-green font-white param-md m-auto py-2 pr-5 pl-5"
      @click.prevent="placeBid('one')"
    >
      {{ !loading ? "Place a bid" : "Loading..." }}
    </button>
    <div v-show="placeBidStepTwo" class="w-100 row place-bid-step-two pt-5">
      <div class="col-md-6 border-right-bid text-left">
        <p class="mb-0 param tr-gray-two">Current bid</p>
        <input class="auction-bid-input tr-gray-two param-18 mt-3 font-weight-bolder" type="text" placeholder="0 eth"
               v-model="bidValue"/>
      </div>
      <div class="col-md-6 pb-4 text-left">
        <p class="mb-0 param tr-gray-two">Ending in</p>
        <p class="mb-0 param-xl font-weight-bolder tr-gray-one mt-3" id="timer">
          <CountDown :date="endingTimeBid"></CountDown>
        </p>
      </div>
      <button
        class="btn-green w-100 font-white param-md m-auto py-2 pr-5 pl-5"
        @click.prevent="placeBid('two')"
      >
        Place a bid
      </button>
    </div>
    <div v-show="placeBidStepThree" class="w-100 place-bid-step-three pt-3">
      <p class="tr-gray-three title-md">
        <span>{{ 0 }}</span
        ><span class="tr-gray-two"> ETH</span>
      </p>
      <p class="tr-gray-four param-18">[$0] Reserve Price: 1.00 ETH</p>
      <div class="row">
        <div class="col-md-6 pr-md-0">
          <span class="btn-gray" @click.prevent="backToStep()">Back</span>
        </div>
        <div class="col-md-6 pl-md-0">
          <span class="btn-green" @click.prevent="placeBid('three')"
          >Approve</span
          >
        </div>
      </div>
    </div>
    <div v-show="placeBidStepFour" class="w-100 place-bid-step-three pt-3">
      <p class="tr-gray-three title-md">
        <span>{{ 1.55 }}</span
        ><span class="tr-gray-two"> ETH</span>
      </p>
      <p class="tr-gray-four param-18">[$5831] Reserve Price: 1.00 ETH</p>
      <div class="row">
        <div class="col-md-6 pr-md-0">
          <span class="btn-gray" @click.prevent="backToStep()">Back</span>
        </div>
        <div class="col-md-6 pl-md-0">
          <span class="btn-green" @click.prevent="placeBid('four')"
          >Approve</span
          >
        </div>
      </div>
    </div>
    <div v-show="placeBidStepFive" class="w-100 place-bid-step-three pt-3">
      <p class="tr-gray-three title-md">
        <span>{{ 1.55 }}</span
        ><span class="tr-gray-two">ETH</span>
      </p>
      <p class="tr-gray-four param-18">[$5831] Reserve Price: 1.00 ETH</p>
      <div class="row">
        <div class="col-md-12">
          <span
            class="btn-green"
            id="btn-finish"
            @click.prevent="placeBid('finish')"
          >Finish</span
          >
        </div>
      </div>
    </div>
    <div v-show="placeBidStepSix" class="w-100 place-bid-step-three pt-3 pb-3">
      <p class="tr-gray-three title-md mb-0">
        <span class="tr-gray-two font-weight-bolder">Please Wait...</span>
      </p>
      <p class="tr-gray-four param-18 mt-2" v-on:onload="getTime($event, id)">
        This may take {{ timer }} seconds
      </p>
    </div>
    <div v-show="placeBidStepSeven" class="w-100 place-bid-step-three pt-3">
      <p class="tr-gray-three param-xl step-seven">
        Your bid was placed successfully. Congrats!
      </p>

      <div class="row">
        <div class="col-md-6 pr-md-0">
          <span class="btn-gray" @click="goToHere()">Not now</span>
        </div>
        <div class="col-md-6 pl-md-0">
          <span class="btn-green" id="social" @click="shareModal()">Share</span>
          <b-modal
            id="social-target"
            hide-footer

            size="md"
            centered

          >
            <Socials/>
          </b-modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Socials from "~/components/Socials.vue";
import CountDown from "~/components/CountDown.Vue";

export default {
  components: {
    CountDown,
    Socials,
  },
  mounted() {
    this.auctions()
    this.endAuction()
    // console.log(this.$TreeAuction.methods.auctions(())
  },

  data() {
    return {
      placeBidStep: true,
      placeBidStepTwo: false,
      placeBidStepThree: false,
      placeBidStepFour: false,
      placeBidStepFive: false,
      placeBidStepSix: false,
      placeBidStepSeven: false,
      timer: 20,
      loading: false,
      endingTimeBid: "2022-07-06 08:15:00",
      bidValue: null
    };
  },

  methods: {
    toast() {
      this.$bvToast.toast(['Please fill the input'], {
        toaster: 'b-toaster-bottom-left',
        title: 'Transaction failed',
        variant: 'danger',
        noAutoHide: true,
        bodyClass: 'fund-error'
      })
    },

    async auctions() {
      await this.$store.dispatch('treeAuction/auctions', {})
    },
    async endAuction() {
      this.endingTimeBid = await this.$store.dispatch('treeAuction/endAuction', {
        auctionId: 33
      })
      console.log(this.endingTimeBid,"this.endingTimeBid")
    },

    placeBid(id) {
      if (id === "one") {
        this.placeBidStep = false;
        this.placeBidStepTwo = true;
      }
      if (id === "two") {
        this.bid();
      }
      if (id === "three") {
        this.placeBidStepThree = false;
        this.placeBidStepFour = true;
      }
      if (id === "four") {
        this.placeBidStepFour = false;
        this.placeBidStepFive = true;
      }
      if (id === "finish") {
        this.placeBidStepSix = true;
        this.placeBidStepFive = false;
        this.getTime();
      }
    },
    backToStep() {
      this.placeBidStepTwo = false;
      this.placeBidStepThree = false;
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

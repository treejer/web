<template>
  <div class="w-100 text-center mt-md-5 mt-3 auction-process-steps">
    <button
      v-if="placeBidStep"
      class="btn-green font-white param-md m-auto py-2 pr-5 pl-5"
      @click.prevent="placeBid('one')"
    >
      Place a bid
    </button>
    <div v-if="placeBidStepTwo" class="w-100 row place-bid-step-two pt-5">
      <div class="col-md-6 border-right-bid text-left">
        <p class="mb-0 param tr-gray-two">Current bid</p>
        <p class="mb-0 param-xl font-weight-bolder tr-gray-one">
          {{ "1.23 ETH" }}
        </p>
      </div>
      <div class="col-md-6 pb-4 text-left">
        <p class="mb-0 param tr-gray-two">Ending in</p>
        <p class="mb-0 param-xl font-weight-bolder tr-gray-one" id="timer">
          {{ "02h 32m 24s" }}
        </p>
      </div>
      <button
        class="btn-green w-100 font-white param-md m-auto py-2 pr-5 pl-5"
        @click.prevent="placeBid('two')"
      >
        Place a bid
      </button>
    </div>
    <div v-if="placeBidStepThree" class="w-100 place-bid-step-three pt-3">
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
    <div v-if="placeBidStepFour" class="w-100 place-bid-step-three pt-3">
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
    <div v-if="placeBidStepFive" class="w-100 place-bid-step-three pt-3">
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
    <div v-if="placeBidStepSix" class="w-100 place-bid-step-three pt-3 pb-3">
      <p class="tr-gray-three title-md mb-0">
        <span class="tr-gray-two font-weight-bolder">Please Wait...</span>
      </p>
      <p class="tr-gray-four param-18 mt-2" v-on:onload="getTime($event, id)">
        This may take {{ timer }} seconds
      </p>
    </div>
    <div v-if="placeBidStepSeven" class="w-100 place-bid-step-three pt-3">
      <p class="tr-gray-three param-xl">
      Your bid was placed successfully. Congrats!
      </p>
    
      <div class="row">
        <div class="col-md-6 pr-md-0">
          <span class="btn-gray">Not now</span>
        </div>
        <div class="col-md-6 pl-md-0">
          <span class="btn-green">Share</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
    };
  },
  methods: {
    placeBid(id) {
      if (id === "one") {
        this.placeBidStep = false;
        this.placeBidStepTwo = true;
      }

      if (id === "two") {
        this.placeBidStepTwo = false;
        this.placeBidStepThree = true;
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
    getTime(a, b) {
      setInterval(() => {
        if (this.timer <= 0) {
          this.placeBidStepSix = false;
          this.placeBidStepSeven = true;
        } else {
          this.timer--;
        }
      }, 1000);
    },
  },
};
</script>

<style lang="scss" >
.auction-process-steps {
  .place-bid-step-two {
    background: rgba(208, 169, 69, 0.25);
    border-radius: 12px;

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
    }
    .btn-green {
      background: #67b68c;
      border-radius: 0px 0px 12px 0px;
    }
  }
  #btn-finish {
    border-radius: 0px 0px 12px 12px;
  }
}
</style>
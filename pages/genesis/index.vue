<template>
  <section
    :class="$route.name"
    class="position-relative pt-5 col-12 mb-5 pb-5 genesis-first-page"
  >
    <div class="row">
      <div class="col-md-7 col-12 left-side">
        <div class="row">
          <div class="col-md-5 pr-md-0">
            <p class="tr-gray-four param-18 font-weight-bolder mb-0">TREE #0</p>
            <p class="title-md tr-gray-two font-weight-bolder">Tree of Life</p>
            <img
              id="tree-of-life"
              src="~assets/images/genesis/tree-of-life.svg"
              alt="tree-of-life"
            />
            <p class="param-xl pl-md-4">Tree of Life</p>
            <PlaceBid :placeBidNumber="0" class="mt-2 mb-4 mb-md-0"/>
            <button class="btn btn-success" @click="placeBid()">here</button>
          </div>
          <div class="col-md-7 mt-md-5 pt-md-4 pl-md-0 pr-md-5">
            <p class="param tr-gray-four">
              Umoja Uaso is a village in Kenya. The village, founded in 1990, is
              an all-female matriarch village located near the town of Archers
              Post in Samburu County, 380 km (240 mi) from the capital, Nairobi.
              It was founded by Rebecca Lolosoli, a Samburu woman, as a
              sanctuary for homeless survivors of violence against women, and
              young girls running from forced marriages. The women of the
              Samburu people do not agree with violence and the traditional
              subordinate position of women.
            </p>
          </div>
        </div>
      </div>
      <div class="col-md-5 col-12 pl-md-2 right-side">
        <div class="row">
          <div class="col-12">
            <p class="param-18 tr-gray-four">Bidders</p>
            <AvatarBidders/>
            <AvatarBidders/>
            <AvatarBidders/>
          </div>
          <div class="col-md-6 mt-5">
            <p class="tr-gray-four param-18">Planted Trees</p>
            <p class="tr-green title-md font-weight-bolder">{{ 549 }}</p>
            <p class="tr-gray-four param-18">Trust Score</p>
            <p class="tr-green title-md font-weight-bolder">{{ 12 }}</p>
          </div>
          <div class="col-md-6 mt-5">
            <p class="tr-gray-four param-18">Supplied O2</p>
            <p class="tr-green title-md font-weight-bolder">{{ "452K " }}</p>
            <p class="tr-gray-four param-18">Earning</p>
            <p class="tr-green title-md font-weight-bolder">${{ "1, 400" }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-5 justify-content-center">
      <div class="col-md-12 text-center">
        <h1
          class="title-md tr-gray-two font-weight-bolder mt-md-3 pb-md-3 mb-md-4 mb-3"
        >
          TREE #1-10
        </h1>
      </div>

      <BidCard
        v-for="(item, index) in treeBids"
        :key="index"
        :img="item.src"
        :id="index"
      />
    </div>
    <div class="row my-5 py-5 justify-content-center">
      <div class="col-md-8">
        <h1
          class="tr-gray-two title-lg font-weight-bolder mt-md-3 pb-md-3 mb-md-4 mb-3"
        >
          Trees #101-10000
        </h1>
        <p class="param-xl tr-gray-two col-md-9">
          The value of these trees increases every 100 trees based on a bonding
          curve formula. There would be unique opportunities for collectors of
          all GENESIS trees in Treejer protocol.
        </p>
      </div>
      <div class="col-md-4">
        <div class="row">
          <div class="col-md-6 mt-5">
            <p class="tr-gray-four param-18">Start Price</p>
            <p class="tr-green title-md font-weight-bolder">{{ " Ξ0.01" }}</p>
            <p class="tr-gray-four param-18">Current Price</p>
            <p class="tr-green title-md font-weight-bolder">{{ "Ξ0.026" }}</p>
          </div>
          <div class="col-md-6 mt-5">
            <p class="tr-gray-four param-18">End Price</p>
            <p class="tr-green title-md font-weight-bolder">{{ "Ξ0.1 " }}</p>
            <p class="tr-gray-four param-18">Next Price</p>
            <p class="tr-green title-md font-weight-bolder">${{ "Ξ0.027" }}</p>
          </div>
        </div>
      </div>

      <BidCard
        v-for="(item, index) in treeBids"
        :key="index + 100"
        :img="item.src"
        :id="index + 100"
      />
    </div>
  </section>
</template>

<script>
import PlaceBid from "../../components/genesis/PlaceBid.vue";
import BidCard from "../../components/genesis/BidCard.vue";
import AvatarBidders from "../../components/genesis/AvatarBidders.vue";

export default {
  layout: "landing",

  data() {
    return {
      loading:false,
      treeBids: [
        {src: require("~/assets/images/genesis/Frame-78.svg")},
        {src: require("~/assets/images/genesis/Frame-79.svg")},
        {src: require("~/assets/images/genesis/Frame-80.svg")},
        {src: require("~/assets/images/genesis/Frame-83.svg")},
        {src: require("~/assets/images/genesis/Frame-84.svg")},
        {src: require("~/assets/images/genesis/Frame-85.svg")},
        {src: require("~/assets/images/genesis/Frame-88.svg")},
        {src: require("~/assets/images/genesis/Frame1.svg")},
        {src: require("~/assets/images/genesis/Frame2.svg")},
        {src: require("~/assets/images/genesis/Frame3.svg")},
      ],
    };
  },
  components: {PlaceBid, BidCard, AvatarBidders},
  methods: {
  },
  mounted() {

    // console.log(this.$ITreeAuction.methods.createAuction((res) => {
    //
    // }), "web3 is here")

    // this.$web3.eth.getTransactionCount.call().then((res) => {
    //   console.log(res,"res is here")
    // })
  }
};
</script>

<style lang="scss">
.genesis-first-page {
  .digit, .text {
    font-size: 14px;

  }

  .bid-own {
    > .row {
      padding: 5px 15px;
    }

    background: #F0E4C6;
    border-radius: 6px;
  }

  .genesis-bid-card {

    .border-right-bid::after {
      border: none;
    }

    .border-right-bid, .text-left {
      padding: 0 !important;
    }

    .border-right-bid {
      .param-xl {
        font-size: 14px;
      }
    }
  }

  #timer {
    > div {
      > div:nth-child(1) {
        display: none !important;
      }
    }
  }
}
</style>

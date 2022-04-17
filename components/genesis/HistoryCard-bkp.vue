<template>
  <div class="history-cards mb-3 ">
    <div class="row w-100 align-items-center">
      <div class="col-md-2 col-3 avatart-card">
        <img :src="img" alt="avatar" />
      </div>
      <div class="col-md-7 col-6 des-card text-left">
        <p class="mb-0">
          <span class="param tr-gray-two font-weight-bold" v-if="text">{{
            text
          }}</span>
          <span class="param tr-green">{{ walletAddress }}</span>
        </p>
        <p class="mb-0">
          <span class="param tr-gray-four font-weight-bold">{{ time }} </span>
        </p>
      </div>
      <div class="col-md-3 col-3 price-card" v-if="price">
        <p class="mb-0">
          <span class="param tr-gray-two font-weight-bold">{{ ethPrice }}</span>
        </p>
        <p class="mb-0">
          <span class="param tr-gray-four font-weight-bold"
            >${{ dollarPrice }}</span
          >
        </p>
      </div>
      <div class="col-md-3 col-3 price-card pr-0" v-if="link">
        <button class="btn-see tr-white param-18 font-weight-bolder" @click="goToLink(href)">
          See
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: null,
      price: false,
      link: false,
    };
  },
  computed:{

  },

  props: {
    img: {
      type: String,
      default: require("~/assets/images/myforest/avatar.png"),
    },
    time: {
      type: String,
      default: "May 6, 2021 at 6:10pm",
    },
    ethPrice: {
      type: String,
      default: "10 ETH",
    },
    dollarPrice: {
      type: String,
      default: "35213",
    },
    href: {
      type: String,
      default: `/forest/`,
    },
    walletAddress: {
      type: String,
      default: "0x...k5M2",
    },
    update: {
      type: Boolean,
      default: false,
    },
    listed: {
      type: Boolean,
      default: false,
    },
    planted: {
      type: Boolean,
      default: false,
    },
    putToSale: {
      type: Boolean,
      default: false,
    },
    transferred: {
      type: Boolean,
      default: false,
    },
    Offer: {
      type: Boolean,
      default: false,
    },
    Auction: {
      type: Boolean,
      default: false,
    },
    bidPlaced: {
      type: Boolean,
      default: false,
    },
    minted: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    checkState() {
      if (this.listed) {
        this.text = "Tree listed by";
        this.price = true;
      } else if (this.update) {
        this.text = "Status updated by";
        this.link = true;
      } else if (this.planted) {
        this.text = "Tree planted by";
        this.link = true;
      } else if (this.putToSale) {
        this.text = "putToSale";
      } else if (this.transferred) {
        this.text = "Tree transferred to";
      } else if (this.Offer) {
        this.text = "Offer placed by 0x...Td59";
        this.price = true;
      } else if (this.Auction) {
        this.text = "Auction won by 0x...k5M2";
        this.price = true;
      } else if (this.bidPlaced) {
        this.text = "Bid placed by 0x...k5M2";
        this.price = true;
      } else if (this.bidPlaced) {
        this.text = "Bid placed by 0x...k5M2";
      } else if (this.minted) {
        this.text = "Tree minted by 0x...k5M2";
      }
    },
    goTolink(id) {
      this.$router.push(this.localePath(id));
    },
  },
  mounted() {
    this.checkState();
  },
};
</script>

<style lang="scss">
.history-cards {
  background: #fafafa;
  box-shadow: 2px 6px 36px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  min-height: 80px;
  display: flex;
  justify-content: center;
  .btn-see {
    background: #757575;
    border-radius: 0px 12px 12px 0px;
    color: white;
    border: none;
    height: 80px;
    width: 100%;
  }
  img {
    width: 40px;
    height: 40px;
    border: solid 1px lightgray;
    border-radius: 16px;
  }
}
@media (min-width: 100px) and (max-width: 425px) {
  .history-cards {
  }
}
</style>
<template>
  <div class="col-md-3  text-center genesis-bid-card">
  <div class="justify-content-center"  v-if="id === 0" >
   <img :src="img" :alt="id" />
    <p class="param tr-gray-four font-weight-bolder text-center mt-3">
      TREE #{{ id + 1 }}
    </p>
      <BidOwn
      />
    </div>
  <div class="justify-content-center"  v-else >
   <img :src="img" :alt="id" />
    <p class="param tr-gray-four font-weight-bolder genesis-bid-cards text-center mt-3">
      TREE #{{ id + 1 }}
    </p>
    <PlaceBid  :placeBidNumber="id" size="sm" />
    </div>

  </div>
</template>

<script>
import PlaceBid from "./PlaceBid.vue";
import BidOwn from "./BidOwn";
export default {
  data() {
    return {};
  },
  props: {
    img: {
      type: String,
      default: require("~/assets/images/genesis/tree-of-life.svg"),
    },
    id: {
      type: Number,
      default: 0,
    },
  },
  components: {BidOwn, PlaceBid },
};
</script>

<style lang="scss">
.genesis-bid-card {
  img {
    vertical-align: bottom;
    height: 128px;
    width: 128px;
    margin-top: 35px;
  }
}
</style>

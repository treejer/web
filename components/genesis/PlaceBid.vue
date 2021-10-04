<template>
  <button
    :id="size === 'sm' ? 'place-bid-button-sm' : 'place-bid-button'"
    class="btn-green param-18 tr-white font-weight-bolder"
    @click.prevent="placeBid(placeBidNumber)"
  >
    Place a bid
  </button>
</template>

<script>
export default {
  props: {
    placeBidNumber: {
      type: Number,
      default: 0,
    },
    size: {
      type: String,
      default: "md",
    },
  },

  methods: {
    placeBid(id) {
      this.$router.push(`/genesis/${id}`);
    },
  },
};
</script>

<style lang="scss">
#place-bid-button {
  padding: 10px 51px;
 
}
#place-bid-button-sm {
  font-size: 14px;
  padding: 10px 15px;
  margin: auto;
}
 @media (max-width:768px ) and (min-width: 10px){
  #place-bid-button {
  padding: 10px 15px;
  font-size: 12px;
 
}
#place-bid-button-sm {
  font-size: 12px;
  padding: 5px 10px;
}
}
</style>
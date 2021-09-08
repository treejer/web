<template>
  <div class="row position-relative bidders">
    <div v-for="(item,index) in dataRes.bids" :key="index" class="col-md-4  ">
      <img

        :src="`${icon}${item.bidder.replace(/[^0-9\\.]+/g,'')}?d=robohash`" alt="avatar" class="pointer-event bidders pb-2 m-auto "
        height="48" width="48"/>
      <p v-coin class="address-wallet  tr-gray-three adrees-wallet param">{{ item.bidder }}</p>

    </div>

  </div>


</template>

<script>
export default {
  props: {
    src: {
      default: require("~/assets/images/myforest/avatar.png"),
      type: String,
    },
    dataRes: {
      type: null,
    }
  },
  data() {
    return {
      localData: this.dataRes,
      icon: `${process.env.gravatar}`
    }
  },

  async created() {
    console.log(this.localData, "local data is here")
  }

};
</script>

<style lang='scss'>
.bidders {
  margin-right: 19px;

  .address-wallet {
    padding: 8px 13px;
    border-radius: 28px;
    background: #eeeeee;
    border: 2px solid #FFFFFF;

  }

  &:hover {

  }
}
</style>

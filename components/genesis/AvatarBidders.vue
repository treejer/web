<template>
  <div class="row position-relative bidders" v-if="bidders.length > 0">
    <div v-for="(item,index) in bidders" :key="index" class="col-md-4  ">
      <img

        :src="$avatarByWallet(item)" alt="avatar" class="pointer-event bidders pb-1 m-auto "
        height="48" width="48"/>
      <p v-coin class="address-wallet  tr-gray-three adrees-wallet param">{{ item }}</p>

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
    bids: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      bidders: []
    }
  },

  async created() {
    let self = this;
    //create uniquer list of bidders
    this.bids.filter(bid => {
      if(self.bidders.indexOf(bid.bidder) == -1) {
        self.bidders.push(bid.bidder)
      }
    });

  }

};
</script>

<style lang='scss'>
.bidders {
  margin-right: 19px;

  .address-wallet {
    padding: 8px 13px;
    border-radius: 10%;
    background: #eeeeee;
    border: 2px solid #FFFFFF;

  }

  img {

    border-radius: 10%;
  }

  &:hover {

  }
}
</style>

<template>
  <div class="col-md-4 peoples">
    <div class="border-0" v-if="planter">
      <img v-if="icon" :src="icon" :alt="planter.id" />
      <p class="param tr-gray-two mt-2">{{planter.__typename}}</p>
      <p v-coin class="address-wallet tr-gray-three adrees-wallet param">{{planter.id}}</p>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    planter: {
      default: {},
      type:Object
    }
  },

  data() {
    return {
      peoples: [
        {
          src: require("~/assets/images/myforest/avatar.png"),
          type: "Funder",
          name: "Funder",
          adressWallet: "0x545...d4m7",
        },
      ],
      icon:`${process.env.gravatar}${this.planter.id.replace(/[^0-9\\.]+/g,'')}?d=robohash`,
    };
  },


  created() {

  },
};
</script>

<style lang="scss" scoped>
.peoples {
  img {
    width: 64px;
    height: 64px;
    margin: auto;
  }

  .adrees-wallet {
    padding: 8px 13px;
    border-radius: 28px;
    background: #eeeeee;
    border: 2px solid #FFFFFF;

  }
}
</style>

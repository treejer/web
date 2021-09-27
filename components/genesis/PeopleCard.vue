<template>
  <div class="row  peoples justify-content-around mt-md-4">
    <div v-if="planter" class="border-0">
      <img v-if="icon" alt="planter" :src="icon"/>
      <p class="param tr-gray-two mt-2">{{ planter.__typename ? planter.__typename : 'planter' }}</p>
      <p v-coin class="address-wallet tr-gray-three adrees-wallet param">{{ planter.id }}</p>
    </div>
    <div v-if="Funder" class="border-0">
      <img v-if="icon" alt="Funder" :src="icon"/>
      <p class="param tr-gray-two mt-2">{{ planter.__typename ? planter.__typename : 'Funder'  }}</p>
      <p v-coin class="address-wallet tr-gray-three adrees-wallet param">{{ planter.id }}</p>
    </div>
    <div v-if="Owner" class="border-0">
      <img v-if="icon" :alt="planter.id" :src="icon"/>
      <p class="param tr-gray-two mt-2">{{ planter.__typename  ? planter.__typename : 'Owner'}}</p>
      <p v-coin class="address-wallet tr-gray-three adrees-wallet param">{{ planter.id }}</p>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    planter: {
      default: {},
      type: Object
    },
    Funder: {
      default: {},
      type: Object
    },
    Owner: {
      default: {},
      type: Object
    },

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
      icon:require("~/assets/images/myforest/avatar.png"),
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

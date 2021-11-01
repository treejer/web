<template>
  <div class="row  peoples justify-content-around mt-md-4">
    <div class="border-0">
      <img alt="Planter" :src="tree.planter ?  $avatarByWallet(tree.planter.id) : icon"/>
      <p class="param tr-gray-two mt-2">Planter</p>
      <p v-coin class="address-wallet tr-gray-three adrees-wallet param">{{ tree.planter ? tree.planter.id : 'Not Planted' }}</p>
    </div>
    <div class="border-0">
      <img alt="Funder" :src="tree.funder ?  $avatarByWallet(tree.funder.id) : icon"/>
      <p class="param tr-gray-two mt-2">Funder</p>
      <p v-coin class="address-wallet tr-gray-three adrees-wallet param">{{ tree.funder ? tree.funder.id : 'Not Funded' }}</p>
    </div>
    <div class="border-0">
      <img alt="Owner" :src="tree.owner ?  $avatarByWallet(tree.owner.id) : icon" />
      <p class="param tr-gray-two mt-2">Owner</p>
      <p v-coin class="address-wallet tr-gray-three adrees-wallet param">{{ tree.owner ? tree.owner.id : 'Not Owned' }}</p>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    tree: {
      default: {},
      type: Object
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

<template>
  <div class="row  peoples justify-content-around mt-md-4">
    <div class="border-0">
      <img alt="Planter" :src="tree.planter ?  $avatarByWallet(tree.planter.id) : defaultAvatar"/>
      <p class="param tr-gray-two mt-2">Planter</p>
      <p v-coin class="address-wallet tr-gray-three adrees-wallet param">{{ tree.planter ? tree.planter.id : 'Not Planted' }}</p>
    </div>
    <div class="border-0" >
      <img alt="Funder" :src="tree.funder ?  $avatarByWallet(tree.funder.id) : (tree.owner ? '/logo/treejer.png': defaultAvatar)"/>
      <p class="param tr-gray-two mt-2">Funder</p>
      <p v-coin class="address-wallet tr-gray-three adrees-wallet param">{{ tree.funder ? tree.funder.id :  (tree.owner ? 'Treejer': 'Not Funded')  }}</p>
    </div>
    <div class="border-0">
      <img alt="Owner" :src="tree.owner ?  $avatarByWallet(tree.owner.id) : defaultAvatar" />
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
      defaultAvatar:require("~/assets/images/myforest/avatar.png"),
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
<<<<<<< HEAD
    border-radius: 35px;
    border: solid 2px white;
=======
    border-radius: 10%;
>>>>>>> 8c2d0ecf0888411a12ef80c536f24b5a25a962ad
  }

  .adrees-wallet {
    padding: 8px 13px;
    border-radius: 28px;
    background: #eeeeee;
    border: 2px solid #FFFFFF;

  }
}
</style>

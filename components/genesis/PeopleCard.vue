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

    <NuxtLink v-if="tree.owner"
      :to="`/forest/${tree.owner.id}`"
      class="border-0"
    >
        <img alt="Owner" :src="tree.owner ?  $avatarByWallet(tree.owner.id) : defaultAvatar" />
        <p class="param tr-gray-two mt-2">Owner</p>
        <p v-coin class="address-wallet tr-gray-three adrees-wallet param">{{ tree.owner ? tree.owner.id : 'Not Owned' }}</p>
    </NuxtLink>

    <div v-else class="border-0">
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
    border: solid 2px whitesmoke;
    border-radius: 50%;
  }

  .adrees-wallet {
    padding: 8px 13px;
    border-radius: 28px;
    background: #eeeeee;
    border: 2px solid #FFFFFF;

  }
  a {
      transition: all ease-in 0.2s;
    }

    a:hover {
      text-decoration: none;
      color: #67b68c;
    }
}
</style>

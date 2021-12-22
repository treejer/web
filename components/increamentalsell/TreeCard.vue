<template>
  <div class="w-100">
    <div class="card-inc mr-md-3 mr-0" @click="goToTreeProfile($hex2Dec(tree.id))">
      <div class="card-header bg-transparent border-0" >
        <div class="d-flex justify-content-between">
          <img
            class="rounded-circle text-left"
            :alt="tree.owner.id"
            :src="$avatarByWallet(tree.owner.id)"
            height="36" width="36">
          <p class="tr-gray-four  param-sm">Owned by <br> <span v-coin class="tr-gray-one param font-weight-bolder">{{ tree.owner.id }}</span></p>
        </div>
      </div>
      <div class="card-img" :style="`background: rgba(${Math.floor(Math.random() * 189) }, ${Math.floor(Math.random() * 70) }, ${Math.floor(Math.random() * 42) }, 0.1);`">
        <img :src="tree.treeSpecsEntity ? 
          (tree.treeSpecsEntity.imageFs != '' ?tree.treeSpecsEntity.imageFs:defaultImage )
        : defaultImage"
        :alt="`tree-${$hex2Dec(tree.id)}-image`" class="inc-tree-img img-fluid">
      </div>
    </div>
  </div>

</template>

<script>

export default {
  name: "IncCard",
  props: {
    tree: {
      type: Object,
      default: {
        id: 0,
        owner: {
          id: 0,
        },
        treeSpecsEntity: {
          imageFs: "",
        }
      }
    }
  },
  data() {
    return {
      defaultImage: require('~/assets/images/increamentalSell/tree.svg')
    }
  },
  methods: {
    goToTreeProfile(id) {
      this.$router.push(
        this.localePath({ name: "tree-id", params: { id: id } })
      );
    }
  },
  created() {},
}
</script>

<style lang="scss" scoped>
.card-inc {
  cursor: pointer;
  text-align: center;
  justify-content: center;
  background: #FAFAFA;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  border-radius: 18px;
  margin-top: 36px;
  padding: 19px 16px;

  .card-header {
    padding: 0;
  }

  .card-img {
    border-radius: 18px;
  }
}

@media (max-width: 768px) {
  .card-inc {
    padding: 15px 10px;
    margin-top: 25px;

    .card-header {
      padding: 0;
    }

  }
}
</style>


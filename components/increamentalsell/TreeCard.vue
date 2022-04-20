<template>
  <div class="w-100">
    <div class="card-inc mr-md-3 mr-0">
      <NuxtLink :to="`/forest/${tree.owner.id}`">
        <div class="card-header bg-transparent border-0">
          <div class="d-flex justify-content-between">
            <img
              class="rounded-circle text-left"
              :alt="tree.owner.id"
              :src="$avatarByWallet(tree.owner.id)"
              height="36"
              width="36"
            />
            <p class="tr-gray-four param-sm">
              {{$t('genesis.ownedby')}} <br />
              <span v-coin class="tr-gray-one param font-weight-bolder">{{
                tree.owner.id
              }}</span>
            </p>
          </div>
        </div>
      </NuxtLink>

      <NuxtLink :to="`/tree/${$hex2Dec(tree.id)}`">
        <div
          class="card-img"
          :style="`background: #${bgColor};`"
        >
          <!-- <img
            :src="
              tree.treeSpecsEntity
                ? tree.treeSpecsEntity.imageFs != ''
                  ? tree.treeSpecsEntity.imageFs
                  : defaultImage
                : defaultImage
            "
            :alt="`tree-${$hex2Dec(tree.id)}-image`"
            class="inc-tree-img img-fluid"
          /> -->

          <img
            :src="
              tree.treeSpecsEntity
                ? tree.treeSpecsEntity.imageFs != ''
                  ? tree.treeSpecsEntity.imageFs
                  : defaultImage
                : defaultImage
            "
            :alt="`tree-${$hex2Dec(tree.id)}-image`"
            class="inc-tree-img img-fluid"
          />
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import crownColor from "~/static/data/crownColor.json";

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
        },
        symbol: {
          crownColor: "",
        },
      },
    },
    defaultImageLoader: false,
  },
  data() {
    return {
      defaultImage: require("~/assets/images/tree/treeShapeRegular_treejer.png"),
      defaultImageLoading: require("~/assets/images/tree/loadingTree_treejer.gif"),
      bgColor: 'f4eddb',
    };
  },
  methods: {
    setBgColor() {
      if(!this.tree.symbol) {
        return;
      }

      if(this.tree.symbol.crownColor === 'undefined' || this.tree.symbol.crownColor === '') {
        return;
      }

      if(!crownColor[this.tree.symbol.crownColor - 1]) {
        return;
      }

      this.bgColor = crownColor[this.tree.symbol.crownColor - 1].background_color;
    }
  },
  created() {
    this.setBgColor();
    this.defaultImage = this.defaultImageLoader ? this.defaultImageLoading : this.defaultImage;
  }
};
</script>

<style lang="scss" scoped>
.card-inc {
  cursor: pointer;
  text-align: center;
  justify-content: center;
  background: #fafafa;
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

  a {
    transition: all ease-in 0.2s;
    text-align: left;
  }

  a:hover {
    text-decoration: none;
    color: #67b68c;
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


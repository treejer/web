<template>
  <div class="w-100">
    <div class="card-inc mr-md-3 mr-0">
      <div class="card-header bg-transparent border-0">
        <div class="d-flex justify-content-between">
          <img
              class="rounded-circle text-left"
            :alt="owned"
            :src="`${icon}${owned}`"
            height="36" width="36">
          <p class="tr-gray-four  param-sm">Owned by <br> <span v-coin class="tr-gray-one param font-weight-bolder">{{ owned }}</span></p>
        </div>
      </div>
      <div class="card-img" :style="`background: rgba(${Math.floor(Math.random() * 189) }, ${Math.floor(Math.random() * 70) }, ${Math.floor(Math.random() * 42) }, 0.1);`">
        <img :src="img" alt="tree" class="inc-tree-img img-fluid">
      </div>
    </div>
  </div>

</template>

<script>
import AvatarBidders from "../genesis/AvatarBidders";

export default {
  name: "IncCard",
  components: {AvatarBidders},
  props: {
    owned: {
      type: String,
      default: '0x86aB4812CD49dDa0400004cA4E130464E025c6c4B'
    },
    img: {
      type: String,
      default: require('~/assets/images/increamentalSell/tree.svg')
    }
  },
  data() {
    return {
      icon: `${process.env.gravatar}`

    }
  }
}
</script>

<style lang="scss" scoped>
.card-inc {
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


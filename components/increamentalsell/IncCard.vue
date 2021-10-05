<template>
  <div class="w-100">
    <div class="card-inc mr-md-3 mr-0">
      <div class="card-header bg-transparent border-0">
        <div class="d-flex justify-content-start">
          <img
            :alt="owned"
            :src="`${icon}${owned.replace(/[^0-9\\.]+/g,'')}?d=robohash`"
            height="36" width="36">
          <p class="tr-gray-three param">Owned by <br> <span v-coin class="tr-gray-two param">{{ owned }}</span></p>
        </div>
      </div>
      <div class="card-img">
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
  padding: 15px;

  .card-header {
    padding: 0;
  }

  .inc-tree-img {
    background: rgba(189, 74, 120, 0.1);
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


<template>
  <div class="col-md-4 peoples">
    <div class="border-0" v-for="(item, index) in peoples" :key="index">
      <img :src="item.src" :alt="item.name" />
      <p class="param tr-gray-two mt-2">{{ item.type }}</p>
      <p class="address-wallet tr-gray-three adrees-wallet param">
        {{ item.adressWallet }}
      </p>
    </div>
  </div>
</template>

<script>

export default {
  watch: {},
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
    };
  },

  created() {},
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

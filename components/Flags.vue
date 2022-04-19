<template>
  <div class="flags-group position-relative">
    <img
      @click.prevent="showingFlags = !showingFlags"
      :src="require(`~/assets/images/flags/${$i18n.localeProperties.code}.png`)"
      width="25"
      class="rounded pointer-event"
      :alt="$i18n.localeProperties.name"
    />
    <div class="flags-box" v-show="showingFlags">
      <div
        class="flags-item pointer-event"
        v-for="(item, index) in $i18n.locales"
        :key="index"
        @click.prevent="showingFlags = false"
      >
        <img
          :src="require(`~/assets/images/flags/${item.code}.png`)"
          width="25"
          class="rounded"
          alt="item.name"
        />
        <nuxt-link class="tr-gray-two param" :to="switchLocalePath(item.code)">
          {{ item.name }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showingFlags: false,
    };
  },
  created() {
    console.log(this.$i18n, "this.$i18n is here");
  },
};
</script>

<style lang="scss" scoped>
.flags-group {
  text-align: left;
  margin-top: 20px;
  .flags-box {
    position: absolute;
    z-index: +9999;
    .flags-item {
      background-color: white;
      width: 100px;
      height: 30px;
      border-bottom: 1px solid green;
      border-radius: 6px;
      padding: 5px;
      .tr-gray-two {
        width: 300px;
        position: absolute;
        left: 0;
        padding-left: 40px;
      }
    }
  }
}
</style>

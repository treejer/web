<template>
  <img :src="src" alt="avatar" width="36" height="36" class="bidders" />
</template>

<script>
export default {
  props: {
    src: {
      default: require("~/assets/images/myforest/avatar.png"),
      type: String,
    },
  },
};
</script>

<style lang='scss'>
.bidders {
  margin-right: 19px;
}
</style>
<template>
  <div class="col-md-8 col-12 other-trees-inc">
    <p class="param-xl font-weight-bolder tr-gray-one text-center title-inc">
      {{ text }}
    </p>
  </div>
</template>

<script>
export default {
  name: "OtherTreeInc",
  props: {
    text: {
      type: String,
      default: "Tree of Life",
    },
  },
  mounted() {
    console.log(this._props, "text");
    if (this._props.text === "Tree of Life") {
      this._props.text = this.$t("genesis.treeoflife");
    }
  },
};
</script>

<style scoped lang="scss">
.other-trees-inc {
  margin-top: 80px;
  .title-inc {
    width: fit-content;
    margin: auto;
    position: relative;
  }
  .title-inc::after {
    content: "";
    position: absolute;
    border: 2px solid #757575;
    bottom: 15px;
    width: 90px;
    right: -100px;
  }
  .title-inc::before {
    content: "";
    position: absolute;
    border: 2px solid #757575;
    bottom: 15px;
    width: 90px;
    left: -100px;
  }
}
</style>

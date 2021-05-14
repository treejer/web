<template>
  <div class="history-cards m-auto">
    <div class="row w-100 align-items-center">
      <div class="col-md-2 avatart-card">
        <img src="~assets/images/myforest/avatar.png" alt="avatar" />
      </div>
      <div class="col-md-7 des-card text-left">
        <p class="mb-0">
          <span class="param tr-gray-two font-weight-bold">Tree listed by</span>
          <span class="param tr-green"> 0x...k5M2</span>
        </p>
        <p class="mb-0">
          <span class="param tr-gray-four font-weight-bold"
            >May 6, 2021 at 6:10pm</span
          >
        </p>
      </div>
      <div class="col-md-3 price-card">
        <p class="mb-0">
          <span class="param tr-gray-two font-weight-bold">10 ETH</span>
        </p>
        <p class="mb-0">
          <span class="param tr-gray-four font-weight-bold">$35213</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.history-cards {
  background: #fafafa;
  box-shadow: 2px 6px 36px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  min-height: 80px;
  display: flex;
  justify-content: center;
  img {
    width: 40px;
    height: 40px;
    border: solid 1px lightgray;
    border-radius: 16px;
  }
}
</style>
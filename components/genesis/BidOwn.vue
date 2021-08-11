<template>
  <div class="col-12 bid-own">
    <div class="row">
      <div class="col-md-6 border-right-bid text-left">
        <p class="mb-0 param tr-gray-three">Current bid</p>
        <p class="mb-0 param-xl font-weight-bolder tr-gray-one mt-3">
          {{ bidCount }}
        </p>
      </div>
      <div class="col-md-6 pb-4 text-left">
        <p class="mb-0 param tr-gray-three">Ending in</p>
        <p class="mb-0 param-xl font-weight-bolder tr-gray-one mt-3" id="timer">
          <CountDown :date="time"></CountDown>
        </p>
      </div>

    </div>


  </div>

</template>
<script>
import CountDown from "~/components/CountDown.Vue";

export default {
  components: {
    CountDown
  },
  props: {
    bidCount: {
      type: String,
      default: "1.23 ETH"
    },
    time:{
      type:String,
      default: "2031-07-06 08:15:00"
    }
  },
  data() {
    return {}
  }
}
</script>
<style lang="scss">
.border-right-bid::after {
  border-right: 2px solid #757575;
  position: absolute;
  right: 20px;
  content: "";
  width: 1px;
  height: 68px;
  top: 0;
}
</style>

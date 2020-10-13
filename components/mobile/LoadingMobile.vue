<template>
  <div class="mobile-loading-wrapper" v-if="localeLoading">
    <svg class="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
      <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
    </svg>
  </div>

</template>

<script>

export default {
  name: "loadingMobile",

  props: {
    mobileLoading: {
      default: true,
      type: Boolean
    }
  },
  data() {
    return {
      localeLoading: this.mobileLoading,
      count:0
    }
  },
  mounted() {
    setTimeout(()=>{
        this.localeLoading = !this.localeLoading
    },2000)
  }

}
</script>

<style scoped lang="scss">
// This is just to center the spinner

.mobile-loading-wrapper {
  position: fixed;
  z-index: +99999;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #faf8f1;
}

// Here is where the magic happens

$offset: 187;
$duration: 1.8s;

.spinner {
  animation: rotator $duration linear infinite;
}

@keyframes rotator {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(270deg);
  }
}

.path {
  stroke-dasharray: $offset;
  stroke-dashoffset: 0;
  transform-origin: center;
  animation: dash $duration ease-in-out infinite,
  colors ($duration*4) ease-in-out infinite;
}

@keyframes colors {
  0% {
    stroke: #67B68C;
  }
  25% {
    stroke: #D04F45;
  }
  50% {
    stroke: #F7C223;
  }
  75% {
    stroke: #67B68C;
  }
  100% {
    stroke: #D04F45;
  }
}

@keyframes dash {
  0% {
    stroke-dashoffset: $offset;
  }
  50% {
    stroke-dashoffset: $offset/4;
    transform: rotate(135deg);
  }
  100% {
    stroke-dashoffset: $offset;
    transform: rotate(450deg);
  }
}
</style>

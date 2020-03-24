<template>
  <div class="mt-5 mb-5">
      <keep-alive>
        <h1 class="tr-gray-two">{{ $route.name }}</h1>
        <VueMetamask />
      </keep-alive>
  </div>
</template>

<script>
  import VueMetamask from '../components/MetaMask';

export default {
  name: "index",
  data() {
    return {
      msg: "This is demo net work",
      components:{
        VueMetamask
      },
      account: {}
    };
  },
  created() {},
  methods: {
    onComplete(data) {
      console.log("data:", data);
      this.account = data;
    }
  }
};
</script>

<style scoped></style>

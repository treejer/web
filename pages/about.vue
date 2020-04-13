<template>
  <div class="mt-5 mb-5">
      <h1 class="tr-gray-two">{{ $route.name }}</h1>
    <b-btn class="btn-green " @click="status =!status">metamask</b-btn>
      <vue-metamask v-if="status" userMessage="msg" @onComplete="onComplete"> </vue-metamask>
      <div class="col-12">
        <h1>metaMaskAddress: {{ account.metaMaskAddress }}</h1>
      </div>
  </div>
</template>

<script>
import VueMetamask from "vue-metamask";

export default {
  name: "about",
  components: { VueMetamask },
  data() {
    return {
      msg: "This is demo net work",
      account: {},
      status:false

    };
  },
  created() {
    this.onComplete(this.account);
  },
  methods: {
    onComplete(data) {
      console.log("data:", data);
      this.account = data;
    }
  }
};
</script>

<style scoped></style>

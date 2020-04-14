<template>
  <div class="">
    <b-btn class="btn-green " @click="status =!status">metamask</b-btn>
    <vue-metamask v-if="status" userMessage="msg" @onComplete="onComplete"> </vue-metamask>
    <div class="col-12">
      <span>{{ account.metaMaskAddress }}</span>

    </div>
  </div>
</template>

<script>
  import VueMetamask from "vue-metamask";

  export default {
    components: { VueMetamask },
    data() {
      return {
        msg: "This is demo net work",
        account: {},
        status:false

      };
    },
    created() {
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

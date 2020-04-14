<template>
  <div class="mt-5 mb-5">
      <h1 class="tr-gray-two">{{ $route.name }}</h1>
    <Metamask/>
  </div>
</template>

<script>
  import Metamask from "../components/Metamask";

  export default {
    name: "about",
    components: {Metamask},
    data() {
      return {
        msg: "This is demo net work",
        account: {},
        status: false

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

<template>
  <span class="position-relative">
    <span
      v-coin
      class="copy param-sm tr-tr-gray-three pointer-event"
      v-clipboard:copy="$cookies.get('account')"
      v-clipboard:success="onCopy"
      v-clipboard:error="onError"
      >{{ $cookies.get("account") }}</span
    >
  </span>
</template>

<script>
export default {
  components: {},
  methods: {
    onCopy: function (e) {
      this.$bvToast.toast(`Copy to clipboard! `, {
        variant: "success",
        title: "Address has been on your clipboard",
        toaster: "b-toaster-bottom-left",
      });
    },
    onError: function (e) {
      this.$bvToast.toast(`Failed to copy! `, {
        variant: "danger",
        title: "Failed to copy",
        toaster: "b-toaster-bottom-left",
      });
    },
  },
  data() {
    return {};
  },
  name: "CopyToClipBoard",
};
</script>

<style lang="scss" scoped>
.copy {
  background-color: #eeeeee;
  padding: 5px 20px 5px 15px;
  border: 2px solid #ffffff;
  border-radius: 25px;
  border-right: 0;
}
</style>


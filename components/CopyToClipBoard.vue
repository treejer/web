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
      this.$bvToast.toast(this.$t('alert.copytoclipboard'), {
        variant: "success",
        title: this.$t('alert.address'),
        toaster: "b-toaster-bottom-left",
      });
    },
    onError: function (e) {
      this.$bvToast.toast(this.$t('alert.failed'), {
        variant: "danger",
        title: this.$t('alert.failed'),
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


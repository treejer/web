<template>
<span class="position-relative" @click="copyToClipBoard()">
  <span v-coin class="copy param-sm tr-tr-gray-three pointer-event" >{{ $cookies.get("account") }}</span>
</span>
</template>

<script>
import VueClipboard from "vue-clipboard2";

export default {
  components: {
    VueClipboard,
  },
  methods: {
    copyToClipBoard() {
      let self = this;
      let account = self.$cookies.get("account");
      this.$copyText(account).then((e) => {
          console.log(e,"e")
        self.$bvToast.toast(`Copy to clipboard! `, {
          variant: "success",
          title: "token has been on your clipboard",
          toaster: "b-toaster-bottom-left",
        });
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
    background-color: #EEEEEE;
    padding: 5px 20px 5px 15px;
    border: 2px solid #FFFFFF;
    border-radius: 25px;
    border-right: 0;
}
</style>


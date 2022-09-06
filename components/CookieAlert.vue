<template>
  <div class="">
    <div class="cookies-check-box position-fixed text-center" v-show="show">
      <p class="param tr-gary-three mb-0">
        this site uses cookies | if you want learn more click this link.
        <a href="https://docs.treejer.com/" target="_blank" class="tr-green"
          >Learn more</a
        >
        <button class="btn-green ml-5" @click.prevent="setAccess()">
          Accept
        </button>
        <span
          class="font-wieght-bolder exit pointer-event"
          @click.prevent="closeAlert()"
          >X</span
        >
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: true,
      access: false,
    };
  },
  created() {
    if (this.$cookies.get("setAccessCookies")) {
      this.access = true;
      this.show = false;
    }
  },
  methods: {
    closeAlert() {
      this.show = false;
      this.access = false;
      setTimeout(() => {
        this.show = true;
      }, 5000);
    },
    setAccess() {
      this.$cookies.set("setAccessCookies", true);
      this.show = false;
      this.access = true;
      this.$store.commit("SET_ACCESS_COOKIES", false);
    },
  },
};
</script>
<style lang="scss">
.cookies-check-box {
  display: flex;
  align-items: center;
  align-self: center;
  justify-content: center;
  height: auto;
  transition: all ease 0.2s;
  width: 100vw;
  background: #eeeeee;
  bottom: 0;
  padding: 15px 25px;
  .exit {
    position: absolute;
    top: 10px;
    right: 25%;
  }
}
</style>

<template>
  <div class="countdown d-flex ">
    <div class="d-flex" >
      <span class="digit">{{ days | two_digits }}</span>
      <span class="text">d</span>
    </div>
    <div class="d-flex">
      <span class="digit">{{ hours | two_digits }}</span>
      <span class="text">h</span>
    </div>
    <div class="d-flex">
      <span class="digit">{{ minutes | two_digits }}</span>
      <span class="text">m</span>
    </div>
    <div class="d-flex">
      <span class="digit">{{ seconds | two_digits }}</span>
      <span class="text">s</span>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

Vue.filter("two_digits", (value) => {
  if (value < 0) {
    return "00";
  }
  if (value.toString().length <= 1) {
    return `0${value}`;
  }
  return value;
});

export default {
  name:"Countdown",
  props: {

    date: {
      type: String,
    },
  },
  data() {
    return {
      now: Math.trunc(new Date().getTime() / 1000),
    };
  },
  computed: {
    dateInMilliseconds() {
      return Math.trunc(Date.parse(this.date) / 1000);
    },
    seconds() {
      return (this.dateInMilliseconds - this.now) % 60;
    },
    minutes() {
      return Math.trunc((this.dateInMilliseconds - this.now) / 60) % 60;
    },
    hours() {
      return Math.trunc((this.dateInMilliseconds - this.now) / 60 / 60) % 24;
    },
    days() {
      return Math.trunc((this.dateInMilliseconds - this.now) / 60 / 60 / 24);
    },
  },
  mounted() {
    setInterval(() => {
      this.now = Math.trunc(new Date().getTime() / 1000);
    }, 1000);
  },
};
</script>

<style lang="scss" >
.countdown{
    justify-content: space-between;
}
</style>

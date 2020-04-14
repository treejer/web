<template>
  <div :class="currentRouteName">

    <TreejerHeader />
    <div class="container">
      <div class="row">
        <nuxt />
      </div>
    </div>

    <Footer />
  </div>
</template>

<style lang="scss"></style>
<script>
import TreejerHeader from "../components/TreejerHeader";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import Router from "vue-router";

export default {
  components: { Sidebar, Footer, TreejerHeader, Router },
  data() {
    return {
      account: {},
      user: false,
      sidebarName: false,
      hasSideBar: false,
      routeName: null
    };
  },
  computed: {
     currentRouteName() {
        return this.$route.path;
    }
  },

  mounted() {
  },
  // mounted() {
  //   this.$store.dispatch('hasDashboard', {})
  //
  //
  // },

  methods: {
    onComplete(data) {
      console.log("data:", data);
      this.account = data;
    },
    hasUser() {
      const token = this.$cookies.get("token");
      if (token !== undefined) {
        return null;
      } else {
        this.user = true;
      }
    }
  }
};
</script>

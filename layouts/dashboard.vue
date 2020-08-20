<template>
  <div :class="currentRouteName" style="min-height: 100vh">

   <DashboardHeader />
    <div class="container" :class="$route.name"  style="min-height: 85vh">
      <div class="row">
        <Sidebar />
        <nuxt />
      </div>
    </div>

    <Footer />
  </div>
</template>

<style lang="scss"></style>
<script>
import DashboardHeader from "../components/DashboardHeader";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import Router from "vue-router";

export default {
  components: { Sidebar, Footer, DashboardHeader, Router },
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

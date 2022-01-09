<template>
  <div :class="currentRouteName" style="min-height: 100vh">

    <TreejerHeader/>

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
import TreejerHeader from "../components/TreejerHeader";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import Router from "vue-router";

export default {
  components: { Sidebar, Footer, TreejerHeader, Router },
  middleware: 'queryParamToCookie',
  data() {
    return {
    };
  },
  computed: {
     currentRouteName() {
        return this.$route.path;
    }
  },

  mounted() {
    this.$store.commit('SET_DASHBOARD' , true)
    if($nuxt.isOffline){
      this.$bvToast.toast(['Please check your connection'], {
        toaster: 'b-toaster-bottom-left',
        title: 'Connection is broked',
        variant: 'danger',
        noAutoHide: true,
        bodyClass: 'fund-error'
      })
    }
  },
  // mounted() {
  //   this.$store.dispatch('hasDashboard', {})
  //
  //
  // },

  methods: {

  }
};
</script>

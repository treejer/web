<template>
  <div :class="$route.name" style="min-height: 100vh">

    <dashboard-header />

    <div class="container" :class="$route.name"  style="min-height: 85vh">
      <div class="row"   > 
        <Sidebar />
        <nuxt  />
      </div>
    </div>

    <Footer />
  </div>
</template>

<style lang="scss"></style>
<script>
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import Router from "vue-router";
import DashboardHeader from '../components/DashboardHeader.vue';

export default {
  components: { Sidebar, Footer, Router, DashboardHeader },
  middleware: 'queryParamToCookie',
  data() {
    return {
    };
  },
 

  mounted() {
    this.$store.commit('SET_DASHBOARD' , true)
    if($nuxt.isOffline){
      this.$bvToast.toast(this.$t('alert.checkyourconnection'), {
        toaster: 'b-toaster-bottom-left',
        title: this.$t('alert.connectionisbroked'),
        variant: 'danger',
        noAutoHide: true,
        bodyClass: 'fund-error'
      })
    }
  },

  methods: {

  }
};
</script>

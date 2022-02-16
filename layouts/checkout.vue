<template>
  <div :class="$route.name"  style="min-height: 100vh">
      <DashboardHeader/>
      <div class="container"  style="min-height: 85vh">
        <div class="row">
          <nuxt/>
        </div>
      </div>
    <Footer/>
  </div>
</template>

<style lang="scss"></style>
<script>
  import DashboardHeader from "../components/DashboardHeader";
  import Footer from "../components/Footer";

  export default {
    components: { Footer, DashboardHeader},
      middleware: 'queryParamToCookie',

    data() {
      return {
      };
    },

    methods: {
      onComplete(data) {
        this.account = data;
      },
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
    }
  };
</script>

<template>
  <div style="min-height: 100vh">
    <TreejerHeader />
    <div class="container" :class="$route.name" style="min-height: 85vh">
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
export default {
  components: { Sidebar, Footer, TreejerHeader },
  mounted() {
    this.$store.commit("SET_DASHBOARD", false);
    console.log($nuxt.isOffline,"$nuxt.isOffline")
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

  methods: {
    makeToast(variant, msg, title) {
      this.$bvToast.toast(msg, {
        variant: variant,
        solid: true,
        toaster: "b-toaster-bottom-left",
      });
    },
  },
};
</script>

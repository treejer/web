<template>
  <div :class="$route.name" class="landing-layout" style="min-height: 100vh">

    <TreejerHeader />
    <div class="container" :class="$route.name">
      <div class="row">
        <nuxt/>
      </div>
    </div>

    <LandingFooter />
  </div>
</template>

<script>
  import TreejerHeader from "../components/TreejerHeader";
  import LandingFooter from "../components/LandingFooter";
  import Sidebar from "../components/Sidebar";

  export default {
    components: {Sidebar, LandingFooter, TreejerHeader},
    middleware: 'queryParamToCookie',

    name:'landing',
    data() {
      return {

      };
    },
    mounted() {
      this.$store.commit('SET_DASHBOARD' , false)
    },
    methods: {
    }
  };
</script>

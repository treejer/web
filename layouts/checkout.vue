<template>
  <div :class="currentRouteName"  style="min-height: 100vh">
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
    components: { Footer, DashboardHeader,  },
    data() {
      return {
      };
    },
    computed: {
      currentRouteName() {
        return this.$route.path;
      }
    },
    methods: {
      onComplete(data) {
        this.account = data;
      },
    },
    mounted() {
      this.$store.commit('SET_DASHBOARD' , true)
      console.table(this.$store.state.dashboard)

    }
  };
</script>

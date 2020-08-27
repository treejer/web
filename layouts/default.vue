<template>
  <div :class="currentRouteName" style="min-height: 100vh">

    <TreejerHeader />

    <div class="container" :class="$route.name"  style="min-height: 85vh">
      <div class="row">
        <nuxt/>
      </div>

    </div>

    <Footer />
<!--    <div class="w-100 h-100 bg-dark position-fixed d-flex align-items-center align-self-center justify-content-center" v-if="!hasMetaMask">-->
<!--      <button type="button" name="metamask" >-->
<!--        install metaMask-->
<!--      </button>-->


<!--    </div>-->
  </div>
</template>

<style lang="scss"></style>
<script>
import TreejerHeader from "../components/TreejerHeader";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import Router from "vue-router";

export default {
  components: {Sidebar, Footer, TreejerHeader, Router},
  data() {
    return {
      account: {},
      user: false,
      sidebarName: false,
      hasSideBar: false,
      routeName: null,
      hasMetaMask: null
    };
  },
  computed: {
    currentRouteName() {
      return this.$route.path;
    }
  },
  created() {

  },

  mounted() {

    const workBox = window.$workbox
    if (this.$nuxt.isOnline) {
      return null
    } else {

      this.makeToast('danger', 'You are offline')

    }
  },
  // mounted() {
  //   this.$store.dispatch('hasDashboard', {})
  //
  //
  // },

  methods: {
    makeToast(variant, msg, title) {
      this.$bvToast.toast(msg, {
        title: title,
        variant: variant,
        solid: true
      })
    },
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

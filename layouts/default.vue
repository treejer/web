<template>
  <div :class="currentRouteName" style="min-height: 100vh">
    <TreejerHeader />
    <div class="container" :class="$route.name"  style="min-height: 81.8vh">
      <div class="row">
        <nuxt/>
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
  components: {Sidebar, Footer, TreejerHeader, Router},
  data() {
    return {
      account: {},
      user: false,
      sidebarName: false,
      hasSideBar: false,
      routeName: null,
      hasMetaMask: null,
      onLine: this.$nuxt.isOnline,
      offLine: this.$nuxt.isOffline

    };
  },
  computed: {
    currentRouteName() {
      return this.$route.path;
    },
  },

  mounted() {
    this.$store.commit('SET_DASHBOARD', false)
    const url = 'https://api.etherscan.io/api?module=stats&action=ethprice&apikey=7WT93YQWFRQAET8AY3GQM6NCIYG6G1YAHE'
    this.$axios.get(url)
      .then((res) => {
        console.log(res, 'res')
      }).catch((err) => {
      console.log(err, "err")
     this.makeToast('danger',`Offline mode`)
    })
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
        solid: true,
        toaster: 'b-toaster-bottom-left',
      })
    },
    onComplete(data) {
      this.account = data;
    },
   async refresh(){
     const ethereums =  await ethereum;
     ethereums.autoRefreshOnNetworkChange = false
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

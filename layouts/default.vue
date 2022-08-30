<template>
  <div class="default-main-content">
    <TreejerHeader />
    <div :class="$route.name" class="container default-main-content-box" >
      <div class="row"   @click.prevent="$store.commit('SET_LANDING_MOBILE_SIDEBAR', false)">
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
  middleware: "queryParamToCookie",

  mounted() {
    this.$store.commit("SET_DASHBOARD", false);
    if ($nuxt.isOffline) {
      this.$bvToast.toast(this.$t("alert.checkyourconnection"), {
        toaster: "b-toaster-bottom-left",
        title: this.$t("alert.connectionisbroked"),
        variant: "danger",
        noAutoHide: true,
        bodyClass: "fund-error",
      });
    }
  },
  async created() {
    await this.checkWorkbox();
    // if (process.client) {
    //   const workbox = await window.$workbox;
    //   console.log(workbox, "workbox is here");
    //   if (workbox) {
    //     workbox.addEventListener("installed", (event) => {
    //       // If we don't do this we'll be displaying the notification after the initial installation, which isn't perferred.
    //       if (event.isUpdate) {
    //         // whatever logic you want to use to notify the user that they need to refresh the page.
    //       }
    //     });
    //   }
    // }
    // Initialize deferredPrompt for use later to show browser install prompt.
  },

  methods: {
    makeToast(variant, msg, title) {
      this.$bvToast.toast(msg, {
        variant: variant,
        solid: true,
        toaster: "b-toaster-bottom-left",
      });
    },
    checkWorkbox() {
      let deferredPrompt;
      if (process.client) {
        window.addEventListener("beforeinstallprompt", (e) => {
          // Prevent the mini-infobar from appearing on mobile
          e.preventDefault();
          // Stash the event so it can be triggered later.
          deferredPrompt = e;
          console.log(e, "e is here", showInstallPromotion());
          // Update UI notify the user they can install the PWA
          showInstallPromotion();
          // Optionally, send analytics event that PWA install promo was shown.
          console.log(`'beforeinstallprompt' event was fired.`);
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.default-main-content{
  min-height: 100vh;
  .default-main-content-box{
    min-height: 95vh;
  }
}
@media (min-width: 100px) and (max-width: 768px) and (orientation: landscape) {
 
    .default-main-content {
      min-height: 170vh;
      .default-main-content-box {
      min-height: 170vh;
    }
    }

  
}
// @media(max-width: 768px)  {
//   .default-main-content {
//     min-height: 100vh;
//     .default-main-content-box {
//       min-height: 175vh;
//     }
//   }
// }
</style>
<template>
  <div class="mobile-version overflow-hidden" style="height: 100vh">
    <SidebarSmProfile v-if="$store.state.hasMobileProfile"/>
    <div
      class="container-fluid main-mobile" style="min-height: 100vh"
      :class="$store.state.hasMobileProfile ? 'open-sidebar':'' ">
      <div class="row">
        <nuxt/>
        <FooterSmBottom/>
        <LoadingMobile/>
      </div>
    </div>
  </div>
</template>

<script>
import FooterSmBottom from '../components/mobile/FooterSmBottom'
import SidebarSmProfile from "@/components/mobile/SidebarSmProfile";
import LoadingMobile from "@/components/mobile/LoadingMobile";

export default {
  name: "mobile",
  components: {
    LoadingMobile,
    SidebarSmProfile,
    FooterSmBottom
  }
}
</script>

<style scoped lang="scss">
.mobile-version .open-sidebar {
  position: relative;
  left: 36%;


}

.mobile-version .open-sidebar.main-mobile {
  background: #FAF8F1;
  border-radius: 32px 0px 0px 32px;
}

.mobile-version {
  background: #E5E7DB !important;
  transition: all ease .3s;

  .main-mobile {
    background: #FAF8F1;
  }
}

</style>

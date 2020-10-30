<template>
  <div
    :class="'currentRouteName' + this.$route.name"
    class="container-fluid "
  >
    <Sidebar />
    <div class="container-fluid">
      <div class="row">
        <div
          class="main-admin offset-1"
          :class="$store.state.adminSidebar ? ' col-11':'offset-3 col-12' ">
          <nuxt/>
        </div>
      </div>
    </div>

  </div>
</template>
<script>

import Sidebar from "@/components/admin/Sidebar";
export default {
  name:"admin",
  components: {Sidebar},
  data() {
    return {
    };
  },
};
</script>
<style lang="scss">
@media (min-width: 1024px) {
  .main-admin{
    padding: 100px 0;
  }
}

</style>

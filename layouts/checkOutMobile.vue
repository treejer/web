<template>
  <div class="mobile-version overflow-hidden">
    <div
      class="container-fluid">
      <div class="row">
        <nuxt/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "checkOutMobile",
  components: {
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
  background: #FAF8F1 !important;
  transition: all ease .3s;

  .main-mobile {
    background: #FAF8F1;
  }
}

</style>

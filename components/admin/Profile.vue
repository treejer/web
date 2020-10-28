<template>
  <div
    :class="hasSideBar ? 'collapsed' : 'hasSideBar'"
    class="profile-card">
    <div class="img-fluid rounded-circle" v-if="$cookies.get('account')">
      <img src="../../assets/images/myforest/avatar.png" alt="avatar">
    </div>
    <div class="img-fluid rounded-circle" v-else>
      <img src="../../assets/images/myforest/avatar.png" alt="avatar">
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  props: {
    hasSideBar: {
      default: false,
      type: Boolean
    }
  }
}
</script>

<style scoped lang="scss">
.profile-card.collapsed {
  z-index: +999999;
  position: absolute;

  .img-fluid {
    padding: 32px 5px;

    img {
      width: 36px;
      height: 36px;
    }

  }
}
.profile-card.hasSideBar {
  z-index: +999999;
  position: absolute;

  .img-fluid {
    padding: 48px 48px;
    padding-top: 15px;

    img {
      width: 80px;
      height: 80px;
    }

  }
}
</style>

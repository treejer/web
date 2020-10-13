<template>
  <section v-show="$store.state.hasMobileProfile" class="profile-sidebar-mobile">
    <div class="over-wrapper">
      <div class="profile-card pointer-event">
        <img v-if="$cookies.get('account')" :src="`https://api.adorable.io/avatars/240/${$cookies.get('account')}`"
             width="65" height="73"/>
        <img v-if="!$cookies.get('account')" src="../../assets/images/myforest/avatar.png" width="65" height="73"/>
      </div>
      <div class="my-forest-mobile pointer-event"
           @click="goToForest()"
           :class="$store.state.index === 0 ? 'nuxt-link-exact-active' : ''"
      >
        <img src="../../assets/images/sidebar/my-forest.svg" width="32" height="32" class="img-fluid "/>
        <p class="tr-gray-three param-md text-center">My Forest</p>
      </div>
      <div class="update-mobile pointer-event"
           @click="goToUpdates()"
           :class="$store.state.index === 1? 'nuxt-link-exact-active' : ''"
      >
        <img src="../../assets/images/sidebar/update.svg" width="32" height="32" class="img-fluid "/>
        <p class="tr-gray-three param-md text-center">Update</p>

      </div>
      <div class="trophy pointer-event"
           @click="goToLeaderBoards()"
           :class="$store.state.index === 2? 'nuxt-link-exact-active' : ''"
      >
        <img src="../../assets/images/sidebar/trophy.svg" width="32" height="32" class="img-fluid "/>
        <p class="tr-gray-three param-md text-center">Leaderboards</p>

      </div>
      <div class="help pointer-event"
           @click="goToComminuty()"

      >
        <img src="../../assets/images/sidebar/help.svg" width="32" height="32" class="img-fluid "/>
        <p class="tr-gray-three param-md text-center">Help</p>

      </div>
    </div>

  </section>
</template>

<script>
export default {
  name: "SidebarSmProfile",
  data() {
    return {
      items: [{
        scr: 'name'
      }]
    }
  },
  mounted() {
    console.log(this.$route.params.id, 'this.$route.params.id')
  },
  methods: {
    goToUpdates() {
      this.$store.commit('SET_INDEX', 1)
      this.$router.push({path: '/mobile/dashboard/updates'})
    },
    goToForest() {
      this.$store.commit('SET_INDEX', 0)
      if(this.$cookies.get('account')){
        this.$router.push({path: `/mobile/dashboard/${this.$cookies.get('account')}`})

      }else {
        this.$router.push({path: `/mobile/dashboard`})

      }
    },
    goToLeaderBoards() {
      this.$store.commit('SET_INDEX', 2)
      this.$router.push({path: `/mobile/dashboard/leaderBoards`})
    },
    goToComminuty(){
      window.open('https://discuss.treejer.com','_blank')
    }
  }
}
</script>

<style scoped lang="scss">
.profile-sidebar-mobile {
  transition: all ease .3s;
  width: 36%;
  background: #E5E7DB;
  height: 100vh;
  position: fixed;
  align-self: center;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;

  .over-wrapper {
    width: 100%;
    height: 100vh;
    position: relative;
    left: 10px;
    margin-top: 50px;
  }

  .pointer-event {
    width: 100%;
    text-align: center;
    height: 133px;
    padding-top: 35px;
  }

  .pointer-event.nuxt-link-exact-active {
    background-image: url("../../assets/images/mobile/active-link.svg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }


  p {
    margin-top: 12px;
  }

  .profile-card {
    width: 100%;
    justify-content: center;
    display: flex;

    img {
      border: 1px solid #616161;
      padding: 0px 0 0 0;
      border-radius: 50px;
      background: #F5F5F5;
    }

  }
}
</style>

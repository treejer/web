<template>
  <span
    :class="activeNotifications ? 'active notification-box ' : 'notification-box'"
  >
     <!-- <b-badge
       class="badge pointer-event"
       pill
       variant="danger"
       @click="checkDropDown()"
     >{{ 4 }}</b-badge> -->
    <!--       @mouseenter="checkDropDown()"-->

    <!--      <span v-show="activeNotifications" class="notifications text-left">-->
<!--        <span class="inner-badge"  @click="checkDropDown"></span>-->
<!--        <span class="param-lg ">hiiiiiii</span>-->
<!--      </span>-->

  </span>

</template>

<script>
export default {
  name: "Badge",
  notifications: null,
  data() {
    return {
      activeNotifications: false
    }
  },
  methods: {

    checkDropDown() {
      this.$store.commit('SET_SIDEBAR_INDEX',2)

      this.$router.push('/updates')
    }
  }
}
</script>

<style lang="scss" scoped>
.notification-box {
  .inner-badge{
    width: 100vw;
    position: absolute;
    height: 70vh;
    right: -220px;
  }
  .badge {
    position: absolute;
    top: -10px;
    left: 35px;
    @media(max-width: 425px){
      left: 18px;
    }
  }

  .notifications {
    background: #FAFAFA;
    /* Primary */
    transition: .3s ease-in-out all;;
    box-shadow: 0px 4px 11px rgba(0, 0, 0, 0.161);
    border-radius: 6px;
    width: 300px;
    min-height: 300px;
    position: absolute;
    right: -30px;
    top: 50px;
    z-index: +999999;
    padding: 15px;
    @media(max-width: 425px){
      right: -65px;
    }
  }

}


</style>

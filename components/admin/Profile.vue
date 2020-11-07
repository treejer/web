<template>
  <div
    class="profile-card pointer-event "
    :class="hasSideBar ? 'collapsed' : 'hasSideBar'"
    @click="showModal()"
  >
    <div class="img-fluid" v-if="$cookies.get('account')">
      <img :src="`https://www.gravatar.com/avatar/${$cookies.get('account')}`" alt="avatar">
    </div>
    <div class="img-fluid" v-else>
      <img src="../../assets/images/myforest/avatar.png" alt="avatar">
    </div>
    <CheckOutModal :modalID="'checkout_modal'"/>
    <b-modal
      centered
      hide-footer
      id="five" title=" ">
      <Wallets/>
    </b-modal>

  </div>
</template>

<script>
import CheckOutModal from '@/components/admin/CheckOutModal'
import Wallets from "@/components/Wallets";

export default {
  name: "Profile",
  components: {
    Wallets,
    CheckOutModal
  },

  props: {
    hasSideBar: {
      default: false,
      type: Boolean
    }
  },
  methods: {
    showModal() {
      if (this.$cookies.get('account')) {
        this.$bvModal.show('checkout_modal')
      } else {
        this.$bvModal.show('five')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.profile-card {
  z-index: +999999;
  position: fixed;

  .img-fluid {
    padding: 32px 5px;


    img {
      width: 36px;
      height: 36px;
      border: 2px solid #c8c8c8;
      border-radius: 50px;
    }

  }
}
.profile-card.hasSideBar {
  z-index: +999999;
  position: fixed;

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

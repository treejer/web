<template>
  <b-modal hide-footer @close="$bvModal.hide(modalID)"  :id="modalID" @hide="$bvModal.hide(modalID)">
    <ul v-if="$cookies.get('walletName') " class="list-style-none seven" >
      <li class="param-18 tr-gray-two font-weight-bold text-center mt-3 mb-4 text-center">     Connected with</li>
      <li class="pointer-event mb-2   ">
        <p
          class="tr-gray-three param font-weight-bold d-flex justify-content-between"
          style="border: 1px solid #BDBDBD;background: #E5E7DB;padding: 15px 25px;width: 75%;margin: auto;border-radius:7px "
        >
          <span class="name text-capitalize">      {{ $cookies.get('walletName') }}
            </span>
          <span class="icon">
            <img v-if="$cookies.get('walletName')"
                 :src="require(`~/assets/images/wallets/${$cookies.get('walletName')}.svg`)"
                 :alt="$cookies.get('walletName')" class="img-fluid"/>
            </span>
        </p>
      </li>
      <li class="param font-weight-bold tr-gray-two text-center mt-3 whatis position-relative">

        <span style="letter-spacing: -3px">-------------------------------------</span><span style="padding:  0 10px">Your Address</span><span style="letter-spacing: -3px">-------------------------------------</span>

      </li>
      <li class="d-flex mt-4  align-items-center justify-content-center">
            <span v-coin id="tokens"
                  class="param-sm tr-gray-three p-2 avatar-card">{{ $cookies.get('account') }}</span>

      </li>
      <li class="d-flex mt-4 justify-content-center text-center">
        <button class="btn-green param pr-4 pl-4 pt-2 pb-2" @click="logout">
          Change Wallet
        </button>
      </li>
    </ul>
  </b-modal>

</template>

<script>
export default {
  name: "modal",
  props:{
    modalID:{
      default:'checkout_modal',
      type:String
    }
  },
  methods:{
    logout(){
      this.$store.dispatch("logout")

    }
  }
}
</script>

<style scoped>

</style>

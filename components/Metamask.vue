<template>
  <b-navbar-nav class="metamask" ref="page">
    <b-nav-form v-if="!$cookies.get('account')">
      <b-button class="connect-button m-auto"
                @click.prevent="showModal()"
      >
        <b-spinner v-if="loading" small class="mr-1"></b-spinner>
        {{ loading ? ' Loading...' : 'Connect Wallet' }}

      </b-button
      >
      <img
        alt="tree"
        name="tree"
        src="/tree.svg"
        @click="$router.push('/forest')"
        class="img-fluid tree pointer-event"
      />
    </b-nav-form>
    <b-nav-form  class="pointer-event" v-if="isLoggedIn|| $cookies.get('account')">
      <div @click.prevent="logout()" class=" pointer-event accounting-card d-flex align-items-center align-self-center pointer-event">
        <span v-coin class="param-sm tr-gray-three">{{ isLoggedIn || $cookies.get('account') }}</span>
        <span class="img"><img :src="'https://api.adorable.io/avatars/40/'+$cookies.get('account')" alt="accounting"
                               class="img-fluid d-none d-md-block rounded-circle shadow border" width="42"
                               height="42"/></span>
      </div>

      <img
        alt="tree"
        name="tree"
        src="/tree.svg"
        @click="$router.push({ path: `/forest/${$cookies.get('account')}` })"
        class="img-fluid tree pointer-event"
      />
    </b-nav-form>
    <b-dropdown id="dropdown-aria" lazy hidden>
      <b-dropdown-header id="dropdown-header-1">Groups</b-dropdown-header>
      <b-dropdown-item-button aria-describedby="dropdown-header-1">Add</b-dropdown-item-button>
      <b-dropdown-item-button aria-describedby="dropdown-header-1">Delete</b-dropdown-item-button>
    </b-dropdown>
    <b-modal hide-footer @close="$bvModal.hide('seven')"  id="seven" @hide="$bvModal.hide('seven')">
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
          <client-only>
            <span v-coin id="tokens" @click="copyClipboard"
                  class="param-sm tr-gray-three p-2 avatar-card pointer-event">{{ $cookies.get('account') }}</span>

          </client-only>
        </li>
        <li class="d-flex mt-4 justify-content-center text-center">
          <button class="btn-green param pr-4 pl-4 pt-2 pb-2" @click="changeWallet()">
            Change Wallet
          </button>
        </li>
      </ul>
    </b-modal>
    <!-- Using 'button-content' slot -->

  </b-navbar-nav>
</template>

<script>
import Wallets from "./Wallets";

export default {
  components: {Wallets},
  props: ['wallets'],
  data() {
    return {
      account: null,
      loading: false
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.account;
    }
  },
 async mounted() {
   await ethereum.on('chainChanged', () => {
     document.location.reload()
   })

  },
  methods: {
    changeWallet() {
      this.$store.dispatch("logout")
      this.$bvModal.hide('seven')
      this.$bvModal.show('five')
    },
    logout() {
      this.$bvModal.show('seven')


    },
     async copyClipboard(e) {
     try {
       await this.$copyText(e.target.innerText)
       const successful = document.execCommand('copy');
       this.$bvToast.toast(`Copy to clipboard!! `,{
         variant:'success',
         title:'token has been on your clipboard'
       })
     } catch (e) {
       console.error(e);
     }

      /* unselect the range */
      window.getSelection().removeAllRanges()
    },
    showModal() {
      this.$emit('showModal')


    },
    activeMenu(item, index) {
      if (item.name === 'Blog') {
        window.open('https://blog.treejer.com/', '_blank')
      } else {
          this.activeIndex = index;
        }
      },

    },
  };
</script>

<style scoped lang="scss">
.metamask{

}
</style>

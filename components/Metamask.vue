<template>
  <b-navbar-nav>
    <b-nav-form v-if="!$cookies.get('account')">
      <b-button class="connect-button m-auto"
                @click.prevent="showModal()"
      >
        <b-spinner v-if="loading" small class="mr-1"></b-spinner>
        {{loading ? ' Loading...' : 'Connect Wallet'}}

      </b-button
      >
      <img
        alt="tree"
        name="tree"
        src="/tree.svg"
        class="img-fluid tree pointer-event"
      />
    </b-nav-form>
    <b-nav-form @click.pq="logout()" class="pointer-event" v-if="isLoggedIn|| $cookies.get('account')">
      <div   class=" pointer-event accounting-card d-flex align-items-center align-self-center pointer-event">
        <span class="param-sm tr-gray-three">{{isLoggedIn|| $cookies.get('account')}}</span>
        <span class="img"><img src="../assets/images/home/accounting.png" alt="accounting"
                               class="img-fluid d-none d-md-block" width="42"
                               height="42"/></span>
      </div>
      <img
        alt="tree"
        name="tree"
        src="~/assets/images/home/shop.svg"
        class="img-fluid tree pointer-event"
      />
    </b-nav-form>
    <!-- Using 'button-content' slot -->
  </b-navbar-nav>
</template>

<script>
  import Loading from '../components/treejerLoading'
  import Wallets from "./Wallets";

  export default {
    components: {Wallets, Loading},
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
    mounted() {
      console.log(this.$cookies.get('account'))
    },
    methods: {
      loginToast(variant, title, message, href) {
        this.$bvToast.toast(message, {
          title: title,
          variant: variant,
          href: href
        });
      },
      log() {
        this.loading = true
        if (typeof window.ethereum !== 'undefined') {
          this.getAccount();
          this.loading = false

        } else {
          this.makeToast('danger')
          this.loading = false

        }
      },
      async getAccount() {
        const accounts = await ethereum.enable();
        console.log(accounts)
        const account = accounts[0];
        this.account = account.slice(0, 10);
        this.login(account)
      },
      login(account) {
        this.$store.dispatch("login", {account})
          .then(() => {
            this.$cookies.set('account', account)
            console.log()
          })
          .catch(err => console.log(err));
      },
       logout() {
        this.$store.dispatch("logout").then(() => {
          this.$router.push('/')
        });

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

<style scoped></style>

<template>
  <b-navbar-nav>
    <b-nav-form v-if="!$cookies.get('account')">
      <b-button
        @click.prevent="log()"
        class="connect-button m-auto"
        type="submit"
      >Connect Wallet
      </b-button
      >
      <img
        alt="tree"
        name="tree"
        src="/tree.svg"
        class="img-fluid tree pointer-event"
      />
    </b-nav-form>
    <b-nav-form v-if="isLoggedIn|| $cookies.get('account')">
      <!--              <b-button-->
      <!--                @click.prevent="logout"-->
      <!--                class="connect-buttons m-auto"-->
      <!--                type="submit"-->
      <!--              >{{ account }}-->
      <!--              </b-button-->
      <div class="accounting-card d-flex align-items-center align-self-center pointer-event" @click="logout">
        <span class="param-sm tr-gray-three">{{isLoggedIn|| $cookies.get('account')}}</span>
        <span class="img"><img src="../assets/images/home/accounting.png"  alt="accounting" class="img-fluid d-none d-md-block" width="42"
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

  export default {
    components: {Loading},
    data() {
      return {
        account: null,
        trLoading: false


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
        if (typeof window.ethereum !== 'undefined') {
          this.getAccount();
        } else {
          this.makeToast('danger')
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
        });
        this.$forceUpdate()


      },
      makeToast(variant = null) {
        this.$bvToast.toast('install metamask from here', {
          title: `https://metamask.io/' ${variant || 'default'}`,
          href: 'https://metamask.io/',
          variant: variant,
          solid: true
        })
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

<template>
  <b-navbar-nav>
    <keep-alive>

    </keep-alive>
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
        @click="$router.push('/myForest')"
        class="img-fluid tree pointer-event"
      />
    </b-nav-form>
    <b-nav-form  class="pointer-event" v-if="isLoggedIn|| $cookies.get('account')">
      <div @click="logout()" class=" pointer-event accounting-card d-flex align-items-center align-self-center pointer-event">
        <span class="param-sm tr-gray-three">{{ isLoggedIn || $cookies.get('account') }}</span>
        <span class="img"><img :src="'https://api.adorable.io/avatars/40/'+$cookies.get('account')" alt="accounting"
                               class="img-fluid d-none d-md-block rounded-circle shadow border" width="42"
                               height="42"/></span>
      </div>
      <img
        alt="tree"
        name="tree"
        src="/tree.svg"
        @click="$router.push({ path: `/myForest/${$cookies.get('account')}` })"
        class="img-fluid tree pointer-event"
      />
    </b-nav-form>
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
  mounted() {
  },
  methods: {

       logout() {
         this.$forceUpdate()
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

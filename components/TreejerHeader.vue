<template>
  <div class="headers container">
    <client-only>
      <b-navbar toggleable="md">
        <b-navbar-brand class="pointer-event position-relative" :to="localePath('home')">
          <img class="img-fluid pointer-event" alt="logo" name="treejer" src="/logo/TreejerLogo@3x.png">
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse">

        </b-navbar-toggle>

        <b-collapse class="text-right justify-content-between" id="nav-collapse" is-nav>

          <!-- Right aligned nav items -->

          <b-navbar-nav class="header-menu">
            <b-nav-item href="#">About</b-nav-item>
            <b-nav-item href="#">Blog</b-nav-item>
            <b-nav-item href="#">For Business</b-nav-item>
            <b-nav-item href="#">Find My Tree</b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav>
            <b-nav-form v-if="!user">
              <b-button @click.prevent="login" class="connect-button m-auto" type="submit">Connect Wallet</b-button>
              <img alt="tree" name="tree" src="/tree.svg" class="img-fluid tree pointer-event">
            </b-nav-form>
            <b-nav-form v-if="user">
              <b-button @click.prevent="logout" class="connect-button m-auto" type="submit">{{token}}</b-button>
              <img alt="tree" name="tree" src="/tree.svg" class="img-fluid tree pointer-event">
            </b-nav-form>


            <!-- Using 'button-content' slot -->
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </client-only>


  </div>
</template>

<script>
  export default {
    name: "TreejerHeader",
    data() {
      return {
        formError: null,
        userName: 'test',
        user: false,
        token: '',
      }
    },
    methods: {
      loginToast(variant, title, message, href) {
        this.$bvToast.toast(message, {
          title: title,
          variant: variant,
          href: href
        });
      },

      login() {
        // this.$store.state.user = true
        this.user = true
        this.token = 'test'
        this.loginToast('success', 'login', 'test')


      },

      async logout() {
        // this.$store.state.user = false
        this.user = false
        this.token = ''
        this.loginToast('danger', 'logout')
      }

    }
  }
</script>

<style  lang="scss">
    .headers {
      .header-menu {

        font-size: 14px;
        font-weight: bolder;
        color: #616161;
        padding-top: 5px;

        .nav-item {
          padding: 15px 35px 25px 0;
        }

      }

      height: 103px;
      background: #faf8f1;

      .connect-button {
        width: 128px;
        height: 32px;
        border-radius: 20px;
        background-color: #424242;
        font-family: Montserrat;
        font-size: 12px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.25;
        letter-spacing: normal;
        color: #f5f5f5;
      }


      img {
        width: 71px;
        height: 71px;
        object-fit: contain;
      }

      img.tree {
        width: 27px;
        height: 36px;
        object-fit: contain;
        margin: 0 0px 0px 20px;
      }
    }


</style>

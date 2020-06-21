<template>
  <div class="headers container">
    <keep-alive>
      <b-navbar toggleable="md">
        <b-navbar-brand
          class="pointer-event position-relative"
          :to="localePath('home')"
        >
          <img
            class="img-fluid pointer-event"
            alt="logo"
            name="treejer"
            src="/logo/treejer.png"
          />
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse
          class="text-right justify-content-between"
          id="nav-collapse"
          is-nav
        >
          <!-- Right aligned nav items -->

          <b-navbar-nav class="header-menu">
            <!-- <b-nav-item v-if="!$store.state.user" :class="{ 'active': activeIndex === index }"
                        v-for="(item,index) in items" :name="item.name" :key="index" :to="item.href"
                        @click="activeMenu(item,index)">
              {{item.name}}
            </b-nav-item> -->
          </b-navbar-nav>
          <b-navbar-nav>
            <b-nav-form v-if="!account">
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
            <b-nav-form v-if="account">
              <!--              <b-button-->
              <!--                @click.prevent="logout"-->
              <!--                class="connect-buttons m-auto"-->
              <!--                type="submit"-->
              <!--              >{{ account }}-->
              <!--              </b-button-->
              <div class="accounting-card d-flex align-items-center align-self-center pointer-event" @click="logout" >
                <span class="param-sm tr-gray-three">{{account}}</span>
                <span class="img"><img src="../assets/images/home/accounting.png" alt="accounting" class="img-fluid" width="42" height="42" /></span>
              </div>
              <img
                alt="tree"
                name="tree"
                src="/tree.svg"
                class="img-fluid tree pointer-event"
              />
            </b-nav-form>

            <!-- Using 'button-content' slot -->
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </keep-alive>
  </div>
</template>

<script>
  export default {
    name: "TreejerHeader",
    layout:'dashboard',

    data() {
      return {
        formError: null,
        userName: "test",
        user: false,
        token: "",
        activeIndex: 0,
        items: [
          {name: "About", step: 1, href: 'about'},
          {name: "Blog", step: 2, href: 'blog'},
          {name: "For Business", step: 3, href: 'forBusiness'},
          {name: "Find My Tree", step: 4, href: 'findMyTree'},
        ]
      };
    },
    computed: {
      account() {
        return this.$store.state.account;
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
      login: function () {
        let userName = this.userName;
        this.$store
          .dispatch("login", {userName})
          .then(() => {
            this.$cookies.set('token', true)
            this.loginToast('success',)
            this.token = 'test'
            this.$router.push("myForest")
          })
          .catch(err => console.log(err));
      },
      logout() {
        this.$store.dispatch("logout").then(() => {
          this.$router.push("/");
        });
      },

      activeMenu(item, index) {

        this.activeIndex = index;
      },

    }
  };
</script>

<style lang="scss">

</style>

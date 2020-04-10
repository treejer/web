<template>
  <div class="headers container">
    <client-only>
      <b-navbar toggleable="md">
        <b-navbar-brand
          class="pointer-event position-relative"
          :to="localePath('home')"
        >
          <img
            class="img-fluid pointer-event"
            alt="logo"
            name="treejer"
            src="/logo/TreejerLogo@3x.png"
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
            <b-nav-item v-if="!$store.state.user" :class="{ 'active': activeIndex === index }"
                        v-for="(item,index) in items" :name="item.name" :key="index" :to="item.href"
                        @click="activeMenu(item,index)">
              {{item.name}}
            </b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav>
            <b-nav-form v-if="isLoggedIn !== 'test'">
              <b-button
                @click.prevent="login"
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
            <b-nav-form v-if="isLoggedIn === 'test'">
              <b-button
                @click.prevent="logout"
                class="connect-button m-auto"
                type="submit"
              >{{ token }}
              </b-button
              >
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
    </client-only>
  </div>
</template>

<script>
  export default {
    name: "TreejerHeader",
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
      isLoggedIn() {
        return this.$store.state.user;
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
  .headers {
    .navbar-nav.header-menu {
      margin-left: 58px;
    }

    .header-menu {
      font-size: 14px;
      font-weight: bolder;
      color: #616161;
      padding-top: 5px;

      .nav-item {
        padding: 15px 35px 25px 0;

        a {
          font-family: Montserrat;
          font-size: 14px;
          font-weight: 500;
          position: relative;
        }

        a:after {
          position: absolute;
          content: '';
          border-right: solid 1px gray;
          width: 3px;
          height: 50%;
          right: -23%;
          align-items: center;
          vertical-align: middle;

        }

        li:last-child > a {
          display: none;

        }
      }

      .nav-item:last-child > a:after {
        display: none;

      }

      .nav-item.active {
        a {
          color: #5a9d79;

        }

        a:after {
          border-right: solid 1px #5a9d79;
        }
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

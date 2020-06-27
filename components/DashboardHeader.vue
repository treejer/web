<template>
  <div class="headers container"  style="min-height: 10vh">
    <keep-alive>
      <b-navbar toggleable="md">
        <b-navbar-brand
          class="pointer-event position-relative"
          :to="localePath('index')"
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
            <client-only>
             <Metamask />

            </client-only>

            <!-- Using 'button-content' slot -->
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </keep-alive>
  </div>
</template>

<script>
  import Metamask from "./Metamask";
  export default {
    name: "TreejerHeader",
    components: {Metamask},
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

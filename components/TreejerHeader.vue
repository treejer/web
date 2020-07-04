<template>
  <div class="headers container" style="min-height: 10vh">
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
        <b-navbar-nav>
          <client-only>
            <div class="d-lg-none d-block">
              <Metamask/>

            </div>

          </client-only>
        </b-navbar-nav>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>


        <b-collapse
          class="text-right justify-content-between"
          id="nav-collapse"
          is-nav
        >
          <!-- Right aligned nav items -->

          <b-navbar-nav class="header-menu">
            <b-nav-item  :class="{ 'active': activeIndex === index }"
                        v-for="(item,index) in items" :name="item.name" :key="index" :to="item.href"
                        @click="activeMenu(item,index)">
              {{item.name}}
            </b-nav-item>
          </b-navbar-nav>
          <client-only>
            <div class="d-lg-block d-none">
              <Metamask/>

            </div>

          </client-only>
        </b-collapse>
      </b-navbar>

    </keep-alive>
    <Loading :trLoading="trLoading" />

  </div>
</template>

<script>

  import Loading from "./treejerLoading";
  import Metamask from "../components/Metamask";

  export default {
    name: "TreejerHeader",
    components: {
      Metamask,
      Loading
    },
    data() {
      return {
        formError: null,
        trLoading:false,
        account: null,
        user: false,
        activeIndex: 0,
        items: [
          {name: "About", step: 1, href: 'about'},
          {name: "Blog", step: 2},
          {name: "For Business", step: 3, href: 'business'},
          {name: "Find My Tree", step: 4, href: 'find'},
        ]
      };
    },
    computed: {

    },
    methods: {
      loginToast(variant, title, message, href) {
        this.$bvToast.toast(message, {
          title: title,
          variant: variant,
          href: href
        });
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
    mounted() {
    }
  };
</script>

<style lang="scss">
  @media (max-width: 768px) {
    .headers {
      padding: 0 10px;

      .header-menu {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 0!important;
      }

      .navbar-light .navbar-toggler-icon {
        background-image: url("../assets/images/home/burger.svg");
        background-size: auto;
      }

      .navbar-light .navbar-toggler {
        color: rgba(0, 0, 0, 0.5);
        border-color: transparent;
      }

      .navbar {

        padding: 0;
      }
    }
  }
</style>

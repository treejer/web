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
<!--          <b-navbar-nav>-->
<!--            <b-nav-form v-if="!isLoggedIn">-->
<!--              <b-button-->
<!--                @click.prevent="log()"-->
<!--                class="connect-button m-auto"-->
<!--                type="submit"-->
<!--              >Connect Wallet-->
<!--              </b-button-->
<!--              >-->
<!--              <img-->
<!--                alt="tree"-->
<!--                name="tree"-->
<!--                src="/tree.svg"-->
<!--                class="img-fluid tree pointer-event"-->
<!--              />-->
<!--            </b-nav-form>-->
<!--            <b-nav-form v-if="isLoggedIn">-->
<!--&lt;!&ndash;              <b-button&ndash;&gt;-->
<!--&lt;!&ndash;                @click.prevent="logout"&ndash;&gt;-->
<!--&lt;!&ndash;                class="connect-buttons m-auto"&ndash;&gt;-->
<!--&lt;!&ndash;                type="submit"&ndash;&gt;-->
<!--&lt;!&ndash;              >{{ account }}&ndash;&gt;-->
<!--&lt;!&ndash;              </b-button&ndash;&gt;-->
<!--              <div class="accounting-card d-flex align-items-center align-self-center pointer-event" @click="logout" >-->
<!--                <span class="param-sm tr-gray-three">{{isLoggedIn}}</span>-->
<!--                <span class="img"><img src="../assets/images/home/accounting.png" alt="accounting" class="img-fluid" width="42" height="42" /></span>-->
<!--              </div>-->
<!--              <img-->
<!--                alt="tree"-->
<!--                name="tree"-->
<!--                src="/tree.svg"-->
<!--                class="img-fluid tree pointer-event"-->
<!--              />-->
<!--            </b-nav-form>-->

<!--            &lt;!&ndash; Using 'button-content' slot &ndash;&gt;-->
<!--          </b-navbar-nav>-->
          <client-only>
            <Metamask />

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
          {name: "For Business", step: 3, href: 'forBusiness'},
          {name: "Find My Tree", step: 4, href: 'findMyTree'},
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

</style>

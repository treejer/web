<template>
  <div
    class="landing-mobile-header"
    :class="$cookies.get('account') ? 'with-account' : 'no-account'"
    v-if="landingMobileHeaderStatus"
  >
    <div class="head-nav p-4">
      <Metamask
        class="landing-mobile-header-metamask"
        @showModal="showModal()"
      />
      <img
        src="../assets/images/sidebar/close.svg"
        class="pointer-event"
        @click.prevent="$store.commit('SET_LANDING_MOBILE_SIDEBAR', false)"
        alt=""
      />
    </div>

    <div class="header-items" v-for="(item, index) in headerItems" :key="index">
      <li
        v-if="item.label !== 'blog'"
        @click.prevent="$store.commit('SET_LANDING_MOBILE_SIDEBAR', false)"
      >
        <nuxt-link :id="index" :to="item.path">
          {{ item.name }}
        </nuxt-link>
      </li>
      <li
        v-if="item.label === 'blog'"
        @click.prevent="$store.commit('SET_LANDING_MOBILE_SIDEBAR', false)"
      >
        <a :href="item.href" target="_blank" class="pointer-event">{{
          item.name
        }}</a>
      </li>
    </div>
  </div>
</template>

<script>
import Metamask from "@/components/Metamask.vue";
export default {
  components: {
    Metamask,
  },
  props: {
    landingMobileHeaderStatus: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      headerItems: [
        {
          href: "",
          label: "home",
          name: this.$t("header.home"),
          path: this.localePath("/"),
          icon: "",
        },
        {
          href: "",
          label: "genesis",
          name: this.$t("header.genesis"),
          path: this.localePath("/genesis"),
          icon: "",
        },
        {
          href: "",
          label: "partnerships",
          name: this.$t("header.partnerships"),
          path: this.localePath("/partnerships"),
          icon: "",
        },
        {
          href: "",
          label: "about",
          name: this.$t("header.about"),
          path: this.localePath("/about"),
          icon: "",
        },
        {
          label: "blog",
          name: this.$t("header.blog"),
          path: "",
          href: "https://blog.treejer.com",
          icon: "",
        },
      ],
    };
  },
  methods: {
    showModal() {
      this.$store.commit("SET_LANDING_MOBILE_SIDEBAR", false);
      this.$bvModal.show("five");
    },
  },
};
</script>

<style lang="scss" >
.landing-mobile-header {
  background: #212121;
  border-radius: 32px 0px 0px 32px;
  height: 100vh;
  width: 100vw;
  z-index: +8888;
  right: 0;
  position: fixed;
  top: 0px;
  .head-nav {
    display: flex;
    justify-content: space-between;
    margin-bottom: 34px;
  }
  .header-items {
    height: 64px;
    position: relative;
    margin-bottom: 16px;

    li {
      margin-left: 32px;
      display: flex;
      align-items: center;
      a {
        align-items: center;
        margin: auto;
        width: 75%;
        height: 64px;
        font-weight: bolder;
        text-align: left;
        color: #faf8f1 !important;
        padding: 20px 0 0 15px;
      }
      a.nuxt-link-exact-active {
        background: #67b68c;
        border-radius: 10px;

        color: #faf8f1 !important;
        float: left;

        height: 64px;
        box-shadow: 2px 5px 16px 0px #0b5e0e;
      }
    }
  }
}
.landing-mobile-header.no-account {
  width: 80vw;
}
@media (min-width: 100px) and (max-width: 1024px) and (orientation: landscape) {
  .landing-mobile-header {
    .head-nav {
      margin-bottom: 5px;
    }

    .header-items {
      height: 30px;
      padding: 5px;
      margin-bottom: 5px;
      li {
        a {
          padding: 0 5px;
        }
        a.nuxt-link-exact-active {
          height: 30px;
          padding: 0 5px;
        }
      }
    }
  }
}
</style>
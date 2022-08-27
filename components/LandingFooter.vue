<template>
  <div class="landing-footer position-relative">
    <div class="container">
      <div class="row">
        <div class="col-lg-3 col-md-6 col-12">
          <nuxt-link
            v-if="!$cookies.get('account')"
            class="btn-green position-relative d-block param text-white"
            :to="localePath('/forest/guest')"
          >
            {{ $t("landingfooter.plant") }}
          </nuxt-link>
          <nuxt-link
            v-else
            class="btn-green position-relative d-block param text-white"
            :to="localePath('/forest/' + $cookies.get('account'))"
          >
            {{ $t("landingfooter.plant") }}
          </nuxt-link>
          <ul class="p-0 nav">
            <li class="square text-left">
              <nuxt-link
                v-if="!$cookies.get('account')"
                class="text-left nav-item param tr-gray-two"
                :to="localePath('/forest/guest')"
              >
                {{ $t("landingfooter.exploreforests") }}
              </nuxt-link>
              <nuxt-link
                v-if="$cookies.get('account')"
                class="text-left nav-item param tr-gray-two"
                :to="localePath('/forest/' + $cookies.get('account'))"
              >
                {{ $t("landingfooter.exploreforests") }}
              </nuxt-link>
            </li>
            <li
              class="square text-left"
              v-for="(item, index) in listOne"
              :key="index"
            >
              <nuxt-link
                v-if="!item.tab"
                class="text-left nav-item param tr-gray-two"
                :to="localePath(item.href)"
                >{{ item.name }}
              </nuxt-link>
              <a
                v-else
                class="text-left nav-item param tr-gray-two"
                target="_blank"
                :href="item.href"
                >{{ item.name }}</a
              >
            </li>
          </ul>
        </div>
        <div class="col-lg-3 col-md-6 col-12">
          <ul class="p-0">
            <li
              class="square text-left mt-md-2"
              v-for="(item, index) in listTwo"
              :key="index"
            >
              <nuxt-link
                v-if="!item.tab"
                class="text-left nav-item param tr-gray-two"
                :to="localePath(item.href)"
                >{{ item.name }}
              </nuxt-link>
              <a
                v-else
                class="text-left nav-item param tr-gray-two"
                target="_blank"
                :href="item.href"
                >{{ item.name }}</a
              >
            </li>
          </ul>
        </div>
        <div class="col-lg-3 col-md-6 col-12">
          <ul class="p-0">
            <li
              class="square text-left mt-md-2"
              v-for="(item, index) in listThree"
              :key="index"
            >
              <nuxt-link
                v-if="!item.tab"
                class="text-left nav-item param tr-gray-two"
                :to="localePath(item.href)"
                >{{ item.name }}
              </nuxt-link>
              <a
                v-else
                class="text-left nav-item param tr-gray-two"
                target="_blank"
                :href="item.href"
                >{{ item.name }}</a
              >
            </li>
          </ul>
        </div>
        <div class="col-lg-3 col-md-6 col-12 p-0">
          <div class="logo">
            <nuxt-link :to="localePath('/')" class="position-relative">
              <img
                src="../assets/images/landing-footer/logo.png"
                class="img-fluid pointer-event"
                alt="treejer"
              />
            </nuxt-link>
            <!-- <Flags :landingFooter="true" /> -->
            <p class="param tr-gray-two mt-3">
              {{ $t("landingfooter.blockchain") }}
            </p>
          </div>
          <Socials />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Socials from "./Socials.vue";

export default {
  name: "LandingFooter",
  components: {
    Socials,
  },
  data() {
    return {
      listOne: [
        { name: this.$t("landingfooter.genesis"), href: "/genesis" },
        { name: this.$t("landingfooter.find"), href: "/find" },
        {
          name: this.$t("landingfooter.referral"),
          href: "https://docs.treejer.com/impact-referral-program",
          tab: "_blank",
        },
        // {name: 'Project Charter', href: 'https://docs.treejer.com/project-charter', tab: '_blank'},
        // {name: 'Contribution Guideline', href: 'https://docs.treejer.com/contribution-guideline', tab: '_blank'},
        // {name: 'Redeem Trees', href: '#'},
        // {name: 'Start a Green Block', href: '#'},
      ],
      listTwo: [
        { name: this.$t("landingfooter.home"), href: "/" },
        {
          name: this.$t("landingfooter.blog"),
          href: "https://blog.treejer.com/",
          tab: "_blank",
        },
        { name: this.$t("landingfooter.about"), href: "/about" },
        { name: this.$t("landingfooter.partnerships"), href: "/partnerships" },
        { name: this.$t("landingfooter.contact"), href: "/contact" },
      ],
      listThree: [
        {
          name: this.$t("landingfooter.knowledge"),
          href: "https://docs.treejer.com",
          tab: "_blank",
        },
        {
          name: this.$t("landingfooter.community"),
          href: "https://discuss.treejer.com",
          tab: "_blank",
        },
        { name: this.$t("landingfooter.volunteers"), href: "/volunteer" },
        { name: this.$t("landingfooter.ambassadors"), href: "/rural" },
        { name: this.$t("landingfooter.backers"), href: "/backers" },
      ],
    };
  },
  methods: {
    goToSocials(item, target) {
      if (process.client) {
        window.open(item, target);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.landing-footer {
  .socials .pointer-event img:hover {
    transition: all 0.3s ease;
    opacity: 0.5;
  }
  .socials .pointer-event img {
    transition: all 0.3s ease;
  }

  ul {
    li {
      margin: 15px 0;
      display: block;
      width: 100%;
      text-align: left;

      a {
        transition: all ease-in 0.2s;
        text-align: left;
      }

      a:hover {
        text-decoration: none;
        color: #67b68c;
      }
    }
  }

  a.text-white {
    text-decoration: none;
    padding: 10px 28px;
    color: white;
    width: max-content;
    text-align: left;
  }

  a:hover {
    color: white;
  }

  @media (min-width: 1024px) {
    padding: 84px 65px 84px 150px;
    > div > div > div:nth-child(3) > ul {
      border-bottom: none;
    }
  }
  @media (max-width: 1023px) {
    padding: 35px 45px 35px 45px;
  }
  @media (max-width: 768px) {
    padding: 25px 15px;
    > .container > .row {
      flex-direction: column-reverse;
    }
    > div > div > div:nth-child(3) > ul {
      border-bottom: solid 1px lightgray;
    }
    .col-12 {
      padding: 0;
    }
    a.text-white {
      width: 100%;
      text-align: center;
    }
    ul {
      display: inline-table;
      width: 100%;

      li {
        width: 50%;
        display: inherit;
      }
    }
  }

  background: #e5e7db;
}
</style>

<template>
  <section
    :class="$route.name"
    class="position-relative pt-5 col-12 step-page mb-5 pb-5 increamental-sell"
    style="min-height: 90vh"
  >
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="d-md-flex justify-content-center  tabs">
            <span
              v-for="(item, index) in tabs" :key="index"
              :class="activeIndex === index ? 'btn-grays' : 'btn-yellow'"
              class="col-md-2 pointer-event param-18 font-weight-bolder "
              @click="activeIndex = index"
            >
              {{ item.name }}
            </span>
          </div>
        </div>
      </div>
      <div v-if="activeIndex === 0" class="collect justify-content-center">
        <Collect/>
      </div>
      <div v-if="activeIndex === 1" class="gallery ">
        <Gallery/>
      </div>
    </div>
  </section>
</template>

<script>
import Collect from "../../components/increamentalsell/Collect";
import Gallery from "../../components/increamentalsell/Gallery";

export default {
  name: "increamentalSell",
  components: {Collect, Gallery},
  head() {
    return {
      title: this.meta.title,
      meta: [
        {hid: 'description', name: 'description', content: this.meta.description},
        {hid: 'keywords', name: 'keywords', content: 'treejer genesis collection,treejer protocol,Collect Genesis Trees, nft tree'},

        {hid: 'og:title', property: 'og:title', content: this.meta.title},
        {hid: 'og:description', property: 'og:description', content: this.meta.description},
        {hid: 'og:url', property: 'og:url', content: this.baseUrl + '/genesis'},
        {hid: 'og:image', property: 'og:image', content: this.baseUrl + '/featureImage/TreejerWorld.jpg'},

        {hid: 'twitter:title', property: 'twitter:title', content: this.meta.title},
      ]
    };
  },
  data() {
    return {
      baseUrl: process.env.baseUrl,
      meta: {
        title: 'Treejer | Collect Genesis Trees',
        description: "Genesis Trees are the first 10k trees to be planted via Treejer Protocol. They're represented by unique NFT collectibles.",
      },

      activeIndex: 0,
      tabs: [{name: "Collect"}, {name: "Gallery"}],

      
    };
  },
  mounted() {
    this.setReferrerCookie();

    this.setActiveIndexByUrl();

  },
  methods: {
    setActiveIndexByUrl() {
      if (Object.keys(this.$route.query).length === 0) {
        return;
      }

      if (typeof this.$route.query.activeIndex === 'undefined') {
          return;
      }

      if(this.$route.query.activeIndex === 'gallery') {
        this.activeIndex = 1;
      }
    },
    setReferrerCookie() {
      if (Object.keys(this.$route.query).length === 0) {
        return;
      }

      if (typeof this.$route.query.referrer === 'undefined') {
          return;
      }

      this.$cookies.set('referrer', this.$route.query.referrer, {
          maxAge: 60 * 60 * 24 * 365,
          path: '/'
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.increamental-sell {
  .tabs {
    span:nth-child(1) {
      border-radius: 24px 0 0 24px;
    }

    span:nth-child(2) {
      border-radius: 0 24px 24px 0;
    }

    .btn-grays {
      background: #616161;
      color: white;
      padding: 10px 48px;
    }

    .btn-yellow {
      background: #f0e4c6;
      padding: 10px 48px;
    }
  }
}

@media(max-width: 768px) {
  .increamental-sell {
    .tabs {
      text-align: center;
      .btn-yellow, .btn-grays {
        padding: 10px 15px;
      }
      .inc-collect[data-v-f4f8c9fe] {
        margin-top: 50px;
      }


    }


  }

}
</style>

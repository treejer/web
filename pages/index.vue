<template>
  <!--suppress HtmlUnknownAttribute -->
  <section :page="$route.name" class="position-relative pt-5 col-md-12 home">
    <div class="container-fluid">
      <div class="row article">
        <div class="col-md-8 col-12">
          <div class="row mobile-align">
            <div class="col-12 title">
              <client-only>
                <h1 class="tr-gray-three font-weight-bold text-dn">
                  A more
                  <vue-typer
                    :erase-delay="50"
                    :erase-on-complete="false"
                    :pre-erase-delay="2000"
                    :pre-type-delay="80"
                    :repeat="Infinity"
                    :shuffle="false"
                    :text="[
                      ' affordable',
                      ' sustainable',
                      ' transparent',
                      ' impactful',
                      ' inclusive',
                      ' rewarding',
                      ' gamified',
                      ' measurable',
                    ]"
                    :type-delay="200"
                    erase-style="backspace"
                    initial-action="typing"
                  ></vue-typer>
                  Climate Action through<br class="d-md-block d-none"/>
                  financial inclusion of rural communities.
                </h1>
              </client-only>
            </div>
            <div class="col-12 form-group mt-3">

              <nuxt-link
                :to="`/genesis`"
                class="position-relative pointer-event leader"
              >
                <button
                  class="position-relative pointer-event leader btn-lg btn-green pointer-event param"
                >
                  Collect Genesis Trees
                </button>
              </nuxt-link>
              <nuxt-link
                :to="`/forest/${this.$cookies.get('account') || 'guest'}`"

                class="position-relative pointer-event leader"
              >
                <button class="btn-lg btn-outline-green pointer-event param">
                  Plant a Forest
                </button>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>

export default {
  name: "index",
  data() {
    return {
      treeCount: null,
      baseUrl: process.env.baseUrl,
      meta: {
        title: 'Treejer | Planters Without Borders',
        description: 'Plant a forest and support rural communities worldwide. Treejer uses Web3 to unlock new opportunities in Climate Finance.',
        keywords: 'treejer,treejer protocol,plant tree, nft tree',
        featureImage:  '/_nuxt/assets/images/home/jake-hills-unsplash.jpg',
      }
    };
  },
  head() {
    return {
      title: this.meta.title,
      meta: [
        {hid: 'description', name: 'description', content: this.meta.description},
        {hid: 'keywords', name: 'keywords', content: this.meta.keywords},

        {hid: 'og:title', property: 'og:title', content: this.meta.title},
        {hid: 'og:description', property: 'og:description', content: this.meta.description},
        {hid: 'og:url', property: 'og:url', content: this.baseUrl},
        {hid: 'og:image', property: 'og:image', content: this.baseUrl + this.meta.featureImage},

        {hid: 'twitter:title', property: 'twitter:title', content: 'Treejer | Planters Without Borders'},
      ]
    }
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
.home {
  background-image: url("../assets/images/home/treejerStory.png");
  background-size: contain;
  background-repeat: no-repeat;
  height: 81vh;
  background-position-y: 30%;
  background-position-x: 96%;

  .vue-typer {
    span {
      min-width: 200px !important;
      display: inline-block;
      text-align: center;
    }
  }

  .planet-tree {
    border-right: solid 1px #67b68c;
    padding: 0 15px;
  }

  .rural-communities {
    padding: 0 15px;
  }

  .banner {
    z-index: +9;
  }

  .title {
    h1 {
      font-size: 28px;
      font-weight: bold;
      line-height: 48px;
      color: #616161;

      span {
        font-size: 28px;
        font-weight: bold;
        color: #5a9d79;
        padding: 0 5px;
      }
    }
  }
}

@media (min-width: 768px) and (max-width: 1280px) and (orientation: landscape) {
  .home {
    .title {
      h1 {
        font-size: 14px;
      }
    }

    .text-dn {
      height: auto;
    }
  }
}

@media (max-width: 768px) {
  .home {
    background-size: 170%;
    background-position-y: -3%;
    background-position-x: 90%;
    height: 90vh;

    .article {
      margin-top: 73%;
      justify-content: center;
    }

    .mobile-align,
    .tr-status {
      justify-content: center;
      text-align: center;
      padding-top: 25px;
    }

    .text-dn {
      height: auto;
    }

    .title {
      h1 {
        font-size: 14px;
      }
    }
  }
}
</style>

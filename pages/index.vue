<template>
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
              <button
                class="position-relative pointer-event leader btn-lg btn-green pointer-event param"
                @click="goToDashboard"
              >
                Plant One Tree
              </button>

              <nuxt-link
                :to="localePath('find')"
                class="position-relative pointer-event leader"
              >
                <button class="btn-lg btn-outline-green pointer-event param">
                  Find My Tree
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
    };
  },
  head() {
    return {
      title: `Treejer`,
      meta: [
        {hid: 'description', name: 'description', content: "contact our business and team"},
        {hid: 'keywords', name: 'keywords', content: 'business team_business treejer treejer_contact_us teams '}
      ]
    }
  },
  methods: {
    goToDashboard() {
      this.$store.commit("SET_SIDEBAR_INDEX", 0);
      if (this.$cookies.get("account")) {
        this.$router.push(`/forest/${this.$cookies.get("account")}`);
      } else {
        this.$bvModal.show("five");
      }
    },
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

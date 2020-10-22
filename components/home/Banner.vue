<template>
  <div class="container-fluid home-banner">
    <div class="row article">
      <div class="col-md-8 col-12">
        <div class="row mobile-align mt-2">
          <div class="col-12 title">
            <client-only>
              <h1 class="tr-gray-three font-weight-bold text-dn">
                A more
                <vue-typer
                  :repeat='Infinity'
                  :shuffle='false'
                  initial-action='typing'
                  :pre-type-delay='80'
                  :type-delay='200'
                  :pre-erase-delay='2000'
                  :erase-delay='50'
                  erase-style='backspace'
                  :erase-on-complete='false'
                  :text='[
                  " affordable",
                  " sustainable",
                  " transparent",
                  " impactful",
                  " inclusive",
                  " rewarding",
                  " gamified",
                  " measurable"
                  ]'></vue-typer>
                Climate Action through<br class="d-md-block d-none "> financial inclusion of rural communities.
              </h1>

            </client-only>
          </div>
          <div class="col-12 form-group " style="margin-top: 32px">
            <button
              @click="goToDashboard"
              class=" position-relative pointer-event leader  btn-lg btn-green pointer-event param"
              style="margin-right: 32px"
            >
              Plant One Tree
            </button>

            <nuxt-link class="position-relative pointer-event leader" :to="localePath('find')">

              <button class="btn-lg btn-outline-green pointer-event param">
                Find My Tree
              </button>
            </nuxt-link>
          </div>
          <!--              <div class="col-12 d-flex tr-status mt-3 ">-->
          <!--                <div class="planet-tree pt-2">-->
          <!--                  <p class="param-sm tr-black font-weight-bold ">Planted Trees</p>-->
          <!--                  <p class="title-md tr-green font-weight-bolder ">159</p>-->
          <!--                </div>-->
          <!--                <div class="rural-communities pt-2">-->
          <!--                  <p class="param-sm tr-black font-weight-bold ">-->
          <!--                    Rural Communities-->
          <!--                  </p>-->
          <!--                  <p class="title-md tr-green font-weight-bold ">2</p>-->
          <!--                </div>-->
          <!--              </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Banner",
  methods: {
    goToDashboard() {
      const id = this.$cookies.get('account')
      this.$store.commit('SET_INDEX', 0)
      if (id) {
        this.$router.push({path: `/forest/${id}`});
      } else {
        this.$router.push('/forest')
      }
    },
  },
}
</script>

<style scoped lang="scss">
.home-banner {
  background-image: url('../../assets/images/home/treejerStory.png');
  background-size: contain;
  background-repeat: no-repeat;
  min-height: 525.99px;
  background-position-x: 100%;
  margin-top: 64px;
  margin-bottom: 100px;


  .vue-typer {
    span {
      min-width: 200px !important;
      display: inline-block;
      text-align: center;
    }
  }

  .loading {
    width: 100vw;
    height: 100vh;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: center;
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
      font-family: Montserrat-Regular;
      font-size: 28px;
      font-style: normal;
      font-weight: 500;
      line-height: 50px;

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
  .home-banner {
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

@media (max-width:768px) {
    .home-banner {
      background-size: 170%;
      background-position-y: -3%;
      background-position-x: 90%;

      .article {
        justify-content: center;
      }

      .mobile-align, .tr-status {
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

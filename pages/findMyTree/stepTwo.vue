<template>
  <section class="position-relative pt-5 col-12 step-page mb-5 pb-5">
    <div class="container-fluid">
      <div class="row tree-count">
        <div class="col-12">
          <ul class="step tr-gray-three d-flex   list-style-none">
            <li
              v-for="(item, index) in steps"
              :key="index"
              :name="item.name"
              class="param-md font-weight-bold"
            >
              <p>{{ item.name }}</p>
              <p :class="{ active: activeIndex === index }">{{ item.step }}</p>
            </li>
          </ul>
        </div>

        <div class="col-12 step-two" v-if="activeIndex === 1">
          <div class="row mt-5 pt-5 justify-content-center text-center">
            <div class="col-12" v-if="treeDescription">
              <h1 class="title-sm mb-4 tr-gray-two">Almost found it!</h1>
              <p class="tr-gray-three param-xl">It's being planted in<span
                class="tr-green font-weight-bolder dir-rtl pointer-event"
                @click="changeRoute(treeDescription.googleMapLink)">{{treeDescription.locationName}}</span></p>
              <p class="tr-gray-three param-xl">Come back in a few days to get an accurate location!</p>
              <div class="mt-5">
                <nuxt-link :to="localePath('findMyTree')">
                  <button class="btn-gray ">Another Search</button>

                </nuxt-link>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  </section>

</template>

<script>
  export default {
    name: "stepTwo",
    data() {
      return {
        activeIndex: 1,
        treeDescription: null,
        treeID: null,
        steps: [
          {name: "Processing", step: 1},
          {name: "Pending Plantation", step: 2},
          {name: "Planted", step: 3},

          // { name: "final-step", step: 4 }
        ],
      }
    },
    mounted() {

      this.treeID = this.$cookies.get('step')
      this.redeem();


    },
    methods: {
      redeem() {
        let self = this
        this.$axios.$get(`https://napi.treejer.com/trees/status/${self.treeID}`).then(function (res) {

          const status = res.status
          self.treeDescription = res


        })
      },
      changeRoute(item) {
        window.open(item, '_blank')
      }
    }
  }
</script>

<style scoped lang="scss">
  .step-page {
    min-height: 74.5vh;
  }

  .step {
    li {
      width: 100%;
      position: relative;
      text-align: center;

      p:nth-child(2) {
        background: #9e9e9e;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 0;
        z-index: +99;
        color: white;
        text-align: center;
        margin: auto;
      }

      p:nth-child(2):after {
        content: "";
        width: 100%;
        border: solid 2px #9e9e9e;
        height: 2px;
        position: absolute;
        transform: translate(0px, 9px);
      }

      p.active:nth-child(2):after {
        content: "";
        width: 100%;
        border: solid 2px #67b68c;
        height: 2px;
        position: absolute;
        transform: translate(0px, 9px);
      }

      p.active:nth-child(2) {
        background: #67b68c;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 0;
        z-index: +99;
        color: white;
        text-align: center;
        margin: auto;
      }
    }

    li:last-child {
      p:nth-child(2):after {
        display: none;
      }
    }
  }

</style>

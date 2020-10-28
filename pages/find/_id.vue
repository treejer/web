<template>
  <section class="position-relative pt-5 col-12 step-page mb-5 pb-5">
    <div class="container-fluid">
      <div class="row tree-count">

        <div class="col-12 step-two">
          <div class="row mt-5 pt-5 justify-content-center text-center">
            <div class="col-12" v-if="tree">
              <h1 class="title-sm mb-4 tr-gray-two">Almost found it!</h1>
              <p class="tr-gray-three param-xl" v-if="tree.plantedDate > 0">It's being planted in
                <span
                class="tr-green font-weight-bolder dir-rtl pointer-event"
                @click="changeRoute(`https://maps.google.com/?q=${tree.latitude},${tree.longitude}&z=15`)">{{ tree.latitude +','+tree.longitude }}</span>
              </p>
              <p class="tr-gray-three param-xl" v-if="tree.fundedDate > 0 && tree.plantedDate == 0">
                Waiting for planting
              </p>

              <p class="tr-green param-xl" v-if="tree.fundedDate > 0" >
                Tree funded!
              </p>
              <div class="mt-5" >
                <nuxt-link v-if=""  :to="localePath('find')">
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
        tree: null
      }
    },
    mounted() {
      this.findTree();
    },
    methods: {
      async findTree() {
        let self = this;
        self.loading = true
        await this.$axios.$get(`${process.env.apiUrl}/trees/${this.$route.params.id}`)
          .then(function (response) {
            self.loading = false
            self.tree = response
          })
          .catch(function (error) {
            self.loading = false
            self.$bvToast.toast("Tree Not found!", {
              toaster: 'b-toaster-bottom-left',
              solid: true,
              headerClass: 'hide',
              variant: 'danger'
            })
            self.$router.push(`/find`)
          });
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
  @media (max-width: 420px) {
    .param-md p{
      font-size: 8px;
    }
  }

</style>

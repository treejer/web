<template>
  <section :page="$route.name" class="position-relative pt-5  col-12 col-lg-10 help">
    <client-only>
      <div style="z-index: 99" class="w-25 position-fixed mt-5 pt-5  d-flex align-self-center align-items-center justify-content-center bg-dark bg-transparent">
        <b-spinner v-if="helpLoading"  large class="tr-green help-spinner" label="Spinning"></b-spinner>
      </div>
    </client-only>



    <div class="container-fluid">
      <div class="row article">
        <div class="col-md-8 col-12">
          <div class="row">
            <div class="col-12 position-relative">
              <h2 class="title-sm">
                Get Help

              </h2>
              <client-only>
                <div id="questions-widget" style="min-height: 100vh">
                  <iframe @load="$nuxt.$loading.finish()" src="https://discuss.treejer.com/" class="border-0" height="700" width="100%" title="Iframe typeform"></iframe>

                </div>

              </client-only>


            </div>
            <div class="col-12 mt-2">
            </div>
          </div>
        </div>

        <div class="col-4 d-md-block d-none justify-content-center">


          <!--suppress HtmlUnknownTarget -->
          <img src="~/assets/images/help/get-help.svg" id="help_img" alt="get-help"
               class=" img-fluid"/>

        </div>
      </div>
    </div>



  </section>
</template>
<script>


if (process.client) {
  let Tribe = require('../components/tribe')
}
export default {
  name: "help",
  layout: "dashboard",
  head() {
    return {
      title:`Treejer`,
      meta:[
        { hid: 'description', name: 'description', content:"contact our business and team"},
    { hid: 'keywords', name: 'keywords', content: 'business team_business treejer treejer_contact_us teams ' }
  ]
  }
  },
  data(){
    return{
      tribe:this.Tribe,
      helpLoading:true,
    }
  },
  // head() {
  //   return {
  //     script: [
  //       {
  //         src: require('../components/tribe.js')
  //       }
  //     ],
  //   }
  // },
  mounted() {

    this.$nextTick(() => {
      this.$nuxt.$loading.start()

      setTimeout(() => {
        this.$nuxt.$loading.finish()
        this.helpLoading = false


      }, 2000)

    })
  }
};
</script>
<style lang="scss">
.help {
  .help-spinner{
    width: 4rem;
    height: 4rem;
    vertical-align: text-bottom;
    border: 0.505em solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    -webkit-animation: spinner-border .75s linear infinite;
    animation: spinner-border .75s linear infinite;
  }
  .search-bar-help {
    input {
      height: 64px;
      background: #FAFAFA;
      border-radius: 12px;
      width: 75%;
      border: 0;
      padding: 0 45px;
      filter: drop-shadow(2px 6px 44px rgba(0, 0, 0, 0.1));
    }

    span.icon {
      left: 10px;
      top: 20px;

      &:hover {
      }
    }
  }

  .search-bar-help:hover {
    cursor: pointer;
  }

}
//@media (min-width: 1024px){
//  #help_img{
//    position: fixed;
//  }
//
//}
</style>

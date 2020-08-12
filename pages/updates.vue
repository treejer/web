<template>
  <section :page="$route.name" class="position-relative pt-5 col-12 col-lg-10 updates" >
    <div class="container-fluid">
      <div class="row article">
        <div class="col-md-8 col-12">
          <div class="row">
            <div class="col-12">
              <h2 class="title-sm">
                Updates

              </h2>
              <p class="param-sm">
                Browse your recent payment events, notifications and verified trees.
              </p>

            </div>
            <div class="col-12 mt-2">
              <ul>
                <li v-for="(item , index) in updates">
                  <p class="param-lg tr-gray-three font-weight-bold"> Your tree with ID number <span class="tr-green">#899323</span > was verified by <span class="tr-green">@michael54</span ></p>
                  <p class="param-sm tr-gray-four"> {{item.date}}</p>

                </li>
                <li v-for="(item , index) in updates">
                  <p class="param-lg tr-gray-three font-weight-bold"> Your tree with ID number <span class="tr-green">#899323</span > was verified by <span class="tr-green">@michael54</span ></p>
                  <p class="param-sm tr-gray-four"> {{item.date}}</p>

                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="col-4 d-md-block d-none justify-content-center">


          <img src="~/assets/images/update/updates.png" alt="username"
               class=" img-fluid" id="help_img"/>

        </div>
      </div>
    </div>
  </section>

</template>
<script>
  export default {
    name: 'updates',
      layout: "dashboard",

    data() {
      return {
        updates: [
          {
            text: 'Your tree with ID number <span class="tr-green">#899323</span > was verified by <span class="tr-green">@michael54</span > ',
            date: '1/23/2020  |  03:02 UTC'
          }
        ]
      }
    },
    created() {
     const updates = this.$axios.$get(`https://api.treejer.com/wallets/${this.$store.state.account}/events?perPage=10&page=1`)
      this.updates = updates.data
    }
  }
</script>
<style scoped lang="scss">
  .updates{
    ul li {
      .tr-green{
        color: #67b68c!important;
      }
    }
  }
  @media (min-width: 1024px){
     #help_img{
      position: fixed;
    }

  }
</style>

<template>
  <section :page="$route.name" class="position-relative col-12 leader-boards" >
    <div class="container-fluid" >
      <div class="row article">
        <div class="col-12">

          <div class="row">
            <div class="col-12">
              <div class="row mt-3 " @click="goToForest()">
                <div class="col-4">
                  <span class="param-20" style="line-height: 28px;font-weight: bolder"> <  </span>
                </div>
                <div class="col-8 ">
                  <span class="param pt-2 ">Leaderboard</span>

                </div>
              </div>
            </div>
            <div class="col-12 justify-content-center">
              <img src="~/assets/images/leaderBoards/leaderboards.png" alt="username"
                   class=" img-fluid"/>

            </div>
            <div class="col-12 text-center mt-3">
              <h2 class="title-sm">
                Leaderboard

              </h2>
              <p class="param text-center">
                Browse your recent payment events, notifications and verified trees.
              </p>

            </div>
<!--            <div class="col-12 mt-2">-->
<!--              <ul class="nav tr-nav ">-->
<!--                <li v-for="(item  ,index) in stepsLeaderBoard"-->
<!--                    class="pointer-event tr-gray-three"-->
<!--                    :class="{ active: activeIndex === index }"-->

<!--                    :name="item.name"-->
<!--                    :key="item.id">{{item.name}}-->

<!--                </li>-->

<!--              </ul>-->
<!--            </div>-->
          </div>
          <div class="row tr-table mt-5 mb-4">
            <div class="col-12">
              <table class="table tr-table" style="overflow-x: scroll">
                <thead>
                <tr>
                  <th scope="col">RANK</th>
                  <th scope="col">USER</th>
                  <th scope="col">TREES</th>
                  <th scope="col">LINK</th>
                </tr>
                </thead>
                <tbody>
                <tr v-if="leaderBoards" v-for="(item ,index) in leaderBoards">
                  <td v-if="index ===0" scope="row" class="d-flex justify-content-between"><span  class="rank" v-html="first" style="width: 15px;height: 15px" ></span> <span style="margin:  0 5px"><img
                    style="width:25px" class="rounded-circle" :src="'https://api.adorable.io/avatars/5/' + item.owner"
                    alt="item.owner"></span>
                  </td>
                  <td class="d-flex justify-content-between" v-if="index ===1" scope="row"><span  class="rank" v-html="second" style="width: 15px;height: 15px"></span> <span style="margin:  0 5px"><img
                    style="width:25px" class="rounded-circle" :src="'https://api.adorable.io/avatars/5/' + item.owner"
                    alt="item.owner"></span>
                  </td>
                  <td class="d-flex justify-content-between" v-if="index ===2" scope="row"><span  class="rank" v-html="third" style="width: 15px;height: 15px"></span> <span style="margin:  0 5px"><img
                    style="width:25px" class="rounded-circle" :src="'https://api.adorable.io/avatars/5/' + item.owner"
                    alt="item.owner"></span>
                  </td>
                  <td class="d-flex justify-content-between" v-if="index >2" scope="row">
                    <span class="rank">{{ index + 1 }}</span>
                    <span style="margin:  0 5px"><img style="width:25px" class="rounded-circle"
                                                      :src="'https://api.adorable.io/avatars/5/' + item.owner"
                                                      alt="item.owner"></span>
                  </td>

                  <td v-coin id="accounting-card">{{ item.owner}}</td>
                  <td>{{ item.total_tree }}</td>
                  <td @click="goToUserDashboard(item.owner)" class="pointer-event">
                    <a href="#" class="pointer-event tr-green"></a>
                    <Fas class="tr-green pointer-event" i="eye"/>
                  </td>

                </tr>
                </tbody>
              </table>
              <div v-if="leaderBoards">
                <button v-if="leaderBoards.length > 10" @click="addTen" class="btn-green">show more</button>
              </div>


            </div>
          </div>
        </div>


      </div>
    </div>
  </section>

</template>

<script>
import Fas from '../../../components/font-awsome/Fas'
export default {
  name: "leaderBoards",
  layout: "checkOutMobile",
  components: {
    Fas
  },

  data() {
    return {
      activeIndex: 0,
      first:`<img src=${require('../../../assets/images/leaderBoards/first.svg')} />`,
      second:`<img src=${require('../../../assets/images/leaderBoards/second.svg')} />`,
      third:`<img src=${require('../../../assets/images/leaderBoards/third.svg')} />`,
      id: null,
      leaderBoards: null,
      stepsLeaderBoard: [
        {name: "Top Forests", icon: "tree", href: "/forest"},
        {name: "Top Ambassadors", icon: "bell", href: "/updates"},
        {name: "Top Planters", icon: "trophy", href: "/leaderboard"},
      ],
      perPage: 10


    }
  },
  async mounted() {
    await this.getLeaderBoards()
  },
  methods: {
    goToForest() {
      this.$store.commit('SET_INDEX', 0)
      if(this.$cookies.get('account')){
        this.$router.push({path: `/mobile/dashboard/${this.$cookies.get('account')}`})

      }else {
        this.$router.push({path: `/mobile/dashboard`})

      }
    },
    addTen() {
      this.perPage += 10
      this.getLeaderBoards()
    },
    async getLeaderBoards(){
      const leaderBoards = await this.$axios.$get(`https://api.treejer.com/trees/leaderboard?perPage=${this.perPage}`)
      this.leaderBoards =leaderBoards.leaderboard.data
    },
    activeMenu(item, index) {

      this.activeIndex = index;
    },
    goToUserDashboard(id) {
      this.$store.commit('SET_INDEX',0)
      this.$cookies.set('account',null)
      let routeData = this.$router.resolve({path: `/mobile/dashboard/${id}`,params:{id:id}});
      window.open(routeData.href, '_blank');
    }
  }

}
</script>

<style scoped>

</style>

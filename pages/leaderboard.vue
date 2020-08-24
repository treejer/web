<template>
  <section :page="$route.name" class="position-relative pt-5 col-lg-10 col-12 leader-boards" >
    <div class="container-fluid" >
      <div class="row article">
        <div class="col-lg-8 col-12">
          <div class="row">
            <div class="col-12">
              <h2 class="title-sm">
                Leaderboard

              </h2>
              <p class="param-sm">
                Browse your recent payment events, notifications and verified trees.
              </p>

            </div>
            <div class="col-12 mt-2">
              <ul class="nav tr-nav ">
<!--                @click="activeMenu(item, index)"-->
                <li v-for="(item  ,index) in stepsLeaderBoard"
                    class="pointer-event tr-gray-three"
                                :class="{ active: activeIndex === index }"

                    :name="item.name"
                    :key="item.id">{{item.name}}

                </li>

              </ul>
            </div>
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
                  <td v-if="index ===0" scope="row" class="d-flex justify-content-between"><span class="rank">🥇</span> <span style="margin:  0 5px"><img
                    style="width:25px" class="rounded-circle" :src="'https://api.adorable.io/avatars/5/' + item.owner"
                    alt="item.owner"></span>
                  </td>
                  <td class="d-flex justify-content-between" v-if="index ===1" scope="row"><span class="rank">🥈</span> <span style="margin:  0 5px"><img
                    style="width:25px" class="rounded-circle" :src="'https://api.adorable.io/avatars/5/' + item.owner"
                    alt="item.owner"></span>
                  </td>
                  <td class="d-flex justify-content-between" v-if="index ===2" scope="row"><span class="rank">🥉</span> <span style="margin:  0 5px"><img
                    style="width:25px" class="rounded-circle" :src="'https://api.adorable.io/avatars/5/' + item.owner"
                    alt="item.owner"></span>
                  </td>
                  <td class="d-flex justify-content-between" v-if="index >2" scope="row">
                    <span class="rank">{{ index + 1 }}</span>
                    <span style="margin:  0 5px"><img style="width:25px" class="rounded-circle"
                                                      :src="'https://api.adorable.io/avatars/5/' + item.owner"
                                                      alt="item.owner"></span>
                  </td>

                  <td id="accounting-card">{{ item.owner.slice(0, 25) }}</td>
                  <td>{{ item.total_tree }}</td>
                  <td @click="goToUserDashboard(item.owner)" class="pointer-event">
                    <a href="#" class="pointer-event tr-green"></a>
                    <Fas class="tr-green pointer-event" i="eye"/>
                  </td>

                </tr>
                </tbody>
              </table>
              <div v-if="leaderBoards">
                <button v-if="leaderBoards.length >=10" @click="addTen" class="btn-green">show more</button>
              </div>


            </div>
          </div>
        </div>

        <div class="col-lg-4 d-none d-md-block justify-content-center">
          <h1 class="title-md text-center font-weight-bolder  mb-4  " style="color:#616161">Discover
            Earth Ambassadors</h1>


          <img src="~/assets/images/leaderBoards/leaderboards.png" alt="username"
               class=" img-fluid"/>

        </div>
      </div>
    </div>
  </section>
</template>
<script>
import Fas from '../components/font-awsome/Fas'

export default {
  name: 'leaderBoards',
  layout: "dashboard",

  components: {
    Fas
  },
  computed: {},

    data() {
      return {
        activeIndex: 0,
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
      const leaderBoards = await this.$axios.$get(`https://api.treejer.com/trees/leaderboard?perPage=${this.perPage}`)
     this.leaderBoards =leaderBoards.leaderboard.data
    },
    methods: {
      addTen() {
        this.perPage += 10
      },
      activeMenu(item, index) {

        this.activeIndex = index;
      },
      goToUserDashboard(id) {

       this.$store.commit('SET_INDEX',0)
        debugger
        this.$router.push({path: `/forest/${id}`,params:{id:id}})
      }
    }
  }
</script>
<style lang="scss">
  .leader-boards {
    ul {
      display: flex;
      border-radius: 20px;
      box-shadow: 0 4px 22px 0 rgba(0, 0, 0, 0.16);
      background-color: #ffffff;


      li {

        height: 100%;
        padding: 7.6px 0;
        width: 33.3333%;
        text-align: center;
      }

      li.active {
        border-radius: 20px;
        border: solid 2px #ffffff;
        background-color: #67b68c;
        color: white;

      }
    }
     table > thead > tr{
       background: transparent;
       border-color: transparent;
       box-shadow: none!important;
       th{
         background: transparent;
         border: 0;
         color: #616161;
       }
     }
    table {
      border: 0 !important;
      border-collapse: separate;
      border-spacing: 0 1em;
      font-family: Montserrat-Regular!important;

      td:nth-child(1){
        border-left-style: solid;
        border-left-color: white;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
      }

      td:last-child {
        border-right-style: solid;
        border-right-color: white;
        border-bottom-right-radius: 10px;
        border-top-right-radius: 10px;
      }


      tr {
        height: 36px;
        border-radius: 6px;
        box-shadow: 4px 4px 22px 0 rgba(0, 0, 0, 0.16);
        background-color: #ffffff;
        border: 0;
        margin: 15px 5px;

      }
    }
  }
  @media (max-width: 768px) {
    .nav.tr-nav{
      li{
        font-size: 12px;
      }
    }
    table{
      display: grid;

    }
  }

</style>

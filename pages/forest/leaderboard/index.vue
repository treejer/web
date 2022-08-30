<!--suppress HtmlUnknownAttribute -->
<template>
  <section
    :page="$route.name"
    class="position-relative pt-5 col-lg-10 col-12 leader-boards"
  >
    <div class="container-fluid">
      <div class="row article">
        <div class="col-lg-8 col-12">
          <div class="row">
            <div class="col-12">
              <h2 class="title-sm">{{$t('leaderboard.title')}}</h2>
              <p class="param-sm">
                {{$t('leaderboard.description')}}
              </p>
            </div>
            <div class="col-12 mt-2">
              <ul class="nav tr-nav">
                <!--                @click="activeMenu(item, index)"-->
                <li
                  v-for="(item, index) in stepsLeaderBoard"
                  class="pointer-event tr-gray-three"
                  :class="{ active: activeIndex === index }"
                  :name="item.name"
                  :key="item.id"
                  @click="activeMenu(item, index)"
                >
                  {{ item.name }}
                </li>
              </ul>
            </div>
          </div>

          <div class="row tr-table mt-5 mb-4" v-if="activeIndex === 0">
            <div class="col-12">
              <table class="table tr-table" style="overflow-x: scroll">
                <thead>
                  <tr>
                    <th scope="col"> {{$t('leaderboard.rank')}}</th>
                    <th scope="col"> {{$t('leaderboard.owner')}}</th>
                    <th scope="col"> {{$t('leaderboard.trees')}}</th>
                    <th scope="col"> {{$t('leaderboard.link')}}</th>
                  </tr>
                </thead>
                <tbody v-if="owners">
                  <tr v-for="(item, index) in owners" :key="`${activeIndex}-${index}`">
                    <td
                      v-if="index === 0"
                      scope="row"
                      class="d-flex justify-content-between"
                    >
                      <span
                        class="rank"
                        v-html="first"
                        style="width: 15px; height: 15px"
                      ></span>
                      <span style="margin: 0 5px"
                        ><img
                          style="width: 25px"
                          class="rounded-circle"
                          :src="$avatarByWallet(item.id.toLowerCase())"
                          :alt="item.id"
                      /></span>
                    </td>
                    <td
                      class="d-flex justify-content-between"
                      v-if="index === 1"
                      scope="row"
                    >
                      <span
                        class="rank"
                        v-html="second"
                        style="width: 15px; height: 15px"
                      ></span>
                      <span style="margin: 0 5px"
                        ><img
                          style="width: 25px"
                          class="rounded-circle"
                          :src="$avatarByWallet(item.id.toLowerCase())"
                          :alt="item.id"
                      /></span>
                    </td>
                    <td
                      class="d-flex justify-content-between"
                      v-if="index === 2"
                      scope="row"
                    >
                      <span
                        class="rank"
                        v-html="third"
                        style="width: 15px; height: 15px"
                      ></span>
                      <span style="margin: 0 5px"
                        ><img
                          style="width: 25px"
                          class="rounded-circle"
                          :src="$avatarByWallet(item.id.toLowerCase())"
                          :alt="item.id"
                      /></span>
                    </td>
                    <td
                      class="d-flex justify-content-between"
                      v-if="index > 2"
                      scope="row"
                    >
                      <span class="rank">{{ index + 1 }}</span>
                      <span style="margin: 0 5px"
                        ><img
                          style="width: 25px"
                          class="rounded-circle"
                          :src="$avatarByWallet(item.id.toLowerCase())"
                          :alt="item.id"
                      /></span>
                    </td>

                    <td v-coin class="accounting-card">{{ item.id }}</td>
                    <td>{{ item.treeCount }}</td>
                    <td
                      
                      class="pointer-event"
                    >
                      <NuxtLink :to="localePath(`/forest/${item.id}`)">
                        <a href="#" class="pointer-event tr-green"></a>
                        <Fas class="tr-green pointer-event" i="eye" />
                      </NuxtLink>
                    </td>
                    <!-- -->
                  </tr>
                </tbody>
              </table>
              <!-- <div v-if="owners">
                <button
                  v-if="owners.length > 10"
                  @click="addTen"
                  class="btn-green"
                >
                  show more
                </button>
              </div> -->
            </div>
          </div>

          <div class="row tr-table mt-5 mb-4" v-if="activeIndex === 1">
            <div class="col-12">
              <table class="table tr-table" style="overflow-x: scroll">
                <thead>
                  <tr>
                    <th scope="col"> {{$t('leaderboard.rank')}}</th>
                    <th scope="col"> {{$t('leaderboard.planter')}}</th>
                    <th scope="col"> {{$t('leaderboard.trees')}}</th>
                    <!-- <th scope="col">LINK</th> -->
                  </tr>
                </thead>
                <tbody v-if="planters">
                  <tr v-for="(item, index) in planters" :key="`planters${activeIndex}-${index}`">
                    <td
                      v-if="index === 0"
                      scope="row"
                      class="d-flex justify-content-between"
                    >
                      <span
                        class="rank"
                        v-html="first"
                        style="width: 15px; height: 15px"
                      ></span>
                      <span style="margin: 0 5px"
                        ><img
                          style="width: 25px"
                          class="rounded-circle"
                          :src="$avatarByWallet(item.id.toLowerCase())"
                          :alt="item.id"
                      /></span>
                    </td>
                    <td
                      class="d-flex justify-content-between"
                      v-if="index === 1"
                      scope="row"
                    >
                      <span
                        class="rank"
                        v-html="second"
                        style="width: 15px; height: 15px"
                      ></span>
                      <span style="margin: 0 5px"
                        ><img
                          style="width: 25px"
                          class="rounded-circle"
                          :src="$avatarByWallet(item.id.toLowerCase())"
                          :alt="item.id"
                      /></span>
                    </td>
                    <td
                      class="d-flex justify-content-between"
                      v-if="index === 2"
                      scope="row"
                    >
                      <span
                        class="rank"
                        v-html="third"
                        style="width: 15px; height: 15px"
                      ></span>
                      <span style="margin: 0 5px"
                        ><img
                          style="width: 25px"
                          class="rounded-circle"
                          :src="$avatarByWallet(item.id.toLowerCase())"
                          :alt="item.id"
                      /></span>
                    </td>
                    <td
                      class="d-flex justify-content-between"
                      v-if="index > 2"
                      scope="row"
                    >
                      <span class="rank">{{ index + 1 }}</span>
                      <span style="margin: 0 5px"
                        ><img
                          style="width: 25px"
                          class="rounded-circle"
                          :src="$avatarByWallet(item.id.toLowerCase())"
                          :alt="item.id"
                      /></span>
                    </td>

                    <td v-coin class="accounting-card">{{ item.id }}</td>
                    <td>{{ item.plantedCount }}</td>
                    <!-- <td
                      
                      class="pointer-event"
                    >
                      <a href="#" class="pointer-event tr-green"></a>
                      <Fas class="tr-green pointer-event" i="eye" />
                    </td> -->
                    <!-- -->
                  </tr>
                </tbody>
              </table>
              <!-- <div v-if="owners">
                <button
                  v-if="owners.length > 10"
                  @click="addTen"
                  class="btn-green"
                >
                  show more
                </button>
              </div> -->
            </div>
          </div>

          <div class="row tr-table mt-5 mb-4" v-if="activeIndex === 2">
            <div class="col-12">
              <table class="table tr-table" style="overflow-x: scroll">
                <thead>
                  <tr>
                    <th scope="col"> {{$t('leaderboard.rank')}}</th>
                    <th scope="col"> {{$t('leaderboard.planter')}}</th>
                    <th scope="col">{{$t('leaderboard.referred')}}</th>
                    <!-- <th scope="col">LINK</th> -->
                  </tr>
                </thead>
                <tbody v-if="plantersInvited">
                  <tr v-for="(item, index) in plantersInvited" :key="`plantersInvited${activeIndex}-${index}`">
                    <td
                      v-if="index === 0"
                      scope="row"
                      class="d-flex justify-content-between"
                    >
                      <span
                        class="rank"
                        v-html="first"
                        style="width: 15px; height: 15px"
                      ></span>
                      <span style="margin: 0 5px"
                        ><img
                          style="width: 25px"
                          class="rounded-circle"
                          :src="$avatarByWallet(item.id.toLowerCase())"
                          :alt="item.id"
                      /></span>
                    </td>
                    <td
                      class="d-flex justify-content-between"
                      v-if="index === 1"
                      scope="row"
                    >
                      <span
                        class="rank"
                        v-html="second"
                        style="width: 15px; height: 15px"
                      ></span>
                      <span style="margin: 0 5px"
                        ><img
                          style="width: 25px"
                          class="rounded-circle"
                          :src="$avatarByWallet(item.id.toLowerCase())"
                          :alt="item.id"
                      /></span>
                    </td>
                    <td
                      class="d-flex justify-content-between"
                      v-if="index === 2"
                      scope="row"
                    >
                      <span
                        class="rank"
                        v-html="third"
                        style="width: 15px; height: 15px"
                      ></span>
                      <span style="margin: 0 5px"
                        ><img
                          style="width: 25px"
                          class="rounded-circle"
                          :src="$avatarByWallet(item.id.toLowerCase())"
                          :alt="item.id"
                      /></span>
                    </td>
                    <td
                      class="d-flex justify-content-between"
                      v-if="index > 2"
                      scope="row"
                    >
                      <span class="rank">{{ index + 1 }}</span>
                      <span style="margin: 0 5px"
                        ><img
                          style="width: 25px"
                          class="rounded-circle"
                          :src="$avatarByWallet(item.id.toLowerCase())"
                          :alt="item.id"
                      /></span>
                    </td>

                    <td v-coin class="accounting-card">{{ item.id }}</td>
                    <td>{{ item.invitedCount }}</td>
                    <!-- <td
                      
                      class="pointer-event"
                    >
                      <a href="#" class="pointer-event tr-green"></a>
                      <Fas class="tr-green pointer-event" i="eye" />
                    </td> -->
                    <!-- -->
                  </tr>
                </tbody>
              </table>
              <!-- <div v-if="owners">
                <button
                  v-if="owners.length > 10"
                  @click="addTen"
                  class="btn-green"
                >
                  show more
                </button>
              </div> -->
            </div>
          </div>
        </div>

        <div class="col-lg-4 d-none d-md-block justify-content-center">
          <h1
            class="title-sm text-center font-weight-bolder mb-4"
            style="color: #616161"
          >
           {{$t('leaderboard.discover')}}
          </h1>

          <img
            src="~/assets/images/leaderBoards/leaderboards.png"
            alt="username"
            class="img-fluid"
          />
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import Fas from "../../../components/font-awsome/Fas";
import ownersSorted from "~/apollo/queries/ownersSorted";
import plantersSorted from "~/apollo/queries/plantersSorted";

export default {
  name: "leaderBoards",
  layout: "dashboard",
    data() {
    return {
      activeIndex: 0,
      first: `<img src=${require("~/assets/images/leaderBoards/first.svg")} />`,
      second: `<img src=${require("~/assets/images/leaderBoards/second.svg")} />`,
      third: `<img src=${require("~/assets/images/leaderBoards/third.svg")} />`,
      id: null,
      stepsLeaderBoard: [
        { name: this.$t('leaderboard.topforests'), icon: "tree" },
        { name: this.$t('leaderboard.topplanters'), icon: "trophy" },
        { name: this.$t('leaderboard.topreferrers'), icon: "bell" },
      ],
      perPage: 10,
      meta:{
        title: this.$t('leaderboard.meta.title'),
        description:  this.$t('leaderboard.meta.description'),
        keywords:  this.$t('leaderboard.meta.keywords'),
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
        {hid: 'og:url', property: 'og:url', content: this.baseUrl + '/tree/' + this.$route.params.id},
        {hid: 'og:image', property: 'og:image', content: this.baseUrl + '/featureImage/jake-hills.jpg'},

        {hid: 'twitter:title', property: 'twitter:title', content: this.meta.title},
      ]


    };
  },
  components: {
    Fas,
  },
  apollo: {
    $client() {
      return this.$cookies.get("activeNetwork") ? this.$cookies.get("activeNetwork").key : 'default';
    },
    owners: {
      prefetch: true,
      query: ownersSorted,
      variables() {
        return { limit: 50, orderBy: "treeCount", orderDirection: "desc" };
      },
    },
    planters: {
      prefetch: true,
      query: plantersSorted,
      variables() {
        return {
          first: 20,
          skip: 0,
          orderBy: "plantedCount",
          orderDirection: "desc",
        };
      },
    },
    plantersInvited: {
      prefetch: true,
      query: plantersSorted,
      variables() {
        return {
          first: 20,
          skip: 0,
          orderBy: "invitedCount",
          orderDirection: "desc",
        };
      },
      update: (data) => data.planters,
    },
  },
  computed: {},


  async created() {
    await this.$store.commit("SET_SIDEBAR_INDEX", 2);
  },
  methods: {
    activeMenu(item, index) {
      this.activeIndex = index;
    },
    goToUserDashboard(id) {
      this.$store.commit("SET_SIDEBAR_INDEX", 0);
      // this.$router.push(`/forest/${id}`);
      // this.$cookies.set('account',null)
      // let routeData = this.$router.resolve({
      //   path: `/forest/${id}`,
      //   params: { id: id },
      // });
      // let routeData = this.$router.resolve({
      //   path: `/forest/${id}`,
      //   params: { id: id },
      // });
      // this.$router.push(this.loaclePath(`/forest/${id}`));

      // window.open(routeData.href, "_self");
    },
  },
};
</script>
<style lang="scss">
.leader-boards {
  a {
    color: #000;
    transition: all ease-in 0.2s;
  }

  a:hover {
    text-decoration: none;
    color: #67b68c;
  }
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
  table > thead > tr {
    background: transparent;
    border-color: transparent;
    box-shadow: none !important;
    th {
      background: transparent;
      border: 0;
      color: #616161;
    }
  }
  table {
    border: none;
    border-collapse: separate;
    border-spacing: 0 1em;
    font-family: Montserrat-Regular;

    td:nth-child(1) {
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
      border: none;
      margin: 15px 5px;
    }
  }
}
@media (max-width: 768px) {
  .nav.tr-nav {
    li {
      font-size: 12px;
    }
  }
  .leader-boards {
    table {
      display: grid;
      width: 100%;

      tbody {
        margin: auto;
      }
      tr {
        width: 100%;
        height: 36px;
        border-radius: 6px;
        box-shadow: 4px 4px 6px 0 rgba(0, 0, 0, 0.16);
        background-color: #ffffff;
        border: none;
        margin: 15px 5px;
        td {
          border: none;
          border-radius: 6px;
        }
      }
    }
  }
}
</style>

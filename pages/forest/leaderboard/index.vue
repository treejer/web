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
              <h2 class="title-sm">Leaderboard</h2>
              <p class="param-sm">
                Browse your recent payment events, notifications and verified
                trees.
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
                    <th scope="col">RANK</th>
                    <th scope="col">OWNER</th>
                    <th scope="col">TREES</th>
                    <th scope="col">LINK</th>
                  </tr>
                </thead>
                <tbody v-if="funders">
                  <tr v-for="(item, index) in funders" :key="index">
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
                          :src="$avatarByWallet(item.id)"
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
                          :src="$avatarByWallet(item.id)"
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
                          :src="$avatarByWallet(item.id)"
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
                          :src="$avatarByWallet(item.id)"
                          :alt="item.id"
                      /></span>
                    </td>

                    <td v-coin class="accounting-card">{{ item.id }}</td>
                    <td>{{ item.treeCount }}</td>
                    <td
                      @click="goToUserDashboard(item.id)"
                      class="pointer-event"
                    >
                      <a href="#" class="pointer-event tr-green"></a>
                      <Fas class="tr-green pointer-event" i="eye" />
                    </td>
                    <!-- -->
                  </tr>
                </tbody>
              </table>
              <!-- <div v-if="funders">
                <button
                  v-if="funders.length > 10"
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
                    <th scope="col">RANK</th>
                    <th scope="col">PLANTER</th>
                    <th scope="col">TREES</th>
                    <!-- <th scope="col">LINK</th> -->
                  </tr>
                </thead>
                <tbody v-if="planters">
                  <tr v-for="(item, index) in planters" :key="index">
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
                          :src="$avatarByWallet(item.id)"
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
                          :src="$avatarByWallet(item.id)"
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
                          :src="$avatarByWallet(item.id)"
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
                          :src="$avatarByWallet(item.id)"
                          :alt="item.id"
                      /></span>
                    </td>

                    <td v-coin class="accounting-card">{{ item.id }}</td>
                    <td>{{ item.plantedCount }}</td>
                    <!-- <td
                      @click="goToUserDashboard(item.id)"
                      class="pointer-event"
                    >
                      <a href="#" class="pointer-event tr-green"></a>
                      <Fas class="tr-green pointer-event" i="eye" />
                    </td> -->
                    <!-- -->
                  </tr>
                </tbody>
              </table>
              <!-- <div v-if="funders">
                <button
                  v-if="funders.length > 10"
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
                    <th scope="col">RANK</th>
                    <th scope="col">PLANTER</th>
                    <th scope="col">REFERRED</th>
                    <!-- <th scope="col">LINK</th> -->
                  </tr>
                </thead>
                <tbody v-if="plantersInvited">
                  <tr v-for="(item, index) in plantersInvited" :key="index">
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
                          :src="$avatarByWallet(item.id)"
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
                          :src="$avatarByWallet(item.id)"
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
                          :src="$avatarByWallet(item.id)"
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
                          :src="$avatarByWallet(item.id)"
                          :alt="item.id"
                      /></span>
                    </td>

                    <td v-coin class="accounting-card">{{ item.id }}</td>
                    <td>{{ item.invitedCount }}</td>
                    <!-- <td
                      @click="goToUserDashboard(item.id)"
                      class="pointer-event"
                    >
                      <a href="#" class="pointer-event tr-green"></a>
                      <Fas class="tr-green pointer-event" i="eye" />
                    </td> -->
                    <!-- -->
                  </tr>
                </tbody>
              </table>
              <!-- <div v-if="funders">
                <button
                  v-if="funders.length > 10"
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
            class="title-md text-center font-weight-bolder mb-4"
            style="color: #616161"
          >
            Discover Earth Ambassadors
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
import fundersSorted from "~/apollo/queries/fundersSorted";
import plantersSorted from "~/apollo/queries/plantersSorted";

export default {
  name: "leaderBoards",
  layout: "dashboard",
  head() {
    return {
      title: `Treejer`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: "contact our business and team",
        },
        {
          hid: "keywords",
          name: "keywords",
          content: "business team_business treejer treejer_contact_us teams ",
        },
      ],
    };
  },
  components: {
    Fas,
  },
  apollo: {
    funders: {
      prefetch: true,
      query: fundersSorted,
      variables () {
        return { first: 20, skip:0, orderBy: 'treeCount', orderDirection: 'desc' }
      }
    },
    planters: {
      prefetch: true,
      query: plantersSorted,
      variables () {
        return { first: 20, skip:0, orderBy: 'plantedCount', orderDirection: 'desc' }
      }
    },
    plantersInvited: {
      prefetch: true,
      query: plantersSorted,
      variables () {
        return { first: 20, skip:0, orderBy: 'invitedCount', orderDirection: 'desc' }
      },
      update: data => data.planters
    },
  },
  computed: {},

  data() {
    return {
      activeIndex: 0,
      first: `<img src=${require("~/assets/images/leaderBoards/first.svg")} />`,
      second: `<img src=${require("~/assets/images/leaderBoards/second.svg")} />`,
      third: `<img src=${require("~/assets/images/leaderBoards/third.svg")} />`,
      id: null,
      stepsLeaderBoard: [
        { name: "Top Forests", icon: "tree" },
        { name: "Top Planters", icon: "trophy" },
        { name: "Top Referrers", icon: "bell"},

      ],
      perPage: 10,
    };
  },
  async created() {
    await this.$store.commit('SET_SIDEBAR_INDEX', 2)
  },
  methods: {
    activeMenu(item, index) {
      this.activeIndex = index;
    },
    goToUserDashboard(id) {
      this.$store.commit("SET_SIDEBAR_INDEX", 0);
      // this.$router.push(`/forest/${id}`);
      // this.$cookies.set('account',null)
      let routeData = this.$router.resolve({
        path: `/forest/${id}`,
        params: { id: id },
      });
      window.open(routeData.href, "_self");
    },
  },
};
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
    border: 0 !important;
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
      border: 0;
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
  table {
    display: grid;
  }
}
</style>

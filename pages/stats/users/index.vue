<template>
  <div class="container-fluid pr-5">
    <div class="row">
      <div class="users col-12">
        <div class="row">
          <div class="col-12 py-3 pl-3">
            <h4 class="title-sm tr-gray-one text-left">Planters</h4>
          </div>
          <div class="col-12 col-md-12 p-0">
            <div class="admin-user-table">
              <table class="table border-0">
                <thead>
                  <tr>
                    <th scope="col" class="pointer-event">Name</th>
                    <th scope="col" class="pointer-event">Country</th>
                    <th scope="col" class="pointer-event">Verification</th>
                    <th scope="col" class="pointer-event"># Trees</th>
                    <th scope="col" class="pointer-event">Last Update</th>
                    <th scope="col" class="pointer-event">Wallet Address</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="mt-4"
                    v-for="tree in trees.data"
                    :key="tree.tree_id"
                  >
                    <th scope="row">{{ "Geust user" }}</th>
                    <th scope="row">{{ "Planet earth" }}</th>
                    <th scope="row">
                      <button class="btn btn-state-admin param tr-white">
                        {{ "Pending" }}
                      </button>
                    </th>
                    <td scope="row" v-coin>{{ tree.owner }}</td>
                    <td
                      v-if="
                        tree.fundedDate !== null && tree.plantedDate !== null
                      "
                    >
                      Funded & Planted
                    </td>
                    <td v-else-if="tree.plantedDate !== null">Planted</td>
                    <td v-else-if="tree.fundedDate !== null">Funded</td>
                    <td class="d-none d-md-block">
                      {{ tree.latitude + "," + tree.longitude }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div
                class="tr-pagination d-flex justify-content-center w-100 position-relative"
              >
                <pagination
                  size="small"
                  align="center"
                  :limit="2"
                  :data="trees"
                  @pagination-change-page="listTrees"
                ></pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Fab from "@/components/font-awsome/Fab";
import pagination from "laravel-vue-pagination";

export default {
  name: "findMyTree",
  layout: "admin",

  // layout:"checkout",

  components: {
    Fab,
    pagination,
  },
  computed: {},
  async mounted() {
    await this.listTrees();

    const leaderBoards = await this.$axios.$get(
      `https://api.treejer.com/trees/leaderboard?perPage=${this.perPage}`
    );
    this.leaderBoards = leaderBoards.leaderboard.data;
  },
  data() {
    return {
      trees: {},
      leaderBoards: null,
      treeID: null,
      loading: false,
      perPage: 10,
      errors: null,
      step: null,
      search: "",
      activeIndex: null,
    };
  },
  methods: {
    changeRoute(step, status) {
      this.$router.push(`/find/${step}`);
    },
    goToLeaderBoard() {
      if (
        this.$store.state.account === null ||
        this.$cookies.get("account") === null
      ) {
        this.$bvToast.toast("you are not logged in. please login", {
          toaster: "b-toaster-bottom-left",
          solid: true,
          headerClass: "hide",
          variant: "danger",
        });
        this.$bvModal.show("five");
      } else {
        this.$router.push(this.localePath("leaderboard"));
      }
    },
    goToDashboard(item) {
      if (this.$cookies.get("account")) {
        this.$store.commit("SET_INDEX", 0);
        this.$router.push({
          path: "/forest/" + item.owner,
          params: { id: item.owner },
        });
      } else {
        this.$bvToast.toast("you are not logged in. please login", {
          toaster: "b-toaster-bottom-left",
          solid: true,
          headerClass: "hide",
          variant: "danger",
        });
        this.$bvModal.show("five");
      }
    },
    async findTree() {
      this.errors = null;
      this.loading = true;
      let self = this;

      await this.$axios
        .$get(`${process.env.apiUrl}/trees/${self.treeID}`)
        .then(function (response) {
          self.loading = false;
          self.$router.push(`/find/${self.treeID}`);

          // handle success
        })
        .catch(function (error) {
          self.loading = false;
          self.$bvToast.toast("Tree Not found!", {
            toaster: "b-toaster-bottom-left",
            solid: true,
            headerClass: "hide",
            variant: "danger",
          });
          // self.errors = 'notFound'
          // console.log(self.errors)

          // handle error
        });
    },
    async listTrees(page = 1) {
      let self = this;
      await this.$axios
        .$get(`${process.env.apiUrl}/trees?page=${page}`)
        .then(function (response) {
          self.trees = response.trees;
          console.log(typeof self.trees, "typeof self.trees", self.trees);
        })
        .catch(function (error) {});
    },
  },
};
</script>
<style lang="scss" scoped>
.users {
  position: relative;
  border: 1px solid #bdbdbd;
  box-sizing: border-box;
  border-radius: 12px;
  tr,
  td,
  th {
    border: none;
    font-size: 14px;
    line-height: 17px;

    color: #424242;
  }
  .table thead {
    background: #e5e7db;
  }
  table {
    justify-content: center;
    text-align: center;
  }
  tr th {
    font-size: 14px;
    line-height: 17px;
    /* identical to box height */

    color: #757575;
  }
  .btn-state-admin {
    padding: 5px 15px;

    background: #b6677f;
    border-radius: 6px;
  }
}
</style>

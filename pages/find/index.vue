<template>
  <section class="position-relative pt-5 col-12 find-my-tree">
    <div class="container">
      <div class="row justify-content-center text-center">
        <div class="col-12">
          <div class="title">
            <h1 class="title-sm tr-gray-two">Looking for your tree?</h1>
            <p class="param-xl tr-gray-four mt-4">
              Enter the Tree ID below and we'll find it for you! :)
            </p>
          </div>
          <div class="search-bar position-relative col-md-5 m-auto">
            <span
              class="icon position-absolute position-relative"
              @click="findTree()"
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.2819 13.836L13.1669 10.721C13.0971 10.6514 13.0143 10.5962 12.9232 10.5586C12.8321 10.521 12.7345 10.5018 12.6359 10.502H12.1269C13.1461 9.19825 13.6296 7.55483 13.4788 5.90684C13.3281 4.25886 12.5545 2.73042 11.3157 1.63317C10.0769 0.535909 8.46624 -0.0475353 6.81211 0.00179246C5.15799 0.0511202 3.58496 0.729505 2.41375 1.89863C1.24255 3.06775 0.561371 4.63958 0.509105 6.29361C0.456839 7.94765 1.03742 9.55934 2.13248 10.8001C3.22753 12.0408 4.75459 12.8172 6.40231 12.9708C8.05002 13.1245 9.6943 12.6439 10.9999 11.627V12.136C10.9997 12.2346 11.0189 12.3322 11.0565 12.4234C11.094 12.5145 11.1492 12.5973 11.2189 12.667L14.3349 15.783C14.4043 15.8528 14.4868 15.9081 14.5777 15.9459C14.6686 15.9837 14.766 16.0031 14.8644 16.0031C14.9628 16.0031 15.0602 15.9837 15.1511 15.9459C15.242 15.9081 15.3245 15.8528 15.3939 15.783L16.2779 14.899C16.4188 14.7583 16.4983 14.5675 16.4991 14.3684C16.4998 14.1692 16.4218 13.9778 16.2819 13.836ZM6.99989 10.501C6.20877 10.501 5.43541 10.2664 4.77761 9.82691C4.11981 9.38739 3.60712 8.76267 3.30437 8.03177C3.00162 7.30087 2.92241 6.4966 3.07675 5.72067C3.23109 4.94475 3.61205 4.23202 4.17146 3.67261C4.73087 3.1132 5.44361 2.73224 6.21953 2.57789C6.99545 2.42355 7.79972 2.50277 8.53063 2.80552C9.26153 3.10827 9.88624 3.62096 10.3258 4.27875C10.7653 4.93655 10.9999 5.70991 10.9999 6.50104C10.9999 7.5619 10.5785 8.57932 9.82832 9.32946C9.07817 10.0796 8.06076 10.501 6.99989 10.501Z"
                  fill="#9E9E9E"
                />
              </svg>
            </span>
            <FormulateInput
              class="search param-sm"
              placeholder="Search"
              @keyup.enter="findTree()"
              type="text"
              v-model="treeID"
              name="treeID"
            />
          </div>
        </div>
      </div>
      <div class="row justify-content-center text-center">
        <div class="col-12">
          <div class="find-my-tree-btn mt-4">
            <button
              :class="{ disable: !treeID }"
              @click="findTree()"
              class="btn-green param-md mb-4"
            >
              <b-spinner v-if="loading" small class="mr-1"></b-spinner>
              {{ loading ? " Loading..." : "Find My Tree" }}
            </button>

            <!--            <button disabled class="btn-gray param-md mb-2 disabled">Explore Other Trees</button>-->
          </div>
        </div>
      </div>
      <div class="row mt-5 pt-5 justify-content-center text-center">
        <div class="col-12">
          <div class="title">
            <h1 class="title-sm tr-gray-two">Explore Forests</h1>
          </div>
        </div>
      </div>
      <div class="row justify-content-around text-center mt-4">
        <div class="col-md-10 col-12">
          <div class="container">
            <div class="row">
              <div
                class="col-6 col-lg-2 col-md-4 mb-2 pointer-event"
                v-for="(item, index) in owners"
                :key="index"
              >
                <div class="card-box" @click="goToDashboard(item)">
                  <div class="tr-card box-shadow border">
                    <div class="card-img justify-content-center text-center">
                      <img
                        class="bg-white"
                        width="64"
                        height="64"
                        :src="`${icon}${item.id}`"
                        :alt="item.id"
                      />
                    </div>
                    <div class="card-title">
                      <p
                        v-html="item.id"
                        class="tr-gray-two param-sm mb-1"
                        v-coin
                      ></p>
                      <p class="tr-green mb-1">{{ item.treeCount }} trees</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mt-5">
              <div class="col-12 justify-content-center text-center">
                <button
                  class="
                    btn-outline-green
                    param-md
                    tr-green
                    position-relative
                    pointer-event
                  "
                  style="padding: 8px 25px"
                  @click="goToLeaderBoard()"
                >
                  Go to Leaderboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row tree-status mt-5 pt-5 justify-content-center text-center">
        <div class="col-12">
          <div class="title">
            <h1 class="title-sm tr-gray-two">Tree Status Explorer</h1>
          </div>
        </div>
        <div class="col-12 col-md-10">
          <div class="treejer-table">
            <div class="table-toolbar">
              <div class="row mb-3">
                <div class="col-12 col-md-6">
                  <p class="param-md tr-gray-two text-left ml-5 pt-2">
                    Enter a tree ID to check its status
                  </p>
                </div>
                <div class="col-12 col-md-6 d-flex justify-content-around">
                  <div
                    class="search-bar-table position-relative"
                    @keyup.enter="findTree"
                  >
                    <span
                      class="position-absolute pointer-event"
                      @click="findTree"
                    >
                      <svg
                        width="16"
                        height="17"
                        viewBox="0 0 16 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.7819 13.836L12.6669 10.721C12.5971 10.6514 12.5143 10.5962 12.4232 10.5586C12.3321 10.521 12.2345 10.5018 12.1359 10.502H11.6269C12.6461 9.19825 13.1296 7.55483 12.9788 5.90684C12.8281 4.25886 12.0545 2.73042 10.8157 1.63317C9.5769 0.535909 7.96624 -0.0475353 6.31211 0.00179246C4.65799 0.0511202 3.08496 0.729505 1.91375 1.89863C0.742549 3.06775 0.0613709 4.63958 0.00910515 6.29361C-0.0431606 7.94765 0.537422 9.55934 1.63248 10.8001C2.72753 12.0408 4.25459 12.8172 5.90231 12.9708C7.55002 13.1245 9.1943 12.6439 10.4999 11.627V12.136C10.4997 12.2346 10.5189 12.3322 10.5565 12.4234C10.594 12.5145 10.6492 12.5973 10.7189 12.667L13.8349 15.783C13.9043 15.8528 13.9868 15.9081 14.0777 15.9459C14.1686 15.9837 14.266 16.0031 14.3644 16.0031C14.4628 16.0031 14.5602 15.9837 14.6511 15.9459C14.742 15.9081 14.8245 15.8528 14.8939 15.783L15.7779 14.899C15.9188 14.7583 15.9983 14.5675 15.9991 14.3684C15.9998 14.1692 15.9218 13.9778 15.7819 13.836ZM6.49989 10.501C5.70877 10.501 4.93541 10.2664 4.27761 9.82691C3.61981 9.38739 3.10712 8.76267 2.80437 8.03177C2.50162 7.30087 2.42241 6.4966 2.57675 5.72067C2.73109 4.94475 3.11205 4.23202 3.67146 3.67261C4.23087 3.1132 4.94361 2.73224 5.71953 2.57789C6.49545 2.42355 7.29972 2.50277 8.03063 2.80552C8.76153 3.10827 9.38624 3.62096 9.82577 4.27875C10.2653 4.93655 10.4999 5.70991 10.4999 6.50104C10.4999 7.5619 10.0785 8.57932 9.32832 9.32946C8.57817 10.0796 7.56076 10.501 6.49989 10.501Z"
                          fill="#9E9E9E"
                        />
                      </svg>
                    </span>
                    <input
                      class="search param-sm"
                      type="text"
                      placeholder="Search Tree ID"
                      v-model="treeID"
                    />
                  </div>
                  <div class="ref-box pointer-event">
                    <svg
                      width="36"
                      height="36"
                      viewBox="0 0 36 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18 36C27.9411 36 36 27.9411 36 18C36 8.05887 27.9411 0 18 0C8.05887 0 0 8.05887 0 18C0 27.9411 8.05887 36 18 36Z"
                        fill="#FAF8F1"
                      />
                      <path
                        d="M18 35.5C27.665 35.5 35.5 27.665 35.5 18C35.5 8.33502 27.665 0.5 18 0.5C8.33502 0.5 0.5 8.33502 0.5 18C0.5 27.665 8.33502 35.5 18 35.5Z"
                        stroke="#BDBDBD"
                      />
                      <path
                        d="M21.7 14.041C21.0114 13.3974 20.1669 12.9445 19.2499 12.7269C18.3329 12.5094 17.3749 12.5346 16.4706 12.8002C15.5663 13.0659 14.7469 13.5627 14.0932 14.2416C13.4395 14.9206 12.9742 15.7583 12.743 16.672C12.7232 16.757 12.6753 16.8328 12.6071 16.8873C12.5389 16.9417 12.4543 16.9716 12.367 16.972H10.519C10.4622 16.972 10.4061 16.9596 10.3547 16.9356C10.3032 16.9115 10.2577 16.8764 10.2214 16.8328C10.185 16.7892 10.1587 16.7381 10.1443 16.6832C10.1299 16.6283 10.1277 16.5708 10.138 16.515C10.4058 15.1005 11.0504 13.7844 12.0037 12.7057C12.957 11.6269 14.1837 10.8253 15.5546 10.3856C16.9254 9.9458 18.3895 9.88409 19.7925 10.2069C21.1954 10.5298 22.4853 11.2253 23.526 12.22L24.678 11.068C24.786 10.9598 24.9235 10.8859 25.0734 10.8558C25.2233 10.8256 25.3787 10.8405 25.5201 10.8986C25.6615 10.9567 25.7825 11.0553 25.8679 11.1821C25.9533 11.3089 25.9993 11.4581 26 11.611V15.935C26 16.1403 25.9185 16.3371 25.7733 16.4823C25.6281 16.6274 25.4313 16.709 25.226 16.709H20.9C20.7468 16.7091 20.597 16.6637 20.4696 16.5786C20.3422 16.4935 20.243 16.3725 20.1844 16.2309C20.1258 16.0894 20.1106 15.9336 20.1406 15.7834C20.1706 15.6331 20.2445 15.4952 20.353 15.387L21.7 14.041ZM10.774 19.29H15.1C15.2532 19.2899 15.403 19.3353 15.5304 19.4204C15.6578 19.5055 15.757 19.6265 15.8156 19.7681C15.8742 19.9096 15.8894 20.0654 15.8594 20.2156C15.8294 20.3659 15.7555 20.5038 15.647 20.612L14.3 21.959C14.9886 22.6025 15.8331 23.0555 16.7501 23.273C17.6671 23.4906 18.6251 23.4654 19.5294 23.1997C20.4337 22.9341 21.2531 22.4373 21.9068 21.7583C22.5605 21.0794 23.0258 20.2417 23.257 19.328C23.2768 19.243 23.3247 19.1671 23.3929 19.1127C23.4611 19.0583 23.5457 19.0284 23.633 19.028H25.482C25.5388 19.0279 25.5949 19.0404 25.6463 19.0644C25.6978 19.0885 25.7433 19.1236 25.7796 19.1672C25.816 19.2108 25.8423 19.2619 25.8567 19.3168C25.8711 19.3717 25.8733 19.4291 25.863 19.485C25.5952 20.8995 24.9506 22.2155 23.9973 23.2943C23.044 24.3731 21.8173 25.1746 20.4464 25.6144C19.0756 26.0542 17.6115 26.1159 16.2085 25.793C14.8056 25.4702 13.5157 24.7747 12.475 23.78L11.322 24.936C11.2138 25.0445 11.0759 25.1184 10.9256 25.1484C10.7754 25.1784 10.6196 25.1632 10.4781 25.1046C10.3365 25.046 10.2155 24.9467 10.1304 24.8194C10.0453 24.692 9.99992 24.5422 10 24.389V20.065C9.99987 19.9633 10.0198 19.8625 10.0586 19.7685C10.0975 19.6745 10.1545 19.589 10.2263 19.517C10.2982 19.4451 10.3836 19.388 10.4776 19.349C10.5715 19.31 10.6723 19.29 10.774 19.29Z"
                        fill="#757575"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <table class="table border-0 dir-ltr">
              <thead>
                <tr>
                  <th scope="col">Tree ID</th>
                  <th scope="col" class="pointer-event">
                    <i class="pointer-event fas fa-sort-up"></i>Owner
                  </th>
                  <th scope="col" class="pointer-event">
                    <i class="pointer-event fas fa-sort-up"></i>Status
                  </th>
                  <th scope="col" class="pointer-event d-none d-md-block">
                    <i class="pointer-event fas fa-sort-up"></i>Location
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="tree in trees" :key="tree.id">
                  <th scope="row">{{ $hex2Dec(tree.id)  }}</th>
                  <td v-coin>
                    {{ tree.funder !== null ? tree.funder.id : "-" }}
                  </td>
                  <td>
                    {{ tree.treeStatus }}
                  </td>
                  <td class="d-none d-md-block">
                    <!-- {{ tree.latitude + "," + tree.longitude }} -->
                  </td>
                </tr>
              </tbody>
            </table>
            <div
              class="
                tr-pagination
                d-flex
                justify-content-center
                w-100
                position-relative
              "
            >
              <ul class="pagination">
                <li class="page-item pagination-prev-nav">
                  <a
                    class="page-link"
                    aria-label="Previous"
                    @click="updatePagination(false)"
                  >
                    <slot name="prev-nav">
                      <span aria-hidden="true">&laquo;</span>
                      <span class="sr-only">Previous</span>
                    </slot>
                  </a>
                </li>

                <li class="page-item pagination-next-nav">
                  <a
                    class="page-link"
                    aria-label="Next"
                    @click="updatePagination(true)"
                  >
                    <slot name="next-nav">
                      <span aria-hidden="true">&raquo;</span>
                      <span class="sr-only">Next</span>
                    </slot>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div
      class="alert position-relative"
      v-if="errors"
      v-for="(item, index) in errors"
      :key="index"
    >
      <b-alert
        class="position-fixed"
        :dismissible="errors"
        style="top: 2px; right: 1px"
        show
        variant="danger"
      >
        {{ item.toString() }}
      </b-alert>
    </div> -->
  </section>
</template>

<script>
import Fab from "@/components/font-awsome/Fab";
import ownersSorted from "~/apollo/queries/ownersSorted";
import treesSearchById from "~/apollo/queries/treesSearchById";
import treesPagination from "~/apollo/queries/treesPagination";
export default {
  name: "findMyTree",
  // layout:"checkout",
  components: {
    Fab
  },
  head() {
    return {
      title: `Treejer`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Enter the Tree ID below and we'll find it for you! :)",
        },
        {
          hid: "keywords",
          name: "keywords",
          content:
            "Looking for your tree?  Tree ID Forests Explore Forests Tree Status Explorer\n LeaderBoard",
        },
      ],
    };
  },
  data() {
    return {
      title: this.$route.name,
      icon: process.env.gravatar,
      trees: [],
      treeID: null,
      loading: false,
      perPage: 10,
      errors: null,
      step: null,
      search: "",
      activeIndex: 0,
    };
  },
  apollo: {
    owners: {
      prefetch: true,
      query: ownersSorted,
      variables () {
        return { limit: 12, orderBy: 'treeCount', orderDirection: 'desc' }
      }
    },
  },
  async mounted() {
    await this.listTrees();
  },
  methods: {
    goToLeaderBoard() {
      if (!this.$cookies.get('account')) {
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
      this.$router.push({
        path: "/forest/" + item.id,
        params: { id: item.id },
      });
    },
    async findTree() {

      this.errors = null;
      this.loading = true;
      let self = this;
      if (self.treeID) {
        let result = await this.$apollo.query({
          query: treesSearchById,
          variables: {
            id: this.$dec2hex(self.treeID),
          },
        });

        if (result) {
          if (result.data.trees.length > 0) {
            self.$router.push(`/tree/${self.treeID}`);
          } else {
            self.$bvToast.toast("Tree Not found!", {
              toaster: "b-toaster-bottom-left",
              solid: true,
              headerClass: "hide",
              variant: "danger",
            });
          }
          this.loading = false;
        }
      } else {
        self.loading = false;
        self.$bvToast.toast("TreeId is empty!", {
          toaster: "b-toaster-bottom-left",
          solid: true,
          headerClass: "hide",
          variant: "danger",
        });
      }
    },
    async updatePagination(nextPage = true) {
      if (nextPage) {
        this.activeIndex = this.activeIndex + this.perPage;
      } else {
        if (this.activeIndex === 0) {
          this.$bvToast.toast("There is no previous page!", {
            toaster: "b-toaster-bottom-left",
            solid: true,
            headerClass: "hide",
            variant: "danger",
          });
          return;
        }
        this.activeIndex = this.activeIndex - this.perPage;
      }
      this.listTrees();
    },
    async listTrees() {
      this.loading = true;
      let result = await this.$apollo.query({
        query: treesPagination,
        variables: {
          first: this.perPage,
          skip: this.activeIndex,
          orderBy: "id",
          orderDirection: "desc",
        },
      });

      if (result) {
        if (result.data.trees.length > 0) {
          this.trees = result.data.trees;
        } else {
          self.$bvToast.toast("Tree is no more trees!", {
            toaster: "b-toaster-bottom-left",
            solid: true,
            headerClass: "hide",
            variant: "danger",
          });
        }
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.find-my-tree {
  .search-bar {
    span {
      z-index: +99;
      left: 25px;
      top: 5px;

      svg {
      }
    }

    input,
    #formulate--find-11 {
      background: #e5e7db;
      border: 0;
      padding: 15px 45px;
    }
  }

  .treejer-table {
    background: #e5e7db;
    margin-top: 45px;
    margin-bottom: 50px;
    border-radius: 10px;
    color: #666666;
    background-size: 250% 250%;
    padding: 25px 10px;
    border: 1px solid #bdbdbd;

    .search-bar-table {
      input {
        background: #faf8f1;
        border: 1px solid #bdbdbd;
        padding: 10px 35px;
        border-radius: 16px;
      }

      span {
        margin: 10px;
      }
    }

    table tr:nth-of-type(odd) {
      background-color: rgba(255, 255, 255, 0.15);
    }

    table th,
    table td {
      color: #757575;
      border: 0 !important;
      font-size: 12px;
    }

    table > thead > tr {
      background-color: transparent !important;
    }
  }

  .find-my-tree-btn {
    button {
      box-shadow: 0px 4px 11px rgba(0, 0, 0, 0.161);
      height: 40px;
      padding: 0 45px;
      margin: 0 5px;
    }
  }

  .tr-card.border {
    border: transparent;
    border-radius: 6px;

    img {
      margin: 12px 0;
      border-radius: 50px !important;
    }
  }

  .leader {
    button {
      padding: 10px 20px;
    }
  }
}
</style>

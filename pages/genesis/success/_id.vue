<template>
  <section class="position-relative pt-5 col-12 add-tree mb-5 pb-5">
    <div class="container-fluid">
      <div class="row tree-count">
        <div class="col-12 final-step justify-content-center text-center">
          <img
            alt="final-step"
            class="img-fluid mt-5"
            src="~/assets/images/myforest/final-step.png"
          />
          <h1 class="title-sm font-weight-bold mt-5 tr-gray-two">
            Congratulations, your forest just got bigger!!
          </h1>
          <p class="mt-3 tr-gray-three">
            Your trees NFT Cover will be generated after 120 block confirmation, and you can check them below here or on your forest page.
          </p>
          <nuxt-link
            :to="localePath('/forest/' + $cookies.get('account'))"
            class="tr-green param pt-5"
            >Go back to My Forest
          </nuxt-link>
          <br />


          <button class="btn-green param-18" @click="goToCheckout()">
            Claim more trees
          </button>
        </div>

        <div class="col-12">
            <div class="row">
                <div class="param pt-1">
                    Results will refetch every 30 seconds
                </div>
            </div>
            
          <div class="row" v-if="treeHistories.length > 0">
            <TreeCardLoading
              v-for="history in treeHistories"
              :key="history.id"
              :tree="history.tree"
              class="col-md-4 col-lg-2 col-6 p-1 pm-2"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
import TreeCardLoading from "../../../components/increamentalsell/TreeCardLoading";
import treeHistoriesBytxQuery from "~/apollo/queries/treeHistoriesBytx";


export default {
  name: "genesisSuccess",
  components: { TreeCardLoading },
  apollo: {
    treeHistories: {
      query: treeHistoriesBytxQuery,
      prefetch: false,
    //   skip() {
    //     return this.$route.params.id === "guest" ? true : false;
    //   },
    //   prefetch: ({ route }) => ({ id: route.params.id.toLowerCase() }),
      variables() {
        return {
          transactionHash: this.$route.params.id.toLowerCase(),
          first: 54,
          skip: 0,
          orderBy: "createdAt",
          orderDirection: "asc",
         };
      },
      fetchPolicy: "network-only",
    },
  },
  data() {
    return {
      treeHistories: [],
    };
  },
  created() {
    setInterval(async () => {
        await this.$apollo.queries.treeHistories.refetch();
    }, 30000);
  },

  methods: {
    async goToCheckout() {
      let self = this;
      if (!self.$cookies.get("account")) {
        self.$bvToast.toast("you're not login", {
          toaster: "b-toaster-bottom-left",
          solid: true,
          headerClass: "hide",
          variant: "danger",
        });
        self.$bvModal.show("five");
      } else {
        self.$router.push("/genesis/checkout");
      }
    },
  },
};
</script>
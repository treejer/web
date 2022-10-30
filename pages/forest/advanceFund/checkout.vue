<template>
  <section class="position-relative pt-5 col-12 checkout-advancefund mb-5 pb-5">
    <div class="container-fluid">
      <div class="row tree-count">
        <div class="box-left col-lg-7">
          <div class="row">
            <div
              class="mb-3 col-lg-4 col-12"
              :class="`card-index`"
              v-for="(item, index) in listItems"
              :key="index"
            >
              <CardAdvanceFund
                :showCount="true"
                :counts="item.count"
                :fund="item.list"
                :change="true"
              />
            </div>
          </div>
        </div>
        <div class="box-right col-lg-5 text-center">
          <img src="~/assets/images/treebox/tree.png" alt="tree-treebox" />
          <h1 class="tr-gray-two title-md font-weight-bolder">
            {{ totalCounts }}
            <br />
            {{ parseFloat(totalPrices.toString()).toFixed(2) }}
            DAI
          </h1>
          <p class="param-md tr-gray-four">{{ "Total Trees to Buy" }}</p>

          <!-- <button
            v-if="approved"
            class="btn-green bt-lg"
            @click.prevent="AdvanceBuy()"
          >
            <BSpinner v-if="loadingCreate" class="mr-2" small type="grow"
              >loading
            </BSpinner>
            {{
              loadingCreate
                ? $t("aboutus.loading")
                : $t("treebox.createtreebox")
            }}
          </button>

          <button v-else class="btn-green bt-lg" @click.prevent="&quot;&quot;;">
            <BSpinner v-if="loadingApprove" class="mr-2" small type="grow"
              >loading
            </BSpinner>
            {{ loadingApprove ? $t("aboutus.loading") : $t("treebox.approve") }}
          </button> -->

          <button
            class="btn-green p-2  bt-lg "
            @click.prevent="
              $store.dispatch('advanceFund/fundTree', {
                listItems: listItems,
                totalCounts: totalCounts,
                totalPrices: totalPrices,
              })
            "
          >
            Buy Tree
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import CardAdvanceFund from "../../../components/advanceFund/CardAdvanceFund.vue";
export default {
  components: { CardAdvanceFund },
  name: "checkout",
  layout: "checkout",

  head() {
    return {
      title: `Treejer`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: "",
        },
        {
          hid: "keywords",
          name: "keywords",
          content: "",
        },
      ],
    };
  },
  data() {
    return {
      loadingApprove: false,
      loadingCreate: false,
    };
  },

  computed: {
    listItems() {
      return this.$store.state.advanceFund.shoppingList;
    },
    totalCounts() {
      return this.$store.state.advanceFund.totalCounts;
    },
    totalPrices() {
      return this.$store.state.advanceFund.totalPrices;
    },
  },

  async mounted() {},

  async created() {
    // this.setToCookies();
    // this.sumCountsAndPrices();
    // this.checkItems();
    await this.$store.dispatch("SUM_TOTALL_PRICE_AND_COUNT");
  },

  methods: {
    // sumCountsAndPrices() {
    //   this.totalCounts = this.listItems.reduce((a, b) => {
    //     console.log(a, b, "a,b is here");
    //     return Number(a.count) + Number(b.count);
    //   });
    //   this.totalPrices = this.listItems.reduce((a, b) => {
    //     console.log(a, b, "a,b is here");
    //     return Number(a.list.price) + Number(b.list.price);
    //   });
    // },

    setToCookies() {
      let self = this;
      if (self.listItems) {
        self.$cookies.set("shoppingList", self.listItems);
        console.log(self.$cookies.get("shoppingList"), "wwwwwwwwww");
      }
    },
    checkItems() {
      if (this.$cookies.get("shoppingList")) {
        this.$store.dispatch(
          "advanceFund/setListItems",
          this.$cookies.get("shoppingList")
        );
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.checkout-advancefund {
}
</style>

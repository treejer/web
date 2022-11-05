<template>
  <div class="sidebar-advanceFund" v-if="status">
    <div class="row">
      <div class="position-relative col-12">
        <div
          class="shopping-list"
          v-for="(item, index) in $store.state.advanceFund.shoppingList"
          :key="index"
        >
          <img
            class="img-fluid"
            width="25"
            :src="icon + item.model.planter.id"
            alt="tree"
          />
          <span class="param-sm tr-gray-three">
            {{ $t("advanceFund.Count")
            }}<span class="font-weight-bolder">{{ item.count }}</span>
          </span>

          <span class="param-sm tr-gray-three">
            {{ $t("advanceFund.Price") }}

            <span class="font-weight-bolder"
              >{{
                parseFloat($web3.utils.fromWei(item.model.price)).toFixed(2)
              }}DAI</span
            >
          </span>

          <span class="param-sm tr-gray-three">
            {{ $t("advanceFund.country") }}
            <span class="font-weight-bolder">{{
              item.model.country
            }}</span></span
          >
        </div>
        <div class="col-12 text-center">
          <div class="row mb-3 mt-3">
            <div
              class="
                col-6
                p-md-0
                text-left text-md-center
                checkout-border
                border-right
              "
            >
              <p class="param tr-gray-two font-weight-bolder">
                {{ $store.state.advanceFund.totalCounts }}
              </p>
              <p class="param-sm tr-gray-four font-weight-bolder mb-0">
                {{ $t("advanceFund.message") }}
              </p>
            </div>
            <div class="col-6 p-md-0 mb-direction">
              <p class="param text-center tr-gray-two font-weight-bolder">
                <span class="param tr-gray-two font-weight-bolder">
                  $ {{ $store.state.advanceFund.totalPrices }}
                </span>
              </p>
              <p
                class="
                  param-sm
                  text-center
                  tr-gray-four
                  font-weight-bolder
                  mb-0
                "
              >
                {{ $t("advanceFund.TotalDAI") }}
              </p>
            </div>
          </div>

          <button
            v-if="$store.state.advanceFund.shoppingList <= 0"
            class="btn btn-green w-100 param-sm tr-white buy-btn-advance-fund"
          >
            {{ $t("advanceFund.shopping") }}
          </button>
          <nuxt-link
            v-else
            :to="localePath('/forest/advanceFund/checkout')"
            class="btn btn-green w-100 param-sm tr-white buy-btn-advance-fund"
          >
            {{ $t("advanceFund.buy") }}
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    status: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      icon: process.env.gravatar,
      counts: 0,
    };
  },
  computed: {
    show() {
      return this.$store.state.advanceFund.sidebarAdvanceFundStatus;
    },
  },
  methods: {
    counter(status, model) {
      let self = this;
      if (status === "obb" && !self.change) {
        self.counts++;
      }
      if (status === "odd" && !self.change) {
        if (self.counts > 0) {
          self.counts--;
        }
        if (self.counts <= 0) {
          self.localShowCount = false;
          self.counts = 0;
          self.$store.dispatch("advanceFund/removeListItem", model);
        }
      }
      if (status === "obb" && self.change) {
        self.counts++;
      }
      if (status === "odd" && self.change) {
        self.counts > 0 ? self.counts-- : self.counts;
      }
    },
  },
  created() {
    let self = this;
  },
};
</script>

<style lang="scss" scoped>
.sidebar-advanceFund {
  z-index: +999;
  background: #e5e7db;
  position: absolute;
  right: 0;
  top: 35px;
  min-width: 320px;
  border-radius: 12px;
  border: solid 2px whitesmoke;
  > .row {
    height: auto;
  }
  img.close-sidebar {
    float: right;
    margin: 30px;
    width: 30px;
  }
  .shopping-list {
    padding: 25px 5px;
    text-align: center;
    display: flex;

    border-bottom: solid 1px whitesmoke;
    .param-sm.tr-gray-three,
    .border-right {
      padding: 5px;
      border-right: solid 1px whitesmoke;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    img {
      border-radius: 16px;
      border: solid 1px white;
    }
  }
  .buy-btn-advance-fund {
    margin: auto;
    border-radius: 7px;
  }
}
</style>
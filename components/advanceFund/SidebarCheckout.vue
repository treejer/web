<template>
  <div class="sidebar-advanceFund" v-show="status">
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
          <span class="param-sm tr-gray-three"> Count: {{ item.count }} </span>

          <span class="param-sm tr-gray-three">
            Price:{{
              parseFloat($web3.utils.fromWei(item.model.price)).toFixed(2)
            }}
            DAI
          </span>

          <span class="param-sm tr-gray-three">
            country:{{ item.model.country }}</span
          >
        </div>
        <div class="col-12 text-center py-2">
          <nuxt-link
            :to="localePath('/forest/advanceFund/checkout')"
            class="btn btn-green param-sm tr-white buy-btn-advance-fund"
          >
            Buy
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
    console.log(self.show, "self.show");
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
    padding: 25px;
    border-bottom: solid 1px whitesmoke;
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
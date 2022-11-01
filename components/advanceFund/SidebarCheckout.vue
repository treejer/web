<template>
  <div class="sidebar-advanceFund" v-show="status">
    <div class="row">
      <div class="position-relative col-12">
        <img
          class="pointer-event close-sidebar"
          src="@/assets/images/sidebar/burger-menu.svg"
          alt="burger-menu"
          @click.prevent="status = !status"
        />
      </div>

      <div
        class="shopping-list card col-12"
        v-for="(item, index) in $store.state.advanceFund.shoppingList"
        :key="index"
      >
          <span class="param-sm tr-gray-three"> Count: {{ item.count }} </span>
          <img
            class="img-fluid"
            width="25"
            :src="icon + item.list.planter.id"
            alt="tree"
          />
          <span class="param-sm tr-gray-three">
            Price:{{
              parseFloat($web3.utils.fromWei(item.list.price)).toFixed(2)
            }}
            DAI
          </span>

          <p class="param-sm tr-gray-three">
            country:
            <span class="">{{ item.list.country }}</span>
          </p>
        </div>
      </div>
      <nuxt-link
        :to="localePath('/forest/advanceFund/checkout')"
        class="btn btn-green param-sm tr-white buy-btn-advance-fund"
        >Buy</nuxt-link
      >
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
    counter(status, list) {
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
          self.$store.dispatch("advanceFund/removeListItem", list);
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
  width: 300px;
  background: #e5e7db;
  min-height: 100vh;
  overflow-y: scroll;
  position: fixed;
  right: 0;
  top: 0;
  border-radius: 25px 0;
  > .row {
    height: auto;
    overflow-y: scroll;
  }
  .shopping-list-card {
    min-height: 200vh;
    position: relative;
    overflow-y: scroll;
  }
  img.close-sidebar {
    float: right;
    margin: 30px;
    width: 30px;
  }
  .shopping-list {
    .d-flex {
      width: 100%;
      padding: 25px 15px;
    }

    img {
      border-radius: 16px;
      border: solid 1px white;
    }
  }
  .buy-btn-advance-fund {
    position: fixed;
    bottom: 50px;
    height: 40px;
    border-radius: 7px;
  }
}
</style>
<template>
  <div class="card-fund" v-if="model">
    <div class="card-img">
      <img
        class="img-fluid"
        :src="$avatarByWallet(model.planter.id)"
        alt="tree"
      />
    </div>
    <div
      :class="activeFund ? 'text-keep' : 'text-break'"
      class="card-content p-2 text-capitalize param tr-gray-two"
      @mouseenter="activeFund = !activeFund"
      @mouseleave="activeFund = false"
    >
      <p>
        Price:
        <span class=""
          >{{
            parseFloat($web3.utils.fromWei(model.price.toString())).toFixed(2) +
            "" +
            ""
          }}
          DAI</span
        >
      </p>
      <p>
        country:
        <span class="">{{ model.country }}</span>
      </p>
      <!-- <p>
        lastFund:
        <span class="">{{
          $moment(model.lastFund * 1000).strftime("%b %d, %Y at %I:%M %p")
        }}</span>
      </p> -->
      <!-- <p>
        lastPlant:
        <span class="">{{  $moment( model.lastPlant * 1000).strftime("%b %d, %Y at %I:%M %p") }}</span>
      </p>
      <p>
        status:
        <span class="">{{ model.status }}</span>
      </p> -->
      <!-- <p>
        start:
        <span class="">{{ $moment( model.start * 1000).strftime("%b %d, %Y at %I:%M %p")  }}</span>
      </p>
      <p>
        lastReservePlant:
        <span class="">{{  $moment(model.lastReservePlant * 1000).strftime("%b %d, %Y at %I:%M %p") }}</span>
      </p>
      <p>
        createdAt:
        <span class="">{{ $moment( model.createdAt * 1000).strftime("%b %d, %Y at %I:%M %p") }}</span>
      </p>
      <p>
        updatedAt:
        <span class="">{{ $moment( model.updatedAt  * 1000).strftime("%b %d, %Y at %I:%M %p") }}</span>
      </p> -->
    </div>
    <div class="card-footer d-flex">
      <div
        :class="
          $store.state.advanceFund.shoppingList.lenght <= 0
            ? 'col-lg-10'
            : 'col-lg-8'
        "
        class="box-left p-0"
        v-show="localShowCount"
      >
        <span
          class="tr-gray-two param-md font-weight-bolder p-1 pointer-event"
          @click.prevent="counter('obb', model)"
          >+</span
        >
        <input
          type="number"
          min="1"
          v-model="localCounts"
          class="tr-gray-two param-md font-weight-bolder"
        />
        <span
          class="tr-gray-two param-md font-weight-bolder p-1 pointer-event"
          @click.prevent="counter('odd', model)"
          >-</span
        >
      </div>
      <div
        :class="
          $store.state.advanceFund.shoppingList.lenght > 0
            ? 'col-lg-2'
            : 'col-lg-4 img-flex'
        "
        class="box-right p-0"
      >
      
        <span
          v-if="change"
          class="tr-green font-weight-bloder param-18 ml-lg-2 pointer-event"
          @click.prevent="setItemsToShopping(model, model.id)"
          >&#10003;</span
        >
        <img
          v-if="!change"
          @click.prevent="setItemsToShopping(model, model.id)"
          src="@/assets/images/advanceFund/shopping.svg"
          alt="shopping"
          width="18"
          height="18"
          class="ml-lg-2 mr-lg-2 pointer-event"
        />
        <img
          v-if="model.addedToshoppingList && !mainPage"
          class="ml-lg-2 mr-lg-2 pointer-event"
          @click.prevent="removeListItems(model)"
          src="@/assets/images/advanceFund/recycle-bin.svg"
          alt="recycle-bin"
          width="18"
          height="18"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    model: {
      type: Object,
      default: {},
    },
    showCount: {
      default: false,
      type: Boolean,
    },
    counts: {
      default: 0,
    },
    change: {
      default: false,
      type: Boolean,
    },
    mainPage: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      activeFund: false,
      localShowCount: this.showCount,
      localCounts: this.counts,
      loading: false,
    };
  },
  loading: false,
  created() {
    let self = this;

    setTimeout(() => {
      let isExist = false;
      let modelOnShppingList = null;
      self.modelItems.map((item, index) => {
        if (item.id === self.model.id) {
          isExist = true;
          modelOnShppingList = item;
        }
      });

      if (isExist) {
        self.localShowCount = true;
        self.localCounts = modelOnShppingList.count;
        self.$forceUpdate();
      }
    }, 2000);
  },
  computed: {
    modelItems() {
      return this.$store.state.advanceFund.shoppingList;
    },
  },

  methods: {
    setItemsToShopping(model, id) {
      let self = this;
      self.loading = true;

      if (self.localCounts <= 0) {
        self.localShowCount = true;
        self.localCounts++;
      } else {
        model.addedToshoppingList = {
          status: true,
          key: id,
        };
        self.$store.dispatch("advanceFund/setListItems", {
          model: model,
          count: self.localCounts,
        });
        this.$nextTick(() => {
          this.$nuxt.$loading.start();
          setTimeout(() => this.$nuxt.$loading.finish(), 1000);
        });

        self.loading = false;
      }
    },

    counter(status, model) {
      let self = this;
      if (status === "obb" && !self.change) {
        self.localCounts++;
      }
      if (status === "odd" && !self.change) {
        if (self.localCounts > 0) {
          self.localCounts--;
        }
        if (self.localCounts <= 0) {
          self.localShowCount = false;
          self.localCounts = 0;
          self.$store.dispatch("advanceFund/removeListItem", model);
        }
      }
      if (status === "obb" && self.change) {
        self.localCounts++;
      }
      if (status === "odd" && self.change) {
        self.localCounts > 0 ? self.localCounts-- : self.localCounts;
      }
    },
    async removeListItems(model) {
      let self = this;

      if (self.$store.state.advanceFund.shoppingList.length > 0) {
        await self.$store.dispatch(
          "advanceFund/removeListItemsShopping",
          model
        );

        if (self.$store.state.advanceFund.shoppingList.length <= 0) {
          await self.$router.push("/forest/advanceFund/");
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.card-fund {
  border: solid 1px #bfbfbf;
  border-radius: 6px;
  filter: drop-shadow(0px 4px 11px rgba(0, 0, 0, 0.161));
  .text-break {
    p {
      white-space: nowrap;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;

      span {
        font-weight: bolder;
        color: #424242;
        padding-left: 5px;
      }
    }
  }
  .text-keep {
    p {
      white-space: nowrap;
      width: auto;

      text-overflow: clip;

      span {
        font-weight: bolder;
        color: #424242;
        padding-left: 5px;
      }
    }
  }
  .card-footer {
    
    display: flex;
    justify-content: space-around;
    .box-left {
      input {
        background: transparent;
        border: none;
        width: 50px;
        text-align: center;
      }
    } 
    .img-flex{
      display: flex;
      img,span{
        display:inline;
        margin:5px 10px 0 0;


      }
    }
    @media (max-width: 768px) {
      .img-flex{
        justify-content:space-between;
      }
      
    }
  }
  .card-footer img:hover {
    transition: 0.3s all ease;
    opacity: 0.6;
  }
}
.card-fund:hover {
  filter: drop-shadow(0px 6px 11px rgba(0, 0, 0, 0.161));
  transition: all 0.2s ease;
}
</style>

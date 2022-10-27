<template>
  <div class="card-fund" v-if="fund">
    <div class="card-img">
      <img class="img-fluid" :src="icon + fund.planter.id" alt="tree" />
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
            parseFloat($web3.utils.fromWei(fund.price.toString())).toFixed(2) +
            "" +
            ""
          }}
          DAI</span
        >
      </p>
      <p>
        country:
        <span class="">{{ fund.country }}</span>
      </p>
      <p>
        lastFund:
        <span class="">{{
          $moment(fund.lastFund * 1000).strftime("%b %d, %Y at %I:%M %p")
        }}</span>
      </p>
      <!-- <p>
        lastPlant:
        <span class="">{{  $moment( fund.lastPlant * 1000).strftime("%b %d, %Y at %I:%M %p") }}</span>
      </p>
      <p>
        status:
        <span class="">{{ fund.status }}</span>
      </p> -->
      <!-- <p>
        start:
        <span class="">{{ $moment( fund.start * 1000).strftime("%b %d, %Y at %I:%M %p")  }}</span>
      </p>
      <p>
        lastReservePlant:
        <span class="">{{  $moment(fund.lastReservePlant * 1000).strftime("%b %d, %Y at %I:%M %p") }}</span>
      </p>
      <p>
        createdAt:
        <span class="">{{ $moment( fund.createdAt * 1000).strftime("%b %d, %Y at %I:%M %p") }}</span>
      </p>
      <p>
        updatedAt:
        <span class="">{{ $moment( fund.updatedAt  * 1000).strftime("%b %d, %Y at %I:%M %p") }}</span>
      </p> -->
    </div>
    <div class="card-footer d-flex">
      <div class="box-left col-lg-10 p-0" v-show="localShowCount">
        <!-- <span class="btn-green pointer-event param-sm " @click="setItemsToShopping()">Add To The Shop</span> -->
        <span
          class="tr-gray-two param-md font-weight-bolder p-2"
          @click.prevent="counter('obb')"
          >+</span
        >
        <input
          type="number"
          min="1"
          v-model="counts"
          class="tr-gray-two param-md font-weight-bolder"
        />
        <span
          class="tr-gray-two param-md font-weight-bolder p-2"
          @click.prevent="counter('odd')"
          >-</span
        >
      </div>
      <div class="box-right col-lg-2 p-0">
        <img
        v-if="!change"
          @click.prevent="setItemsToShopping(fund, fund.id)"
          src="@/assets/images/advanceFund/shopping.svg"
          alt="shopping"
          width="15"
          height="15"
        />
         <img
          v-if="change"
          @click.prevent="$store.dispatch('advanceFund/removeListItem',fund)"
          src="@/assets/images/advanceFund/recycle-bin.svg"
          alt="shopping"
          width="15"
          height="15"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    fund: {
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
  },
  data() {
    return {
      icon: process.env.gravatar,
      activeFund: false,
      listItems: [],
      localShowCount: this.showCount,
    };
  },
  created() {
  },
  methods: {
    setItemsToShopping(list, id) {
      let self = this;
      if (self.counts <= 0) {
        self.localShowCount = true;
        self.counts++;
      } else {
        self.$store.dispatch("advanceFund/setListItems", {
          list: list,
          count: self.counts,
        });
      }
    
      
    },
  
    counter(status) {
      let self = this;
      if (status === "obb") {
        self.counts++;
      }
      if (status === "odd") {
        self.counts > 0 ? self.counts-- : self.counts;
      }
    
    },

 
  },
};
</script>

<style lang="scss" scoped>
.card-fund {
  border: solid 1px #bfbfbf;
  border-radius: 6px;
  box-shadow: 0px -2px 7px rgba(97, 97, 97, 0.25);
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
  }
  .card-footer img:hover {
    transition: 0.3s all ease;
    opacity: 0.6;
  }
}
.card-fund:hover {
  box-shadow: 0px -2px 7px rgba(0, 0, 0, 0.25);
  transition: all 0.2s ease;
}
</style>

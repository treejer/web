<template>
  <div class="card-fund" v-if="fund" >
    <div class="card-img">
      <img class="img-fluid" :src="icon + fund.id" alt="tree" />
    </div>
    <div
      :class="activeFund ? 'text-keep' : 'text-break'"
      class="card-content p-2 text-capitalize param tr-gray-two"
      @mouseenter="activeFund = !activeFund"
      @mouseleave="activeFund = false"
    >
      <p>
        Price:
        <span class="">{{ fund.price }}</span>
      </p>
      <p>
        country:
        <span class="">{{ fund.country }}</span>
      </p>
      <p>
        lastFund:
        <span class="">{{ fund.lastFund }}</span>
      </p>
      <p>
        lastPlant:
        <span class="">{{ fund.lastPlant }}</span>
      </p>
      <p>
        status:
        <span class="">{{ fund.status }}</span>
      </p>
      <p>
        start:
        <span class="">{{ fund.start }}</span>
      </p>
      <p>
        lastReservePlant:
        <span class="">{{ fund.lastReservePlant }}</span>
      </p>
      <p>
        createdAt:
        <span class="">{{ fund.createdAt }}</span>
      </p>
      <p>
        updatedAt:
        <span class="">{{ fund.updatedAt }}</span>
      </p>
    </div>
    <div class="card-footer">
      <img src="@/assets/images/advanceFund/shopping.svg" alt="shopping" width="15" height="15" >

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
  },
  data() {
    return {
      icon: process.env.gravatar,
      activeFund: false,
    };
  },
  methods: {
   
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
  .card-footer{
    display: flex;
    justify-content: space-around;
  }
  .card-footer:hover{
    transition: .3s all ease;
    background: #bfbfbf;
  }
}
.card-fund:hover {
  box-shadow: 0px -2px 7px rgba(0, 0, 0, 0.25);
  transition: all 0.2s ease;
}
</style>
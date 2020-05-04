<template>
  <section class="position-relative pt-5 col-12 col-lg-10 spend-page mb-5 pb-5">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <h1 class="param-lg tr-gray-two mb-3">Use O1 to redeem coupons</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-12 all-icon">
          <div class="box mt-3 m-2 pointer-event"
               :class="{ 'active': activeIndex === index }"
               @click="activeMenu(item, index)"

               v-for="(item, index) in menus"
               :key="index">
            <Fas i="plane-departure"/>
          </div>
        </div>
      </div>
      <div class="card">


      </div>
    </div>
  </section>
</template>

<script>
  import Fab from "@/components/font-awsome/Fab";
  import Fas from "@/components/font-awsome/Fas";
  // import SliderSpend from "../../components/spend/SliderSpend";

  export default {
    name: "giftTree",
    layout: 'dashboard',

    components: {
      Fab, Fas
    },

    data() {
      return {
        sendAsTreeCard: false,
        menus: [
          {name: "My Forest", icon: "tree", href: "/myForest"},
          {name: "Updates", icon: "bell", href: "/updates"},
          {name: "Leaderboard", icon: "trophy", href: "/leaderboard"},
          {name: "Help", icon: "life-ring", href: "/Help"},
          {name: "spend", icon: "life-ring", href: "/spend"},
          {name: "spend", icon: "life-ring", href: "/spend"},
          {name: "spend", icon: "life-ring", href: "/spend"},
          {name: "spend", icon: "life-ring", href: "/spend"},
          {name: "spend", icon: "life-ring", href: "/spend"},
        ],
        steps: [
          {name: "Collect", step: 1},
          {name: "Connect to wallet", step: 2},
          {name: "Checkout", step: 3},

          // { name: "final-step", step: 4 }
        ],
        counts: [
          {name: 1, step: 1},
          {name: 5, step: 2},
          {name: 10, step: 3},
          {name: 20, step: 3},
          {name: this.countTree, step: 3, placeHolder: "Enter Number"}
        ],
        payMethods: [
          {name: "visa", icon: "cc-visa", step: 1},
          {name: "bitcoin", icon: "ethereum", step: 2},
          {name: "stripe", icon: "cc-stripe", step: 3}
        ],
        wallets: [
          {name: "Metamask", step: 1},
          {name: "Wallet Connect", step: 2},
          {name: "Trezor", step: 3},
          {name: "Ledger Nano", step: 4},
          {name: "Coinbase Wallet", step: 5}
        ],
        activeIndex: 0,
        activeCount: 0,
        activePay: 0,
        activeWallet: 0,
        countTree: null
      };
    },
    methods: {
      activeMenu(item, index) {
        this.activeIndex = index;
      },
      activeCounts(item, index) {
        this.activeCount = index;
      },
      activePays(item, index) {
        this.activePay = index;
      },
      activeWallets(item, index) {
        this.activeWallet = index;
      },
    }
  };
</script>

<style lang="scss" scoped>
  .spend-page {
    .all-icon {
      align-items: center;
      align-self: center;
      display: flex;

      .box {
        width: 56px;
        height: 56px;
        align-items: center;
        align-self: center;
        display: flex;
        justify-content: center;
        background: #FAFAFA;
        border-radius: 6px;
        box-shadow: 0px 4px 11px rgba(0, 0, 0, 0.161);

      }
      .active {
        width: 76px;
        height: 76px;
        transition: ease .5s;
      }
    }

  }
</style>

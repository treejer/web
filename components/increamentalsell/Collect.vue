<template>
  <div class="inc-collect collect row justify-content-center">
    <div class="col-md-2 col-4 text-left">
      <p class="param-xl tr-gray-two mb-0 font-weight-bolder">Tree #101</p>
      <p class="tr-gray-four param mb-0">Start Price</p>
      <p class="title-sm tr-green font-weight-bolder mb-0">Ξ0.033</p>

    </div>
    <div class="col-md-8 col-4 banner-inc p-md-0 text-center">
      <img alt="banner" class="m-auto" src="../../assets/images/increamentalSell/banner.svg"
           @click="$route.push('/increamentalSell/')">
    </div>
    <div class="col-md-2 col-4 text-right">
      <p class="param-xl tr-gray-two mb-0 font-weight-bolder">Tree #10,000</p>
      <p class="tr-gray-four param mb-0">End Price</p>
      <p class="title-sm tr-green font-weight-bolder mb-0">Ξ0.33</p>
    </div>
    <div class="col-md-12 text-center mt-3"><p class="param-xl font-weight-bolder tr-gray-two text-capitalize">tree
      #{{ $route.params.id }}</p></div>
    <div class="col-md-12 d-md-flex  current-price-inc text-center justify-content-center  mt-3"><p
        class="param tr-gray-four text-capitalize  ">Current Price: {{ ' Ξ0.036' }}</p></div>
    <div class="col-md-12 d-md-flex  claim-me-inc text-center justify-content-center  mt-3">
      <button class="btn-green  param-18" @click.prevent="$router.push('/genesis/checkout')">Claim Me</button>
    </div>
    <div class="col-md-8 col-12 genesis-collection-inc">
      <h1 class="title-lg tr-gray-two font-weight-bolder text-center"> Genesis Collection</h1>
      <p class="param font-weight-bolder tr-gray-two mt-4 text-center">
        “In the beginning we said, let there be a Tree of Life: and there was Life. And we saw the tree, it was
        good; and we created another 10,000. And we saw the trees, and they were good; and we decided to keep the
        them all unique, forever.”
      </p>
      <p class="param font-weight-bold tr-gray-two text-center pt-2"> Genesis collection refers to the first 10,000
        trees being
        planted via Treejer Protocol. The collection helps
        the project thrive after a recent token-free investment by UNICEF Innovation Fund. Genesis trees will be
        planted in 10 countries in Latin America, Africa and Middle East. Learn more about these trees on our
        documentation website.</p>

    </div>
    <div class="col-md-8 col-12 getting-started-inc">
      <div class="row">
        <div class="col-md-6">
          <p class="param-18 tr-gray-two font-weight-bolder">Getting Started with Genesis Trees</p>
          <p class="mb-1"><span
              class="btn-green text-white param-xs pointer-event text-capitalize">step 1</span><span
              class="tr-gray-three param font-weight-bold">Tree #0-10 listed for auction</span>
          </p>
          <p class="mb-1"><span
              class="btn-green text-white param-xs pointer-event text-capitalize">step 2</span><span
              class="tr-gray-three param font-weight-bold">Tree #11-100 reserved for community</span>
          </p>
          <p class="mb-1"><span
              class="btn-green text-white param-xs pointer-event text-capitalize">step 3</span><span
              class="tr-gray-three param font-weight-bold">Tree #101-10k claimable for collectors</span>
          </p>
        </div>
        <div class="col-md-6 tree-status-inc">
          <div class="row justify-content-between">
            <div class="col-4">
              <img alt="trees-state" class="" src="../../assets/images/increamentalSell/trees-state.svg">
              <p class="param-xs tr-gray-two">Claimable</p>

            </div>
            <div class="col-4"><img alt="trees-state" class=""
                                    src="../../assets/images/increamentalSell/trees-state.svg"
                                    style="filter: hue-rotate(180deg)">
              <p class="param-xs tr-gray-two">On Auction</p>

            </div>
            <div class="col-4"><img alt="trees-state" class=""
                                    src="../../assets/images/increamentalSell/trees-state.svg"
                                    style="filter: grayscale(100%)">
              <p class="param-xs tr-gray-two">Claimed</p>
            </div>
          </div>

        </div>
      </div>
    </div>
    <OtherTreeInc :text="'Tree of Life'"/>
    <div class="col-md-12 d-md-flex  current-price-inc text-center justify-content-center  mt-3"><p
        class="param tr-gray-four text-capitalize  ">Reserve Price: {{ 'Ξ100' }}</p></div>
    <div class="col-md-8 col-12 justify-content-center text-center pointer-event" @click="$router.push('/tree/0')">
      <img alt="" src="../../assets/images/increamentalSell/trees-state.svg">
      <p class=" param-xs tr-gray-tree">Tree #0</p>
    </div>
    <OtherTreeInc :text="'#1-10'"/>
    <div class="col-md-12 current-price-inc text-center justify-content-center  mt-3"><p
        class="param tr-gray-four text-capitalize m-auto  ">Reserve Price: {{ 'Ξ10' }}</p></div>
    <div class="col-md-9 col-12 justify-content-center text-center">
      <div v-for="(item,index) in auctions" :key="index" class="box-inc-trees d-inline-block pointer-event"
           @click="$router.push({path:`/tree/${1 + index }` , params:{id:1 + index} })">
            <span>
              <img v-if="index === 4 || index === 7 || index === 10" alt="trees-state" class="filter-hue"
                   src="../../assets/images/increamentalSell/trees-state.svg">
            <img v-else-if="index === 6 " alt="trees-state" class="filter-balckandwhite"
                 src="../../assets/images/increamentalSell/trees-state.svg">
            <img v-else alt="trees-state" src="../../assets/images/increamentalSell/trees-state.svg">
            </span>

        <p class=" param-xs tr-gray-tree">Tree #{{ 1 + index }}</p>
      </div>


    </div>
    <OtherTreeInc :text="'#11-100 '"/>
    <div class="col-md-9 col-12  current-price-inc text-center justify-content-center  mt-3"><p
        class="param tr-gray-four text-capitalize m-auto  ">Claim for Free</p>
      <p class="param tr-gray-two des-inc">What we’ve built today was not possible without the generousity of other
        builders,
        designers, community advocates and thought leaders in this space. We’d love to plant the very first trees for
        them. If you’re one of the people on this list, you can claim one of these unique trees. Thank you for being a
        part of this community! All unclaimed trees will be sent to Treejer’s treasury after 30 days.</p>
    </div>
    <div class="col-md-9 col-12 justify-content-center text-center">

      <div v-for="(item,index) in honoraryTrees" :key="index" class="box-inc-trees d-inline-block  pointer-event"
           @click="$router.push(`/tree/${$hex2Dec(item.id) }`)">
            <span>

              <img v-if="item.claimed" alt="tree-status"
                    src="../../assets/images/increamentalSell/trees-state.svg">

              <img v-else alt="tree-status"
                 class="filter-balckandwhite" src="../../assets/images/increamentalSell/trees-state.svg">


               <!-- <img v-if="index === 17 || index === 25 || index === 16" alt="tree-status" class="filter-hue"
                    src="../../assets/images/increamentalSell/trees-state.svg">
              <img v-else-if="index === 19  || index === 80 || index === 81" alt="tree-status"
                 class="filter-balckandwhite"
                 src="../../assets/images/increamentalSell/trees-state.svg">
              <img v-else alt="tree-status" src="../../assets/images/increamentalSell/trees-state.svg"> -->
            </span>

        <p class=" param-xs tr-gray-tree">Tree #{{ $hex2Dec(item.id) }}</p>
      </div>
    </div>
    <div class="col-md-9 col-12 inc-text text-center ">
      <h1 class="title-lg tr-gray-two "> Not interested in GENESIS Trees?</h1>
      <p class="param tr-gray-two">
        You can always fund regular trees in Treejer protocol. The regular trees initially have a universal price of $4
        (DAI). Similar to Genesis Trees, regular ones are dynamic NFTs too. However, Genesis collection owns the more
        unique attributes (digitally). Millions of trees are going to be planted and maintaned using Treejer protocol
        and the community will never forget who funded the first trees.
      </p>
    </div>
  </div>
</template>

<script>
import OtherTreeInc from "../../components/OtherTreeInc";
import honoraryTrees from "~/apollo/queries/honoraryTrees";

export default {
  name: "Collect",
  components: {OtherTreeInc},
  data() {
    return {
      auctions: [],
    }
  },
  apollo: {
    honoraryTrees: {
      prefetch: true,
      query: honoraryTrees,
    }
  },
  created() {
    this.pushToTrees()
  },
  methods: {
    pushToTrees() {
      let i
      for (i = 0; i < 10; i++) {
        this.auctions.push({i})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.inc-collect {
  margin-top: 100px;

  .collect {
    margin-top: 100px;
  }

  .col-md-8.banner-inc {
    position: relative;

    img {
      z-index: +999;

    }

    @media (min-width: 1270px) {
      &::after {
        position: absolute;
        content: '';
        border: dashed green 2px;
        width: 290px;
        right: -30px;
        top: 99px;
        z-index: 0;
      }


      &::before, {
        position: absolute;
        content: '';
        border: dashed green 2px;
        width: 320px;
        left: -60px;
        top: 99px;
        z-index: 0;


      }
    }


  }

  .col-md-2 {
    margin-top: 57px;
    z-index: +999;
    position: relative;


  }

  .current-price-inc {
    p.text-capitalize {
      background: #E5E7DB;
      border-radius: 16px;
      padding: 7px 6px;
      width: 213px;
    }

    .des-inc {
      margin-top: 32px;
    }
  }

  .claim-me-inc {
    button {
      padding: 10px 50px;
    }
  }

  .genesis-collection-inc {
    margin-top: 64px;
  }

  .getting-started-inc {
    margin-top: 52px;
    margin-bottom: 30px;
    background: rgba(240, 228, 198, 0.5);
    border-radius: 12px;
    padding: 22px 48px;

    .param-xs {
      font-size: 10px;
      padding: 2px 4px;
      margin-right: 22px;
    }

    .tree-status-inc {
      margin-top: 46px;
    }

  }

  .box-inc-trees {
    padding: 24px 30px 24px 0;
  }

  .inc-text {
    margin-top: 80px;

    p {
      margin-top: 24px;
    }
  }
}

@media (max-width: 768px) {
  .inc-collect {
    margin-top: 50px;

    .banner-inc {
      margin-top: 35px;
      padding: 0;

      img {
        width: 100px;
      }
    }

    .current-price-inc p.text-capitalize {
      margin: auto;
    }

    .getting-started-inc[data-v-f4f8c9fe] {
      margin-top: 15px;
      padding: 15px;
    }
  }

}
</style>

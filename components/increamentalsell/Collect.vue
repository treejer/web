<template>
  <div class="inc-collect collect row justify-content-center">
    <div class="col-md-2 col-4 text-left">
      <p class="param-xl tr-gray-two mb-0 font-weight-bolder">Tree #101</p>
      <p class="tr-gray-four param mb-0">Start Price</p>
      <p class="title-sm tr-green font-weight-bolder mb-0">Ξ0.03</p>
    </div>
    <div class="col-md-8 col-4 banner-inc p-md-0 text-center">
      <img
        alt="banner"
        class="m-auto"
        src="../../assets/images/increamentalSell/banner.svg"
        @click="$route.push('/increamentalSell/')"
      />
    </div>
    <div class="col-md-2 col-4 text-right">
      <p class="param-xl tr-gray-two mb-0 font-weight-bolder">Tree #10,000</p>
      <p class="tr-gray-four param mb-0">End Price</p>
      <p class="title-sm tr-green font-weight-bolder mb-0">Ξ0.3</p>
    </div>
    <div class="col-md-12 text-center mt-3">
      <p class="param-xl font-weight-bolder tr-gray-two text-capitalize">
        tree #{{ currenPrice ? parseInt($store.state.incrementalSale.lastSold) + 1 : 101 }}
      </p>
    </div>
    <div
      class="
        col-md-12
        d-md-flex
        current-price-inc
        text-center
        justify-content-center
        mt-3
      "
    >
      <p class="param tr-gray-four text-capitalize">
        Ξ{{ currenPrice ? parseFloat(currenPrice).toFixed(2) : 0.03 }}
      </p>
    </div>
    <div
      class="
        col-md-12
        d-md-flex
        claim-me-inc
        text-center
        justify-content-center
        mt-3
      "
    >
      <button class="btn-green param-18" @click="goToCheckout()" >
        {{ currenPrice > 0 ? "Mint" :  "Mint on Jan 20th" }}
      </button>


      
    </div>
    <div class="col-md-8 col-12 genesis-collection-inc">
      <h1 class="title-lg tr-gray-two font-weight-bolder text-center">
        Genesis Collection
      </h1>
      <p class="param font-weight-bolder tr-gray-two mt-4 text-center">
        “In the beginning we said, let there be a Tree of Life: and there was
        Life. And we saw the tree, it was good; and we created another 10,000.
        And we saw the trees, and they were good; and we decided to keep the
        them all unique, forever.”
      </p>
      <p class="param font-weight-bold tr-gray-two text-center pt-2">
        Genesis collection refers to the first 10,000 trees being planted via
        Treejer Protocol. The collection helps the project thrive after a recent
        token-free investment by UNICEF Innovation Fund. Genesis trees will be
        planted in 10 countries in Latin America, Africa and Middle East. Learn
        more about these trees on our documentation website.
      </p>
    </div>
    <div class="col-md-8 col-12 getting-started-inc">
      <div class="row">
        <div class="col-md-6">
          <p class="param-18 tr-gray-two font-weight-bolder">
            Getting Started with Genesis Trees
          </p>
          <p class="mb-1">
            <span
              class="
                btn-green
                text-white
                param-xs
                pointer-event
                text-capitalize
              "
              >step 1</span
            ><span class="tr-gray-three param font-weight-bold"
              >Tree #0-10 listed for auction</span
            >
          </p>
          <p class="mb-1">
            <span
              class="
                btn-green
                text-white
                param-xs
                pointer-event
                text-capitalize
              "
              >step 2</span
            ><span class="tr-gray-three param font-weight-bold"
              >Tree #11-100 reserved for community</span
            >
          </p>
          <p class="mb-1">
            <span
              class="
                btn-green
                text-white
                param-xs
                pointer-event
                text-capitalize
              "
              >step 3</span
            ><span class="tr-gray-three param font-weight-bold"
              >Tree #101-10k claimable for collectors</span
            >
          </p>
        </div>
        <div class="col-md-6 tree-status-inc">
          <div class="row justify-content-between">
            <div class="col-4">
              <img
                alt="trees-state"
                class=""
                src="../../assets/images/increamentalSell/trees-state.svg"
              />
              <p class="param-xs tr-gray-two">Claimable</p>
            </div>
            <div class="col-4">
              <img
                alt="trees-state"
                class=""
                src="../../assets/images/increamentalSell/trees-state.svg"
                style="filter: hue-rotate(180deg)"
              />
              <p class="param-xs tr-gray-two">On Auction</p>
            </div>
            <div class="col-4">
              <img
                alt="trees-state"
                class=""
                src="../../assets/images/increamentalSell/trees-state.svg"
                style="filter: grayscale(100%)"
              />
              <p class="param-xs tr-gray-two">Claimed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <OtherTreeInc :text="'Tree of Life'" />
    <div v-if="tree0Auction"
      class="
        col-md-12
        d-md-flex
        current-price-inc
        text-center
        justify-content-center
        mt-3
      "
    >
      <p class="param tr-gray-four text-capitalize">
        Reserve Price: Ξ{{ parseFloat(tree0ReservePrice).toFixed(2) }}
      </p>
    </div>
    <a id="auctions"></a>
    <div v-if="tree0Auction && tree0Auction.auctions"
      class="col-md-8 col-12 justify-content-center text-center pointer-event"
      @click="$router.push('/tree/0')"
    >
      <img alt="tree0"
      :class="(tree0Auction.auctions[0].isActive && tree0Auction.auctions[0].endDate * 1000 > new Date().getTime()) ? 'filter-hue' :  'filter-balckandwhite' "
      src="../../assets/images/increamentalSell/trees-state.svg" />
      <p class="param-xs tr-gray-tree">Tree #0</p>
    </div>
    <OtherTreeInc :text="'#1-10'" />
    <div
    v-if="treesAuction.length > 0"
      class="
        col-md-12
        current-price-inc
        text-center
        justify-content-center
        mt-3
      "
    >
      <p class="param tr-gray-four text-capitalize m-auto">
        Reserve Price: Ξ{{ parseFloat(treesAuctionReservePrice).toFixed(2) }}

      </p>
    </div>
    <div class="col-md-9 col-12 justify-content-center text-center">
      <div
        v-for="(tree, index) in treesAuction"
        :key="index"
        class="box-inc-trees d-inline-block pointer-event"
        @click="$router.push(`/tree/${$hex2Dec(tree.id)}`)"
      >
      
        <span v-if="tree.auctions.length === 0">
          <img
            :alt="`tree-${$hex2Dec(tree.id)}`"
            class="filter-balckandwhite"
            src="../../assets/images/increamentalSell/trees-state.svg"
          />
        </span>

        <span v-else>
          <img
            :alt="`tree-${$hex2Dec(tree.id)}`"
            :class="(tree.auctions[0].isActive && tree.auctions[0].endDate * 1000 > new Date().getTime()) ? 'filter-hue' :  'filter-balckandwhite' "
            src="../../assets/images/increamentalSell/trees-state.svg"
          />
        </span>

        <p class="param-xs tr-gray-tree">Tree #{{ $hex2Dec(tree.id) }}</p>
      </div>
    </div>
    <OtherTreeInc :text="'#11-100 '" />
    <a id="honorary"></a>
    <div
      class="
        col-md-9 col-12
        current-price-inc
        text-center
        justify-content-center
        mt-3
      "
    >
      <p class="param tr-gray-four text-capitalize m-auto">Claim for Free</p>
      <p class="param tr-gray-two des-inc">
        What we’ve built today was not possible without the generousity of other
        builders, designers, community advocates and thought leaders in this
        space. We’d love to plant the very first trees for them. If you’re one
        of the people on this list, you can claim one of these unique trees.
        Thank you for being a part of this community! All unclaimed trees will
        be sent to Treejer’s treasury after 30 days.
      </p>
    </div>
    
    <div class="col-md-9 col-12 justify-content-center text-center">
      <div
        v-for="(item, index) in honoraryTrees"
        :key="index"
        class="box-inc-trees d-inline-block pointer-event"
        @click="$router.push(`/tree/${$hex2Dec(item.id)}`)"
      >
        <span>
          <img
            :alt="`tree-${$hex2Dec(item.id)}`"
            :class="item.claimed ? 'filter-balckandwhite' : null  "
            src="../../assets/images/increamentalSell/trees-state.svg"
          />
        </span>

        <p class="param-xs tr-gray-tree">Tree #{{ $hex2Dec(item.id) }}</p>
      </div>
      <div
        class="
          col-md-12
          d-md-flex
          claim-me-inc
          text-center
          justify-content-center
          mt-3
        "
      >
        <button
          :class="{ disable: loadingHonoraryTree }"
          class="btn-green param-18"
          @click="claimHonanraryTree()"
        >
          <BSpinner v-if="loadingHonoraryTree" class="mr-2" small type="grow"
            >loading
          </BSpinner>
          {{ loadingHonoraryTree ? "Claiming" : " Claim Honorary Tree" }}
        </button>
      </div>
    </div>
    <div class="col-md-9 col-12 inc-text text-center">
      <h1 class="title-lg tr-gray-two">Not interested in GENESIS Trees?</h1>
      <p class="param tr-gray-two">
        You can always fund regular trees in Treejer protocol. The regular trees
        initially have a universal price of $4 (DAI). Similar to Genesis Trees,
        regular ones are dynamic NFTs too. However, Genesis collection owns the
        more unique attributes (digitally). Millions of trees are going to be
        planted and maintaned using Treejer protocol and the community will
        never forget who funded the first trees.
      </p>
    </div>
  </div>
</template>

<script>
import OtherTreeInc from "../../components/OtherTreeInc";
import honoraryTrees from "~/apollo/queries/honoraryTrees";
import treesWithAuctionQuery from "~/apollo/queries/treesWithAuction";

export default {
  name: "Collect",
  components: { OtherTreeInc },
  data() {
    return {
      loadingHonoraryTree: false,
      currenPrice: 0,
      incSaleData: {
         startTreeId: 0,
         endTreeId: 0,
         initialPrice: 0,
         increments: 0,
         priceJump: 0
      },
      lastTreePrice: 0,
      startTreePrice: 0,
      tree0Auction: null,
      tree0ReservePrice: 0,
      treesAuction: [],
      treesAuctionReservePrice: 0,
    };
  },
  apollo: {
    honoraryTrees: {
      prefetch: true,
      query: honoraryTrees,
    },
    treesWithAuction: {
      prefetch: true,
      query: treesWithAuctionQuery,
      variables() {
        return { 
          idsIn: [
            this.$dec2hex(0),
            this.$dec2hex(1), this.$dec2hex(2), this.$dec2hex(3), this.$dec2hex(4), this.$dec2hex(5),
            this.$dec2hex(6), this.$dec2hex(7), this.$dec2hex(8), this.$dec2hex(9), this.$dec2hex(10)
          ],
          first: 11,
          skip: 0,
          orderBy: "id",
          orderDirection: "asc"
         };
      },
      update: data => data.trees

    }
  },
  created() {
    this.calcCurrentPrice();
  },
  watch: {
    treesWithAuction() {
      if(this.treesWithAuction.length === 0) {
        return;
      }

      // this.treesAuction = this.treesWithAuction.slice(1)
      this.treesAuction = this.treesWithAuction
      this.treesAuctionReservePrice = this.$web3.utils.fromWei(this.treesAuction[0].auctions[0].initialPrice.toString())

      // this.tree0Auction = this.treesWithAuction[0];
      // this.tree0ReservePrice = this.$web3.utils.fromWei(this.tree0Auction.auctions[0].initialPrice.toString())
    }
  },
  methods: {
    async goToCheckout() {
      if(this.currenPrice > 0) {
        this.$router.push("/genesis/checkout");
      } else {
        this.$bvToast.toast(["Mint on Jan 20th, Check auctions now!"], {
          toaster: "b-toaster-bottom-left",
          title: "Not started",
          variant: "danger",
          href: `/genesis#auctions`,
          noAutoHide: true,
        });

        document.querySelector('#auctions').scrollIntoView({behavior: 'smooth'});
      }

    },
    async calcCurrentPrice() {
      
      this.currenPrice = await this.$store.dispatch(
        "incrementalSale/calculateTotalPrice",
        {
          count: 1,
          context: this,
        }
      );

      this.incSaleData = this.$store.state.incrementalSale.incSaleData;

      this.startTreePrice = this.$web3.utils.fromWei(this.incSaleData.initialPrice.toString());

      this.lastTreePrice = this.$web3.utils.fromWei(
        (
          parseInt(this.incSaleData.initialPrice) + 

          parseInt( ( parseInt(this.incSaleData.endTreeId) - parseInt(this.incSaleData.startTreeId) ) / parseInt(this.incSaleData.increments) )
               * parseInt(this.incSaleData.priceJump) * parseInt(this.incSaleData.initialPrice) / 10000
        ).toString()

      );

    },
    async claimHonanraryTree() {
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
        this.loadingHonoraryTree = true;

        await self.$axios
          .$post(process.env.graphqlUrl, {
            query: `{
                    honoraryTreeRecipient(id: "${self.$cookies.get("account").toLowerCase()}")
                      {
                          id
                          expiryDate
                          startDate
                          status
                          claimedFailed
                          createdAt
                          updatedAt
                      }
                  }`,
            prefetch: false,
          })
          .then(async (honoraryTreeRecipient) => {
            let honoraryTreeRecipientData =
              honoraryTreeRecipient.data.honoraryTreeRecipient;
            if (honoraryTreeRecipientData === null) {
              self.$bvToast.toast("You are not in recipients", {
                title: "Error",
                toaster: "b-toaster-bottom-left",
                solid: true,
                headerClass: "hide",
                variant: "danger",
              });
            } else {
              let now = parseInt(Date.now() / 1000);
              if (honoraryTreeRecipientData.status === "1") {
                self.$bvToast.toast("Already claimed!", {
                  title: "Error",
                  toaster: "b-toaster-bottom-left",
                  solid: true,
                  headerClass: "hide",
                  variant: "danger",
                });
              } else if (honoraryTreeRecipientData.expiryDate < now) {
                self.$bvToast.toast("Expired!", {
                  title: "Error",
                  toaster: "b-toaster-bottom-left",
                  solid: true,
                  headerClass: "hide",
                  variant: "danger",
                });
              } else if (honoraryTreeRecipientData.startDate > now) {
                self.$bvToast.toast("Not started!", {
                  title: "Error",
                  toaster: "b-toaster-bottom-left",
                  solid: true,
                  headerClass: "hide",
                  variant: "danger",
                });
              } else {
                let receipt = await this.$store.dispatch("HonoraryTree/claim", {
                  context: this,
                });
                if (receipt !== null) {
                  self.$bvToast.toast(["Honorary Tree claim was successful"], {
                    toaster: "b-toaster-bottom-left",
                    title: "Tree added to your forest",
                    variant: "success",
                    href: `${process.env.etherScanUrl}/tx/${receipt.transactionHash}`,
                  });
                }
              }
            }
            this.loadingHonoraryTree = false;
          });
      }
    },
  },
};
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
        content: "";
        border: dashed green 2px;
        width: 290px;
        right: -30px;
        top: 99px;
        z-index: 0;
      }

      &::before {
        position: absolute;
        content: "";
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
      background: #e5e7db;
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

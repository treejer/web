<template>
  <div class="history-cards mb-3 ">
    <div class="row w-100 align-items-center">
      <div class="col-md-2 col-3 avatart-card">
        <!-- <img :src="history.from" alt="avatar" /> -->
        <img :src="$avatarByWallet(history.from)" alt="avatar" />
      </div>
      <div class="col-md-7 col-6 des-card text-left">
        <p class="mb-0">
          <span class="param tr-gray-two font-weight-bold" v-if="text">
            {{ text }}</span>
          <span v-coin class="param tr-green">{{ history.from }}</span>
        </p>
        <p class="mb-0">
          <span class="param tr-gray-four font-weight-bold">{{ $moment(history.createdAt * 1000).strftime("%b %d, %Y at %I:%M %p") }} </span>
        </p>
      </div>
      <div class="col-md-3 col-3 price-card" v-if="history.value > 0">
        <p class="mb-0">
          <span class="param tr-gray-two font-weight-bold">{{ (currency == 'WETH' ? parseFloat(humanValue).toFixed(3) : parseFloat(humanValue).toFixed(2)) + ' ' + currency }}</span>
        </p>
        <p class="mb-0"> 
          <span class="param tr-gray-four font-weight-bold">${{ currency == 'WETH' ? parseFloat(humanValue * ethPrice).toFixed(2) : parseFloat(humanValue * daiPrice).toFixed(2)  }}</span>
        </p>
      </div>
      <div class="col-md-3 col-3 price-card btn-see-div pr-0">      
        <a :href="`${explorerUrl}/tx/${history.transactionHash}`" target="_blank"  class="btn btn-see tr-white param-18 font-weight-bolder">
          See
        </a>
      </div>

      
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      explorerUrl: process.env.etherScanUrl,
      text: null,
      currency: 'WETH',
      humanValue: 0,
      link: true,
    };
  },
  computed:{

  },

  props: {
    history: {
      type: Object
    },
    daiPrice: {
      type: Number,
      default: 1
    }
  },

  methods: {
    setText() {
      switch (this.history.event) {
        case 'AuctionCreated':
          this.text = 'Auction created'
          this.currency = 'WETH'
          break;
        case 'HighestBidIncreased':
          this.text = 'Bid placed by'
                    this.currency = 'WETH'

          break;
        case 'AuctionSettled':
          this.text = 'Auction settled'
                    this.currency = 'WETH'

          break;
        case 'AuctionEnded':
          this.text = 'Auction ended'
          break;

        case 'IncrementalListed':
          this.text = 'Listed for incremental sale'
          break;
        case 'IncrementalSaleTreeFunded':
          this.text = 'Funded in incremental sale'
          break;
        case 'RegularMint':
          this.text = 'Funded in regular sale'
                    this.currency = 'DAI'

          break;

        case 'TreeListed':
          this.text = 'Tree listed'
          break;
        case 'TreeAssigned':
          this.text = 'Tree assigned to planter'
          break;
        case 'AssignedTreePlanted':
          this.text = 'Assigned tree planted'
          break;
        case 'AssignedTreeVerified':
          this.text = 'Assigned tree verified'
          break;
        case 'AssignedTreeRejected':
          this.text = 'Assigned tree rejected'
          break;
        case 'TreeVerified':
          this.text = 'Tree verified'
          break;
        case 'TreeUpdated':
          this.text = 'Tree updated'
          break;
        case 'TreeUpdatedVerified':
          this.text = 'Tree update verified'
          break;
        case 'TreeUpdateRejected':
          this.text = 'Tree update rejected'
          break;
        case 'TreeSpecsUpdated':
          this.text = 'Tree specs updated'
          break;

        case 'HonoraryTreeRangeSet':
          this.text = 'Tree added to honorary trees'
          break;
        case 'HonoraryClaimed':
          this.text = 'Claimed from honorary trees'
          break;

        default:
          this.text = this.history.event
          break;  
      }
    },
    goTolink(id) {
      this.$router.push(id);
    },
  },
  async mounted() {
    // await this.$store.dispatch('setEthPrice')

    this.setText();
    if(this.history.value > 0) {
      this.humanValue = this.$web3.utils.fromWei(this.history.value)
    }
  },
  computed: {
    ethPrice() {
        return this.$store.state.ethPrice 
    }
  }
};
</script>

<style lang="scss">
.history-cards {
  background: #fafafa;
  box-shadow: 2px 6px 36px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  min-height: 80px;
  display: flex;
  justify-content: center;
  .btn-see {
    background: #757575;
    border-radius: 0px 12px 12px 0px;
    color: white;
    border: none;
    height: 80px;
    width: 100%;
    display: flex;
    justify-content: center; /* align horizontal */
    align-items: center; /* align vertical */


  }
  img {
    width: 40px;
    height: 40px;
    border: solid 1px lightgray;
    border-radius: 16px;
  }

  .des-card {
    position: relative;
  }
  
  .btn-see-div {
    display: none;
    
    position: absolute;
    z-index: 1;
    right: 15px;

    vertical-align: middle;

    
  }
    
  :hover .btn-see-div {
    display: block;
  }

}


@media (min-width: 100px) and (max-width: 425px) {
  .history-cards {
  }
}
</style>
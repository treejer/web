import {BToast} from 'bootstrap-vue'

export const state = () => ({
  auction: null,
  planterCount: null,
  planter: null,
  tree: null,
  auctions:null
})


export const actions = {
  async bid(context,params) {
    let self = this;

    let account = this.$cookies.get('account');
    let referrer = this.$cookies.get('referrer');
    if(!referrer || referrer === account) {
      referrer = process.env.zeroAddress;
    }

    const tx = this.$Auction.methods.bid(params.auctionId, this.$web3.utils.toWei(params.bidValue.toString()), referrer);

    const data = tx.encodeABI();
    try {
      const receipt = await this.$web3.eth.sendTransaction({
        from: account,
        to: this.$Auction._address,
        value: 0,
        data: data
      }).on('transactionHash', (transactionHash) => {
        let bootStrapToaster = new BToast();
        bootStrapToaster.$bvToast.toast(['Check progress on Etherscan'], {
          toaster: 'b-toaster-bottom-left',
          title: 'Processing transaction...',
          variant: 'warning',
          href: `${process.env.etherScanUrl}/tx/${transactionHash}`,
          bodyClass: 'bid error',
          noAutoHide: true

        })
      })
        .on('error', (error) => {
          console.log(error, "errorr");
          const bootStrapToaster = new BToast();
          if (error.code === 32602) {
            bootStrapToaster.$bvToast.toast(['You don\'t have enough Ether (ETH)'], {
              toaster: 'b-toaster-bottom-left',
              title: 'Transaction failed',
              variant: 'danger',
              noAutoHide: true,
              bodyClass: 'fund-error'
            })
          } else {
            bootStrapToaster.$bvToast.toast([error.message], {
              toaster: 'b-toaster-bottom-left',
              title: 'Transaction failed',
              variant: 'danger',
              noAutoHide: true,
              bodyClass: 'fund-error'
            })
          }


          return null

        })

      return receipt

    } catch (error) {
      console.log(error, "errorr");

      return null;
    }

  },
  async end(context,params) {
    let account = this.$cookies.get('account');
    this.$web3.currentProvider.enable();
    const tx = this.$Auction.methods.endAuction(params.auctionId);
    const data = tx.encodeABI();


    try {
      const receipt = await this.$web3.eth.sendTransaction({
        from: account,
        to: this.$Auction._address,
        value: 0,
        data: data
      }).on('transactionHash', (transactionHash) => {
        let bootStrapToaster = new BToast();
        bootStrapToaster.$bvToast.toast(['Check progress on Etherscan'], {
          toaster: 'b-toaster-bottom-left',
          title: 'Processing transaction...',
          variant: 'warning',
          href: `${process.env.etherScanUrl}/tx/${transactionHash}`,
          bodyClass: 'bid error',
          noAutoHide: true

        })
      })
        .on('error', (error) => {
          console.log(error, "errorr");
          const bootStrapToaster = new BToast();
          if (error.code === 32602) {
            bootStrapToaster.$bvToast.toast(['You don\'t have enough Ether (ETH)'], {
              toaster: 'b-toaster-bottom-left',
              title: 'Transaction failed',
              variant: 'danger',
              noAutoHide: true,
              bodyClass: 'fund-error'
            })
          } else {
            bootStrapToaster.$bvToast.toast([error.message], {
              toaster: 'b-toaster-bottom-left',
              title: 'Transaction failed',
              variant: 'danger',
              noAutoHide: true,
              bodyClass: 'fund-error'
            })
          }
          return null
        })

      return receipt

    } catch (error) {
      console.log(error, "errorr");

      return null;
    }

  },
  async getAuction({commit}, param) {
    await this.$axios.$post(process.env.graphqlUrl, {
      query: `{
         {
  tree(id: $id) {
    id
    planter{
      id
    }
    owner{
      id
    }
    treeType
    mintStatus
    countryCode
    provideStatus
    treeStatus
    plantDate
    birthDate
    treeSpecsEntity{
      id
      name
      description
      externalUrl
      imageFs
      imageHash
      symbolFs
      symbolHash
      animationUrl
      diameter
      latitude
      longitude
      attributes
    }
  }
 }

`,
    }).then(res => {
      commit('SET_AUCTION', res)
      return res
    }).catch(error => {
      console.log(error)
    })
  },
  async planter({commit}, id = 33) {
    await this.$axios.$post(process.env.graphqlUrl, {
      query: `query planter {
          planter(id:${id}){
          id
          planterType
          status
          countryCode
          score
          capacity
          plantedCount
          longitude
          latitude
        }
      }`,
    }, commit).then(res => {
      commit('SET_PLANTER', res.data)
    })
  },
  async tree({commit}, id = 33) {
    await this.$axios.$post(process.env.graphqlUrl, {
      query: `query tree {
          tree(id:${id}){
          id
          planterType
          status
          countryCode
          score
          capacity
          plantedCount
          longitude
          latitude
        }
      }`,
    }, commit).then(res => {
      commit('SET_TREE', res.data)
    })
  },
  async getGenesisAuctions({commit}){
    await this.$axios.$post(process.env.graphqlUrl, {

      query: `{
          auctions{
          id
          startDate
          expireDate
          initialPrice
          priceInterval
          winner {
             id
           }
      }
    }`,
      prefetch: false,
    }).then((res) => {
      commit('SET_AUCTIONS', res.data)
      return res
    }).catch(error => {
      console.log(error)
    })
  },
}
export const mutations = {
  SET_AUCTION(state, auction) {
    state.auction = auction
  },
  SET_AUCTIONS(state, auctions) {
    state.auctions = auctions
  },
  SET_PLANTER(state, planters) {
    state.planters = planters
  },
  SET_TREE(state, trees) {
    state.trees = trees
  },
  SET_PLANTER_COUNT(state, count) {
    state.planterCount = count
  },
}

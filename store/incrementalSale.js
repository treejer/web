import { BToast } from 'bootstrap-vue'

export const state = () => ({
  lastSold: 0,
  incSaleData: {
    startTreeId: 0,
    endTreeId: 0,
    initialPrice: 0,
    increments: 0,
    priceJump: 0
  }
})


export const actions = {
  async calculateTotalPrice({ context, dispatch }, params) {

    try {
      let lastSold = await dispatch("setLastSold");
      let incSaleData = await dispatch("setIncSaleData");
      if(lastSold === 0 || typeof incSaleData === 'undefined') {
        return;
      }
  
      if (lastSold + parseInt(params.count) > parseInt(incSaleData.endTreeId)) {
        alert("Not enough tree in incremental sell");
        return 0;
      }
  
  
      let tempLastSold = lastSold + 1;
  
      console.log(tempLastSold, "tempLastSold")
  
      let y = parseInt((parseInt(tempLastSold) - parseInt(incSaleData.startTreeId)) / parseInt(incSaleData.increments));
      console.log(y, "y")
  
  
      let tempLastSoldPrice = parseInt(incSaleData.initialPrice) +
        parseInt((parseInt(y) * parseInt(incSaleData.initialPrice) * parseInt(incSaleData.priceJump))) /
        10000;
  
      console.log(tempLastSoldPrice, "tempLastSoldPrice")
  
  
      let totalPrice = parseInt(params.count) * parseInt(tempLastSoldPrice);
  
      console.log(totalPrice, "totalPrice")
  
  
      let extra = parseInt(params.count) -
        (
          (parseInt(y) + 1) * parseInt(incSaleData.increments) + parseInt(incSaleData.startTreeId) - parseInt(tempLastSold)
        );
  
      console.log(extra, "extra")
  
  
      while (extra > 0) {
        totalPrice +=
          parseInt((extra) *
            incSaleData.initialPrice *
            incSaleData.priceJump) /
          10000;
        extra -= parseInt(incSaleData.increments);
      }
      console.log(totalPrice, "totalPrice")
  
      return this.$web3.utils.fromWei(totalPrice.toString());

    } catch (err) {
      console.error(err, "error calculateTotalPrice")
      return 0;
    }

  },

  async setLastSold({ commit }) {
    try {
      let lastSold = await this.$IncrementalSale.methods.lastSold().call()
      .then((localLastSold) => {
        return localLastSold;
      }).catch( (err) => {
        console.log(err.message, "setLastSold error")
        return 0
      });

      commit('SET_LAST_SOLD', lastSold);
      return parseInt(lastSold);
    } catch(e) {
      console.log(e + "error in setLastSold")
      commit('SET_LAST_SOLD', 0);
    }
  },

  async setIncSaleData({ commit }) {
    try {
      let incSaleData = await this.$IncrementalSale.methods.incrementalSaleData().call()
      .then((localIncSaleData) => {
        return localIncSaleData;
      }).catch( (err) => {
        console.log(err.message, "setIncSaleData error")
        return null;
      });

      commit('SET_INCSALEDATA_SOLD', incSaleData);
      return incSaleData;
    } catch(e) {
      console.log(e + "error in setIncSaleData")
      commit('SET_INCSALEDATA_SOLD', 0);
    }
  },

  async fundTree(context, params) {
    let self = this;
    let account = this.$cookies.get('account');
    let referrer = this.$cookies.get('referrer');
    
    if(referrer) {

      if(referrer.toLowerCase() === account.toLowerCase()) {
        referrer = process.env.zeroAddress;
      }
  
      try {
        referrer = this.$web3.utils.toChecksumAddress(referrer)
      } catch(e) { 
        console.error('invalid referrer address', e.message) 
        referrer = process.env.zeroAddress;
      }

    } else {
      referrer = process.env.zeroAddress;
    }


    let recipient = params.recipient;
    if (!recipient || recipient === '' || recipient.toLowerCase() === account.toLowerCase()) {
      recipient = process.env.zeroAddress;
    }

    try {
      recipient = this.$web3.utils.toChecksumAddress(recipient)
    } catch (e) {
      console.error('invalid recipient address', e.message)
      recipient = process.env.zeroAddress;
    }

    this.$web3.currentProvider.enable();

    const tx = this.$IncrementalSale.methods.fundTree(params.count, referrer, recipient, 0);
    const data = tx.encodeABI();
    try {
      const receipt = await this.$web3.eth.sendTransaction({
        from: account,
        to: this.$IncrementalSale._address,
        value: 0,
        data: data,
        type: "0x02", 
        maxPriorityFeePerGas: null,
        maxFeePerGas: null,
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
          }
          else if(error.code === -32602) {
            //do nothing
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
      console.log(receipt, "receipt")
      return receipt

    } catch (error) {
      console.log(error, "errorr");

      return null;
    }

  },

}

export const mutations = {
  SET_LAST_SOLD(state, lastSold) {
    state.lastSold = lastSold
  },
  SET_INCSALEDATA_SOLD(state, incSaleData) {
    state.incSaleData = incSaleData
  }
}


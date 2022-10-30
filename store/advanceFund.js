import {
  BToast
} from 'bootstrap-vue'

export const state = () => ({
  shoppingList: [],
  totalPrices: 0,
  totalCounts: 0,
});

export const actions = {
  setListItems({
    commit,
    state
  }, props) {
    commit('SET_LIST', props)
    console.log(state, "state.shoppingList is here");
    commit('SUM_TOTALL_PRICE_AND_COUNT', props)
  },
  removeListItem({
    commit,
    state
  }, props) {
    commit('REMOVE_LIST', props)
    commit('SUM_TOTALL_PRICE_AND_COUNT', props)
    this.$forceUpdate();
  },

  async fundTree(context, lists) {

    console.log(lists, "params.lists")
    let self = this;
    let account = self.$cookies.get('account');
    self.$web3.currentProvider.enable();
    console.log(self.$MarketPlace, "MarketPlace lists")
    
    const tx = self.$MarketPlace.methods.fundTree(lists.listItems.map((item) => item.list), account, account, lists.totalCounts, this.$web3.utils.toWei(lists.totalPrices));
    const data = tx.encodeABI();
    console.log(data, "data tx")

    // try {
    //   const receipt = await self.$web3.eth.sendTransaction({
    //       from: account,
    //       to: self.$MarketPlace._address,
    //       value: 0,
    //       data: data,
    //       // gas: gas,
    //       // type: "0x2", 
    //       // maxPriorityFeePerGas: null,
    //       // maxFeePerGas: null,
    //     }).on('transactionHash', (transactionHash) => {
    //       let bootStrapToaster = new BToast();
    //       bootStrapToaster.$bvToast.toast(self.$translates.alert.checkprogressonetherscan, {
    //         toaster: 'b-toaster-bottom-left',
    //         title:self.$translates.alert.processingtransaction,
    //         variant: 'warning',
    //         href: `${self.$cookies.get('config').explorerUrl}/tx/${transactionHash}`,
    //         bodyClass: 'fund-error',
    //         noAutoHide: true

    //       })
    //     })
    //     .on('error', (error) => {
    //       console.log(error, "errorr");
    //       const bootStrapToaster = new BToast();
    //       if (error.code === 32602) {
    //         bootStrapToaster.$bvToast.toast(self.$translates.alert.haveenough, {
    //           toaster: 'b-toaster-bottom-left',
    //           title: self.$translates.alert.transactionfailed,
    //           variant: 'danger',
    //           to: '/forest/addTree',
    //           noAutoHide: true,
    //           bodyClass: 'fund-error'
    //         })
    //       }
    //        else if(error.code === -32602) {
    //         //do nothing
    //       }
    //       else {
    //         bootStrapToaster.$bvToast.toast([error.message], {
    //           toaster: 'b-toaster-bottom-left',
    //           title:  self.$translates.alert.transactionfailed,
    //           variant: 'danger',
    //           to: '/forest/addTree',
    //           noAutoHide: true,
    //           bodyClass: 'fund-error'
    //         })
    //       }


    //       return null

    //     })

    //   return receipt

    // } catch (error) {
    //   console.log(error, "errorr");

    //   return null;
    // }

  },

};

export const mutations = {
  SET_LIST(state, props) {
    state.shoppingList.push(props);
  },
  REMOVE_LIST(state, props) {
    state.shoppingList.pop(props);
  },
  REMOVE_TOTALPRICES(state, props) {
    state.totalPrices = props;
  },
  SUM_TOTALL_PRICE_AND_COUNT(state) {
    if (state.shoppingList.length > 1) {
      state.totalCounts = state.shoppingList.reduce((a, b) => {
        return Number(a.count) + Number(b.count);
      });
      state.totalPrices = state.shoppingList.reduce((a, b) => {
        return parseFloat(this.$web3.utils.fromWei(a.list.price)) + parseFloat(this.$web3.utils.fromWei(b.list.price));
      });
    }
    if (state.shoppingList.length < 1) {
      state.totalCounts = Number(state.shoppingList[0].count);
      state.totalPrices = parseFloat(this.$web3.utils.fromWei(state.shoppingList[0].list.price))
    };
  }
};

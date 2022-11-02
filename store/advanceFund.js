import {
  BToast
} from 'bootstrap-vue';
import Dai from '~/contracts/IERC20';
const BN = require('bn.js');

export const state = () => ({
  shoppingList: [],
  totalPrices: 0,
  totalCounts: 0,
  sidebarAdvanceFundStatus: false
});

export const actions = {
  async setListItems({
    commit,
    state
  }, props) {
    await commit('SET_LIST', {
      list: props.list,
      count: props.count,
      id: props.count + "-" + props.list.id
    })
    await commit('SUM_TOTALL_PRICE_AND_COUNT')
    await this.$cookies.set('shoppingList', state.shoppingList)

  },
  async removeListItemsShopping({
    commit,
    state
  }, props) {
    await commit('REMOVE_LIST', props)
    await commit('SUM_TOTALL_PRICE_AND_COUNT')
    this.$cookies.set('shoppingList', state.shoppingList)

  },
  async editCountShoppingList({
    commit,
    state
  }, props) {
    let self = this
    console.log(props, "props is here")
    await state.shoppingList.map((item, index) => {
      console.log(item, " item.count , props.count")

      if (item.id === props.id) {
        item.count = props.count
      }

    })
  },


  async approve(context, props) {

    console.log(props, "props is here")
    let self = this;

    const daiContract = await new this.$web3.eth.Contract(Dai.abi, this.$cookies.get('config').daiTokenAddress);
    let account = this.$cookies.get('account');
    this.$web3.currentProvider.enable();

    console.log(new BN(), "new BN is here")

    var countBN = new BN(props.totalCounts);


    var priceBN = new BN(this.$web3.utils.toWei(props.totalPrices));

    var countBNpriceBN = countBN.mul(priceBN);

    const tx = daiContract.methods.approve(this.$MarketPlace._address, countBNpriceBN.toString());

    const data = tx.encodeABI();

    let gas = await daiContract.methods.approve(this.$MarketPlace._address, countBNpriceBN.toString())
      .estimateGas({
        from: account
      });

    try {
      const receipt = await this.$web3.eth.sendTransaction({
          from: account,
          to: daiContract._address,
          value: 0,
          data: data,
          gas: gas,
          type: "0x2",
          maxPriorityFeePerGas: null,
          maxFeePerGas: null,
        }).on('transactionHash', (transactionHash) => {
          let bootStrapToaster = new BToast();
          bootStrapToaster.$bvToast.toast(self.$translates.alert.checkprogressonetherscan, {
            toaster: 'b-toaster-bottom-left',
            title: self.$translates.alert.processingtransaction,
            variant: 'warning',
            href: `${self.$cookies.get('config').explorerUrl}/tx/${transactionHash}`,
            bodyClass: 'fund-error',
            noAutoHide: true

          })
        })
        .on('error', (error) => {
          console.log(error, "errorr");
          const bootStrapToaster = new BToast();

          if (error.code === 32602) {

            bootStrapToaster.$bvToast.toast(self.$translates.alert.haveenough, {
              toaster: 'b-toaster-bottom-left',
              title: self.$translates.alert.transactionfailed,
              variant: 'danger',
              to: '/forest/addTree',
              noAutoHide: true,
              bodyClass: 'fund-error'
            })
          } else if (error.code === -32602) {
            //do nothing
          } else {
            bootStrapToaster.$bvToast.toast([error.message], {
              toaster: 'b-toaster-bottom-left',
              title: self.$translates.alert.transactionfailed,
              variant: 'danger',
              to: '/forest/addTree',
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
  async fundTree(context, lists) {

    console.log(lists, "props.lists")
    let self = this;
    let account = self.$cookies.get('account');


    let referrer = this.$cookies.get('referrer');

    if (referrer) {

      if (referrer.toLowerCase() === account.toLowerCase()) {
        referrer = process.env.zeroAddress;
      }

      try {
        referrer = this.$web3.utils.toChecksumAddress(referrer)
      } catch (e) {
        console.error('invalid referrer address', e.message)
        referrer = process.env.zeroAddress;
      }

    } else {
      referrer = process.env.zeroAddress;
    }



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
  EDIT_LIST(state, props) {
    state.shoppingList = props;
  },
  REMOVE_LIST(state, props) {
    state.shoppingList.pop(props);
  },
  REMOVE_TOTALPRICES(state, props) {
    state.totalPrices = props;
  },
  SUM_TOTALL_PRICE_AND_COUNT(state) {
    console.log(state, "state is after")
    var counter = [];
    var prices = []
    state.shoppingList.map((item) => {
      console.log(item, "state.totalCounts")

      counter.push(parseInt(item.count))
      prices.push({
        price: parseFloat(this.$web3.utils.fromWei(item.list.price)),
        count: parseInt(item.count)
      })
      console.log(prices, "prices is here")

    });
    console.log(counter, prices, "Counts prices")
    if (state.shoppingList.length > 1) {
      state.totalCounts = counter.reduce((a, b) => {
        return a + b;
      });
      state.totalPrices = prices.reduce((a, b) => {
        console.log((a.price * a.count) + (b.price * b.count), "totalPrices")
        return (a.price * a.count) + (b.price * b.count);
      });
      console.log(state.totalPrices, "state.totalPrices")

    }
    if (state.shoppingList.length <= 1) {
      return (
        state.totalCounts = Number(state.shoppingList[0].count),
        state.totalPrices = parseFloat(this.$web3.utils.fromWei(state.shoppingList[0].list.price *state.shoppingList[0].count ))
      )

    };
    console.log(state, "state")
  },
  SET_SIDEBAR_ADVANCEFUND(state, props) {
    state.sidebarAdvanceFundStatus = props
  }
};

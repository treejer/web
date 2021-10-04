import {BToast} from 'bootstrap-vue'

export const state = () => ({
  price: null
})


export const actions = {
  async getPrice({commit}) {
    let self = this
    return self.$RegularSell.methods.treePrice().call()
      .then((treeWeiPrice) => {
        let treeprice = self.$web3.utils.fromWei(treeWeiPrice);
        commit('SET_PRICE', treeprice)
        return treeprice;
      });
  },
  async requestTrees(context, params) {
    let self = this;

    let account = this.$cookies.get('account');

    this.$web3.currentProvider.enable();

    const tx = this.$RegularSell.methods.requestTrees(params.count);
    const data = tx.encodeABI();
    // const price = await this.$RegularSell.methods.price().call();


    try {
      const receipt = await this.$web3.eth.sendTransaction({
          from: account,
          to: this.$RegularSell._address,
          value: 0,
          data: data
        }).on('transactionHash', (transactionHash) => {
          let bootStrapToaster = new BToast();
          bootStrapToaster.$bvToast.toast(['Check progress on Etherscan'], {
            toaster: 'b-toaster-bottom-left',
            title: 'Processing transaction...',
            variant: 'warning',
            href: `${process.env.etherScanUrl}/txsPending`,
            bodyClass: 'fund-error',
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
              to: '/forest/addTree',
              noAutoHide: true,
              bodyClass: 'fund-error'
            })
          } else {
            bootStrapToaster.$bvToast.toast([error.message], {
              toaster: 'b-toaster-bottom-left',
              title: 'Transaction failed',
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

  }

}

export const mutations = {
  SET_PRICE(state, price) {
    state.price = price
  }
}
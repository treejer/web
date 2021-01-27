import { BToast } from 'bootstrap-vue'

export const state = () => ({})

export const mutations = {}

export const actions = {

  async getPrice() {
    let self = this
    return this.$treeFactory.methods.price().call()
      .then((treeWeiPrice) => self.$web3.utils.fromWei(treeWeiPrice));
  },
  async fund(context, params) {
    let self = this;

    let account = this.$cookies.get('account');

    this.$web3.currentProvider.enable();

    const tx = this.$treeFactory.methods.fund(params.count);
    const data = tx.encodeABI();
    const price = await this.$treeFactory.methods.price().call();

    try {
      const receipt = await this.$web3.eth.sendTransaction({
        from: account,
        to: this.$treeFactory._address,
        value: price * params.count,
        data: data
      }).on('transactionHash', (resolve) => {
        let bootStrapToaster = new BToast();
        bootStrapToaster.$bvToast.toast(['Check progress on Etherscan'], {
          toaster: 'b-toaster-bottom-left',
          title: 'Processing payment...',
          variant: 'warning',
          href: `https://ropsten.etherscan.io/address/${self.$cookies.get('account')}`,
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
              title: 'Payment failed',
              variant: 'danger',
              to: '/forest/addTree',
              noAutoHide: true,
              bodyClass: 'fund-error'
            })
          } else {
            bootStrapToaster.$bvToast.toast(['You rejected the request'], {
              toaster: 'b-toaster-bottom-left',
              title: 'Payment failed',
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

export const getters = {}

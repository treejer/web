
import { BToast } from "bootstrap-vue";

export const state = () => ({})

export const mutations = {}

export const actions = {

  async mint(context, params) {
    let self = this

    let account = this.$cookies.get('account');

    this.$web3.currentProvider.enable();

    const tx = this.$seedFactory.methods.mint();
    const data = tx.encodeABI();


    const receipt = await this.$web3.eth.sendTransaction({
      from: account,
      to: this.$seedFactory._address,
      data: data,
      value: 0,
    }).on('transactionHash', (resolve) => {
      const bootStrapToaster = new BToast();
      bootStrapToaster.$bvToast.toast(['Check progress on Etherscan'], {
        toaster: 'b-toaster-bottom-left',
        title: 'Processing payment...',
        variant: 'warning',
        href: `https://ropsten.etherscan.io/address/${self.$cookies.get('account')}`,
        bodyClass: 'fund-error',
        noAutoHide: true

      })

    }).on('error', (error) => {
      const bootStrapToaster = new BToast();

      if (error.code === 32602) {
        bootStrapToaster.$bvToast.toast(['You don\'t have enough tokens'], {
          toaster: 'b-toaster-bottom-left',
          title: 'Transfer failed',
          variant: 'danger',
          to: '/forest/addTree',
          noAutoHide: true,
          bodyClass: 'fund-error'
        })
      } else {
        bootStrapToaster.$bvToast.toast(['You rejected the request'], {
          toaster: 'b-toaster-bottom-left',
          title: 'Transfer failed',
          variant: 'danger',
          to: '/forest/addTree',
          noAutoHide: true,
          bodyClass: 'fund-error'
        })
      }

    })

    return receipt
  }
}

export const getters = {}

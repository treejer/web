
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

    try {
    const receipt = await this.$web3.eth.sendTransaction({
      from: account,
      to: this.$seedFactory._address,
      data: data,
      value: 0,
    }).on('transactionHash', (transactionHash) => {
      let bootStrapToaster = new BToast();
      bootStrapToaster.$bvToast.toast(['Check progress on Etherscan'], {
        toaster: 'b-toaster-bottom-left',
        title: 'Processing transaction...',
        variant: 'warning',
        href: `https://ropsten.etherscan.io/tx/${transactionHash}`,
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


    })

    return receipt

    } catch (error) {
      console.log(error, "errorr");

      return null;
    }

  }
}

export const getters = {}

import {BToast} from 'bootstrap-vue'

export const state = () => ({})


export const actions = {


  async claim(context, params) {
    let account = this.$cookies.get('account');

    this.$web3.currentProvider.enable();

    const tx = this.$IHonoraryTree.methods.claim();
    const data = tx.encodeABI();

    let gas = await this.$IHonoraryTree.methods.claim()
    .estimateGas({from: account});

    try {
      const receipt = await this.$web3.eth.sendTransaction({
        from: account,
        to: this.$IHonoraryTree._address,
        value: 0,
        gas: gas,
        data: data,
        type: "0x2", 
        maxPriorityFeePerGas: null,
        maxFeePerGas: null
      }).on('transactionHash', (transactionHash) => {
        let bootStrapToaster = new BToast();
        bootStrapToaster.$bvToast.toast(this.$translates.alert.checkprogressonetherscan, {
          toaster: 'b-toaster-bottom-left',
          title: this.$translates.alert.processingtransaction,
          variant: 'warning',
          href: `${self.$cookies.get('config').explorerUrl}/tx/${transactionHash}`,
          bodyClass: 'bid error',
          noAutoHide: true

        })
      })
        .on('error', (error) => {
          console.log(error, "errorr");
          const bootStrapToaster = new BToast();
          if (error.code === 32602) {
            bootStrapToaster.$bvToast.toast(this.$translates.alert.haveenough, {
              toaster: 'b-toaster-bottom-left',
              title:this.$translates.alert.transactionfailed,
              variant: 'danger',
              noAutoHide: true,
              bodyClass: 'fund-error'
            })
          } else {
            bootStrapToaster.$bvToast.toast([error.message], {
              toaster: 'b-toaster-bottom-left',
              title: this.$translates.alert.transactionfailed,
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

}

export const mutations = {}

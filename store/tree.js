import {BToast} from 'bootstrap-vue'

export const state = () => ({
  price: null
})


export const actions = {
  async isApprovedForAll(context, params) {
    try {
      let self = this
      return self.$Tree.methods.isApprovedForAll(params.owner, params.operator).call()
        .then((result) => {
          console.log(result, "isApprovedForAll result")
          return result;
        }).catch( (err) => {
          console.log(err.message, "getPrice error")
          return false
        });
    } catch(e) {
      console.log(e + "error in getPrice")
      return false
    }
  },

  
  async setApprovalForAll(context, params) {

    console.log(params, "setApprovalForAll params")
    let self = this;

    let account = this.$cookies.get('account');

    this.$web3.currentProvider.enable();

    const tx = this.$Tree.methods.setApprovalForAll(params.operator, params.approved);
    const data = tx.encodeABI();

    let gas = await this.$Tree.methods.setApprovalForAll(params.operator, params.approved)
    .estimateGas({from: account});

    try {
      const receipt = await this.$web3.eth.sendTransaction({
          from: account,
          to: this.$Tree._address,
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
            title:self.$translates.alert.processingtransaction,
            variant: 'warning',
            href: `${process.env.etherScanUrl}/tx/${transactionHash}`,
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
          }
           else if(error.code === -32602) {
            //do nothing
          }
          else {
            bootStrapToaster.$bvToast.toast([error.message], {
              toaster: 'b-toaster-bottom-left',
              title:  self.$translates.alert.transactionfailed,
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


  

}
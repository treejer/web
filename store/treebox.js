import {BToast} from 'bootstrap-vue'

export const state = () => ({
  price: null
})


export const actions = {
  async getBox(context, params) {
    try {
      let self = this
      return self.$TreeBox.methods.boxes(params.index).call()
        .then((result) => {
          console.log(result, "getBox result")
          return result;
        }).catch( (err) => {
          console.log(err.message, "getBox error")
          return false
        });
    } catch(e) {
      console.log(e + "error in getBox")
      return false
    }
  },

  
  async create(context, params) {

    console.log(params, "create params")    

    
    let self = this;

    let account = this.$cookies.get('account');

    this.$web3.currentProvider.enable();

    const tx = this.$TreeBox.methods.create(params.inputs);
    const data = tx.encodeABI();

    let gas = await this.$TreeBox.methods.create(params.inputs)
    .estimateGas({from: account});

    try {
      const receipt = await this.$web3.eth.sendTransaction({
          from: account,
          to: this.$TreeBox._address,
          value: 0,
          data: data,
          gas: gas,
          type: "0x2", 
          maxPriorityFeePerGas: null,
          maxFeePerGas: null,
        }).on('transactionHash', (transactionHash) => {
          let bootStrapToaster = new BToast();
          bootStrapToaster.$bvToast.toast(['Check progress on Etherscan'], {
            toaster: 'b-toaster-bottom-left',
            title: 'Processing transaction...',
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
            bootStrapToaster.$bvToast.toast(['You don\'t have enough Ether (ETH)'], {
              toaster: 'b-toaster-bottom-left',
              title: 'Transaction failed',
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

  },

  

}
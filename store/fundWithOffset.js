import {BToast} from 'bootstrap-vue'

export const state = () => ({
  price: null
})


export const actions = {
  
  async fundTreeWithOffset(context, params) {

    console.log(params, "params fundTreeWithOffset")
   
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
    if(!recipient || recipient === '' || recipient.toLowerCase() === account.toLowerCase()) {
      recipient = process.env.zeroAddress;
    }

    try {
      recipient = this.$web3.utils.toChecksumAddress(recipient)
    } catch(e) { 
      console.error('invalid recipient address', e.message) 
      recipient = process.env.zeroAddress;
    }


    this.$web3.currentProvider.enable();

    let offsetDexPath = process.env.OFFSET_DEX_PATH.split(',');

    console.log(offsetDexPath, process.env.OFFSET_DEX_PATH)

    //ToDo: add recipeint and referrer
    const tx = this.$FundWithOffset.methods.fundTreeWithOffset(
      params.count,
      referrer,
      process.env.bctTokenAddress,
      this.$web3.utils.toWei(params.co2Count.toString()),
      false,
      recipient,
      "",
      "Retire and fund tree with Treejer",
      "TreejerDAO",
    );

    const data = tx.encodeABI();
    // const price = await this.$FundWithOffset.methods.price().call();

    let gas = await this.$FundWithOffset.methods.fundTreeWithOffset(
      params.count,
      referrer,
      process.env.bctTokenAddress,
      this.$web3.utils.toWei(params.co2Count.toString()),
      false,
      recipient,
      "",
      "Retire and fund tree with Treejer",
      "TreejerDAO",
    )
    .estimateGas({from: account});

    try {
      const receipt = await this.$web3.eth.sendTransaction({
          from: account,
          to: this.$FundWithOffset._address,
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
  async claimReferralReward(context, params) {

    let account = this.$cookies.get('account');

    this.$web3.currentProvider.enable();

    const tx = this.$FundWithOffset.methods.claimReferralReward();
    const data = tx.encodeABI();

    let gas = await this.$FundWithOffset.methods.claimReferralReward()
    .estimateGas({from: account});

    try {
      const receipt = await this.$web3.eth.sendTransaction({
          from: account,
          to: this.$FundWithOffset._address,
          value: 0,
          data: data,
          gas: gas,
          type: "0x2", 
          maxPriorityFeePerGas: null,
          maxFeePerGas: null,
        }).on('transactionHash', (transactionHash) => {
          let bootStrapToaster = new BToast();
          bootStrapToaster.$bvToast.toast(this.$translates.alert.checkprogressonetherscan, {
            toaster: 'b-toaster-bottom-left',
            title:this.$translates.alert.processingtransaction,
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
            bootStrapToaster.$bvToast.toast(this.$translates.alert.haveenough, {
              toaster: 'b-toaster-bottom-left',
              title: this.$translates.alert.transactionfailed,
              variant: 'danger',
              bodyClass: 'fund-error'
            })
          }
          else if(error.code === -32602) {
            //do nothing
          } else {
            bootStrapToaster.$bvToast.toast([error.message], {
              toaster: 'b-toaster-bottom-left',
              title: this.$translates.alert.transactionfailed,
              variant: 'danger',
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
import { BToast } from 'bootstrap-vue'
import Dai from '~/contracts/IERC20'
const BN = require('bn.js');


export const state = () => ({})

export const mutations = {}

export const actions = {

  async balanceOf(context, params) {
    try {
      const daiContract = await new this.$web3.eth.Contract(Dai.abi, this.$cookies.get('config').daiTokenAddress);

      let self = this
      return daiContract.methods.balanceOf(params.account).call()
        .then((balanceInWei) => {
          return self.$web3.utils.fromWei(balanceInWei.toString()).toString()
        }).catch( (err) => {
          console.log(err.message, "balanceOf error")
          return 0
        });


    } catch (err) {
      console.error(err, "error dai balanceOf")
      return 0;
    }
  },
  async allowance() {

    try {
      const daiContract = await new this.$web3.eth.Contract(Dai.abi, this.$cookies.get('config').daiTokenAddress);
      let account = this.$cookies.get('account');

      if(account == null) {
        return 0;
      }

      let self = this
      return daiContract.methods.allowance(account, this.$RegularSale._address).call()
        .then((allowanceInWei) => self.$web3.utils.fromWei(allowanceInWei.toString()))
        .catch( (err) => {
          console.log(err.message, "allowance error")
          return 0
        });

    } catch(error) {
      console.log(error.message, "allowance error dai")
      return 0;
    }

  },
  async approve(context, params) {
    let self = this;

    const daiContract = await new this.$web3.eth.Contract(Dai.abi, this.$cookies.get('config').daiTokenAddress);
    let account = this.$cookies.get('account');
    this.$web3.currentProvider.enable();


    var countBN = new BN(params.count);
    var priceBN = new BN(this.$web3.utils.toWei(this.state.regularSale.price));

    var countBNpriceBN = countBN.mul(priceBN);

    const tx = daiContract.methods.approve(this.$RegularSale._address, countBNpriceBN.toString());

    const data = tx.encodeABI();

    let gas = await daiContract.methods.approve(this.$RegularSale._address, countBNpriceBN.toString())
    .estimateGas({from: account});

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

  }
}

export const getters = {}

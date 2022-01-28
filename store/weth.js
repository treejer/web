import { BToast } from 'bootstrap-vue'
import Weth from '~/contracts/IERC20'


export const state = () => ({})

export const mutations = {}

export const actions = {

  async balanceOf(context, params) {

    try {
      const wethContract = await new this.$web3.eth.Contract(Weth.abi, process.env.wethTokenAddress);

      let self = this
      return wethContract.methods.balanceOf(params.account).call()
      .then((balanceInWei) => {
        return self.$web3.utils.fromWei(balanceInWei.toString()).toString()
      }).catch( (err) => {
        console.log(err.message, "balanceOf error")
        return 0
      });



    } catch (err) {
      console.error(err, "error weth balanceOf")
      return 0;
    }
  },
  async allowance() {

    try {
      const wethContract = await new this.$web3.eth.Contract(Weth.abi, process.env.wethTokenAddress);
      let account = this.$cookies.get('account');

      let self = this
      return wethContract.methods.allowance(account, process.env.contractTreeRegularSell).call()
        .then((allowanceInWei) => self.$web3.utils.fromWei(allowanceInWei.toString()))
        .catch( (err) => {
          console.log(err.message, "allowance error")
          return 0
        });

    } catch(error) {
      console.log(error.message, "allowance error weth")
      return 0;
    }



  },
  async approve(context, params) {
    let self = this;

    const wethContract = await new this.$web3.eth.Contract(Weth.abi, process.env.wethTokenAddress);
    let account = this.$cookies.get('account');
    this.$web3.currentProvider.enable();

    const tx = wethContract.methods.approve(process.env.contractTreeRegularSell, (Math.pow(2, 256) - 1).toString());

    const data = tx.encodeABI();

    let gas = await wethContract.methods.approve(process.env.contractTreeRegularSell, (Math.pow(2, 256) - 1).toString())
    .estimateGas({from: account});

    try {
      const receipt = await this.$web3.eth.sendTransaction({
        from: account,
        to: wethContract._address,
        value: 0,
        data: data,
        gas: gas,
        type: "0x2", 
        maxPriorityFeePerGas: null,
        maxFeePerGas: null
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

  }
}

export const getters = {}

import { BToast } from 'bootstrap-vue'
import Dai from '~/contracts/IERC20'


export const state = () => ({})

export const mutations = {}

export const actions = {

  async balanceOf(context, params) {
    try {
      const daiContract = await new this.$web3.eth.Contract(Dai.abi, process.env.daiTokenAddress);
      let balanceInWei =  await daiContract.methods.balanceOf(params.account).call()
      return this.$web3.utils.fromWei(balanceInWei.toString()).toString()
    } catch (err) {
      console.error(err, "error dai balanceOf")
      return 0;
    }
  },
  async allowance() {

    try {
      const daiContract = await new this.$web3.eth.Contract(Dai.abi, process.env.daiTokenAddress);
      let account = this.$cookies.get('account');

      if(account == null) {
        console.log("erc20js - account not exists in cookies");
        return 0;
      }

      let self = this
      return daiContract.methods.allowance(account, this.$RegularSale._address).call()
        .then((allowanceInWei) => self.$web3.utils.fromWei(allowanceInWei.toString()));

    } catch(error) {
      console.log(error.message, "allowance error dai")
      return 0;
    }

  },
  async approve(context, params) {
    let self = this;
    console.log(context,"context is here")
    const daiContract = await new this.$web3.eth.Contract(Dai.abi, process.env.daiTokenAddress);
    let account = this.$cookies.get('account');
    this.$web3.currentProvider.enable();

    const tx = daiContract.methods.approve(this.$RegularSale._address, (params.count * this.$web3.utils.toWei(this.state.regularSale.price)).toString());

    const data = tx.encodeABI();

    try {
      const receipt = await this.$web3.eth.sendTransaction({
        from: account,
        to: daiContract._address,
        value: 0,
        data: data
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

export const getters = {}

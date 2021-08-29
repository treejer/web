import { BToast } from 'bootstrap-vue'
import ERC20 from '~/contracts/IERC20'


export const state = () => ({
  approveLoading:false,
})

export const mutations = {}

export const actions = {

  async balanceOf(context, params) {
    const erc20Contract = await new this.$web3.eth.Contract(ERC20.abi, params.tokenAddress);
    let account = this.$cookies.get('account');

    let self = this
    return erc20Contract.methods.balanceOf(account).call()
      .then((balanceInWei) => {
        return self.$web3.utils.fromWei(balanceInWei.toString()).toString()
      });
  },
  async allowance(context, params) {
    const erc20Contract = await new this.$web3.eth.Contract(ERC20.abi, params.tokenAddress);
    let account = this.$cookies.get('account');

    let self = this
    return erc20Contract.methods.allowance(account, params.spenderContract).call()
      .then((allowanceInWei) => self.$web3.utils.fromWei(allowanceInWei.toString()));
  },
  async approve(context, params) {
    let self = this;
    console.log(context,"context is here")
    console.log(params,"params is here")
    const erc20Contract = await new this.$web3.eth.Contract(ERC20.abi, params.tokenAddress);
    let account = this.$cookies.get('account');
    this.$web3.currentProvider.enable();

    const tx = erc20Contract.methods.approve(params.spenderContract, this.$web3.utils.toWei(params.amount.toString()));

    const data = tx.encodeABI();

    try {
      const receipt = await this.$web3.eth.sendTransaction({
        from: account,
        to: erc20Contract._address,
        value: 0,
        data: data
      }).on('transactionHash', (transactionHash) => {
        let bootStrapToaster = new BToast();
        bootStrapToaster.$bvToast.toast(['Check progress on Etherscan'], {
          toaster: 'b-toaster-bottom-left',
          title: 'Processing transaction...',
          variant: 'warning',
          href: `${process.env.etherScanUrl}/txsPending`,
          bodyClass: 'fund-error',
          noAutoHide: true

        })
      })
        .on('error', (error) => {
          console.log(error, "errorr"); 
         const err = error
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




          return err

        })

      return receipt

    } catch (error) {
      console.log(error, "errorr");
      params.loading =false


      return error;
    }

  }
}

export const getters = {}

import { BToast } from 'bootstrap-vue'
import Dai from '~/contracts/IERC20'


export const state = () => ({})

export const mutations = {}

export const actions = {

  async balanceOf() {
    const daiContract = await new this.$web3.eth.Contract(Dai.abi, process.env.daiTokenAddress);
    let account = this.$cookies.get('account');

    let self = this
    return daiContract.methods.balanceOf(account).call()
      .then((balanceInWei) => {
        return self.$web3.utils.fromWei(balanceInWei.toString()).toString()
      });
  },
  async allowance() {
    const daiContract = await new this.$web3.eth.Contract(Dai.abi, process.env.daiTokenAddress);
    let account = this.$cookies.get('account');

    let self = this
    return daiContract.methods.allowance(account, process.env.contractTreeRegularSell).call()
      .then((allowanceInWei) => self.$web3.utils.fromWei(allowanceInWei.toString()));
  },
  async approve(context, params) {
    let self = this;

    const daiContract = await new this.$web3.eth.Contract(Dai.abi, process.env.daiTokenAddress);
    let account = this.$cookies.get('account');
    console.log(account)
    this.$web3.currentProvider.enable();

    // const price = await this.$treeFactory.methods.price().call()
    //   .then((price) =>
    //   price.toString()
    // )
    // console.log(price, "price");
    const tx = daiContract.methods.approve(process.env.contractTreeRegularSell, (params.count * 7000000000000000000).toString());

    console.log(tx, "tx");
    const data = tx.encodeABI();
    // ;


    console.log(data, "data");
    // debugger

    console.log(daiContract._address, "daiContract._address");

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
          href: `${process.env.etherScanUrl}/txsPending`,
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

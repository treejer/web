import web3 from '~/plugins/web3'
import SeedFactory from '~/contracts/SeedFactory'
import web3Abi from 'web3-eth-abi'
import {BToast} from "bootstrap-vue";

const tokenAddress = process.env.contractSeedFactoryAddress // insert deployed SeedFactory token address here
const seedFactory = new web3.eth.Contract(SeedFactory.abi, tokenAddress)

let account
web3.eth.getAccounts().then(res => {
  account = res[0]
})

export const state = () => ({})

export const mutations = {}

export const actions = {
  getMyTreeCount() {
    return seedFactory.methods.ownerTreesCount(account).call({ from: account });
  },
  getTree(context, params) {
    return seedFactory.methods.getTree(params.id).call({ from: account });
  },
  balanceOf() {
    return seedFactory.methods.balanceOf(account).call({ from: account })
      .then((seedBalance) => web3.utils.fromWei(seedBalance));
  },
  calculateMintableSeed() {
    return seedFactory.methods.calculateMintableSeed(account).call({ from: account })
      .then((mintableSeed) => web3.utils.fromWei(mintableSeed));
  },
  getPrice() {
    return seedFactory.methods.getPrice().call({ from: account })
      .then((treeWeiPrice) => web3.utils.fromWei(treeWeiPrice));
  },
  async mint(context, params) {
    let self = this

    const mintMethod = SeedFactory.abi.find(method => {
      return method.name === 'mint'
    })

    const mintMethodTransactionData = web3Abi.encodeFunctionCall(
      mintMethod,
      []
    )
    const receipt = await web3.eth.sendTransaction({
      from: account,
      to: tokenAddress,
      data: mintMethodTransactionData,
      value: 0,
      // gas: estimateGas * 2
    }).on('transactionHash', (resolve) => {
      const bootStrapToaster = new BToast();
      bootStrapToaster.$bvToast.toast(['Check progress on Etherscan'], {
        toaster: 'b-toaster-bottom-left',
        title: 'Processing payment...',
        variant: 'warning',
        href:`https://ropsten.etherscan.io/address/${self.$cookies.get('account')}`,
        bodyClass: 'fund-error',
        noAutoHide:true

      })

    }).on('error', (error) => {
      const bootStrapToaster = new BToast();

      console.log(error, 'this here')
      if(error.code === 32602){
        bootStrapToaster.$bvToast.toast(['You don\'t have enough tokens'], {
          toaster: 'b-toaster-bottom-left',
          title: 'Transfer failed',
          variant: 'danger',
          to:'/forest/addTree',
          noAutoHide: true,
          bodyClass: 'fund-error'
        })
      }else {
        bootStrapToaster.$bvToast.toast(['You rejected the request'], {
          toaster: 'b-toaster-bottom-left',
          title: 'Transfer failed',
          variant: 'danger',
          to:'/forest/addTree',
          noAutoHide: true,
          bodyClass: 'fund-error'
        })
      }

    })

    return receipt
  }
}

export const getters = {}

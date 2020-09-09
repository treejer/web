import web3 from '~/plugins/web3'
import O1Factory from '~/contracts/O1Factory'
import web3Abi from 'web3-eth-abi'
import {BToast} from "bootstrap-vue";

const tokenAddress = process.env.contractO1FactoryAddress // insert deployed O1Factory token address here
const o1Factory = new web3.eth.Contract(O1Factory.abi, tokenAddress)

let account
web3.eth.getAccounts().then(res => {
  account = res[0]
})

export const state = () => ({})

export const mutations = {}

export const actions = {
  getMyTreeCount() {
    return o1Factory.methods.ownerTreesCount(account).call({ from: account });
  },
  getTree(context, params) {
    return o1Factory.methods.getTree(params.id).call({ from: account });
  },
  balanceOf() {
    return o1Factory.methods.balanceOf(account).call({ from: account })
      .then((o1Balance) => web3.utils.fromWei(o1Balance));
  },
  calculateMintableO1() {
    return o1Factory.methods.calculateMintableO1(account).call({ from: account })
      .then((mintableO1) => web3.utils.fromWei(mintableO1));
  },
  getPrice() {
    return o1Factory.methods.getPrice().call({ from: account })
      .then((treeWeiPrice) => web3.utils.fromWei(treeWeiPrice));
  },
  async mint(context, params) {
    const mintMethod = O1Factory.abi.find(method => {
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
      return resolve;
      console.log(resolve)

    }).on('error', (error) => {
      let bootStrapToaster = new BToast();
      console.log(error)
      bootStrapToaster.$bvToast.toast("Transfer failed", {
        toaster: 'b-toaster-bottom-left',
        solid: true,
        headerClass: 'hide',
        variant: 'danger'
      })
      })

    return receipt
  }
}

export const getters = {}

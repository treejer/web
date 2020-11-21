import web3 from '~/plugins/web3'
import TreeFactory from '~/contracts/TreeFactory'
import web3Abi from 'web3-eth-abi'

const tokenAddress = process.env.contractTreeFactoryAddress // insert deployed TreeFactory token address here
const treeFactory = new web3.eth.Contract(TreeFactory.abi, tokenAddress)

let account
web3.eth.getAccounts().then(res => {
  account = res[0]
})

export const state = () => ({})

export const mutations = {}

export const actions = {
  getMyTreeCount() {
    return treeFactory.methods.ownerTreesCount(account).call({ from: account });
  },
  getTree(context, params) {
    return treeFactory.methods.getTree(params.id).call({ from: account })
      .then((treeData) => {
        treeData.latitude = parseFloat(treeData.latitude)
        treeData.longitude = parseFloat(treeData.longitude)
        return treeData;
      });
  },
  getOwnerTreesId() {
    return treeFactory.methods.getOwnerTrees(account).call({ from: account });
  },
  getPrice() {
    return treeFactory.methods.getPrice().call({ from: account })
      .then((treeWeiPrice) => web3.utils.fromWei(treeWeiPrice));
  },
  async plant(context, params) {
    const plantMethod = TreeFactory.abi.find(method => {
      return method.name === 'add'
    })

    const plantMethodTransactionData = web3Abi.encodeFunctionCall(
      plantMethod,
      ['0', '0', ['firstTreeWeb3', '41.0157464', '28.6614805'], ['10', '20']]
    )

    const estimateGas = await web3.eth.estimateGas({
      from: account,
      to: tokenAddress,
      data: plantMethodTransactionData
    })

    const receipt = await web3.eth.sendTransaction({
      from: account,
      to: tokenAddress,
      data: plantMethodTransactionData,
      value: 0,
      gas: estimateGas * 2
    })

    return receipt
  }
}

export const getters = {}

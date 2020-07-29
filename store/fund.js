import web3 from '~/plugins/web3'
import Fund from '~/contracts/Fund'
import web3Abi from 'web3-eth-abi'

const tokenAddress = this.$cookies.get('account') // insert deployed Fund token address here
const fund = new web3.eth.Contract(Fund.abi, tokenAddress)

let account
web3.eth.getAccounts().then(res => {
  account = res[0]
})

export const state = () => ({})

export const mutations = {}

export const actions = {
  // getName() {
  // 	return fund.methods.name().call({ from: account })
  // },
  async fund(context, c) {

    // comment for showing iraj

    const fundMethod = Fund.abi.find(method => {
      return method.name === 'fund'
    })

    const fundMethodTransactionData = web3Abi.encodeFunctionCall(
      fundMethod,
      ['1']
    )

    // const estimateGas = await web3.eth.estimateGas({
    // 	from: account,
    // 	to: tokenAddress,
    // 	data: fundMethodTransactionData
    // })

    // console.log(estimateGas);

    const receipt = await web3.eth.sendTransaction({
      from: account,
      to: tokenAddress,
      data: fundMethodTransactionData,
      value: web3.utils.toWei('0.01'),
      // gas: estimateGas * 2
    })

    return receipt
  }
}

export const getters = {}

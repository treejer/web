import web3 from '~/plugins/web3'
import Fund from '~/contracts/Fund'
import web3Abi from 'web3-eth-abi'
import {BToast} from 'bootstrap-vue'

const tokenAddress = process.env.contractFundAddress // insert deployed Fund token address here
const fund = new web3.eth.Contract(Fund.abi, tokenAddress)

let account
web3.eth.getAccounts().then(res => {
  account = res[0]
})

export const state = () => ({})

export const mutations = {}

export const actions = {
  getEthBalance() {
    return web3.eth.getBalance(account).then((ethBalance) => {
      console.log(web3.utils.fromWei(ethBalance),'web3.utils.fromWei(ethBalance)\n')
      web3.utils.fromWei(ethBalance)
    });
  },
  async fund(context, params) {
    const fundMethod = Fund.abi.find(method => {
      return method.name === 'fund'
    })

    const fundMethodTransactionData = web3Abi.encodeFunctionCall(
      fundMethod,
      [params.count]
    )
    // const estimateGas = await web3.eth.estimateGas({
    // 	from: account,
    // 	to: tokenAddress,
    // 	data: fundMethodTransactionData
    // })

    // console.log(estimateGas, "estimateGas");


    try {
      const receipt = await web3.eth.sendTransaction({
        from: account,
        to: tokenAddress,
        data: fundMethodTransactionData,
        value: web3.utils.toWei('0.01') * params.count,
        // gas: estimateGas * 4
      }).on('transactionHash', (resolve) => {
        return resolve;
      })
        .on('error', (error) => {

          let bootStrapToaster = new BToast();
          bootStrapToaster.$bvToast.toast(error.message, {
            toaster: 'b-toaster-bottom-left',
            solid: true,
            headerClass: 'hide',
            variant: 'danger'
          })
          return null

        })

      return receipt

    } catch (error) {
      return null;
    }

  }
}

export const getters = {}

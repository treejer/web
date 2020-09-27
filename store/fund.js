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

 async getEthBalance() {
  return  await web3.eth.getBalance(account).then((ethBalance) => {
      const test =  web3.utils.fromWei(ethBalance)
     const ethBalances = parseFloat(test).toFixed(4)
     return ethBalances
    });
  },
  async fund(context, params) {
    let self = this
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



    try {
      const receipt = await web3.eth.sendTransaction({
        from: account,
        to: tokenAddress,
        data: fundMethodTransactionData,
        value: web3.utils.toWei('0.01') * params.count,
        // gas: estimateGas * 4
      }).on('transactionHash', (resolve) => {
        let bootStrapToaster = new BToast();
        bootStrapToaster.$bvToast.toast(['Check progress on Etherscan'], {
          toaster: 'b-toaster-bottom-left',
          title: 'Processing payment...',
          variant: 'warning',
          href:`https://ropsten.etherscan.io/address/${self.$cookies.get('account')}`,
          bodyClass: 'fund-error',
          noAutoHide:true

        })
      })
        .on('error', (error) => {
          const bootStrapToaster = new BToast();

          console.log(error, 'this here')
          if(error.code === 32602){
            bootStrapToaster.$bvToast.toast(['You don\'t have enough Ether (ETH)'], {
              toaster: 'b-toaster-bottom-left',
              title: 'Payment failed',
              variant: 'danger',
              to:'/forest/addTree',
              noAutoHide: true,
              bodyClass: 'fund-error'
            })
          }else {
            bootStrapToaster.$bvToast.toast(['You rejected the request'], {
              toaster: 'b-toaster-bottom-left',
              title: 'Payment failed',
              variant: 'danger',
              to:'/forest/addTree',
              noAutoHide: true,
              bodyClass: 'fund-error'
            })
          }


          return null

        })

      return receipt

    } catch (error) {
      return null;
    }

  }
}

export const getters = {}

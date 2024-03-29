import { BToast } from 'bootstrap-vue'
import ERC20 from '~/contracts/IERC20'


export const state = () => ({
  approveLoading:false,
})

export const mutations = {}

export const actions = {

  async balanceOf(context, params) {

    console.log(params,"params is here")

    let account = this.$cookies.get('account');

    if(account == null) {
      console.log("erc20js - account not exists in cookies");
      return 0;
    }

    try {
      const erc20Contract = await new this.$web3.eth.Contract(ERC20.abi, params.tokenAddress);

      let self = this
      return erc20Contract.methods.balanceOf(account).call()
        .then((balanceInWei) => {
          console.log(balanceInWei,"balanceInWei is here ")
          return self.$web3.utils.fromWei(balanceInWei.toString()).toString()
        }).catch( (err) => {
          console.log(err.message, "balanceOf error")
          return 0
        });

    } catch(error) {
      console.log(error.message, "balanceOf error")
      return 0;
    }
  },
  async allowance(context, params) {

    try {
      let account = this.$cookies.get('account');

      if(account == null) {
        console.log("erc20js - account not exists in cookies");
        return 0;
      }
      const erc20Contract = await new this.$web3.eth.Contract(ERC20.abi, params.tokenAddress);
      
      let self = this
      return erc20Contract.methods.allowance(account, params.spenderContract).call()
        .then((allowanceInWei) => self.$web3.utils.fromWei(allowanceInWei.toString()))
        .catch( (err) => {
          console.log(err.message, "allowance error")
          return 0
        });


    } catch(error) {
      console.log(error.message, "allowance error")
      return 0;
    }
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

    // let feeData = await erc20Contract.getFeeData();
    // console.log("Fee Data:", feeData);
  
    // const tx = {
    //   type: 2,
    //   nonce: nonce,
    //   to: "0x8D97689C9818892B700e27F316cc3E41e17fBeb9", // Address to send to
    //   maxPriorityFeePerGas: feeData["maxPriorityFeePerGas"], // Recommended maxPriorityFeePerGas
    //   maxFeePerGas: feeData["maxFeePerGas"], // Recommended maxFeePerGas
    //   value: ethers.utils.parseEther("0.01"), // .01 ETH
    //   gasLimit: "21000", // basic transaction costs exactly 21000
    //   chainId: 42, // Ethereum network id
    // };

    let gas = await erc20Contract.methods.approve(params.spenderContract, this.$web3.utils.toWei(params.amount.toString()))
    .estimateGas({from: account});



    try {
      const receipt = await this.$web3.eth.sendTransaction({
        from: account,
        to: erc20Contract._address,
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
          console.log(error, "errorr on");
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

          return null;
        })

      return receipt

    } catch (error) {
      console.log(error, "errorr catch");
      return null;
    }

  }
}

export const getters = {}

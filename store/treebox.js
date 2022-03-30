import {BToast} from 'bootstrap-vue'
import Web3 from 'web3'
const { RelayProvider } = require("@opengsn/provider");

export const actions = {
  async getBox(context, params) {
    try {
      let self = this
      return self.$TreeBox.methods.boxes(params.recipient).call()
        .then((result) => {
          console.log(result, "getBox result")
          return {sender: result.sender, ipfsHash: result.ipfsHash};
        }).catch( (err) => {
          console.log(err.message, "getBox error")
          return false
        });
    } catch(e) {
      console.log(e + "error in getBox")
      return false
    }
  },
  async getBoxTreeIds(context, params) {
    try {

      let self = this
      let treeIds = [];
      let treesLength = await self.$TreeBox.methods.getRecipientTreesLength(params.recipient).call()
        .then((result) => {
          console.log(result, "getBoxTreeIds result")
          return result;
        }).catch( (err) => {
          console.log(err.message, "getBoxTreeIds error")
          return false
        });

      if(treesLength == 0) {
        return treeIds;
      }

      for(let i = 0; i < treesLength; i++) {
        await self.$TreeBox.methods.getRecipientTreeByIndex(params.recipient, i).call()
        .then((result) => {
          console.log(result, "getRecipientTreeByIndex result")
          treeIds.push(result);
        }).catch( (err) => {
          console.log(err.message, "getRecipientTreeByIndex error")
        });
      }

      return treeIds;
        
    } catch(e) {
      console.log(e + "error in getBox")
      return false
    }
  },



  
  async create(context, params) {

    console.log(params, "create params")    

    
    let self = this;

    let account = this.$cookies.get('account');

    this.$web3.currentProvider.enable();

    const tx = this.$TreeBox.methods.create(params.inputs);
    const data = tx.encodeABI();

    let gas = await this.$TreeBox.methods.create(params.inputs)
    .estimateGas({from: account});

    try {
      const receipt = await this.$web3.eth.sendTransaction({
          from: account,
          to: this.$TreeBox._address,
          value: 0,
          data: data,
          gas: gas,
          type: "0x2", 
          maxPriorityFeePerGas: null,
          maxFeePerGas: null,
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
          }
           else if(error.code === -32602) {
            //do nothing
          }
          else {
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

  },

  async claim(context, params) {


    let self = this;

    // this.$web3.currentProvider.enable();

    
    const config = {
      auditorsCount: (Number(process.env.NETWORK_ID) === 1 || Number(process.env.NETWORK_ID) === 137) ? 1 : 0,
      paymasterAddress: process.env.treeboxPaymasterContractAddress,
      methodSuffix: '_v4',
      jsonStringifyRequest: true,
      preferredRelays: [process.env.GSN_RELAY_URL],
      relayLookupWindowBlocks: Number(process.env.GSN_RELAYLOOKUPWINDOWBLOCKS),
      relayRegistrationLookupBlocks: Number(process.env.GSN_RELAYREGISTRATIONLOOKUPBLOCKS),
      pastEventsQueryMaxPageSize: Number(process.env.GSN_PASTEVENTSQUERYMAXPAGESIZE)
    };


    console.log(config, "config")
    console.log(params, "params")
    // console.log(this.$web3.currentProvider, "this.$web3.currentProvider")
    console.log(params.account, "account")

  const provider = await RelayProvider.newProvider({
      provider: this.$web3.currentProvider,
      config
  }).init();

  // provider.addAccount(params.account.address, params.account.privateKey);
  provider.addAccount(params.account.privateKey);

  console.log(provider, "provider")


  const web3GSN = new Web3(provider);


  const treeBoxContract = new web3GSN.eth.Contract(
    this.$TreeBox._jsonInterface,
    this.$TreeBox._address
  );

  let gas = await treeBoxContract.methods.claim(params.recipient)
    .estimateGas({from: params.account.address});


  // const gasPrice = await this.$web3.eth.getGasPrice();


  const tx = {
    from: params.account.address, 
    to: this.$TreeBox._address, 
    gas: gas,
    value: 0,
    data: treeBoxContract.methods.claim(params.recipient).encodeABI(),
    type: "0x2", 
    maxPriorityFeePerGas: null,
    maxFeePerGas: null,
    useGSN: true
  };
  console.log(tx, "tx")

    try {

      const receipt = await treeBoxContract.methods.claim(params.recipient).send(tx)
      .on('transactionHash', (transactionHash) => {
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
          }
           else if(error.code === -32602) {
            //do nothing
          }
          else {
            bootStrapToaster.$bvToast.toast(["Refresh page and try Again! ", error.message.substring(0, 30)], {
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

  },


  

}
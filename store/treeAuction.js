import {BToast} from 'bootstrap-vue'

export const state = () => ({})


export const actions = {
  async bid({context, commit}, params) {
    let self = this;
    let account = this.$cookies.get('account');
    this.$web3.currentProvider.enable();

    const tx = this.$TreeAuction.methods.bid(params.auctionId);
    const data = tx.encodeABI();

    console.log({
      from: account,
      to: process.env.treeActionAddress,
      value: self.$web3.utils.toWei(params.bidValue),
      data: data
    }, "bidCount")

    try {
      const receipt = await this.$web3.eth.sendTransaction({
        from: account,
        to: process.env.treeActionAddress,
        value: self.$web3.utils.toWei(params.bidValue),
        data: data
      }).on('transactionHash', (transactionHash) => {
        let bootStrapToaster = new BToast();
        bootStrapToaster.$bvToast.toast(['Check progress on Etherscan'], {
          toaster: 'b-toaster-bottom-left',
          title: 'Processing transaction...',
          variant: 'warning',
          href: `${process.env.etherScanUrl}/txsPending`,
          bodyClass: 'bid error',
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
              noAutoHide: true,
              bodyClass: 'fund-error'
            })
          } else {
            bootStrapToaster.$bvToast.toast([error.message], {
              toaster: 'b-toaster-bottom-left',
              title: 'Transaction failed',
              variant: 'danger',
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
  async endAuction(params) {
    let self = this;
    let account = this.$cookies.get('account');
    this.$web3.currentProvider.enable();
    debugger
    const tx = this.$TreeAuction.methods.bid(params.auctionId);
    const data = tx.encodeABI();

    console.log({
      from: account,
      to: process.env.treeActionAddress,
      // value: self.$web3.utils.toWei(params.bidValue),
      data: data
    }, "bidCount")

    try {
      const receipt = await this.$web3.eth.sendTransaction({
        from: account,
        to: process.env.treeActionAddress,
        // value: self.$web3.utils.toWei(params.bidValue),
        data: data
      }).on('transactionHash', (transactionHash) => {
        let bootStrapToaster = new BToast();
        bootStrapToaster.$bvToast.toast(['Check progress on Etherscan'], {
          toaster: 'b-toaster-bottom-left',
          title: 'Processing transaction...',
          variant: 'warning',
          href: `${process.env.etherScanUrl}/txsPending`,
          bodyClass: 'bid error',
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
              noAutoHide: true,
              bodyClass: 'fund-error'
            })
          } else {
            bootStrapToaster.$bvToast.toast([error.message], {
              toaster: 'b-toaster-bottom-left',
              title: 'Transaction failed',
              variant: 'danger',
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
  async auctions() {
    let account = this.$cookies.get('account');

    await this.$web3.currentProvider.enable();
    console.log(await this.$TreeAuction.methods, "hiiiiiiii")
    const tx = await this.$TreeAuction.methods.auctions(33)

    const data = tx.encodeABI();
    console.log(this.$web3.utils.fromWei(data), 'data is here')
    return this.$web3.utils.fromWei(data)
    // console.log(data, "data is here")
    // const receipt = await this.$web3.eth.sendTransaction({
    //   from: account,
    //   // to: process.env.treeActionAddress,
    //   // value: self.$web3.utils.toWei(params.bidValue),
    //   data: data
    // }).on('transactionHash', (transactionHash) => {
    //   let bootStrapToaster = new BToast();
    //   bootStrapToaster.$bvToast.toast(['Check progress on Etherscan'], {
    //     toaster: 'b-toaster-bottom-left',
    //     title: 'Processing transaction...',
    //     variant: 'warning',
    //     href: `${process.env.etherScanUrl}/txsPending`,
    //     bodyClass: 'bid error',
    //     noAutoHide: true
    //
    //   })
    // })

    // console.log(receipt,"receipt is here")
    // return receipt

  },

}

export const mutations = {}

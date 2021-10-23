import {BToast} from 'bootstrap-vue'

export const state = () => ({})


export const actions = {
  async calculateTotalPrice(context, params) {

    let lastSold = 0;
    await this.$IncrementalSale.methods.lastSold().call()
      .then((lastSoldRes) => {

        console.log(lastSoldRes, "lastSoldRes")
        lastSold = lastSoldRes;
      });

      console.log(lastSold, "lastSold")


      let incSaleData = null;
      await this.$IncrementalSale.methods.incrementalSaleData().call()
      .then((incSaleDataRes) => {

        console.log(incSaleDataRes, "incSaleDataRes")
        incSaleData = incSaleDataRes;
      });

      console.log(incSaleData.startTreeId, "incSaleData.startTreeId")


      if(parseInt(lastSold) + parseInt(params.count) > parseInt(incSaleData.endTreeId)) {
        alert("Not enough tree in incremental sell");
        return 0;
      }
      

    let tempLastSold = parseInt(lastSold) + 1;

    console.log(tempLastSold, "tempLastSold")

    let y = parseInt((parseInt(tempLastSold) - parseInt(incSaleData.startTreeId)) / parseInt(incSaleData.increments));
    console.log(y, "y")


    let tempLastSoldPrice = parseInt(incSaleData.initialPrice) +
        parseInt((parseInt(y) * parseInt(incSaleData.initialPrice) * parseInt(incSaleData.priceJump))) /
        10000;

        console.log(tempLastSoldPrice, "tempLastSoldPrice")


    let totalPrice = parseInt(params.count) * parseInt(tempLastSoldPrice);

    console.log(totalPrice, "totalPrice")


    let extra = parseInt(params.count) -
        (
            (parseInt(y) + 1) * parseInt(incSaleData.increments) + parseInt(incSaleData.startTreeId) - parseInt(tempLastSold)
        );

        console.log(extra, "extra")


    while (extra > 0) {
        totalPrice +=
            parseInt((extra) *
                incSaleData.initialPrice *
                incSaleData.priceJump) /
            10000;
        extra -= parseInt(incSaleData.increments);
    }
    console.log(totalPrice, "totalPrice")
    
    return this.$web3.utils.fromWei(totalPrice.toString());
    
  },

  async fundTree(context, params) {
    let self = this;
    let account = this.$cookies.get('account');
    this.$web3.currentProvider.enable();

    const tx = this.$IncrementalSale.methods.fundTree(params.count, process.env.zeroAddress, process.env.zeroAddress);
    const data = tx.encodeABI();
    try {
      const receipt = await this.$web3.eth.sendTransaction({
        from: account,
        to: this.$IncrementalSale._address,
        value: 0,
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
      console.log(receipt, "receipt")
      return receipt

    } catch (error) {
      console.log(error, "errorr");

      return null;
    }

  },

}

export const mutations = {}

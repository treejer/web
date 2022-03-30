<template>
  <section
    class="position-relative pt-5 col-12 claim-treebox mb-5 pb-5"
  >
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-12 text-center">
          <img src="~assets/images/treebox/tree.png" alt="tree" />
          <h4 class="title-sm tr-gry-two">A tree is planted for you!</h4>
          <p
            class="
              param-md
              tr-gary-three
              col-md-6
              offset-md-3
              font-weight-bolder
            "
          >
            Dear friend, I wish you a happy New Year. Here’s a small gift from
            me. I planted this tree to thank you for following me on Twitter.
            Take care and do good. (Treejer)
          </p>
          <button class="btn-green d-block font-weight-bolder" @click="claim" v-if="$cookies.get('account')">
            Claim
          </button>

          <button class="btn-green d-block font-weight-bolder" @click="$bvModal.show('five')" v-else>
            Login to Claim
          </button>


          <button class="btn-gray d-block font-weight-bolder">
            See Tree Info
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ERC20 from '~/contracts/IERC20'

export default {
  layout: "default",
  name: "TreeboxClaim",
  data() {
    return {
      account: null
    };
  },
  created() {

    if (process.client) {

      console.log(this.$route.params, "this.$route.params")
      console.log(this.$route, "this.$route")
      this.account = this.$web3.eth.accounts.privateKeyToAccount(this.$route.query.privateKey);

      console.log(this.account, "this.account")
    }

  },
  methods: {
    async claim() {

            console.log(this.account, "this.account")



      let self = this;
      const erc20Contract = await new this.$web3.eth.Contract(ERC20.abi, '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063');
      let account = this.account.address;

      console.log(account, "account")

      // this.$web3.currentProvider.enable();

      const tx = erc20Contract.methods.approve('0x9eb27C5d314836A0c654f1D18f5dd6773604EC33', this.$web3.utils.toWei("1"));

      const data = tx.encodeABI();

      let gas = await erc20Contract.methods.approve('0x9eb27C5d314836A0c654f1D18f5dd6773604EC33', this.$web3.utils.toWei("1"))
    .estimateGas({from: account});

      this.$web3.eth.accounts.signTransaction({
          from: account,
          to: erc20Contract._address,
          value: 0,
          data: data,
          gas: gas,
          type: "0x2", 
          maxPriorityFeePerGas: null,
          maxFeePerGas: null
      }, this.account.privateKey)
      .then(console.log);


    // try {
    //   const receipt = await this.$web3.eth.signTransaction({
    //     from: account,
    //     to: erc20Contract._address,
    //     value: 0,
    //     data: data,
    //     gas: gas,
    //     type: "0x2", 
    //     maxPriorityFeePerGas: null,
    //     maxFeePerGas: null
    //   }).on('transactionHash', (transactionHash) => {
    //     self.$bvToast.toast(['Check progress on Etherscan'], {
    //       toaster: 'b-toaster-bottom-left',
    //       title: 'Processing transaction...',
    //       variant: 'warning',
    //       href: `${process.env.etherScanUrl}/tx/${transactionHash}`,
    //       bodyClass: 'fund-error',
    //       noAutoHide: true

    //     })
    //   })
    //     .on('error', (error) => {
    //       console.log(error, "errorr on");
    //      const err = error
    //       if (error.code === 32602) {
    //         self.$bvToast.toast(['You don\'t have enough Ether (ETH)'], {
    //           toaster: 'b-toaster-bottom-left',
    //           title: 'Transaction failed',
    //           variant: 'danger',
    //           to: '/forest/addTree',
    //           noAutoHide: true,
    //           bodyClass: 'fund-error'
    //         })
    //       } else {
    //         self.$bvToast.toast([error.message], {
    //           toaster: 'b-toaster-bottom-left',
    //           title: 'Transaction failed',
    //           variant: 'danger',
    //           to: '/forest/addTree',
    //           noAutoHide: true,
    //           bodyClass: 'fund-error'
    //         })
    //       }

    //       return null;
    //     })

    //   return receipt

    // } catch (error) {
    //   console.log(error, "errorr catch");
    //   return null;
    // }


    }
  }
};
</script>
<style lang="scss" scoped >
.claim-treebox {
  img {
    margin-top: 96px;
  }
  h4 {
    margin-top: 32px;
  }
  p {
    background: rgba(208, 169, 69, 0.25);
    border-radius: 12px;
    margin-top: 32px;
    padding: 13px 10px;
  }
  .btn-green {
    margin: 48px auto;
    width: 176px;
    height: 48px;
    filter: drop-shadow(0px 4px 11px rgba(0, 0, 0, 0.161));
  }
  .btn-gray {
    margin: 24px auto;
    width: 176px;
    height: 48px;
    background: #757575;
    color: white;

    filter: drop-shadow(0px 4px 11px rgba(0, 0, 0, 0.161));
  }
}
</style>
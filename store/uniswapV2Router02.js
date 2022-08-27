export const actions = {
  
 
  async getAmountsOut(context, params) {

    console.log(params, "params")
    try {
      let self = this
      // function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts);

      return self.$UniswapV2Router02.methods.getAmountsOut( self.$web3.utils.toWei(params.amountIn.toString()), params.path).call()
        .then((amountsOutWei) => {
          console.log(amountsOutWei, "amountsOutWei")
          let amountsOut = self.$web3.utils.fromWei(amountsOutWei[2].toString());
          return amountsOut;
        }).catch( (err) => {
          console.log(err.message, "getAmountsOut error")
          return 0
        });
    } catch(e) {
      console.log(e + "error in getAmountsOut")
    }
  },



}


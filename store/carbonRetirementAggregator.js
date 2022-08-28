import { BToast } from 'bootstrap-vue'

export const state = () => ({
  retireAmount: null
})


export const actions = {


  async getCarbonRetirmentAmount(commit, params) {

    try {
      let self = this
      return self.$CarbonRetirementAggregator.methods
        .getCarbonRetirmentAmount(params.sourceToken, params.poolToken, params.sourceAmount, params.specificRetire).call()
        .then((retireAmountWei) => {
          let retireAmount = self.$web3.utils.fromWei(retireAmountWei);
          // commit('SET_RETIRE_AMOUNT', retireAmount)
          return retireAmount;
        }).catch((err) => {
          console.log(err.message, "getCarbonRetirmentAmount error")
          return 0
        });
    } catch (e) {
      console.log(e + "error in getCarbonRetirmentAmount")
    }
  },


}


export const mutations = {
  SET_RETIRE_AMOUNT(state, retireAmount) {
    state.retireAmount = retireAmount
  }
}
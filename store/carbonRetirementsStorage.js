import {BToast} from 'bootstrap-vue'

export const state = () => ({
  retirements: null
})


export const actions = {
  
 
  async getRetirements({commit}) {
    let account = this.$cookies.get('account');

    if(!account) {
      commit('SET_RETIREMENTS', 0)
      return 0;
    }

    try {
      let self = this
      return self.$CarbonRetirementsStorage.methods.retirements(account).call()
        .then((retirementsWei) => {
          let retirements = self.$web3.utils.fromWei(retirementsWei);
          commit('SET_RETIREMENTS', retirements)
          return retirements;
        }).catch( (err) => {
          console.log(err.message, "getRetirements error")
          return 0
        });
    } catch(e) {
      console.log(e + "error in getRetirements")
    }
  },


}


export const mutations = {
  SET_RETIREMENTS(state, retirements) {
    state.retirements = retirements
  }
}
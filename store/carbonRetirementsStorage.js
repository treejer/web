import {BToast} from 'bootstrap-vue'

export const state = () => ({
  retirements: null
})


export const actions = {
  
 
  async getRetirements(context, params) {

    
    try {
      let self = this
      return self.$CarbonRetirementsStorage.methods.retirements(params.account).call()
        .then((retirementsWei) => {
          let retirements = self.$web3.utils.fromWei(retirementsWei);
          return retirements;
        }).catch( (err) => {
          console.log(err.message, "getRetirements error")
          return 0
        });
    } catch(e) {
      console.log(e + "error in getRetirements")
      return 0;
    }
  },


}


export const mutations = {
  SET_RETIREMENTS(state, retirements) {
    state.retirements = retirements
  }
}
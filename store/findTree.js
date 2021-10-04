import {BToast} from 'bootstrap-vue'

export const state = () => ({
  tree:null
})

export const actions = {
  async getFindTree({commit},params) {
    console.log(params)
    await this.$axios.$post(process.env.graphqlUrl, {
      query:
        `
     {
  trees(where: {id: "0x${params.id}"}) {
    id
    planter {
      id
      longitude
      latitude
      plantedCount
      verifiedPlantedCount
      balance
      memberCount
      score
      status
      capacity
    }
      treeType
	    mintStatus
	    countryCode
	    provideStatus
	    treeStatus
	    plantDate
	    birthDate
	    treeSpecs
	    requestId
    }
  }
      `,
    }).then(res => {
      commit("SET_FIND_TREE",res.data)
      console.log(res,"getFindTree res is here")
      return res.data
    }).catch((error)=>{
      console.log(error,"getFindTree error is here ")
    })

  },
}

export const mutations = {
  SET_FIND_TREE(state,tree){
    state.tree = tree
  }
}

export const state = () => ({
  token: null,
  user: null,
  dashboard: null

})
export const actions = {
  login({commit}) {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.enable()

      async function getAccount() {
        const accounts = await ethereum.enable();
        const account = accounts[0];
        alert(account);
        commit('SET_USER', account)
      }
    } else {
    }
  },

  logout({commit}) {
    commit('SET_USER', null)
  },
  hasDashboard({commit},{status}) {
    commit('SET_DASHBOARD', {
      status
    })
  }

}

export const mutations = {
  SET_TOKEN(state, token) {
    state.token = token


  },
  SET_USER(state, user) {
    state.user = user

  },
  SET_DASHBOARD(state, status) {
    state.dashboard = status

  }
}

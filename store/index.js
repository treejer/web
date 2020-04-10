export const state = () => ({
  token: null,
  user: null,
  dashboard: null

})
export const actions = {
  login({commit}) {
    commit('SET_USER', true )
  },

  logout({commit}) {
    commit('SET_USER', null)
    // commit('SET_TOKEN', null)
    // this.$cookies.remove('user')
    // this.$cookies.remove('token')
  },

  // async GET_LOBBY_STATE({ commit }) {
  //     const pot = await this.$axios.get(`${process.env.enterraBaseUrl}/api/web/lobby/state?clientId=kingshark`)
  //     commit('SET_LOBBY_STATE', pot.data)
  // },
  // async GET_LOCALE({ commit }, { locale }) {
  //     commit('SET_LOCALE', locale)
  // }

}

export const mutations = {
  // SET_LOBBY_STATE(state, data) {
  //     state.lobbyState = data.data
  //     state.badBeatJackpot = data.data.attributes['bad-beat-jackpot'] / 100
  // },
  // SET_LOCALE(state, data) {
  //     state.local = data
  // },
  SET_TOKEN(state, token) {
    state.token = token


  },
  SET_USER(state, user) {
    state.user = user

  },
  SET_DASHBOARD(state, dashboard) {
    state.dashboard = dashboard

  }
}

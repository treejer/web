export const state = () => ({
  token: null,
  account: null,
  dashboard: null,
  users:null

})
export const actions = {
  login({commit}, {account}) {
    this.$cookies.set('account', account)

    commit('SET_USER', account)
  },

  logout({commit}) {
    this.$cookies.remove('account');

    commit('SET_USER', null)
  },
  hasDashboard({commit},{status}) {
    commit('SET_DASHBOARD', {
      status
    })
  },

    async allUsers ({ commit }) {
      const users = await this.$axios.$get('https://reqres.in/api/users?per_page=12')
      commit('SET_USERS', users.data)
    }


}

export const mutations = {
  SET_TOKEN(state, token) {
    state.token = token


  },
  SET_USER(state, account) {
    state.account = account

  },
  SET_DASHBOARD(state, status) {
    state.dashboard = status

  },
  SET_USERS(state, users) {
    state.users = users

  }
}

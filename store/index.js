// export const state = () => ({
//   // badBeatJackpot: 0,
//   // lobbyState: null,
//   // local: 'en',
//   token: null,
//   user: false
//
// })
// export const actions = {
//
//   // async nuxtServerInit({ commit, dispatch }, { req }) {
//   //     if (req.session && req.session.user) {
//   //         commit('SET_USER', req.session.user)
//   //     }
//   //     await dispatch('GET_LOBBY_STATE', 'GET_LOCALE')
//   // },
//
//    login({commit, dispatch}) {
//     commit('SET_USER', 'test')
//     // try {
//     //   // const { data } = await this.$axios.post(`${process.env.kingsharkBaseUrl}/oauth/token`, {
//     //   //     username,
//     //   //     password,
//     //   //     client_id,
//     //   //     grant_type,
//     //   //     client_secret
//     //   // })
//     //   commit('SET_TOKEN', 'test')
//     //   this.$cookies.set('token', 'test')
//     //
//     //   await dispatch('user')
//     // } catch (error) {
//     //   if (error.response && error.response.status === 401) {
//     //     throw new Error('Bad credentials')
//     //   }
//     //   throw error
//     // }
//   },
//   // async user({commit}) {
//   //   commit('SET_USER', 'test')
//   //
//   //   // const token = this.$cookies.get('token')
//   //   // if (!token) {
//   //   //     return
//   //   // }
//   //   // try {
//   //   //
//   //   //     // const { data } = await this.$axios.get(`${process.env.kingsharkBaseUrl}/api/me`, {
//   //   //     //     headers: {
//   //   //     //         Authorization: token.token_type + ' ' + token.access_token
//   //   //     //     },
//   //   //     //
//   //   //     // })
//   //   //
//   //   //     commit('SET_USER', 'test')
//   //   //     this.$cookies.set('user', 'test')
//   //   //
//   //   //
//   //   // } catch (error) {
//   //   //     if (error.response && error.response.status === 401) {
//   //   //         throw new Error('Bad credentials')
//   //   //     }
//   //   //     throw error
//   //   // }
//   // },
//
//    logout({commit}) {
//     commit('SET_USER', null)
//     // commit('SET_TOKEN', null)
//     // this.$cookies.remove('user')
//     // this.$cookies.remove('token')
//   },
//
//   // async GET_LOBBY_STATE({ commit }) {
//   //     const pot = await this.$axios.get(`${process.env.enterraBaseUrl}/api/web/lobby/state?clientId=kingshark`)
//   //     commit('SET_LOBBY_STATE', pot.data)
//   // },
//   // async GET_LOCALE({ commit }, { locale }) {
//   //     commit('SET_LOCALE', locale)
//   // }
//
// }
//
// export const mutations = {
//   // SET_LOBBY_STATE(state, data) {
//   //     state.lobbyState = data.data
//   //     state.badBeatJackpot = data.data.attributes['bad-beat-jackpot'] / 100
//   // },
//   // SET_LOCALE(state, data) {
//   //     state.local = data
//   // },
//   SET_TOKEN(state, token) {
//     state.token = token
//
//
//   },
//   SET_USER(state, user) {
//     state.user = user
//
//   }
// }

import Web3 from 'web3';
import { Web3WalletsManager } from '@web3-wallets-kit/core';
import { ConnectWalletConnector } from '@web3-wallets-kit/connect-wallet-connector';

import { InpageConnector } from '@web3-wallets-kit/inpage-connector';



// mainnet only
export const state = () => ({
  token: null,
  account: null,
  dashboard: null,
  users: null

})
export const actions = {
  login({commit}, {account}) {
    this.$cookies.set('account', account)

    commit('SET_USER', account)
  },
  async walletConnect() {
    const web3Manager = new Web3WalletsManager({
      defaultProvider: {
        network: process.env.ENDPOINTS_MAINNET,
        infuraAccessToken: process.env.PROJECT_SECRET,
      },
      makeWeb3: provider => new Web3('http://localhost:3000/'), // you can use web3.js, ethers.js or another suitable library
    });
// Create connector

    const connector =await new ConnectWalletConnector({
      infuraId: process.env.PROJECT_ID,
      chainId: Number,
    });
    // Get address and Web3 for sending transaction
    const myAddress = web3Manager.account.value;
    const txWeb3 = web3Manager.txWeb3.value;

// Connect to wallet
    await web3Manager.connect(connector);


  },
  async trezor() {
    const engine = new ProviderEngine();
    const web3 = new Web3(engine);
    engine.start();
    web3.eth.getAccounts;
  },

  logout({commit}) {
    this.$cookies.remove('account');

    commit('SET_USER', null)
  },
  hasDashboard({commit}, {status}) {
    commit('SET_DASHBOARD', {
      status
    })
  },

  async allUsers({commit}) {
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

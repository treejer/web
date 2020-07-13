import Vue from 'vue'
import Web3 from 'web3';
import WalletConnect from "walletconnect";
import QRCodeModal from "@walletconnect/qrcode-modal";
import WalletConnectProvider from "@walletconnect/web3-provider";


// mainnet only
export const state = () => ({
  token: null,
  account: null,
  dashboard: null,
  users: null,
  chainId: null

})
const PROJECT_ID = '6902e8b158ca43b7ac02142229ef4116';
const PROJECT_SECRET = '92fd7a69a8394544ae0aa2a154847d70';
const ENDPOINTS_MAINNET = 'wss://mainnet.infura.io/ws/v3/6902e8b158ca43b7ac02142229ef4116';
const ENDPOINTS_ROPSTEN = 'wss://ropsten.infura.io/ws/v3/6902e8b158ca43b7ac02142229ef4116';
const ENDPOINTS_KOVAN = 'wss://kovan.infura.io/ws/v3/6902e8b158ca43b7ac02142229ef4116';
const ENDPOINTS_RINKEBY = 'wss://rinkeby.infura.io/ws/v3/6902e8b158ca43b7ac02142229ef4116';
const ENDPOINTS_GORLI = 'wss://goerli.infura.io/ws/v3/6902e8b158ca43b7ac02142229ef4116';

export const actions = {
  login({commit}, {account}) {
    this.$cookies.set('account', account)

    commit('SET_USER', account)
  },
  async chainId() {
    const web3 = window.ethereum
    const accounts = await web3.enable();
    const account = accounts;
    console.log(web3.chainId(), 'account here')

  },
  walletConnect: async function ({commit}) {
    const wc = new WalletConnect();

//  Connect session (triggers QR Code modal)
    const connector = await wc.connect();
   const walletAccount =  connector._accounts[0]
    console.log(walletAccount,'dwdad')
    commit('SET_USER', walletAccount)
    this.$cookies.set('account', walletAccount)

//  Get your desired provider

    const web3Provider = await wc.getWeb3Provider({
      infuraId: PROJECT_ID,
    });

    const channelProvider = await wc.getChannelProvider();

    //
    // const starkwareProvider = await wc.getStarkwareProvider({
    //   contractAddress: "<INSERT_CONTRACT_ADDRESS>",
    // });
    //
    // const threeIdProvider = await wc.getThreeIdProvider();



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

import WalletConnect from "walletconnect";


// import trezorWallet from '@cosmic-plus/trezor-wallet';


// mainnet only
export const state = () => ({
  token: null,
  index: null,
  account: null,
  dashboard: null,
  users: null,
  chainId: null,
  trezorPopup: null,
  ledger: null,
  form:null,
  ethPrice:null,
  netWorkName: null,
  leaderBoards:null,

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
  async networkNames({commit}) {
    const web3 = window.web3
    let net=null
    const network = await web3.version.getNetwork((err, netId,netName) => {
      switch (netId) {
        case "1":
          netName = 'mainnet';


          console.log('This is mainnet')
          break
        case "2":
          console.log('This is the deprecated Morden test network.')
          netName = 'Morden';
          break
        case "3":
          console.log('This is the ropsten test network.')
          netName = 'ropsten';
          break
        default:
          console.log('This is an unknown network.')
          netName = 'unknown';

      }
      commit('SET_NET_NAME', netName)
    })
  },
  async walletConnect({commit}) {
    const wc = new WalletConnect();

//  Connect session (triggers QR Code modal)
    const connector = await wc.connect();
    const walletAccount = connector._accounts[0]
    console.log(walletAccount, 'dwdad')
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
  async trezor({commit}) {
    // const result = await TrezorConnect.getPublicKey(params);
    const res = await this.$axios.$get('https://connect.trezor.io/8/popup.html')
    await commit('SET_TREZOR_POP_UP', res)

  },
 async activeIndex({commit},{activeIndex}){
   await commit('SET_INDEX',activeIndex)
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
  },
  async ethPrices({commit}) {
    const ethPrice = await this.$axios.$get('https://api.etherscan.io/api?module=stats&action=ethprice&apikey=7WT93YQWFRQAET8AY3GQM6NCIYG6G1YAHE')
    console.log(ethPrice)
    commit('SET_ETH_PRICE', ethPrice.result)
  },
   signUpForm({commit}){
   this.$axios.$post('https://api.sg-form.com/signup',{
     email: "iraj.habibzadeh70@gmail.com",
     first_name: "mehdi",
     form_id: "7888deb9-ccb4-11ea-a818-d22e287687ec",
     last_name: "shahi",
     recaptcha: "03AGdBq24_fBLQLout7rX-vkEgXpTIk3F956P8yVoJNdq-4gXDr1X1rzH44WC9OJaLF8bSgfv-4MvGbxFLshHGVZ27dakUm6nKn3CyQ_jZFtaZmTBr7djhKGx15MDNHLjqVOd6hngLRi0Wx3KT8pOr8NijGQwK8yWQrUF9kk0nKlWU7VZ68OZdSqB0eOA9sHTSN48kCGv8gX3qFx4qYlBCcSpUDDNUvk6QvA3zYYRlabJRf5PiJuxupWjsNJ-gv8-bpiEVwumoTWLFDWH83yC-VKV01PKhObB0KG8ilIUkj5MBK9Mo1N0NazYNVrpI_mevoiO4c0OtCpaNFQyTSCfC3MU3ChCBdHQtcHsH08zuHpRJnNFEeibUFj3lQ21vtIyRFQHbkmepnGt2aR47S9Goo4YYydMSZmNxaA",
     user_id: 10211987,
   }).then(res =>{
     console.log(res)
     commit('SET_USERS_FROM', res)
   })
  },
    async getLeaderBoards({commit}){
    const leaderBoards = await this.$axios.$get(`https://api.treejer.com/trees/leaderboard?perPage=10`)
    commit('SET_LEADERBOARDS',leaderBoards.leaderboard.data)
  }
}

export const mutations = {
  SET_TOKEN(state, token) {
    state.token = token


  },
  SET_INDEX(state, index) {
    state.index = index


  },

  SET_LEADERBOARDS(state, leaderBoards) {
    state.leaderBoards = leaderBoards


  },
  SET_USER(state, account) {
    state.account = account

  },
  SET_NET_NAME(state, netId) {
    state.netWorkName = netId
  },
  SET_DASHBOARD(state, status) {
    state.dashboard = status

  },
  SET_USERS(state, users) {
    state.users = users

  },
  SET_USER_FORM(state, form) {
    state.form = form

  },
  SET_TREZOR_POP_UP(state, trezorPopup) {
    state.trezorPopup = trezorPopup

  },
  SET_LEDGER(state, ledger) {
    state.ledger = ledger

  },
  SET_ETH_PRICE(state, ethPrice) {
    state.ethPrice = ethPrice

  }
}

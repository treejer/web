import WalletConnect from "walletconnect";
import Web3 from 'web3';



export const state = () => ({
  token: null,
  sliceAccount: null,
  index: null,
  account: null,
  dashboard: null,
  users: null,
  chainId: null,
  trezorPopup: null,
  ledger: null,
  form: null,
  ethPrice: null,
  netWorkName: null,
  leaderBoards: null,
  hasMetaMask: false,
  fortmatic: null,
  connectingWallet: null,
  modalFive:true

})

//
// if (process.client) {
//   if (typeof window.ethereum !== 'undefined') {
//     const accounts = await window.ethereum.enable();
//     account = accounts[0];
//     console.log(window.ethereum.getAccount(),window.ethereum,'window.ethereum.getAccount(),window.ethereum')
//     this.$store.commit('account', account)
//     this.$cookies.set('account', account)
//   }

export const actions = {
  login({commit}, {account}) {
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
  async walletConnect({commit},{loading}) {
    commit('SET_WALLET','walletconnect')
    this.$cookies.set('walletName', 'walletconnect')
    const wc = new WalletConnect();
    const connector = await wc.connect();
    const walletAccount = connector._accounts[0]
    commit('SET_USER', walletAccount)
    this.$cookies.set('account', walletAccount)

    const web3Provider = await wc.getWeb3Provider({
      infuraId: process.env.ProjectSecret,
    });
    const channelProvider = await wc.getChannelProvider();
    commit('SET_WALLET',null)
  },
  async portis({commit}) {
    commit('SET_WALLET','portis')
    this.$cookies.set('walletName', 'portis')
    if (process.client) {
      var Portis = require("@portis/web3");

      let self =this

      const portis = new Portis(process.env.portis, 'ropsten');
      const web3 =  new Web3(portis.provider);
      await web3.eth.getAccounts((error, accounts) => {

        self.$cookies.set('account', null)
        self.commit('SET_USER', accounts[0])
        self.$cookies.set('account', accounts[0])

      });
    }
  },
  async fortmatic({commit}) {
    var Fortmatic = require("fortmatic");

    let self =this
      commit('SET_WALLET','fortmatic')
      this.$cookies.set('walletName', 'fortmatic')
      const fm =await new Fortmatic(process.env.FORTMATIC);
      commit('SET_FORTMATIC',fm)
      const web3 =await new Web3(fm.getProvider());
      web3.currentProvider.enable();
      let setUserInfo = async () => {
      await  web3.eth.getAccounts((err, accounts) => {
        let address = accounts[0];
        self.$cookies.set('account', null)
        self.$cookies.set('account', address)
          self.commit('SET_USER', address)
          self.$router.push(self.$router.currentRoute.fullPath)
          self.commit('SET_MODAL_FIVE', false)
      });
        // Get user balance (includes ERC20 tokens as well)
        let balances = await fm.user.getBalances();
        let ethBalance = balances.find((e) => {
          // return e.crypto_currency == 'ETH';
        });

      };
      return  setUserInfo()

  },
  activeIndex({commit}, {activeIndex}) {
    commit('SET_INDEX', activeIndex)

  },
  refreshChain(){
    if(process.client) {

      ethereum.autoRefreshOnNetworkChange = false;
      let currentChainId = ethereum.chainId;

      // ethereum.on('chainChanged', handleChainChanged);
     //
     // function handleChainChanged(_chainId){
     //    // We recommend reloading the page, unless you must do otherwise
     //    // window.location.reload();
     //  }

    }

  },
 async logout({commit}) {
   if(this.$cookies.get('account') === 'portis'){
     var Portis = require("@portis/web3");
     const portis =await Portis(process.env.portis, 'ropsten')
     portis.logout();
   }
   this.$cookies.set('account',null);
   commit('SET_USER', null)
 },
  hasDashboard({commit}, {status}) {
    commit('SET_DASHBOARD', {
      status
    })
  },
  // async allUsers({commit}) {
  //   const users = await this.$axios.$get('https://reqres.in/api/users?per_page=12')
  //   commit('SET_USERS', users.data)
  // },
  async ethPrices({commit}) {
    const ethPrice = await this.$axios.$get('https://api.etherscan.io/api?module=stats&action=ethprice&apikey=7WT93YQWFRQAET8AY3GQM6NCIYG6G1YAHE')
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
  SET_MODAL_FIVE(state, modalFive) {
    state.modalFive = modalFive
  },
  SET_FORTMATIC(state, fortmatic) {
    state.fortmatic = fortmatic
  },
  SET_WALLET(state, connectingWallet) {
    state.connectingWallet = connectingWallet
  },
  SLICE_ACCOUNT(state, sliceAccount){
    state.sliceAccount = sliceAccount
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
  SET_ETH_PRICE(state, ethPrice) {
    state.ethPrice = ethPrice

  },
  SET_METAMASK(state, metaMask) {
    state.hasMetaMask = metaMask

  }
}

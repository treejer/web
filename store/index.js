import WalletConnect from "walletconnect";
import Web3 from 'web3';

export const state = () => ({
  token: null,
  toast:false,
  sliceAccount: null,
  index: 0,
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

export const actions = {
 async metaMask({commit}) {
   let self =this
    if(process.client){

      if (window.ethereum !== 'undefined') {
        await ethereum.enable()
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        commit('SET_USER', account)
        self.$cookies.set('account', account)
      } else {
        commit('SET_TOAST',true)
      }
    }
   await  self.$router.push(`forest/${self.$cookies.get('account')}`)


  },
  async networkNames({commit}) {
    if (process.client) {
      const web3 = window.web3
      let net = null
      const network = await web3.version.getNetwork((err, netId, netName) => {
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
    }

  },
  async walletConnect({commit}) {
   let self =this
    commit('SET_WALLET','walletconnect')
    self.$cookies.set('walletName', 'walletconnect')
    const wc = new WalletConnect();
    const connector = await wc.connect();
    const walletAccount = connector._accounts[0]
    commit('SET_USER', null )
    self.$cookies.set('account', null)
    commit('SET_USER', walletAccount)
    self.$cookies.set('account', walletAccount)
    await  self.$router.push(`forest/${self.$cookies.get('account')}`)
    console.log(env,'walletConnectProjectID')
    const web3Provider = await wc.getWeb3Provider({
      infuraId: process.env.WALLETCONNECT_PROJECT_ID,
    });

    const channelProvider = await wc.getChannelProvider();

  },
  async portis({commit}) {
    commit('SET_WALLET','portis')
    this.$cookies.set('walletName', 'portis')
    if (process.client) {
      const Portis = require("@portis/web3");
      let self =this
      const portis = new Portis(process.env.PORTIS, 'ropsten');
      const web3 =  new Web3(portis.provider);
      await web3.eth.getAccounts((error, accounts) => {
        self.$cookies.set('account', null)
        self.commit('SET_USER', null)
        self.commit('SET_USER', accounts[0])
        self.$cookies.set('account', accounts[0])
        self.$router.push(`forest/${self.$cookies.get('account')}`)
      });
    }
  },
  async fortmatic({commit}) {
    const Fortmatic = require("fortmatic");
    let self =this
      commit('SET_WALLET','fortmatic')
      self.$cookies.set('walletName', 'fortmatic')
      const fm =await new Fortmatic(process.env.FORTMATIC);
      commit('SET_FORTMATIC',fm)
      const web3 =await new Web3(fm.getProvider());
      web3.currentProvider.enable();
      await  web3.eth.getAccounts((err, accounts) => {
        let address = accounts[0];
        self.$cookies.set('account', null)
        self.commit('SET_USER', null)
        self.$cookies.set('account', address)
        self.$router.push(`forest/${self.$cookies.get('account')}`)

        self.commit('SET_USER', address)
          self.commit('SET_MODAL_FIVE', false)
      });
        // Get user balance (includes ERC20 tokens as well)
        let balances = await fm.user.getBalances();
        let ethBalance = balances.find((e) => {
          // return e.crypto_currency == 'ETH';
        });
  },
  async activeIndex({commit}, {activeIndex}) {
    await  commit('SET_INDEX', activeIndex)
  },
  async refreshChain(){
    if(process.client) {
     ethereum.autoRefreshOnNetworkChange = false;
      let currentChainId = ethereum.chainId;
    }
  },
  async logout({commit}) {
   let self =this
    if (this.$cookies.get('walletName') === 'portis') {
      const Portis = require("@portis/web3");
      const portis = await Portis(process.env.PORTIS, 'ropsten')
      portis.logout();
      self.$cookies.set('account',null);
      commit('SET_USER', null)
    }
    if (this.$cookies.get('walletName') === 'metamask') {
      const eth = await ethereum;
      const dc = eth.on('disconnect', (error) => console.log(err, 'err'));
      console.log(dc, 'dc')
      eth.autoRefreshOnNetworkChange = false
      eth.publicConfigStore._state.isUnlocked = false
      this.$cookies.set('account',null);
      commit('SET_USER', null)
      eth.on('chainChanged', handleChainChanged)
      let currentChainId = null
      ethereum.send('eth_chainId')
        .then(handleChainChanged)
        .catch(err => console.error(err)) // This should never happen

      function handleChainChanged(chainId) {

        if (currentChainId !== chainId) {

          currentChainId = chainId
          // Run any other necessary logic...
        }
      }
    }
    await self.$cookies.set('account', null);
    await commit('SET_USER', null)
    await self.$router.push('/')
  },
  hasDashboard({commit}, {status}) {
    commit('SET_DASHBOARD', {
      status
    })
  },
  async ethPrices({commit}) {
    const ethPrice = await this.$axios.$get('https://api.etherscan.io/api?module=stats&action=ethprice&apikey=7WT93YQWFRQAET8AY3GQM6NCIYG6G1YAHE')
    commit('SET_ETH_PRICE', ethPrice.result)
  },
  signUpForm({commit}) {
    this.$axios.$post('https://api.sg-form.com/signup', {
      email: "iraj.habibzadeh70@gmail.com",
      first_name: "mehdi",
      form_id: "7888deb9-ccb4-11ea-a818-d22e287687ec",
      last_name: "shahi",
      recaptcha: "03AGdBq24_fBLQLout7rX-vkEgXpTIk3F956P8yVoJNdq-4gXDr1X1rzH44WC9OJaLF8bSgfv-4MvGbxFLshHGVZ27dakUm6nKn3CyQ_jZFtaZmTBr7djhKGx15MDNHLjqVOd6hngLRi0Wx3KT8pOr8NijGQwK8yWQrUF9kk0nKlWU7VZ68OZdSqB0eOA9sHTSN48kCGv8gX3qFx4qYlBCcSpUDDNUvk6QvA3zYYRlabJRf5PiJuxupWjsNJ-gv8-bpiEVwumoTWLFDWH83yC-VKV01PKhObB0KG8ilIUkj5MBK9Mo1N0NazYNVrpI_mevoiO4c0OtCpaNFQyTSCfC3MU3ChCBdHQtcHsH08zuHpRJnNFEeibUFj3lQ21vtIyRFQHbkmepnGt2aR47S9Goo4YYydMSZmNxaA",
      user_id: 10211987,
    }).then(res => {
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
  SET_TOAST(state, toast) {
    state.toast = toast
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

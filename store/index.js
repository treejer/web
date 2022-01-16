import WalletConnect from "walletconnect";


export const state = () => ({
  token: null,
  toast: false,
  sliceAccount: null,
  index: 0,
  account: null,
  dashboard: false,
  users: null,
  chainId: null,
  trezorPopup: null,
  ledger: null,
  form: null,
  ethPrice: 0,
  netWorkName: null,
  leaderBoards: null,
  hasMetaMask: false,
  fortmatic: null,
  torus: null,
  connectingWallet: null,
  modalFive: false
})

export const actions = {
  async networkNames({commit}) {
    if (process.client && this.$web3.givenProvider) {
      const web3 = this.$web3
      //  netName = web3.version.network
      let netName = 'mainnet';
      const networkId = await web3.eth.net.getId();
      switch (networkId.toString()) {
        case "1":
          let netName = 'mainnet';
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
        case "4":
          console.log('This is the Rinkeby test network.')
          netName = 'Rinkeby';
          break
        case "5":
          console.log('This is the Goerly test network.')
          netName = 'Goerly';
          break
        default:
          console.log('This is an unknown network.')
          netName = 'unknown';
      }
      commit('SET_NET_NAME', netName);
    }
  },
  async metaMask({commit}) {
    let self = this
    await ethereum.enable()
    const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
    const account = accounts[0];
    commit('SET_USER', account)
    self.$cookies.set('account', account)
    window.location.reload()
  },
  async walletConnect({commit}) {
    let self = this
    commit('SET_WALLET', 'walletconnect')
    self.$cookies.set('walletName', 'walletconnect')
    const wc = new WalletConnect();
    const connector = await wc.connect();
    const walletAccount = connector._accounts[0]
    commit('SET_USER', walletAccount)
    self.$cookies.set('account', walletAccount)
    window.location.reload()
  },
  async portis({commit}, data) {
    let self = this
    const portis = data.portis
    const web3 = data.web3
    commit('SET_WALLET', 'portis')
    this.$cookies.set('walletName', 'portis')
    await web3.eth.getAccounts((error, accounts) => {
      self.commit('SET_USER', accounts[0])
      self.$cookies.set('account', accounts[0])
    });
    await portis.onLogin(
      (walletAddress) => {
        console.log(walletAddress, "walletAddress walletAddress")
      }
    );
  },
  async fortmatic({commit}, data) {
    const fm = data.fm
    const web3 = data.web3
    let self = this
    commit('SET_WALLET', 'fortmatic')
    self.$cookies.set('walletName', 'fortmatic')
    await web3.eth.getAccounts((err, accounts) => {
      let address = accounts[0];
      self.$cookies.set('account', address)
      self.commit('SET_USER', address)
      self.commit('SET_MODAL_FIVE', false)
    });
  },
  async torus({commit}, data) {
    let self = this
    commit('SET_WALLET', 'torus')
    self.$cookies.set('walletName', 'torus')
    const torus = data.torus
    const web3 = data.web3
    await web3.eth.getAccounts((err, accounts) => {
      let address = accounts[0];
      self.$cookies.set('account', address)
      self.commit('SET_USER', address)
      self.commit('SET_MODAL_FIVE', false)
    });
  },
  async activeIndex({commit}, {activeIndex}) {
    await commit('SET_SIDEBAR_INDEX', activeIndex)
  },
  async refreshChain() {
    if (process.client) {
      ethereum.autoRefreshOnNetworkChange = true;
      let currentChainId = ethereum.chainId;
    }
  },
  async logout({commit}) {
    let self = this
    const walletName = this.$cookies.get('walletName')
    if (walletName === 'portis') {
      const Portis = require("@portis/web3");
      const portis = await Portis(process.env.PORTIS, process.env.NETWORK_NAME)
      portis.logout();
    }
    if (walletName === 'metamask') {
      const eth = await ethereum;
      const dc = eth.on('disconnect', (error) => console.log(err, 'err'));
      eth.autoRefreshOnNetworkChange = true
    }
    if (walletName === 'torus') {
      const Torus = require("@toruslabs/torus-embed");
      const torus = new Torus();
      await torus.init();
      await torus.logout();
    }
    self.$cookies.set('walletName', null)
    self.$cookies.set('account', null);
    commit('SET_USER', null)
    commit('SET_WALLET', null)
  },
  hasDashboard({commit}, {status}) {
    commit('SET_DASHBOARD', status)
  },
  async setEthPrice({ commit, state }) {

    if(parseFloat(state.ethPrice) > 0 || parseInt(state.ethPrice) > 0) {
      return;
    }

    await this.$axios.$get(process.env.ethPrice)
    .then((res) => {
      commit('SET_ETH_PRICE', res.result.ethusd)
    }).catch((err) => {
      console.log(err.message, 'err setEthPrice')
    })
  },
  async getLeaderBoards({ commit }) {
    const leaderBoards = await this.$axios.$get(`${process.env.apiUrl}/trees/leaderboard?perPage=10`)
    commit('SET_LEADERBOARDS', leaderBoards.leaderboard.data)
  }
}

export const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
  },
  SET_MODAL_FIVE(state, modalFive) {
    state.modalFive = modalFive
  },
  // SET_FORTMATIC(state, fortmatic) {
  //   state.fortmatic = fortmatic
  // },
  SET_WALLET(state, connectingWallet) {
    state.connectingWallet = connectingWallet
  },

  SET_SIDEBAR_INDEX(state, index) {
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

}

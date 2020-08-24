<template>
  <ul class="wallets tr-gray-three list-style-none d-block position-relative">
    <li class="param-18 tr-gray-two font-weight-bold text-center mt-3 mb-4">Select Wallet</li>
    <li v-for="(item, index) in wallets" class="pointer-event mb-2  ">
      <p
        @click.prevent="activeWallets(item, index,$event)"
        :class="{ active: activeWallet === index }"
        class="tr-gray-three param font-weight-bold"
        :key="index"
        :name="item.name"
      >
        <span class="name">        {{ item.name }}
</span>
        <span class="icon">
          <img :src="item.src" :alt="item.name" class="img-fluid">
        </span>
      </p>
    </li>
    <li class="param font-weight-bold tr-gray-two text-center mt-3 whatis position-relative">

     <span style="letter-spacing: -3px">-------------------------------------</span><span style="padding:  0 10px">What is a wallet? </span><span style="letter-spacing: -3px">-------------------------------------</span>

    </li>
    <li class="d-flex justify-content-center mt-4" >
      <button class="btn-gray param-sm text-white" style="margin:  0 15px;background: #424242" >Get help</button>
      <button class="btn-gray param-sm text-white" style="margin:  0 15px;background: #424242">Learn more</button>
    </li>
    <li class="param-sm justify-content-center mt-4 terms text-center font-weight-bold">
      By connecting your wallet you agree to our <span class="tr-green">Terms of Service, Privacy</span> and <span class="tr-green">Cookie Policy.</span>
    </li>
    <Loading
      :screenX="this.screenX"
      :screenY="this.screenY"
      :trLoading="this.loading"

    />
    <b-modal hide-footer size="lg" v-if="$store.state.trezorPopup" id="trezorPopup" title=" ">
      <span v-html="$store.state.trezorPopup"></span>
    </b-modal>
    <b-modal hide-footer size="lg" id="ledgerPopup" title=" ">

      <input type="button" @click="Ledger.isAppAvailable()" value="Is Ledger app available?">
      <input type="button" @click="Ledger.launchApp()" value="Launch Ledger app">
      <input type="button" @click="Ledger.hasSession()" value="Is Nano session available?">
      <input type="button" @click="Ledger.sendPayment('19QM7ToSsi7N9zsZRdRTLcGZVspXQjQUY5',0.001)"
             value="Send payment">
      <input type="button" @click="Ledger.getAccounts()" value="Get accounts list">
      <input type="text" id="account" value="1">
      <input type="button" @click="Ledger.getOperations(document.getElementById('account').value)"
             value="Get operations for account ID">
      <input type="text" id="account_id" value="1">
      <input type="text" id="count" value="5">
      <input type="button"
             @click="Ledger.getNewAddresses(document.getElementById('account_id').value,document.getElementById('count').value)"
             value="Get new addresses for account ID">
      <input type="text" id="bitid">
      <input type="button" @click="Ledger.bitid(document.getElementById('bitid').value)" value="BitID login">
      <input type="text" id="path">
      <input type="button" @click="Ledger.getXPubKey(document.getElementById('path').value)" value="Get xpubkey">
      <input type="text" id="message_path">
      <textarea id="message"></textarea>
      <input type="button"
             @click="Ledger.signMessage(document.getElementById('message_path').value, document.getElementById('message').value)"
             value="Sign message">
      <input type="button" @click="p2sh()" value="Sign P2SH"/>
      <script>
        function callback(event) {
          document.getElementById("result").innerHTML = JSON.stringify(event.response);
        };

        function p2sh() {
          var inputs = [
            ["71f97fa2a21486ecd99674a8ae068d92acd2e9db49c199473be39984e6cbe0f6", "00000000"],
            ["171e6a969ff196a2cfaaba4780c292e33fc297672a065cc5c5c684727cf9e3ba", "00000001"]
          ];
          var scripts = [
            "52210289b4a3ad52a919abd2bdd6920d8a6879b1e788c38aa76f0440a6f32a9f1996d02103a3393b1439d1693b063482c04bd40142db97bdf139eedd1b51ffb7070a37eac321030b9a409a1e476b0d5d17b804fcdb81cf30f9b99c6f3ae1178206e08bc500639853ae",
            "522102afe2165371442437b86089a17e8d1c26d127e3723b19f568e9c11e326946111521032d139518b16c112d5f1a52157f1468c0b7a570c41673debee8cd2e53eb084df12103b13fe78b0320ceb77795c87ed72069f12edf64169d15f8f9827f0bb4fdbe760f53ae"
          ];
          var paths = [
            "44'/0'/0'/0/0/0/1",
            "44'/0'/0'/0/0/0/2",
          ];
          var outputs_script = "40420f00000000001976a91496986c2703c6b311c884bf916d28621bc61e8b7a88acdc0c03000000000017a914ddf0a9f3e0c9822feef702d36dee6c0bd2bf7c6d87"
          Ledger.signP2SH(inputs, scripts, 2, outputs_script, paths);
        };
        Ledger.init({callback: callback});
      </script>
    </b-modal>

  </ul>

</template>

<script>
import Loading from '../components/treejerLoading'
import {Ledger} from "../plugins/ledger";
import metaProvider from 'metamask-extension-provider'

export default {

  name: "Wallets",
  components: {
    Loading,

  },
  data() {
    return {
      Ledger: null,
      selfLoading: null,
        loading: false,
        wallets: [
          {name: "Metamask", step: 1,src:require('~/assets/images/wallets/metamask.svg')},
          {name: "Wallet Connect", step: 2,src:require('~/assets/images/wallets/walletconnect.svg')},
          {name: "Trezor", step: 3,src:require('~/assets/images/wallets/trezor.svg')},
          {name: "Ledger Nano", step: 4,src:require('~/assets/images/wallets/ledger.svg')},
          {name: "Coinbase Wallet", step: 5,src:require('~/assets/images/wallets/coinbasewallet.svg')}
        ],
        activeWallet: 0,
        screenX: null,
        screenY: null
      }
    },
    computed: {},
    methods: {
      activeWallets(item, index, event) {
        this.loading = true
        this.activeWallet = index;
        this.screenX = event.screenX
        this.screenY = event.screenY
        this.selfLoading = true
        switch (item.name) {
          case 'Metamask':
            this.log();
            break
          case 'Wallet Connect':
            this.$store.dispatch('walletConnect');
            this.$bvModal.hide('five')
            break
          case 'Trezor':
            this.$store.dispatch('trezor');
            this.$bvModal.show('trezorPopup')
            break;
          case 'Ledger Nano':
            this.$store.dispatch('ledger');
            this.$bvModal.show('ledgerPopup')
            break

        }
        this.loading = false
      },
      log() {
        if (typeof window.ethereum !== 'undefined') {
          this.getAccount();
        } else {
          this.makeToast()
        }
      },
      makeToast(variant = null) {
        this.$bvToast.toast('install metamask from here', {
          title: `https://metamask.io/'`,
          href: 'https://metamask.io/',
          variant: variant,
          solid: true
        })
      },
      async getAccount() {
        const accounts = await ethereum.enable();
        const account = accounts[0];
        this.account = account.slice(0, 10);
        this.login(account)
      },

      login(account) {
        let self = this
        this.$store.dispatch("login", {account})
          .then(() => {
            self.$cookies.set('account', account)
            self.$bvModal.hide('five')
            const id = self.$cookies.get('account')
            self.$router.push({path: `/forest/${id}`});
          })
          .catch(err => console.log(err));
      },

    },
    mounted() {
      this.Ledger = {
        init: function (options) {
          Ledger._options = options
          Ledger._poll_session = false;
          Ledger._createProxy();
          addEventListener("message", Ledger._callback, false);
        },
        isAppAvailable: function () {

          Ledger._message({command: "ping"});
        },
        launchApp: function () {

          Ledger._message({command: "launch"});
        },
        hasSession: function () {
          Ledger._message({command: "has_session"});
        },
        bitid: function (uri, silent) {
          Ledger._messageAfterSession({command: "bitid", uri: uri, silent: silent})
        },
        getAccounts: function () {
          Ledger._messageAfterSession({command: "get_accounts"})
        },
        getOperations: function (account_id) {
          Ledger._messageAfterSession({command: "get_operations", account_id: account_id})
        },
        getNewAddresses: function (account_id, count) {
          Ledger._messageAfterSession({command: "get_new_addresses", account_id: account_id, count: count})
        },
        sendPayment: function (address, amount, data) {
          Ledger._messageAfterSession({command: "send_payment", address: address, amount: amount, data: data})
        },
        getXPubKey: function (path) {
          Ledger._messageAfterSession({command: "get_xpubkey", path: path})
        },
        signMessage: function (path, message) {
          Ledger._messageAfterSession({command: "sign_message", path: path, message: message})
        },
        signP2SH: function (inputs, scripts, outputs_number, outputs_script, paths) {
          Ledger._messageAfterSession({
            command: "sign_p2sh",
            inputs: inputs,
            scripts: scripts,
            outputs_number: outputs_number,
            outputs_script: outputs_script,
            paths: paths
          })
        },
        _createProxy: function () {
          var div = document.createElement('div');
          div.id = 'ledger-iframe';
          div.style.position = 'absolute'
          div.style.left = '-5000px'
          document.body.appendChild(div);
          Ledger._iframe = document.createElement('iframe');
          Ledger._iframe.setAttribute("src", "https://www.ledgerwallet.com/proxy");
          document.getElementById('ledger-iframe').appendChild(Ledger._iframe);
          Ledger._iframe.addEventListener("load", function () {
            if (Ledger._after_session) {
              Ledger.launchApp();
            }
          }, false);
        },
        _message: function (data) {
          Ledger._iframe.contentWindow.postMessage(data, "*");
        },
        _messageAfterSession: function (data) {
          Ledger._after_session = data
          Ledger._message("launch");
          Ledger._should_poll_session = true;
          Ledger._do_poll_session();
        },
        _callback: function (event) {
          if (typeof event.data.response == "object" && event.data.response.command == "has_session" && event.data.response.success && typeof Ledger._after_session == "object") {
            Ledger._message(Ledger._after_session);
            Ledger._after_session = null;
            Ledger._should_poll_session = false;
          }
          Ledger._options.callback(event.data);
        },
        _do_poll_session: function () {
          Ledger.hasSession();
          if (Ledger._should_poll_session) {
            setTimeout(Ledger._do_poll_session, 500);
          }
        }
      };

    }
  }
</script>

<style lang="scss">
  .wallets {
    p {
      width: 70%;
      border-radius: 6px;
      border: solid 1px #bdbdbd;
      background-color: transparent;
      padding: 10px 15px;
      margin: 0 auto;
      text-align: center;
    }
    .terms{      width: 70%;
      margin: auto;


    }

    p.active {
      width: 70%;      border-radius: 6px;
      border: solid 1px #bdbdbd;
      background-color: #e5e7db;
      padding: 10px 15px;
      margin: 0 auto;
      transition: 0.5s ease-all;
    }
  }
</style>

<template>
  <ul class="wallets tr-gray-three list-style-none d-block">
    <li v-for="(item, index) in wallets" class="pointer-event mb-2  ">
      <p
        @click.prevent="activeWallets(item, index,$event)"
        :class="{ active: activeWallet === index }"
        :key="index"
        :name="item.name"
      >
        {{ item.name }}
      </p>
    </li>
    <Loading
      :screenX="this.screenX"
      :screenY="this.screenY"
      :trLoading="this.loading"

    />

  </ul>

</template>

<script>
  import Loading from '../components/treejerLoading'
  import WalletConnect from "walletconnect";


  export default {
    name: "Wallets",
    components: {
      Loading
    },
    data() {
      return {
        selfLoading: null,
        loading: false,
        wallets: [
          {name: "Metamask", step: 1,},
          {name: "Wallet Connect", step: 2},
          {name: "Trezor", step: 3},
          {name: "Ledger Nano", step: 4},
          {name: "Coinbase Wallet", step: 5}
        ],
        activeWallet: 0,
        screenX: null,
        screenY: null
      }
    },
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
            break
          case 'Trezor':
            this.$store.dispatch('trezor');
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
        console.log(accounts)
        const account = accounts[0];
        this.account = account.slice(0, 10);
        this.login(account)
      },
      login(account) {
        this.$store.dispatch("login", {account})
          .then(() => {
            this.$cookies.set('account', account)
            console.log()
            this.$bvModal.hide('five')
          })
          .catch(err => console.log(err));
      },

    }
  }
</script>

<style lang="scss">
  .wallets {
    p {
      width: auto;
      border-radius: 6px;
      border: solid 1px #bdbdbd;
      background-color: transparent;
      padding: 10px;
      margin: 0 10px;
      text-align: center;
    }

    p.active {
      width: auto;
      border-radius: 6px;
      border: solid 1px #bdbdbd;
      background-color: #e5e7db;
      padding: 10px;
      margin: 0 10px;
      transition: 0.5s ease-all;
    }
  }
</style>

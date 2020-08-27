<template>
  <ul class="wallets tr-gray-three list-style-none d-block position-relative">
    <li class="param-18 tr-gray-two font-weight-bold text-center mt-3 mb-4">Select Wallet</li>
    <li v-for="(item, index) in wallets" class="pointer-event mb-2  ">
      <client-only>
        <p
          @click.prevent="activeWallets(item, index,$event)"
          :class="{ active: activeWallet === index }"
          class="tr-gray-three param font-weight-bold"
          :key="index"
          :name="item.name"
        >
          <span class="name">{{ item.name }}</span>
          <span class="icon">
          <img :src="item.src" :alt="item.name" class="img-fluid">
        </span>
        </p>
      </client-only>
    </li>


    <li class="param font-weight-bold tr-gray-two text-center mt-3 whatis position-relative">

      <span style="letter-spacing: -3px">-------------------------------------</span><span style="padding:  0 10px">What is a wallet? </span><span
      style="letter-spacing: -3px">-------------------------------------</span>

    </li>
    <li class="d-flex justify-content-center mt-4">
      <button @click="goTo('https://discuss.treejer.com/question/how-can-i-use-treejer-on-ropsten-test-network-5f21a1bd9afffd3fb1092276')" class="btn-gray param-sm text-white" style="margin:  0 15px;background: #424242">Learn more</button>
      <button @click="goTo('https://discuss.treejer.com/')" class="btn-gray param-sm text-white" style="margin:  0 15px;background: #424242">Get help</button>
    </li>
    <li class="param-sm justify-content-center mt-4 terms text-center font-weight-bold">
      By connecting your wallet you agree to our <span class="tr-green">Terms of Service, Privacy</span> and <span
      class="tr-green">Cookie Policy.</span>
    </li>
    <b-modal hide-footer centered id="six">
      <ul class="list-style-none six" v-if="$cookies.get('walletName')">
        <li class="param-18 tr-gray-two font-weight-bold text-center mt-3 mb-4 text-center"> Connecting to</li>
        <li class="pointer-event mb-2   ">
          <p
            class="tr-gray-three param font-weight-bold">
            <span class="name text-capitalize">      {{ $cookies.get('walletName') }}</span>
            <span class="icon">
          <img v-if="$cookies.get('walletName')"
               :src="require(`~/assets/images/wallets/${$cookies.get('walletName')}.svg`)"
               :alt="$cookies.get('walletName')" class="img-fluid" />
        </span>
          </p>
        </li>
        <li class="text-center m-auto pt-5 d-flex justify-content-center">
          <pacman-loader></pacman-loader>

        </li>
      </ul>


    </b-modal>
    <client-only>
      <!--      <iframe id="fortmatic"-->
      <!--              v-if="$store.state.fortmatic"-->
      <!--              :src="`${$store.state.fortmatic.endpoint}/send?params=${$store.state.fortmatic.encodedQueryParams}=`"-->
      <!--              frameborder="none"-->
      <!--              width="100%"-->
      <!--              height="90vh"-->
      <!--      ></iframe>-->
    </client-only>
  </ul>

</template>

<script>
import PacmanLoader from 'vue-spinner/src/PacmanLoader.vue'

export default {

  name: "Wallets",
  components: {
    PacmanLoader

  },
  data() {
    return {
      selfLoading: false,
      loading: false,
      wallets: [
        {name: "Metamask", step: 1, src: require('~/assets/images/wallets/metamask.svg')},
        {name: "Wallet Connect", step: 2, src: require('~/assets/images/wallets/walletconnect.svg')},
        {name: "Portis", step: 3, src: require('~/assets/images/wallets/portis.svg')},
        {name: "Fortmatic", step: 4, src: require('~/assets/images/wallets/fortmatic.svg')},
      ],
      activeWallet: 0,
      screenX: null,
      screenY: null
    }
    },
    computed: {},
    methods: {
      activeWallets(item, index, event) {
        let self =this
        this.activeWallet = index;
        this.screenX = event.screenX
        this.screenY = event.screenY
        switch (item.name) {
          case 'Metamask':
            this.$bvModal.show('six')
            this.log();

            break
          case 'Wallet Connect':
            this.$bvModal.show('six')
            this.$store.dispatch('walletConnect', {loading: this.selfLoading})
              .then(()=>self.$bvModal.hide('six'))
              .catch(err => {
                self.$bvModal.hide('six')
                self.$bvModal.hide('five')
                console.log(err)
              })
              .then(() =>{});


            break
          case 'Fortmatic':
            this.$bvModal.show('six')

            if (process.client) {
              this.$store.dispatch('fortmatic')
                .then(()=>{})
                .catch(err => {
                  console.log(err)

                })



              // this.$bvModal.hide('five')
            }

            break;
          case 'Portis':
            this.$bvModal.show('six')

            this.selfLoading = true
            this.$store.dispatch('portis', {loading: this.selfLoading}).then(()=>self.$bvModal.hide('six')).catch(err => {
              console.log(err)
              self.$bvModal.hide('six')
              self.$bvModal.hide('five')
            })
              .then(() =>{});


            break

        }
        this.loading = false
      },
      log() {
        this.$store.commit('SET_WALLET','metamask')
        this.$cookies.set('walletName', 'metamask')

        this.$bvModal.show('six');
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
        this.account = account;
        this.login(account)
      },

      login(account) {
        let self = this
        this.$store.state.connectingWallet = 'metamask'

        this.$store.dispatch("login", {account})
          .then(() => {

            self.$bvModal.hide('six')
            self.$bvModal.hide('five')
            // self.$router.push({path: `/forest/${id}`});
          })
          .catch(err => console.log(err))
          .then(() => {
          })

      },
      goTo(item){
        window.open(item,'_blank')
      }

    },
    mounted() {
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
      width: 70%;
      border-radius: 6px;
      border: solid 1px #bdbdbd;
      background-color: #e5e7db;
      padding: 10px 15px;
      margin: 0 auto;
      transition: 0.5s ease-all;
    }

  }

  .six .pointer-event p {
    margin: auto;
    width: 70%;
    border: solid 1px #bdbdbd;
    display: flex;
    background-color: #e5e7db;
    padding: 15px 25px;
    border-radius: 6px;

  }
</style>

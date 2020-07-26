<template>
    <section :page="$route.name" class="position-relative pt-5 col-md-12 home">
      <div class="container-fluid">
        <div class="row article">
          <div class="col-md-8 col-12">
            <div class="row mobile-align">
              <div class="col-12 title">
                <client-only>
                  <h1 class="tr-gray-three font-weight-bold text-dn">
                    A more
                    <vue-typer
                      :repeat='Infinity'
                      :shuffle='false'
                      initial-action='typing'
                      :pre-type-delay='80'
                      :type-delay='200'
                      :pre-erase-delay='2000'
                      :erase-delay='50'
                      erase-style='backspace'
                      :erase-on-complete='false'
                      :text='[
                  " affordable",
                  " sustainable",
                  " transparent",
                  " impactful",
                  " inclusive",
                  " rewarding",
                  " gamified",
                  " measurable"
                  ]'></vue-typer>
                    Climate Action through<br class="d-md-block d-none "> financial inclusion of rural communities.
                  </h1>

                </client-only>
              </div>

              <div class="col-12 form-group mt-3">
                <button
                @click="fund"
                  class="btn-lg btn-green pointer-event param"
                >
                  Fund Test
                </button>

                <button
                @click="getMyTreeCount"
                  class="btn-lg btn-green pointer-event param"
                >
                  Update My Tree Count
                </button>
                <h3>
                  {{ treeCount }}
                </h3>
                
                <button
                @click="getOwnerTrees"
                  class="btn-lg btn-green pointer-event param"
                >
                  getOwnerTrees
                </button>
                
                  <span v-for="treeId in ownerTrees" >
                    {{  treeId }}
                  </span>
                <button
                @click="plant"
                  class="btn-lg btn-green pointer-event param"
                >
                  Plant Tree
                </button>

                
                </div>
              <div class="col-12 form-group mt-3">
                <nuxt-link class="position-relative pointer-event leader" :to="localePath('myForest')">

                <button
                  class="btn-lg btn-green pointer-event param"
                >
                  Plant One Tree
                </button>
                </nuxt-link>
                <nuxt-link class="position-relative pointer-event leader" :to="localePath('find')">

                <button class="btn-lg btn-outline-green pointer-event param">
                 Find My Tree
                </button>
                </nuxt-link>
              </div>
              <div class="col-12 d-flex tr-status mt-3 ">
                <div class="planet-tree pt-2">
                  <p class="param-sm tr-black font-weight-bold ">Planted Trees</p>
                  <p class="title-md tr-green font-weight-bolder ">159</p>
                </div>
                <div class="rural-communities pt-2">
                  <p class="param-sm tr-black font-weight-bold ">
                    Rural Communities
                  </p>
                  <p class="title-md tr-green font-weight-bold ">2</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
</template>
<script>
  import WalletConnect from 'walletconnect'

  export default {
    name: "index",
    data() {
      return {
        treeCount: 0,
        ownerTrees: []
      }
    },
    methods:{
      async fund() {
        this.transferReceipt = await this.$store.dispatch('fund/fund', {
          count: 1
        })
      },
      async plant() {
        this.transferReceipt = await this.$store.dispatch('treeFactory/plant', {})
      },
      async getMyTreeCount() {
			  this.treeCount = await this.$store.dispatch('treeFactory/getMyTreeCount')
      },
      async getOwnerTrees() {
			  this.ownerTrees = await this.$store.dispatch('treeFactory/getOwnerTrees')
      },
      
      walletConnects(){
        debugger
        const wc = new WalletConnect();

//  Connect session (triggers QR Code modal)
        const connector = wc.connect();

//  Get your desired provider

        // const web3Provider = wc.getWeb3Provider({
        //   infuraId: "6902e8b158ca43b7ac02142229ef4116",
        // });
        //
        // const channelProvider = wc.getChannelProvider();
        //
        // const starkwareProvider = wc.getStarkwareProvider({
        //   contractAddress: "<INSERT_CONTRACT_ADDRESS>",
        // });
        //
        // const threeIdProvider =  wc.getThreeIdProvider();
      }
    },

    props: {},
    mounted() {
    }
  };
</script>

<style lang="scss" scoped >

  .home {
    background-image: url(../assets/images/home/treejerStory.png);
    background-size: contain;
    background-repeat: no-repeat;
    height: 81vh;
    background-position-y: 30%;
    background-position-x:96% ;
    .vue-typer{
      span{
        min-width: 200px!important;
        display: inline-block;
        text-align: center;
      }
    }

    .loading{
      width: 100vw;
      height: 100vh;
      position: fixed;
      display: flex;
      justify-content: center;
      align-items: center;
      align-self: center;
    }

    .planet-tree {
      border-right: solid 1px #67b68c;
      padding: 0 15px;
    }
    .rural-communities {
      padding: 0 15px;
    }

    .banner {
      z-index: +9;
    }

    .title {
      h1 {
        font-size: 28px;
        font-weight: bold;
        line-height: 48px;
        color: #616161;

        span {
          font-size: 28px;
          font-weight: bold;
          color: #5a9d79;
          padding: 0 5px;
        }
      }
    }
  }

  @media (min-width: 768px) and (max-width: 1280px) and (orientation: landscape) {
    .home {
      .title {
        h1 {
          font-size: 14px;
        }
      }

      .text-dn {
        height: auto;
      }

    }
  }

  @media (max-width:768px) {
    .home {
      background-size: 170%;
      background-position-y: -3%;
      background-position-x: 90%;
      height: 90vh;

      .article {
        margin-top: 73%;
        justify-content: center;
      }

      .mobile-align,.tr-status {
        justify-content: center;
        text-align: center;
        padding-top: 25px;
      }

      .text-dn {
        height: auto;
      }

      .title {
        h1 {
          font-size: 14px;
        }
      }

    }
  }
</style>

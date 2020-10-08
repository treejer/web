<template>
  <section ref="dashboard" class="position-relative  pt-5 col-lg-10 col-12 my-forest">
      <div class="container-fluid p-0">
        <div class="row article justify-content-between">
          <div class="col-lg-8   col-12">
            <div class="row">
              <div class="col-lg-5 col-md-5 col-5">
                <!--                <h2 class="title-sm Montserrat-Medium d-flex align-items-center"-->
                <!--                    v-if="$route.params.id !== $cookies.get('account') && $route.params.id ">-->
                <!--                  <span  class="pr-2 font-weight-lighter param-18" v-coin>{{ $route.params.id === null ? 'Guest Forest' : $route.params.id}}</span>-->
                <!--                  <span-->
                <!--                    v-if="$route.params.id !== $cookies.get('account') ">Forest</span>-->
                <!--                </h2>-->
                <!--                <h2 v-if="$route.params.id === $cookies.get('account')" class="title-sm Montserrat-Medium ">-->
                <!--                  My Forest-->
                <!--                </h2>-->

                <!--                <h2 class="title-sm Montserrat-Medium " v-if="!$route.params.id ||!$cookies.get('account') ">-->
                <!--                  Guest Forest-->
                <!--                </h2>-->
                <h2 v-if="!otherForest" class="title-sm d-inline-flex Montserrat-Medium ">
                  {{ state }} Forest
                </h2>
                <h2 v-if="otherForest" class="title-sm d-inline-flex Montserrat-Medium ">
                  <span class="pr-4 pl-0" v-coin >{{this.$route.params.id}}</span> Forest
                </h2>

              </div>
              <div class="col-lg-7 col-md-7 col-7 justify-content-end text-right ">
                <div class="form-group">
                  <label>
                    <img src="../../assets/images/search.svg" alt="search" class="pointer-event" @click="goToFindTree">
                    <input class="form-control-lg" v-model="treeID" placeholder="Enter Tree ID" @keyup.enter="goToFindTree()">
                  </label>
                </div>
              </div>
            </div>
            <div class="row treejer-desc">
              <div class="col-lg-3  col-md-6 col-12 border-right ">
                <p class="tr-gray-two">FOREST SIZE</p>
                <p class="d-flex justify-content-start  align-items-center mb-0">
                  <span><img class="img-fluid" src="../../assets/images/myforest/tree.svg" alt="tree"></span>
                  <span>
                  <span v-if="!loading" >{{treeCount || 0}}</span>
                  <span v-if="loading"> <b-spinner type="grow" label="Spinning" small class="mb-1"></b-spinner></span>
                </span>
                </p>
              </div>
              <div class="col-lg-3  col-md-6 col-12 border-right">
                <p>RELEASED O1</p>
                <p class="d-flex justify-content-start align-items-center mb-0">
                  <span><img src="~/assets/images/myforest/O1Logo.svg" alt="o1"></span>
                  <span
                    class="param-18 font-weight-bold">{{
                      mintableO1 !== null ? mintableO1 : 0
                    }} </span>
                </p>
              </div>

              <div class="col-lg-3  col-md-6 col-12  " >
                <p>RELEASED O2</p>
                <p class="d-flex justify-content-start align-items-center mb-0">
                  <span><img src="../../assets/images/myforest/O2Logo.svg" alt="o2"></span>

                  <span>{{ 0 }}</span>
                </p>
              </div>
              <div class="col-lg-3  col-md-6 col-12 align-items-center justify-content-center p-0 mt-3 ">
                <button class="btn-outline-green btn-wallet" @click="mintO1">Send to Wallet</button>
              </div>
            </div>
            <div class="row treejer-user-flow">
                <div class="col-12">
                  <div class="bg-brown">
                    <div class="row">
                      <div class="col-md-6">
                        <p class="tr-gray-one param-18 mb-1 font-weight-bold" >Getting Started</p>
                        <p class="param tr-gray-three">
                          Let’s help you get started setting up your forest. Here are some key things to do.
                        </p>
                      </div>
                      <div class="col-md-6">
                        <ul class="p-0">
                          <li
                            class="list-style-none param-sm mb-1 Montserrat-Medium">
                          <span class="step-number mr-2">
                             <button @click="showModal"
                                     :class="$cookies.get('account') ? 'btn-outline-green disabled' :'btn-green'">
                               {{ $cookies.get('account') ? 'Done' : 'step 1' }}

                          </button>
                          </span>
                            <span :class="$cookies.get('account') ? 'tr-gray-four' :'tr-gray-three'">
                            Connect your wallet
                          </span>
                          </li>
                          <li
                            class="list-style-none param-sm mb-1 Montserrat-Medium">
                          <span class="step-number mr-2">
                             <button :class="treeCount ? 'btn-outline-green' : 'btn-green'" @click.prevent="goToAddTree">
                               {{ treeCount ? 'Done' : 'step 2' }}
                          </button>
                          </span>
                            <span :class="treeCount ? 'tr-gray-four' : 'tr-gray-two'">
                          Add trees to your forest
                          </span>
                          </li>
                          <li
                            class="list-style-none param-sm mb-1 Montserrat-Medium">
                          <span class="step-number mr-2">
                             <button
                               @click.prevent="calculateMintableO1"


                               :class="mintableO1 != 0 && mintableO1  ? 'btn-outline-green' : 'btn-green'">
                               {{ mintableO1 != 0  && mintableO1  ? 'Done' : 'step 3' }}

                          </button>
                          </span>
                            <span :class="mintableO1 != 0  && mintableO1  ? 'tr-gray-four' : 'tr-gray-two'">
                          Release O1/O2 to your wallet
                          </span>
                          </li>
                          <li
                            class="list-style-none param-sm mb-1 Montserrat-Medium">
                          <span class="step-number mr-2">
                             <button
                               @click="comunity()"
                               :class="mintableO1 != 0    && mintableO1  ? 'btn-outline-green' : 'btn-green'">
                               step 4

                          </button>
                          </span>
                            <span>
                        Join our community!
                          </span>
                          </li>


                        </ul>
                      </div>
                    </div>

                  </div>
                </div>
            </div>
            <div class="row forest-status position-relative">
              <div class="col-12 mt-5">
                <p class="param-18 tr-gray-three Montserrat-Medium p-0">Forest Status</p>

              </div>
              <div class="col-12 position-relative p-0">
                <div class="col-12 mb-3 p-0">
              <span v-for="(item,index) in test" :key="item.id">
                  <img class="img-fluid p-2" src="~/assets/images/myforest/trees.png" style="mix-blend-mode: luminosity;"/>

              </span>
                </div>
                <div class="col-12 p-0  befor-res" style="left: 0" v-if="$cookies.get('account')">
              <span v-if="ownerTreesData" class="" v-for="(item,index) in ownerTreesData.slice(0,50) " :id="item.tree_id" :key="index">
                <b-button  @click="goToTreeProfile(item.tree_id)" class="p-2 bg-transparent border-0" :tabindex="index" v-b-tooltip.top :title="item.tree_id">
                    <img class="img-fluid" src="~/assets/images/myforest/trees.png"/>
                </b-button>
                <!--                <b-tooltip :target="item.id">{{ item.id }}</b-tooltip>-->

              </span>
                </div>
                <div class="col-12 p-0" v-if="ownerTreesData.length > 50" style="transition: all .3s ease">

                <span  v-if="showMoreTreeData" style="transition: all .3s ease" class="pointer-event"
                       v-for="(item,index) in ownerTreesData.slice(50) "
                       :id="item.tree_id" :key="index">
                <b-button @click="goToTreeProfile(item.id)" class="p-2 bg-transparent border-0" :tabindex="index" v-b-tooltip.top :title="item.tree_id">
                    <img class="img-fluid pointer-event" src="~/assets/images/myforest/trees.png"/>
                </b-button>

              </span>
                  <span class="btn-green d-block  text-center mt-3 pointer-event  show-more-tree-all"
                        @click="showMoreTreeData =!showMoreTreeData">{{ showMoreTreeData ? '&#8679;' : '&#8681;' }}</span>
                </div>

              </div>


            </div>

            <div class="row treejer-earth d-md-block d-none pb-5 pt-5">
              <div class="col-12 ">
                <p class=" param-18 tr-gray-three Montserrat-Medium">Forest on the Map</p>
              </div>
              <div class="col-12 mt-5">
                <GMap v-if="ownerTreesLoaded === true && ownerTreesData.length > 0"
                      ref="gMap"
                      :cluster="{options: {styles: clusterStyle}}"
                      :center="{lat: ownerTreesData[0].latitude || 24.06448 , lng: ownerTreesData[0].longitude  || 81.30946 }"
                      :options="{fullscreenControl: true, streetViewControl: false, mapTypeControl: false, zoomControl: true, gestureHandling: 'cooperative', styles: mapStyle}"
                      :zoom="6"
                >
                  <GMapMarker
                    v-for="tree in ownerTreesData"
                    :key="tree.id"
                    :position="{lat: tree.latitude, lng: tree.longitude}"
                    :options="{icon: tree === currentTree ? pins.selected : pins.notSelected}"
                    @click="currentTree = tree"
                  >
                    <GMapInfoWindow :options="{maxWidth: 200}">
                      <b>{{ tree.name }}</b>
                      <br>
                      <br>
                      <code>
                        Lat: {{ tree.latitude }},
                        <br>
                        Lng: {{ tree.longitude }}
                      </code>
                    </GMapInfoWindow>
                  </GMapMarker>
                </GMap>
                <GMap v-if="ownerTreesLoaded === true && ownerTreesData.length <= 0"
                      ref="gMap"
                      :cluster="{options: {styles: clusterStyle}}"
                      :center="{lat: 24.06448, lng: 81.30946}"
                      :options="{fullscreenControl: false, streetViewControl: false, mapTypeControl: false, zoomControl: true, gestureHandling: 'cooperative', styles: mapStyle}"
                      :zoom="2"
                >
                </GMap>
                <div  v-if="ownerTreesLoaded === false">
                  <GMap
                    ref="gMap"
                    :cluster="{options: {styles: clusterStyle}}"
                    :center="{lat: 24.06448, lng: 81.30946}"
                    :options="{fullscreenControl: true, streetViewControl: false, mapTypeControl: false, zoomControl: true, gestureHandling: 'cooperative', styles: mapStyle}"
                    :zoom="2"
                  >
                  </GMap>

                </div>
              </div>




            </div>
          </div>

          <div class="col-lg-3 col-12  justify-content-center overflow-hidden">
            <div class="box-right ">
              <div class="avatar-card border-0 text-center justify-content-center">
                <div class="card-img position-relative"><img
                  :src="$cookies.get('account') ? 'https://api.adorable.io/avatars/240/'+$cookies.get('account') :avatar"
                  alt="username"
                  class="avatar-pic img-fluid"/>
                  <!--              <span class="position-absolute">+</span>-->

                </div>
                <p  class="param-sm mt-3 tr-gray-three token" style="" v-coin>{{ $cookies.get('account') ?$cookies.get('account'):'Guest'}}</p>
                <p class="param-sm mt-4 tr-gray-four font-weight-bold " style="">Wallet Balance</p>
                <div class="row  tokens">
                  <div class="col-6 p-0 ">
                    <p class="pb-1 logo-tokens tr-gray-three param-sm font-weight-bold border-bottom ">
                      <img src="~/assets/images/myforest/ETHLogo.svg"
                           class="img-fluid ">
                      ETH
                    </p>
                    <p class="pb-1 logo-tokens  tr-gray-three param-sm font-weight-bold border-bottom "><img
                      style="margin-right: 7px"
                      src="~/assets/images/myforest/O1Logo.svg" class="img-fluid ">
                      O1
                    </p>
                    <p class="pb-1 logo-tokens  tr-gray-three param-sm font-weight-bold  "><img
                      src="~/assets/images/myforest/O2Logo.svg" class="img-fluid ">
                      O2
                    </p>
                  </div>
                  <div class="col-6 p-0 ">

                    <p class="pb-2 text-right pr-4  tr-green param-sm font-weight-bold border-bottom ">{{
                        ethBalance > 0 ? ethBalance : 0
                      }}</p>
                    <p class="pb-2 text-right pr-4  tr-green param-sm font-weight-bold border-bottom ">{{ walletO1 ? walletO1 : 0 }}</p>
                    <p class="pb-2 text-right pr-4  tr-green param-sm font-weight-bold  ">0</p>
                  </div>
                </div>
                <!--            <p class="param-sm-light"> @JaneJoe</p>-->
              </div>
              <div class="trees">
                <div class="add-tree">
                  <button @click="goToAddTree()" class="btn-lg">ADD A TREE</button>
                </div>
                <div class="gift-tree mb-4" >
                  <!--                <nuxt-link class="position-relative" to="/forest/giftTree">-->
                  <button class="btn-lg disabled"  >GIFT
                    A TREE
                  </button>
                  <!--                </nuxt-link>-->
                </div>
                <!--              <div class="redeem-trees">-->
                <!--                <input class="form-control-lg" type="text" v-model="redeem" placeholder="Enter your voucher code">-->
                <!--                <p>Redeem Trees</p>-->
                <!--              </div>-->
              </div>
            </div>

          </div>
        </div>
      </div>
  </section>
</template>

<script>
import Fas from '@/components/font-awsome/Fas'
import content from './world.json';
import web3 from '~/plugins/web3';
import Wallets from "../../components/Wallets";
import Metamask from "../../components/Metamask";
import route from "@/middleware/route";


export default {
  name: 'forest',
  layout: 'dashboard',
  components: {Metamask, Fas,Wallets},
  computed: {
    messages() {
      return content
    },
    state() {
      if (!this.$cookies.get('account') && !this.$route.params.id) {
        return 'Guest'
      }
      if (this.$store.state.account === this.$route.params.id) {
        return 'My'
      }
      if (this.$route.params.id && this.$store.state.account !== this.$route.params.id) {
         this.otherForest = true
      }

    }


  },

  data() {
    return {
      otherForest:false,
      ownerTreesLoaded: false,
      showMoreTreeData: false,
      test: [
        {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
        {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
        {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
        {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
        {}, {}, {}, {}, {}, {}, {}, {}, {}, {},

      ],
      avatar: require('~/assets/images/myforest/avatar.png'),
      steps: [
        {active: true, step: 'step 1', text: 'Connect your wallet'},
        {active: false, step: 'step 2', text: 'Add trees to your forest'},
        {active: false, step: 'step 3', text: 'Release O1/O2 to your wallet'},
        {active: false, step: 'step 4', text: 'Join our community!'},
      ],
      activeIndexSteps: null,
      loading: false,
      search: null,
      treeCount: null,
      redeem: null,
      forestSize: 47,
      walletO1: null,
      mintableO1: null,
      ownerTreesData: [],
      ethBalance: 0,
      geographyConfig: {
        dataUrl: '//raw.githubusercontent.com/Seungwoo321/vue-datamaps/master/demo/example-vue-cli3/public/data/world.json',
        borderWidth: 0.5,
        borderOpacity: 1,
        highlightOnHover: true,
        highlightFillColor: '#4e9e74',
        highlightBorderColor: '#4e9e74',
          highlightBorderWidth: 2,
          highlightBorderOpacity: 1
        },
      fills: {
          'Trejer': '#67b68c',
          defaultFill: '#edebe5',
        },
      data: {
        'IRN': {fillKey: 'Trejer'},
        'IND': {fillKey: 'Trejer'},
        'KEN': {fillKey: 'Trejer'},
        'ZAF': {fillKey: 'Trejer'}
      },
      currentTree: {},
      locationsVisibleOnMap: "",
      pins: {
        selected:
          "data:image/png;base64,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",
        notSelected:
          "data:image/png;base64,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"
      },
      clusterStyle: [
        {
          url:
            "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m1.png",
          width: 56,
          height: 56,
          borderRadius:16,
          textColor: "#fff"
        }
      ],
      mapStyle: [
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#ebe3cd"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#523735"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#f5f1e6"
            }
          ]
        },
        {
          "featureType": "administrative",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#c9b2a6"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#dcd2be"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#ae9e90"
            }
          ]
        },
        {
          "featureType": "landscape.natural",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dfd2ae"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dfd2ae"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#93817c"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#a5b076"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#447530"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#f5f1e6"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#fdfcf8"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#f8c967"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#e9bc62"
            }
          ]
        },
        {
          "featureType": "road.highway.controlled_access",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e98d58"
            }
          ]
        },
        {
          "featureType": "road.highway.controlled_access",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#db8555"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#806b63"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dfd2ae"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#8f7d77"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#ebe3cd"
            }
          ]
        },
        {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dfd2ae"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#b9d3c2"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#92998d"
            }
          ]
        }
      ],
      treeID:null

    }
  },
   mounted() {
     console.log(this.$route.params.id)

     // if (this.$route.params.id !== this.$cookies.get('account')) {
     //   this.$router.push(`/forest/${this.$route.params.id ?this.$route.params.id : '' }`)
     // }
     this.getEthBalance()
     this.getBalanceOfO1()
     this.calculateMintableO1()
     this.getOwnerTreesData()
   },
  methods: {
    async goToFindTree() {
        this.loading = true
        let self = this
      if(this.treeID){
        await this.$axios.$get(`${process.env.apiUrl}/trees/${self.treeID}`)
          .then(function (response) {
            self.loading = false
            self.$router.push(`/find/${self.treeID}`)
          })
          .catch(function (error) {
            self.loading = false
            self.$bvToast.toast("Tree Not found!", {
              toaster: 'b-toaster-bottom-left',
              solid: true,
              headerClass: 'hide',
              variant: 'danger'
            })
            // self.errors = 'notFound'
            // console.log(self.errors)

            // handle error
          });
      }else {
        self.$bvToast.toast("Tree Not found!", {
          toaster: 'b-toaster-bottom-left',
          solid: true,
          headerClass: 'hide',
          variant: 'danger'
        })
      }
      },
     goToAddTree() {
       let self = this
       if (!self.$cookies.get('account')) {
         // self.$bvToast.toast("you're not login", {
         //   toaster: 'b-toaster-bottom-left',
         //   solid: true,
         //   headerClass: 'hide',
         //   variant: 'danger'
         // })
         self.$bvModal.show('five')
       } else {
         self.$router.push('/forest/addTree')
       }
      },
    comunity() {
      window.open('https://discuss.treejer.com', '_blank')
    },
    showModal(e) {
        this.$bvModal.show('five')
      },
    changeRoute(item) {
      window.open(item, '_blank')
    },
    async getBalanceOfO1() {
      let self = this
      await this.$axios.$get(`${process.env.apiUrl}/wallets/${this.$route.params.id}/o1/balanceOf`)
        .then(function (response) {
          self.walletO1 = web3.utils.fromWei(response.amount)
        })
        .catch(function (error) {

          });
    },
     calculateMintableO1() {
       let self = this
       if (self.$cookies.get('account')) {

         self.$axios.$get(`${process.env.apiUrl}/wallets/${self.$route.params.id}/o1/mintable`)
           .then(function (response) {
             if (response.amount) {
               const mintableO1s = web3.utils.fromWei(response.amount)
               self.mintableO1 = parseFloat(mintableO1s).toFixed(4)
             }
           })
           .catch(function (error) {
           });
       } else {
         // self.$bvToast.toast("you're not login", {
         //   toaster: 'b-toaster-bottom-left',
         //   solid: true,
         //   headerClass: 'hide',
         //   variant: 'danger'
         // })
       }
    },
    async mintO1() {
      let self = this
      if (!self.$cookies.get('account')) {
        self.$bvToast.show('four')
      } else {

        await this.$store.dispatch('o1Factory/mint').then(()=>{
          responsiveVoice.speak("Tokens transferred to wallet");

          self.$bvToast.toast(['Your transfer was successful'], {
            toaster: 'b-toaster-bottom-left',
            title: 'Tokens transferred to wallet',
            variant: 'success',
            href:`https://ropsten.etherscan.io/address/${self.$cookies.get('account')}`,
          })

        })
      }
    },
    async getEthBalance() {
      await web3.eth.getBalance(this.$cookies.get('account')).then(async (ethBalance) => {
       const test =await  web3.utils.fromWei(ethBalance)
       this.ethBalance= parseFloat(test).toFixed(4)
      });
    },
    async getOwnerTreesData() {
      let self = this
      await this.$axios.$get(`${process.env.apiUrl}/wallets/${this.$route.params.id}/trees`)
          .then(function (response) {
            self.ownerTreesData = response.trees.data.map((tree) => {
              tree.latitude = parseFloat(tree.latitude);
              tree.longitude = parseFloat(tree.longitude);
              return tree;
            })
            self.treeCount = response.trees.total
          })
          .catch(function (error) {

          });
      this.ownerTreesLoaded = true;
    },
    goToTreeProfile(item){
      this.$router.push(this.localePath({name:'tree-id' , params:{id:item}}))
    }

  }
};
</script>
<style lang="scss" scoped>

  .my-forest {
    .show-more-tree-all{
      font-size: 26px;
      display: flex;
      justify-content: center;
      text-align: center;
      width: 100px;


      margin: auto;
    }
    .logo-tokens{
      display: flex;
      justify-content: space-evenly;
    }
    .token {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 75%;
      margin: auto;
      background: #E5E7DB;
      border: 2px solid #FFFFFF;
      box-sizing: border-box;
      border-radius: 18px;
      padding: 5px 15px;
    }
    .bg-brown{
      background: rgba(208, 169, 69, 0.25);
      border-radius: 12px;
      padding: 30px 20px;
      margin-top: 48px;
      font-family: Montserrat-Medium;
      button.bg-outline-green{
        width: 48px;
        height: 16px;
        border: 1px solid #757575;
        box-sizing: border-box;
        border-radius: 10px;
      }

    }
    .avatar-pic{
      width: 80px;
      height: 80px;
    }
    .treejer-desc {
      margin-top: 35px;

      p,span {
        font-size: 12px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        color: #424242;
        span:nth-child(1) {
          font-size: 24px;
          font-weight: bold;
          font-stretch: normal;
          font-style: normal;
          letter-spacing: 0.84px;
          color: #67b68c;
        }

        span:nth-child(2) {
          font-size: 16px;
          font-weight: bolder;
          font-stretch: normal;
          font-style: normal;
          line-height: 1.21;
          letter-spacing: 0.84px;
          text-align: left;
          color: #67b68c;
          padding: 0 5px;
        }
      }
    }
    .btn-wallet{
      border: 1px solid #5A9D79;
      box-sizing: border-box;
      border-radius: 6px;
      font-size: 14px;
      padding: 10px 20px ;
      font-weight: bolder;

    }
    .add-tree {

      button {
        box-shadow: 0 4px 11px 0 rgba(0, 0, 0, 0.16);
        background-color: #67b68c;
        width: 100%;
        margin-top: 45px;
        border: 0;
        color: white;
        height: 48px;
        font-size: 14px;
        border-radius: 14px;
      }

    }

    .gift-tree {
      button {
        border-radius: 14px;
        box-shadow: 0 4px 11px 0 rgba(0, 0, 0, 0.16);
        background-color: #9e9e9e;
        width: 100%;
        margin-top: 45px;
        border: 0;
        color: white;
        font-size: 14px;
        height: 48px;
      }
    }

    .redeem-trees {
      position: relative;
      margin-top: 45px;

      input {
        border-radius: 6px;
        border: solid 1px #52575d;
        width: 100%;
        font-size: 11px;
        padding: 25px 10px;
        background-color: #faf8f1;

      }

      p {
        z-index: +9999;
        position: absolute;
        top: -11px;
        left: 35px;
        background-color: #faf8f1;
      }

    }

    .avatar-card {
      height: auto;
      border-radius: 6px;
      box-shadow: 0 4px 11px 0 rgba(0, 0, 0, 0.16);
      background-color: #fafafa;
      padding: 35px 10px 0;

      img {
        border: solid 1px gray;
        border-radius: 50px !important;
      }

      span {
        width: 18px;
        height: 18px;
        border-radius: 50px;
        background-color: #616161;
        color: white;
        bottom: 0;
        right: 30%;
      }
    }

    .article {
      label {
        position: relative;
        input {
          border-radius: 10px;
          background-color: #e5e7db;
          color: #9e9e9e;
          border: 0;
          position: relative;
          padding: 0 30px;
          font-size: 14px;
          max-width: 176px;
        }
        svg,img {
          position: absolute;
          z-index: +999;
          top: 12px;
          right: 150px;
        }
      }
    }
    .treejer-earth{
      position: relative;

      map {
        heifght: 450px;
      }
    }

  }

  @media (max-width: 768px) {

    .my-forest > div > div > div.col-lg-9 > div:nth-child(1) > div.col-lg-7.col-12.justify-content-end.text-right{
      text-align: left !important;
      justify-content: flex-start!important;
    }
   .my-forest > div > div > div.col-lg-3.col-12.justify-content-center > div.trees > div.redeem-trees > input{
    margin-bottom: 15px;
    }
  }

  .GMap__Wrapper {
    width: 100%;
    height: 400px;
    .flex {
      position: relative;
      padding-bottom: 50px;
    }
    h1 {
      color: #206569;
      margin-bottom: 5px;
      & + p {
        margin-top: 0;
        font-size: 16px;
        a {
          color: #206569;
        }
      }
    }

    span,
    p,
    a {
      color: #206569;
      font-size: 16px;
    }

    .visibleCities {
      position: absolute;
      span {
        font-weight: bold;
      }
    }

    .GMap p {
      margin-top: 30px;
    }
    .button {
      background-color: #206569;
      color: #fff;
      outline: 0;
      border: 0;
      padding: 10px 20px;
      font-size: 14px;
      cursor: pointer;
      transition: background-color 200ms;
      backface-visibility: hidden;

      &:hover {
        background-color: #12957b;
      }
    }

  }

  @media (min-width: 1024px) {
    .my-forest .col-lg-3.col-12.justify-content-center .box-right {
    }

  }

  .befor-res {
    position: absolute;
    top: 0;
    z-index: +99999;

    button {
      z-index: +999999999;

    }
  }

  @media (min-width: 1280px) {
  }
 @media (max-width: 1280px) {


    .tokens {
      .border-bottom {
        border-bottom: none!important;
      }
    }

  }

</style>

<template>
  <div class="container-fluid p-0 mobile-dashboard">
    <div class="row">
      <div class="col-12">
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
      </div>
    </div>
    <div class="row description-mobile  pl-4 pr-4" @click="$store.commit('OPEN_PROFILE',false)">
      <div class="col-12 mb-3">
        <h2 v-if="!otherForest" class="mobile-title tr-gray-three d-inline-flex Montserrat-Medium ">
          {{ state }} Forest
        </h2>
        <h2 v-if="otherForest" class="mobile-title tr-gray-three  d-inline-flex Montserrat-Medium ">
          <span class="pr-4 pl-0" v-coin>{{ this.$route.params.id }}</span> Forest
        </h2>
      </div>
      <div class="col-6 tr-gray-three">
        <div class="d-flex align-items-center h-100">
          <img class="img-fluid pr-2" src="~/assets/images/mobile/trees.svg" alt="tree">
          <span class="param-20 pr-1">{{ treeCount || 0 }}</span>
          <span class="param-md">Trees</span>
        </div>

      </div>
      <div class="col-6 tr-gray-three">
        <div class="d-flex align-items-center h-100">
          <img class="img-fluid pr-2" src="~/assets/images/mobile/o1.svg" alt="o1">
          <span class="param-20 pr-1 ">{{ mintableO1 !== null ? mintableO1 : 0 }}</span>
          <span class="param-md">O1</span>
        </div>
      </div>
      <div class="col-6 tr-gray-three mt-3">
        <div class="d-flex align-items-center h-100">
          <img class="img-fluid pr-2" src="~/assets/images/mobile/o2.svg" alt="o2">
          <span class="param-20 pr-1 ">{{  0 }}</span>
          <span class="param-md">O2</span>
        </div>
      </div>
      <div class="col-6 tr-gray-three"></div>
    </div>
  </div>
</template>

<script>
import web3 from '~/plugins/web3';

export default {
  layout: "mobile",
  name: "dashboard",
  data() {
    return {
      otherForest: false,
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
          borderRadius: 16,
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
              "color": "transparent"
            }
          ]
        }
      ],
      treeID: null

    }
  },
  computed: {
    messages() {
      return content
    },
    state() {
      if (!this.$cookies.get('account') && !this.$route.params.id) {
        return 'Guest'
      }
      if (this.$cookies.get('account') === this.$route.params.id) {
        return 'My'
      }
      if (this.$cookies.get('account') !== this.$route.params.id) {
        this.otherForest = true
      }

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
      if (this.treeID) {
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
      } else {
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
      }
    },
    async mintO1() {
      let self = this
      if (!self.$cookies.get('account')) {
        self.$bvToast.show('four')
      } else {

        await this.$store.dispatch('o1Factory/mint').then(() => {
          responsiveVoice.speak("Tokens transferred to wallet");

          self.$bvToast.toast(['Your transfer was successful'], {
            toaster: 'b-toaster-bottom-left',
            title: 'Tokens transferred to wallet',
            variant: 'success',
            href: `https://ropsten.etherscan.io/address/${self.$cookies.get('account')}`,
          })

        })
      }
    },
    async getEthBalance() {
      await web3.eth.getBalance(this.$cookies.get('account')).then(async (ethBalance) => {
        const test = await web3.utils.fromWei(ethBalance)
        this.ethBalance = parseFloat(test).toFixed(4)
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
    goToTreeProfile(item) {
      this.$router.push(this.localePath({name: 'tree-id', params: {id: item}}))
    }

  }
}
</script>

<style scoped lang="scss">
.mobile-dashboard {
  .description-mobile {
    margin-top: 38px;

    .col-6 {
    }
  }
}
</style>

<template>
  <section class="position-relative  pt-5 col-lg-10 col-12 my-forest">
    <div class="container-fluid">
      <div class="row article justify-content-between">
        <div class="col-lg-8  col-12">
          <div class="row">
            <div class="col-lg-5 col-md-5 col-5">
              <h2 class="title-sm Montserrat-Medium " >
                My Forest

              </h2>

            </div>
            <div class="col-lg-7 col-md-7 col-7 justify-content-end text-right ">
              <div class="form-group">
                <label>
                  <Fas i="search"/>
                  <input class="form-control-lg" v-model="search" placeholder="Enter Tree ID">
                </label>
              </div>
            </div>
          </div>
          <div class="row treejer-desc">
            <div class="col-lg-3  col-md-6 col-12 border-right ">
              <p>FOREST SIZE</p>
              <p>
                <span>
                  <span v-if="!loadings" >{{treeCount}}</span>
                  <span v-if="loadings"> <b-spinner type="grow" label="Spinning" small class="mb-1"></b-spinner></span>
                </span>
                <span>Trees</span></p>
            </div>
            <div class="col-lg-3  col-md-6 col-12 border-right">
              <p>O2 BALANCE</p>
              <p><span>{{ 0 }} </span> <span>o2</span></p>
            </div>
            <div class="col-lg-3  col-md-6 col-12 border-right">
              <p>SEED BALANCE</p>
              <p>
                <span>{{ totalO1 }}</span><span>o1</span>
                <span>{{ mintableO1 }}</span><span>o1(mintable)</span>
              
                <button @click="mintO1">mint o1</button>
              </p>
            </div>
            <div class="col-lg-3  col-md-6 col-12 ">
              <p>TREES GIFTED</p>
              <p><span>{{ 0 }}</span><span>Trees</span></p>
            </div>
          </div>
          <div class="row treejer-earth d-md-block d-none">
            <!-- <vue-datamaps
              :geographyConfig="geographyConfig"
              :width="'100%'"
              :fills="fills"
              :data="data"></vue-datamaps> -->

    <GMap v-if="ownerTreesLoaded === true && ownerTreesData.length > 0"
      ref="gMap"
      :cluster="{options: {styles: clusterStyle}}"
      :center="{lat: ownerTreesData[0].latitude, lng: ownerTreesData[0].longitude}"
      :options="{fullscreenControl: false, streetViewControl: false, mapTypeControl: false, zoomControl: true, gestureHandling: 'cooperative', styles: mapStyle}"
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

    <GMap v-if="ownerTreesLoaded === true && ownerTreesData.length == 0"
      ref="gMap"
      :cluster="{options: {styles: clusterStyle}}"
      :center="{lat: 24.06448, lng: 81.30946}"
      :options="{fullscreenControl: false, streetViewControl: false, mapTypeControl: false, zoomControl: true, gestureHandling: 'cooperative', styles: mapStyle}"
      :zoom="2"
    >
    </GMap>


          </div>
        </div>

        <div class="col-lg-3 col-12  justify-content-center">
          <div class="avatar-card card text-center justify-content-center">
            <div class="card-img position-relative"><img src="~/assets/images/myforest/avatar.png" alt="username"
                                                         class="avatar-pic img-fluid"/>
              <span class="position-absolute">+</span>
            </div>
            <p class="param-sm mt-3" style="">{{$cookies.get('account').slice(0,-25)}}</p>
<!--            <p class="param-sm-light"> @JaneJoe</p>-->
          </div>
          <div class="trees">
            <div class="add-tree">
              <nuxt-link class="position-relative" to="/myForest/addTree">

              <button class="btn-lg">ADD A TREE</button>
              </nuxt-link>
            </div>
            <div class="gift-tree">
              <nuxt-link class="position-relative" to="/myForest/giftTree">
              <button class="btn-lg" >GIFT
                A TREE
              </button>
              </nuxt-link>
            </div>
            <div class="redeem-trees">
              <input class="form-control-lg" type="text" v-model="redeem" placeholder="Enter your voucher code">
              <p>Redeem Trees</p>
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


export default {
  name: 'myForest',
  layout: 'dashboard',
  components: {Fas},
  computed: {
    messages() {
      return content
    }
  },

  data() {
    return {
      ownerTreesLoaded: false,
      loadings:false,
      search: null,
      treeCount: null,
      redeem: null,
      forestSize: 47,
      totalO1: 0,
      mintableO1: 0,
      ownerTreesData: [],
      geographyConfig: {
        dataUrl: '//raw.githubusercontent.com/Seungwoo321/vue-datamaps/master/demo/example-vue-cli3/public/data/world.json',
        highlightOnHover: false,
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
      ]

    }

  },
  mounted() {
    this.getMyTreeCount()
    this.getTotalO1()
    this.calculateMintableO1()

    this.getOwnerTreesData()
    
  },
  methods: {
    async getMyTreeCount() {
      this.loaings =true
      this.treeCount = await this.$store.dispatch('treeFactory/getMyTreeCount')
      this.loadings =false
    },
    async getTotalO1() {
      this.totalO1 = await this.$store.dispatch('o1Factory/balanceOf')
      console.log(this.totalO1)
    },
    async calculateMintableO1() {
      this.mintableO1 = await this.$store.dispatch('o1Factory/calculateMintableO1')
      console.log(this.mintableO1)
    },
    async mintO1() {
      this.totalO1 = await this.$store.dispatch('o1Factory/mint')
      console.log(this.totalO1)
    },
   
    
    async getOwnerTreesData() {
      let treeIds = await this.$store.dispatch('treeFactory/getOwnerTreesId');

      // if(treeIds.length > 0) {
      //   this.ownerTreesData = [];
      // }

      for (let index = 0; index < treeIds.length; index++) {
        this.ownerTreesData.push(await this.$store.dispatch('treeFactory/getTree', {id: treeIds[index]}));
      }
      this.ownerTreesLoaded = true;
    },

  }
};
</script>

<style lang="scss" scoped>

  .my-forest {
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
          font-size: 12px;
          font-weight: bold;
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
      }

    }

    .gift-tree {
      button {
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
      padding: 35px 10px;

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
        svg {
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



  .GMap, p {
    margin-top: 30px;
  }

  .GMap__Wrapper {
    width: 100%;
    height: 400px;
  }



</style>

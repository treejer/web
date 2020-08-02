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
              <div class="flex">
      <button @click="returnToCenter()" class="button">Return to center</button>
      <p class="visibleCities">
        Visible cities:
        <span
          v-text="locationsVisibleOnMap.length > 0 ? locationsVisibleOnMap : 'No visible cities'"
        />
      </p>
    </div>
    <GMap
      ref="gMap"
      :cluster="{options: {styles: clusterStyle}}"
      :center="{lat: locations[0].lat, lng: locations[0].lng}"
      :options="{fullscreenControl: false, streetViewControl: false, mapTypeControl: false, zoomControl: true, gestureHandling: 'cooperative', styles: mapStyle}"
      :zoom="6"
      @bounds_changed="checkForMarkers"
    >
      <GMapMarker
        v-for="location in locations"
        :key="location.id"
        :position="{lat: location.lat, lng: location.lng}"
        :options="{icon: location === currentLocation ? pins.selected : pins.notSelected}"
        @click="currentLocation = location"
      >
        <GMapInfoWindow :options="{maxWidth: 200}">
          <b>{{ location.name }}</b>
          <br>
          <br>
          <code>
            Lat: {{ location.lat }},
            <br>
            Lng: {{ location.lng }}
          </code>
        </GMapInfoWindow>
      </GMapMarker>
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
      loadings:false,
      search: null,
      treeCount: null,
      redeem: null,
      forestSize: 47,
      totalO1: 0,
      mintableO1: 0,
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
      currentLocation: {},
      locationsVisibleOnMap: "",
      locations: [
        {
          lat: 45.81444,
          lng: 15.97798,
          name: "Zagreb"
        },
        {
          lat: 46.056946,
          lng: 14.505751,
          name: "Ljubljana"
        },
        {
          lat: 47.497913,
          lng: 19.040236,
          name: "Budapest"
        },
        {
          lat: 48.210033,
          lng: 16.363449,
          name: "Vienna"
        },
        {
          lat: 52.520008,
          lng: 13.404954,
          name: "Berlin"
        },
        {
          lat: 41.906204,
          lng: 12.507516,
          name: "Rome"
        },
        {
          lat: 50.073658,
          lng: 14.41854,
          name: "Prague"
        },
        {
          lat: 48.148598,
          lng: 17.107748,
          name: "Bratislava"
        }
      ],
      pins: {
        selected:
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHUSURBVHgB5VU7SwNBEJ7LmZBgMC+UdKKx0MZCG2srwcbCB2glpFDQ3to/IegvSAIWPrBJIySlipUKKqYLaHJ3iWIelzu/DTk8j71H7MQPltmZnflmZ3b3juivQ3BzCIfDI4FAYBvTRV3XR7tBglCCOIP9oFwuv/46QSwWWwfZIaaDNi7vGOlqtZqhfhPE4/EViAy5V6ljE8uVSuXYc4JkMjncarUeMR0ib5Db7fZEvV6vWBd8PG+Q73LIFYyj3lAsa1G/37/D4+JWgPbcQkybd9jpdGYVRXlmSiQSSYmieMWmhgMuwI0kSTPkpQJgzKJnDfJuKYryBJH7sVNBSPGI7BKoFl3n+GguMY4JHiz6GtoybiisRczmEtPFAM+Ifl6i5DmTKYqeX+Nssj19lUz9N2J4XNxDTiQSkwi4oz6ADU3hLdxb7dwW9RyL5B0FHrltAgZUsEce4eRrmwB3ugCRJ3fk4VvsOwEDHtcWxKeDy4emaWmHdRKdFpvNphQKhdhFmOet42D3sftTJw7X/wHgw/U8h1ywkJ/gYJeI/wi/g8kdmqqqG5Alk62Er+emG7nXBFSr1aroNSNknwOVzZnNS6xIHtFoNF6CweAbpheyLOfo3+ALfrSuzJ1F8EsAAAAASUVORK5CYII=",
        notSelected:
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABHElEQVR42uVVyw4BMRQdC98lsbPwG5YSH+BzWFtLZilh0oQgFh6J54IwBmGYtrfaBREdcTvDhpM0adrec3rb+7Csn8fRdrLg7VzBubhDzmHrudRuZ2KRs/miLd6AThfNaOTTGRFIsMm8bkSuXBeGoLVaGi0g39wLI4GTf1EjdE/+E1pAAGgEAenkb/tBo1vQFUDgBbSbny6al77uSQwB/6wJSNHoAo8xj30iaYMW4Lv9wfSTpc0eH6atXtE4TKWNUS4AY2hyddY4k/lwVEZncm9QilQuBGPwnp1B5GIXGi3P0eU0c7EqKrje5hU5d7fr2P2AEJIESkNqB1XJkvhI0/GrTuqZX619tLMF/VHlfnk5/0r7ZMvVWA3rr3AF6LIMZ7PmSlUAAAAASUVORK5CYII="
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
          featureType: "all",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#ffffff"
            }
          ]
        },
        {
          featureType: "all",
          elementType: "labels.text.stroke",
          stylers: [
            {
              visibility: "on"
            },
            {
              color: "#3e606f"
            },
            {
              weight: 2
            },
            {
              gamma: 0.84
            }
          ]
        },
        {
          featureType: "all",
          elementType: "labels.icon",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "administrative",
          elementType: "geometry",
          stylers: [
            {
              weight: 0.6
            },
            {
              color: "#313536"
            }
          ]
        },
        {
          featureType: "landscape",
          elementType: "geometry",
          stylers: [
            {
              color: "#44a688"
            }
          ]
        },
        {
          featureType: "poi",
          elementType: "geometry",
          stylers: [
            {
              color: "#13876c"
            }
          ]
        },
        {
          featureType: "poi.attraction",
          elementType: "geometry.stroke",
          stylers: [
            {
              color: "#f5e4e4"
            },
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "poi.attraction",
          elementType: "labels",
          stylers: [
            {
              visibility: "on"
            },
            {
              lightness: "14"
            }
          ]
        },
        {
          featureType: "poi.park",
          elementType: "geometry",
          stylers: [
            {
              color: "#13876c"
            },
            {
              visibility: "simplified"
            }
          ]
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [
            {
              color: "#067372"
            },
            {
              lightness: "-20"
            }
          ]
        },
        {
          featureType: "transit",
          elementType: "geometry",
          stylers: [
            {
              color: "#357374"
            }
          ]
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [
            {
              color: "#004757"
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
    returnToCenter() {
      this.$refs.gMap.map.setCenter(this.locations[0]);
    },

    checkForMarkers() {
      this.locations.forEach((location, i) => {
        location.visible = this.$refs.gMap.map
          .getBounds()
          .contains(this.$refs.gMap.markers[i].getPosition());
      });

      this.locationsVisibleOnMap = this.locations
        .filter(l => l.visible)
        .map(l => l.name)
        .join(", ");
    }

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


  * {
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
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

.flex {
  position: relative;
  padding-bottom: 50px;
}

.GMap,
p {
  margin-top: 30px;
}

.GMap__Wrapper {
  width: 100%;
  height: 400px;
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
</style>

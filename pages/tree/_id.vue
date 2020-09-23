<template>
  <section class="position-relative pt-5 col-12 step-page mb-5 pb-5 tree-profile rotate-vert-left">
    <div class="container-fluid" v-if="tree">
      <div class="row justify-content-center text-center">
        <div class="col-auto search-bar-tree-profile position-relative">
            <span
              class="icon position-absolute position-relative"
              @click="findTree()"
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.2819 13.836L13.1669 10.721C13.0971 10.6514 13.0143 10.5962 12.9232 10.5586C12.8321 10.521 12.7345 10.5018 12.6359 10.502H12.1269C13.1461 9.19825 13.6296 7.55483 13.4788 5.90684C13.3281 4.25886 12.5545 2.73042 11.3157 1.63317C10.0769 0.535909 8.46624 -0.0475353 6.81211 0.00179246C5.15799 0.0511202 3.58496 0.729505 2.41375 1.89863C1.24255 3.06775 0.561371 4.63958 0.509105 6.29361C0.456839 7.94765 1.03742 9.55934 2.13248 10.8001C3.22753 12.0408 4.75459 12.8172 6.40231 12.9708C8.05002 13.1245 9.6943 12.6439 10.9999 11.627V12.136C10.9997 12.2346 11.0189 12.3322 11.0565 12.4234C11.094 12.5145 11.1492 12.5973 11.2189 12.667L14.3349 15.783C14.4043 15.8528 14.4868 15.9081 14.5777 15.9459C14.6686 15.9837 14.766 16.0031 14.8644 16.0031C14.9628 16.0031 15.0602 15.9837 15.1511 15.9459C15.242 15.9081 15.3245 15.8528 15.3939 15.783L16.2779 14.899C16.4188 14.7583 16.4983 14.5675 16.4991 14.3684C16.4998 14.1692 16.4218 13.9778 16.2819 13.836ZM6.99989 10.501C6.20877 10.501 5.43541 10.2664 4.77761 9.82691C4.11981 9.38739 3.60712 8.76267 3.30437 8.03177C3.00162 7.30087 2.92241 6.4966 3.07675 5.72067C3.23109 4.94475 3.61205 4.23202 4.17146 3.67261C4.73087 3.1132 5.44361 2.73224 6.21953 2.57789C6.99545 2.42355 7.79972 2.50277 8.53063 2.80552C9.26153 3.10827 9.88624 3.62096 10.3258 4.27875C10.7653 4.93655 10.9999 5.70991 10.9999 6.50104C10.9999 7.5619 10.5785 8.57932 9.82832 9.32946C9.07817 10.0796 8.06076 10.501 6.99989 10.501Z"
                  fill="#9E9E9E"
                />
              </svg>
            </span>
          <FormulateInput
            class="search param-sm "
            placeholder="Enter Tree ID"
            @keyup.enter="findTree()"
            type="text"
            v-model="treeID"
            name="treeID"
          />
        </div>
        <div class="col-12 tree-profile-img justify-content-center ">
          <img src="../../assets/images/find/tree.svg" alt="tree"/>
          <span class="tr-gray-three tree-profile-number font-weight-bolder" id="edit_name">{{ tree.id }}</span>
        </div>
      </div>
      <div class="row justify-content-center arrows">
        <div class="col-4 arrow-left text-right pointer-event" @click="odd">
          <img class="img-fluid m-auto" src="../../assets/images/tree-profile/arrow-left.svg" alt="arrow-left">
        </div>
        <div class="col-4 tree-profile-name">
          <h4 class="pt-3 text-center"> {{ tree.name }}</h4>
          <div class="new-name-tree-profile" v-if="newName">
            <div class="stats">
              <span class=" tr-green pointer-event pr-2" @click="setNewName()">&check;</span>
              <span class=" tr-red  pointer-event" @click="newName = false">x</span>
            </div>

            <input  placeholder="new name..." class="form-control border-0  new-name-tree-profile tr-gray-three tree-profile-number font-weight-bolder" type="text" v-model="newNameTree">


          </div>

        </div>
        <div class="col-4 arrow-right text-left pointer-event" @click="add">
          <img class="img-fluid m-auto" src="../../assets/images/tree-profile/arrow-right.svg" alt="arrow-right">
        </div>
        <div class="col-12 col-md-5 text-center position-relative">
          <div class="box-tree-profile">
            <p class="param tr-gray-two">Swipe to see more trees in <span class="tr-green"
                                                                          v-coin>{{ tree.owner }}</span> ’s
              forest</p>
          </div>
          <div class="card-tree-profile position-relative mb-5 ">
            <div class="position-absolute edit-name-position-absolute">
              <button class="btn-green edit-name " @click="editName(tree.name)">Edit Name</button>
            </div>
            <div class="detail-card">
              <div class="location part">
                <p class="param mb-0 tr-gray-three">Location</p>
                <p class="param-18 mb-0 tr-gray-two">{{ '---------' }}</p>
              </div>
              <div class="gps part">
                <p class="param mb-0 tr-gray-three">GPS Coordinates</p>
                <p class="param-18 mb-0 tr-gray-two"> <span class="pr-2">{{
                    parseFloat(tree.latitude).toFixed(4)
                  }}</span>,<span class="pl-2">{{ parseFloat(tree.longitude).toFixed(4) }}</span></p>
              </div>
              <div class="species part">
                <p class="param mb-0 tr-gray-three">Species</p>
                <p class="param-18 mb-0 tr-gray-two">{{ '---------' }}</p>
              </div>
              <div class="planter part">
                <p class="param mb-0 tr-gray-three">Planter</p>
                <p class="param-18 mb-0 tr-gray-two">{{ '---------' }}</p>
              </div>
              <div class="block part">
                <p class="param mb-0 tr-gray-three">Green Block</p>
                <p class="param-18 mb-0 tr-gray-two">{{ '---------' }}</p>
              </div>
              <div class="climate part">
                <p class="param mb-0 tr-gray-three">Climate Credits (O1)</p>
                <p class="param-18 mb-0 tr-gray-two">{{ '---------' }}</p>
              </div>


            </div>
            <div class="map-tree-profile mb-5">
              <GMap
                ref="gMap"
                :cluster="{options: {styles: clusterStyle}}"
                :center="{lat: tree.latitude, lng: tree.longitude}"
                :options="{
                fullscreenControl: true
                , streetViewControl: false,
                 mapTypeControl: false,
                  zoomControl: true,
                   gestureHandling: 'cooperative', styles: mapStyle}"
                :zoom="7"
                style="width: 100%; height: 400px;margin-top: 35px;overflow: hidden;border-radius: 0px;"
              >
                <GMapMarker
                  :position="{lat:tree.latitude, lng:tree.longitude}"
                  :options="{icon: pins.selected}"
                ></GMapMarker>
              </GMap>
            </div>


          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

import SearchBar from "~/components/SearchBar";

export default {
  name: "tree-profile",
  components: {SearchBar},
  data() {
    return {
      tree: null,
      newName:false,
      newNameTree:null,
      treeCount: null,
      loading: false,
      treeID: null,
      clusterStyle: [
        {
          url:
            "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m1.png",
          width: 56,
          height: 20,
          borderRadius: 1,
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
      pins: {
        selected:
          "data:image/png;base64,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",
        notSelected:
          "data:image/png;base64,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"
      }
    }
  },
  mounted() {
    this.findTree()
  },
  methods: {
    async findTree() {
      let self = this;
      self.loading = true
      await this.$axios.$get(`${process.env.apiUrl}/trees/${this.treeID ? this.treeID : this.$route.params.id}`)
        .then(function (response) {
          self.loading = false
          self.tree = response
          self.convertToGeoName(self.tree.latitude,self.tree.longitude)
          console.log(self.tree,'self.tree')
          self.$router.push(self.localePath({name:'tree-id' , params:{id:self.tree.id}}))
        })
        .catch(function (error) {

        });
    },
    add(){

      this.treeID = this.$route.params.id
      this.treeID ++
      this.findTree()
      this.$router.push(this.localePath({name:'tree-id' , params:{id:this.treeID }}))


    },
    odd(){
      this.treeID = this.$route.params.id
      this.treeID --

      this.findTree()
      this.$router.push(this.localePath({name:'tree-id' , params:{id:this.treeID }}))
    },
    changeRoute(item) {
      window.open(item, '_blank')
    },
    convertToGeoName(lat,lng){
      this.$axios.$get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.GOOGLE_MAP_API_KEY}`).then((res)=>{
        console.log(res,'res')
      })
    },
    editName(item){
      console.log(item,'item')
      this.newName = !this.newName
    },
    setNewName(){
      this.$bvToast.toast('New Name added', {
        variant: 'success',
        toaster: 'b-toaster-bottom-left',

      })
      this.tree.name = this.newNameTree
      this.newName = false
    }
  }
}
</script>

<style scoped lang="scss">
.tree-profile {
  min-height: 197vh !important;
  height: auto !important;

  * {
    font-family: Montserrat-Medium;
  }

  .tree-profile-img {
    margin-top: 38px;

    .tree-profile-number {
      font-size: 22px;
      color: #424242;
      display: block;

    }
  }

  .arrows {
    margin-top: 32px;

    h4 {
      font-size: 34px;
      color: #424242;
      font-weight: bolder;
    }

  }

  .box-tree-profile {
    background: rgba(208, 169, 69, 0.25);
    border-radius: 12px;
    margin-top: 32px;

    p {
      padding: 12px 15px;

    }
  }
  .new-name-tree-profile{
    width: 100%;
    .stats{
      position: absolute;
      top: 15px;
      z-index: +999999;
      right: 0;
      span{
        font-size: 28px;
      }

    }
    input{
      position: absolute;
      z-index: +99999;
      width: 100%;
      top: 7px;
      background: #faf8f2!important;
      font-size: 28px;
    }

  }
  .card-tree-profile {
    height: 772px;
    background: #FFFFFF;
    box-shadow: 2px 6px 44px rgba(0, 0, 0, 0.09);
    border-radius: 12px;
    margin-top: 51px;
    margin-bottom: 100px !important;

    .edit-name-position-absolute {
      width: 100%;
      top: -16px;
    }


    .edit-name {
      padding: 4px 24px;
      border-radius: 6px;
      font-size: 18px;
      color: #FAFAFA;
    }

    .detail-card {
      padding-top: 50px;

      .part {
        padding-top: 32px;
      }

    }
  }

}
.rotate-vert-left{-webkit-animation:rotate-vert-left .9s cubic-bezier(.645,.045,.355,1.000) both;animation:rotate-vert-left .5s cubic-bezier(.645,.045,.355,1.000) both}
/* ----------------------------------------------
 * Generated by Animista on 2020-9-23 16:2:53
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info.
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

@-webkit-keyframes rotate-vert-left{0%{-webkit-transform:rotateY(0);transform:rotateY(0);-webkit-transform-origin:left;transform-origin:left}100%{-webkit-transform:rotateY(360deg);transform:rotateY(360deg);-webkit-transform-origin:left;transform-origin:left}}@keyframes rotate-vert-left{0%{-webkit-transform:rotateY(0);transform:rotateY(0);-webkit-transform-origin:left;transform-origin:left}100%{-webkit-transform:rotateY(360deg);transform:rotateY(360deg);-webkit-transform-origin:left;transform-origin:left}}
</style>

<template>
  <section
    :class="$route.name"
    class="position-relative pt-5 col-12 step-page mb-5 pb-5 genesis-profile"
  >
    <div  class="container-fluid">
      <div class="row justify-content-center text-center">
        <div class="col-auto search-bar-tree-profile position-relative">
          <span
            class="icon position-absolute position-relative"
            @click="goToFindTree()"
          >
            <img src="~/assets/images/tree-profile/search.svg"/>
          </span>
          <FormulateInput
            v-model="treeID"
            class="search param-sm"
            name="treeID"
            placeholder="Enter Tree ID"
            type="text"
            @keyup.enter="goToFindTree()"
          />
        </div>
        <div class="col-12 tree-profile-img justify-content-center">
          <img alt="tree" src="../../assets/images/find/tree.svg"/>
          <span v-if="tree"
            id="edit_name"
            class="tr-gray-three tree-profile-number font-weight-bolder"
          >{{ $hex2Dec(tree.id) }}</span
          >
        </div>
      </div>
      <div class="row justify-content-center arrows" >
        <div

          :class="treeID <= 0 ? 'disabled' :'pointer-event' "
          class="col-3 arrow-left text-right "
              @click="odd()">
          <img
            alt="arrow-left"
            class="img-fluid m-auto"
            src="../../assets/images/tree-profile/arrow-left.svg"
          />
        </div>
        <div class="col-md-6 tree-profile-name m-md-auto mb-5 mb-md-0">
          <h4 class="pt-3 text-center title-lg">{{ "TREE OF LIFE" }}</h4>
          <div v-if="newName" class="new-name-tree-profile">
            <div class="stats">
              <span class="tr-green pointer-event pr-2" @click="setNewName()"
              >&check;</span
              >
              <span
               class="tr-red pointer-event"
               @click="newName = false"
              >x</span
              >
            </div>

            <input
              v-model="newNameTree"
              class="form-control border-0 new-name-tree-profile tr-gray-three tree-profile-number font-weight-bolder"
              placeholder="New name..."
              type="text"
              @keyup.enter="setNewName()"
            />
          </div>
          <AuctionProcess
            v-if="tree"
            :expireDateText="expireDateText"
            :expireDates="expireDate"

          />
        </div>
        <div class="col-3 arrow-right text-left pointer-event" @click="add">
          <img
            alt="arrow-right"
            class="img-fluid m-auto"
            src="../../assets/images/tree-profile/arrow-right.svg"
          />
        </div>
        <div class="col-12 text-center position-relative mt-md-5 genesis-des">
          <div class="row pt-md-3 justify-content-between">
            <div class="col-md-3 col-12">
              <div class="story">
                <p class="text-center tr-gray-one param-xl">Story</p>
              </div>
              <div class="genesis-box mt-4 py-md-5 pr-md-4 pl-md-4">
                <p class="text-center param tr-gray-two mb-0">
                  The Tree of Life is the most unique tree planted via Treejer
                  Protocol. It’s planted near the Gocta Waterfall in Peru by one
                  of the founders of Treejer Protocol and maintained by local
                  communities of the region. The tree is a SAMPLE species and
                  has an amazing view of the Gocta Waterfall in the background.
                </p>
              </div>
            </div>
            <div class="col-md-6 col-12">
              <div class="people col-md-6 justify-content-center m-auto">
                <p class="text-center tr-gray-one param-xl">People</p>
              </div>
              <div class="col-md-12 pb-md-5 justify-content-center m-auto">
                <PeopleCard/>
              </div>
              <div class="history col-md-6 justify-content-center m-auto">
                <p class="text-center tr-gray-one param-xl">History</p>
              </div>
              <div class="col-md-10 justify-content-center m-auto">
                <HistoryCard :update="true"/>
                <HistoryCard :listed="true"/>
                <HistoryCard :planted="true"/>
                <HistoryCard :putToSale="true"/>
                <HistoryCard :transferred="true"/>
                <HistoryCard :Offer="true"/>
                <HistoryCard :Auction="true"/>
                <HistoryCard :bidPlaced="true"/>
                <HistoryCard :minted="true"/>
              </div>
              <div class="col-md-12">
                <div class="card-tree-profile position-relative" v-if="tree">
                  <div
                    v-if="tree.owner && tree.owner.id === $cookies.get('account')"
                    class="position-absolute edit-name-position-absolute"
                  >
                    <button
                      class="btn-green edit-name"
                      @click="editName(tree.id)"
                    >
                      Edit Name
                    </button>
                  </div>
                  <div class="detail-card">
                    <div class="location part">
                      <p class="param mb-0 tr-gray-three">Planted Date</p>
                      <p class="param-18 mb-0 tr-gray-two">
                       {{ tree.plantDate }}
                      </p>
                    </div>
                    <div class="gps part">
                      <p class="param mb-0 tr-gray-three">GPS Coordinates</p>
                      <p class="param-18 mb-0 tr-gray-two">
                        <span class="pr-2">{{ 'tree-lat' }}</span
                        >,<span class="pl-2">{{ 'tree-lng' }}</span>
                      </p>
                    </div>
                    <div v-if="tree.type" class="species part">
                      <p class="param mb-0 tr-gray-three">Species</p>
                      <p class="param-18 mb-0 tr-gray-two">
                        {{ tree.type.name }}
                      </p>
                    </div>
                    <div class="planter part">
                      <p class="param mb-0 tr-gray-three">Planter</p>
                      <p class="param-18 mb-0 tr-gray-two">
                        {{ tree.planter ? tree.planter.id : '-' }}
                      </p>
                    </div>
                    <!-- <div class="block part">
                      <p class="param mb-0 tr-gray-three">Green Block</p>
                      <p
                        class="param-18 mb-0 tr-gray-two"
                        v-if="tree.greenblock"
                      >
                        {{ tree.greenblock.title }}
                      </p>
                    </div> -->
                    <div class="climate part">
                      <p class="param mb-0 tr-gray-three">
                        Climate Credits (Seed)
                      </p>
                      <p class="param-18 mb-0 tr-gray-two">{{ 0 }}</p>
                    </div>
                  </div>
                  <div class="map-tree-profile mb-5" style="min-height: 400px">
                    <GMap
                      ref="gMap"
                      :center="{
                        lat: 36.8566787,
                        lng: 30.7924575
                      }"
                      :cluster="{ options: { styles: clusterStyle } }"
                      :options="{
                        fullscreenControl: true,
                        streetViewControl: false,
                        mapTypeControl: false,
                        zoomControl: true,
                        gestureHandling: 'cooperative',
                        styles: mapStyle,
                      }"
                      :zoom="7"
                      style="
                        width: 100%;
                        height: 400px;
                        margin-top: 35px;
                        overflow: hidden;
                        border-radius: 0px;
                      "
                    >
                      <GMapMarker
                        :options="{ icon: pins.selected }"
                        :position="{
                          lat: 36.8566787,
                          lng: 30.7924575
                        }"
                      ></GMapMarker>
                    </GMap>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-3 col-12">
              <div class="attributes">
                <p class="text-center tr-gray-one param-xl">Attributes</p>
                <div class="genesis-box mt-4 py-md-2 pr-md-2 pl-md-2">
                  <p class="text-center param tr-gray-two mb-0">
                    <span class="key">NFT Number: </span
                    ><span class="value font-weight-bolder tr-gray-one"
                  >#0</span
                  >
                  </p>
                </div>

                <div class="genesis-box mt-3 py-md-2 pr-md-2 pl-md-2">
                  <p class="text-center param tr-gray-two mb-0">
                    <span class="key">Digital scarcity: </span
                    ><span class="value font-weight-bolder tr-gray-one">{{
                      "0.0001%"
                    }}</span>
                  </p>
                </div>
                <div class="genesis-box mt-3 py-md-2 pr-md-2 pl-md-2">
                  <p class="text-center param tr-gray-two mb-0">
                    <span class="key">Collection: </span
                    ><span class="value font-weight-bolder tr-gray-one">{{
                      "GENESIS"
                    }}</span>
                  </p>
                </div>
                <div class="genesis-box mt-3 py-md-2 pr-md-2 pl-md-2">
                  <p class="text-center param tr-gray-two mb-0">
                    <span class="key">Crown: </span
                    ><span class="value font-weight-bolder tr-gray-one">{{
                      "Yellow"
                    }}</span>
                  </p>
                </div>
                <div class="genesis-box mt-3 py-md-2 pr-md-2 pl-md-2">
                  <p class="text-center param tr-gray-two mb-0">
                    <span class="key">Trunk: </span
                    ><span class="value font-weight-bolder tr-gray-one">{{
                      "Brown"
                    }}</span>
                  </p>
                </div>
                <div class="genesis-box mt-3 py-md-2 pr-md-2 pl-md-2">
                  <p class="text-center param tr-gray-two mb-0">
                    <span class="key">Others: </span
                    ><span class="value font-weight-bolder tr-gray-one">{{
                      "Sun"
                    }}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script>
import SearchBar from "~/components/SearchBar";
import HistoryCard from "../../components/genesis/HistoryCard.vue";
import PeopleCard from "../../components/genesis/PeopleCard.vue";
import AuctionProcess from "../../components/genesis/AuctionProcess.vue";
import moment from "moment"
import treesSearchById from "~/apollo/queries/treesSearchById";
import tree from "~/apollo/queries/tree";
import currentBid from "~/apollo/queries/currentBid"


export default {
  name: "tree-profile",
  layout: "landing",
  middleware:'auth',

  components: {SearchBar, HistoryCard, PeopleCard, AuctionProcess},
  head() {
    return {
      title:`Treejer`,
      meta:[
        { hid: 'description', name: 'description', content:"Enter the Tree ID below and we'll find it for you! :)"},
        { hid: 'keywords', name: 'keywords', content: 'Looking for your tree?  Tree ID Forests Explore Forests Tree Status Explorer\n LeaderBoard' }
      ]
    }
  },
  apollo: {
    tree: {
      query: tree,
      prefetch: false,
      // prefetch: ({ route }) => ({ id: `0x${route.params.id}` }),
      variables () {
        return { id: this.$dec2hex(this.$route.params.id)  }
      }
    },
  },
  data() {
    return {
      newName: false,
      newNameTree: null,
      loading: false,
      treeID:this.$route.params.id,
      clusterStyle: [
        {
          url:
            "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m1.png",
          width: 56,
          height: 20,
          borderRadius: 1,
          textColor: "#fff",
        },
      ],
      mapStyle: [
        {
          elementType: "geometry",
          stylers: [
            {
              color: "#ebe3cd",
            },
          ],
        },
        {
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#523735",
            },
          ],
        },
        {
          elementType: "labels.text.stroke",
          stylers: [
            {
              color: "#f5f1e6",
            },
          ],
        },
        {
          featureType: "administrative",
          elementType: "geometry.stroke",
          stylers: [
            {
              color: "#c9b2a6",
            },
          ],
        },
        {
          featureType: "administrative.land_parcel",
          elementType: "geometry.stroke",
          stylers: [
            {
              color: "#dcd2be",
            },
          ],
        },
        {
          featureType: "administrative.land_parcel",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#ae9e90",
            },
          ],
        },
        {
          featureType: "landscape.natural",
          elementType: "geometry",
          stylers: [
            {
              color: "#dfd2ae",
            },
          ],
        },
        {
          featureType: "poi",
          elementType: "geometry",
          stylers: [
            {
              color: "#dfd2ae",
            },
          ],
        },
        {
          featureType: "poi",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#93817c",
            },
          ],
        },
        {
          featureType: "poi.park",
          elementType: "geometry.fill",
          stylers: [
            {
              color: "#a5b076",
            },
          ],
        },
        {
          featureType: "poi.park",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#447530",
            },
          ],
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [
            {
              color: "#f5f1e6",
            },
          ],
        },
        {
          featureType: "road.arterial",
          elementType: "geometry",
          stylers: [
            {
              color: "#fdfcf8",
            },
          ],
        },
        {
          featureType: "road.highway",
          elementType: "geometry",
          stylers: [
            {
              color: "#f8c967",
            },
          ],
        },
        {
          featureType: "road.highway",
          elementType: "geometry.stroke",
          stylers: [
            {
              color: "#e9bc62",
            },
          ],
        },
        {
          featureType: "road.highway.controlled_access",
          elementType: "geometry",
          stylers: [
            {
              color: "#e98d58",
            },
          ],
        },
        {
          featureType: "road.highway.controlled_access",
          elementType: "geometry.stroke",
          stylers: [
            {
              color: "#db8555",
            },
          ],
        },
        {
          featureType: "road.local",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#806b63",
            },
          ],
        },
        {
          featureType: "transit.line",
          elementType: "geometry",
          stylers: [
            {
              color: "#dfd2ae",
            },
          ],
        },
        {
          featureType: "transit.line",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#8f7d77",
            },
          ],
        },
        {
          featureType: "transit.line",
          elementType: "labels.text.stroke",
          stylers: [
            {
              color: "#ebe3cd",
            },
          ],
        },
        {
          featureType: "transit.station",
          elementType: "geometry",
          stylers: [
            {
              color: "#dfd2ae",
            },
          ],
        },
        {
          featureType: "water",
          elementType: "geometry.fill",
          stylers: [
            {
              color: "#b9d3c2",
            },
          ],
        },
        {
          featureType: "water",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#92998d",
            },
          ],
        },
      ],
      pins: {
        selected: require("~/assets/images/map/tag.png"),
        notSelected: require("~/assets/images/map/tag.png"),
      },
      expireDate:null,
      expireDateText:null,
      currentTreeBid:null,
    };
  },
  async created() {
    this.treeID = parseInt(this.$route.params.id)
    if(this.treeID < 10){
       await this.currentBidPlace()
    }
  },
  methods: {
    async goToFindTree() {
      this.loading = true;
      let self = this;
      if (self.treeID) {
        let result = await this.$apollo.query({
          query: treesSearchById,
          variables: {
            id: this.$dec2hex(self.treeID),
          },
        });

        if (result) {
          if (result.data.trees.length > 0) {
            self.$router.push(`/genesis/${self.treeID}`);
          } else {
            self.$bvToast.toast("Tree Not found!", {
              toaster: "b-toaster-bottom-left",
              solid: true,
              headerClass: "hide",
              variant: "danger",
            });
          }
          this.loading = false;
        }
      } else {
        self.loading = false;
        self.toast("TreeId is empty!")
      }
    },
    async currentBidPlace() {
      this.loading = true;
      let self = this;
      let result = await this.$apollo.query({
          query: currentBid,
          prefetch:true,
          variables:{
            tree:`0x${self.$route.params.id}`,
            isActive:true
          }
        });
      if(result){
          self.currentTreeBid = result.data.auctions[0]
          if(self.currentTreeBid){
            self.expireDate =self.birthDate(self.currentTreeBid.expireDate)
            console.log( self.expireDate," self.expireDate is here")
          }




        }
    },
    add() {
        this.treeID++;
        this.$router.push(
          this.localePath({name: "genesis-id", params: {id: this.treeID}})
        );


    },
    toast(msg){
      this.$bvToast.toast(msg , {
        toaster: "b-toaster-bottom-left",
        solid: true,
        headerClass: "hide",
        variant: "danger",
      })
    },
    odd() {
      if(this.treeID > 0){
        this.treeID--;
        this.$router.push(
          this.localePath({name: "genesis-id", params: {id: this.treeID}})
        );
      }
       if(this.treeID <= 0){
        this.toast('There are no trees')
      }
    },
    changeRoute(item) {
      window.open(item, "_blank");
    },
    editName(item) {
      this.newName = !this.newName;
    },
    setNewName() {
      this.$bvToast.toast("New name registered", {
        variant: "success",
        toaster: "b-toaster-bottom-left",
      });
      this.tree.id = this.newNameTree;
      this.newName = false;
    },
    goToForest(id) {
      this.$router.push(
        this.localePath({name: "forest-id", params: {id: id}})
      );
    },
    checkExpireDate(){

    },
     birthDate(date){
      const now =  moment().format('X')

       let moments =  moment.unix(date).utc()
       if(date < now){
         this.expireDateText = "This auction is over."
       }
       return moment(moments).format('YYYY-MM-DD h:mm:ss')
    }
  },
};
</script>

<style lang="scss">
.genesis-profile {
  .map-tree-profile {
    position: relative;
  }

  .title-md {
    font-weight: bolder;
  }

  .genesis-des {
    .param-xl::after {
      content: "";
      height: 2px;
      background: #757575;
      width: 46px;
      position: absolute;
      right: 30px;
      top: 15px;
    }

    .param-xl::before {
      content: "";
      position: absolute;
      left: 30px;
      height: 2px;
      background: #757575;
      width: 46px;
      top: 15px;
    }

    .genesis-box {
      background: #f0e4c6;
      border-radius: 12px;
    }
  }

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

  .new-name-tree-profile {
    width: 100%;

    .stats {
      position: absolute;
      top: 15px;
      z-index: +999999;
      right: 0;

      span {
        font-size: 28px;
      }
    }

    input {
      position: absolute;
      z-index: +99999;
      width: 100%;
      top: 7px;
      background: #faf8f2 !important;
      font-size: 28px;
    }
  }

  .card-tree-profile {
    height: auto;
    position: relative;
    background: #ffffff;
    box-shadow: 2px 6px 44px rgba(0, 0, 0, 0.09);
    border-radius: 12px;
    margin-top: 51px;
    margin-bottom: 50px;

    .edit-name-position-absolute {
      width: 100%;
      top: -16px;
    }

    .edit-name {
      padding: 4px 24px;
      border-radius: 6px;
      font-size: 18px;
      color: #fafafa;
    }

    .detail-card {
      padding-top: 50px;

      .part {
        padding-top: 32px;
      }
    }
  }
}

.rotate-vert-left {
  -webkit-animation: rotate-vert-left 0.9s cubic-bezier(0.645, 0.045, 0.355, 1) both;
  animation: rotate-vert-left 0.5s cubic-bezier(0.645, 0.045, 0.355, 1) both;
}

/* ----------------------------------------------
 * Generated by Animista on 2020-9-23 16:2:53
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info.
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

@-webkit-keyframes rotate-vert-left {
  0% {
    -webkit-transform: rotateY(0);
    transform: rotateY(0);
    -webkit-transform-origin: left;
    transform-origin: left;
  }
  100% {
    -webkit-transform: rotateY(360deg);
    transform: rotateY(360deg);
    -webkit-transform-origin: left;
    transform-origin: left;
  }
}

@keyframes rotate-vert-left {
  0% {
    -webkit-transform: rotateY(0);
    transform: rotateY(0);
    -webkit-transform-origin: left;
    transform-origin: left;
  }
  100% {
    -webkit-transform: rotateY(360deg);
    transform: rotateY(360deg);
    -webkit-transform-origin: left;
    transform-origin: left;
  }
}

@media (min-width: 100px) and (max-width: 425px) {
  .genesis-profile {
    overflow: hidden;
    min-height: auto;

    .arrows {
      position: relative;

      .arrow-left {
        position: absolute;
        left: -10px;
        bottom: top;
        top: -5%;
      }

      .arrow-right {
        position: absolute;
        right: -10px;
        bottom: top;
        top: -5%;
      }
    }

    .genesis-box {
      padding: 15px 10px;
      margin-bottom: 35px;
    }
  }
}
</style>

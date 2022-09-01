<template>
  <section
    :class="$route.name"
    class="position-relative pt-5 col-12 step-page mb-5 pb-5 genesis-profile"
    style="min-height: 90vh"
  >
    
    <div v-if="tree" class="container-fluid">
      <div class="row justify-content-center text-center">

        <div v-if="oTreeData" class="col-12 tree-profile-img justify-content-center">
          <img :alt="oTreeData.name"
               :src="oTreeData.image" class="img-fluid"
               height="200" width="200"/>

        </div>
      </div>
      <div class="row justify-content-center arrows">
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
          <h4  class="pt-3 text-center title-lg">{{ oTreeData ? oTreeData.name: treeID }}</h4>

          <AuctionProcess
            v-if="auction"
            :auction="auction"
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
            <div class="col-md-3 col-12" >
              <div class="story">
                <p class="text-center tr-gray-one param-xl font-weight-bold">{{$t('tree.story')}}</p>
              </div>
              <div class="genesis-box mt-4 py-md-5 pr-md-4 pl-md-4">
                <p class="text-center param tr-gray-two mb-0">
                  {{$t('tree.everytree')}}
                </p>
                <img
                    alt="tree-stroy"
                    width="100%"
                    src="../../assets/images/tree-profile/typewriter.png"
                  />
              </div>
            </div>
            <div class="col-md-6 col-12">
              <div class="people col-md-6 justify-content-center m-auto">
                <p class="text-center tr-gray-one param-xl font-weight-bold">  {{$t('tree.people')}}</p>
              </div>
              <div v-if="tree" class="col-md-12 pb-md-5 justify-content-center m-auto">
                <span>
                  <PeopleCard
                    :tree="tree"
                  />
                </span>

              </div>
            
              <div class="history col-md-6 justify-content-center m-auto">
                <p class="text-center tr-gray-one param-xl font-weight-bold"> {{$t('tree.history')}}</p>
              </div>
              <div class="col-md-10 justify-content-center m-auto">
                <HistoryCard v-for="history in treeHistories" :history="history" :daiPrice="1" :key="history.id" />

              </div>
              <div class="col-md-12" v-if="tree">
                <div v-if="tree.planter" class="card-tree-profile position-relative">
                 
                  <div class="detail-card">
                    <div class="location part">
                      <p class="param mb-0 tr-gray-three">{{$t('tree.plantedate')}}</p>
                      <p class="param-18 mb-0 tr-gray-two">
                        {{ $moment(tree.plantDate * 1000).strftime("%b %d, %Y at %I:%M %p") }}
                      </p>
                    </div>
                    <div class="gps part">
                      <p class="param mb-0 tr-gray-three">{{$t('tree.GPSCoordinates')}}</p>
                      <p class="param-18 mb-0 tr-gray-two">
                        <span class="pr-2">{{ tree.treeSpecsEntity ? parseFloat( tree.treeSpecsEntity.latitude / Math.pow(10, 6) ) : '-' }}</span
                        >,<span class="pl-2">{{ tree.treeSpecsEntity ? parseFloat( tree.treeSpecsEntity.longitude / Math.pow(10, 6) ) : '-' }}</span>
                      </p>
                    </div>

                    <div class="planter part">
                      <p class="param mb-0 tr-gray-three">{{$t('tree.planter')}}</p>
                      <p class="param-18 mb-0 tr-gray-two">
                        {{ tree.planter ? tree.planter.id : '-' }}
                      </p>
                    </div>

                    <!-- <div class="climate part">
                      <p class="param mb-0 tr-gray-three">
                        Climate Credits (Seed)
                      </p>
                      <p class="param-18 mb-0 tr-gray-two">{{ 0 }}</p>
                    </div> -->
                  </div>
                  <div class="map-tree-profile mb-5" style="min-height: 400px">
                    <GMap
                      ref="gMap"
                      :center="{
                        lat:  tree.treeSpecsEntity ? parseFloat( tree.treeSpecsEntity.latitude / Math.pow(10, 6) ) : 36.8566787,
                        lng: tree.treeSpecsEntity ? parseFloat( tree.treeSpecsEntity.longitude / Math.pow(10, 6) ) : 30.7924575
                      }"
                      :cluster="{ options: { styles: mapStyle.clusterStyle } }"
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
                          lat:  tree.treeSpecsEntity ? parseFloat( tree.treeSpecsEntity.latitude / Math.pow(10, 6) ) : 36.8566787,
                          lng: tree.treeSpecsEntity ? parseFloat( tree.treeSpecsEntity.longitude / Math.pow(10, 6) ) : 30.7924575
                        }"
                      ></GMapMarker>
                    </GMap>
                  </div>
                </div>

                
              </div>


            </div>
            <div class="col-md-3 col-12">
              <div class="attributes">
                <p class="text-center tr-gray-one param-xl font-weight-bold">{{$t('tree.attributes')}}</p>

                <div class="genesis-box mt-4 py-md-2 pr-md-2 pl-md-2">
                  <p class="text-center param tr-gray-two mb-0">
                    <span class="key">{{$t('tree.treenumber')}}</span>
                    <span class="value font-weight-bolder tr-gray-one">#{{ treeID }}</span>
                  </p> 
                </div>

                <div v-if="oTreeData && oTreeData.attributes" class="genesis-box mt-4 py-md-2 pr-md-2 pl-md-2">
                  <p class="text-center param tr-gray-two mb-0">
                    <span class="key">{{$t('tree.distribution')}}</span>
                    <span class="value font-weight-bolder tr-gray-one">{{ searchAttribute('Distribution') || 'N/A' }}</span>
                  </p> 
                </div>
                
                <div v-if="oTreeData && oTreeData.attributes" class="genesis-box mt-4 py-md-2 pr-md-2 pl-md-2">
                  <p class="text-center param tr-gray-two mb-0">
                    <span class="key">{{$t('tree.shape')}}</span>
                    <span class="value font-weight-bolder tr-gray-one">{{ searchAttribute('Tree Shape') || 'N/A' }}</span>
                  </p> 
                </div>

                <div v-if="oTreeData && oTreeData.attributes" class="genesis-box mt-4 py-md-2 pr-md-2 pl-md-2">
                  <p class="text-center param tr-gray-two mb-0">
                    <span class="key">{{$t('tree.crown')}}</span>
                    <span class="value font-weight-bolder tr-gray-one">{{ searchAttribute('Crown Color') || 'N/A' }}</span>
                  </p> 
                </div>

                <div v-if="oTreeData && oTreeData.attributes" class="genesis-box mt-4 py-md-2 pr-md-2 pl-md-2">
                  <p class="text-center param tr-gray-two mb-0">
                    <span class="key">{{$t('tree.trunk')}}</span>
                    <span class="value font-weight-bolder tr-gray-one">{{ searchAttribute('Trunk Color') || 'N/A' }}</span>
                  </p> 
                </div>


                <div v-if="oTreeData && oTreeData.attributes" class="genesis-box mt-4 py-md-2 pr-md-2 pl-md-2">
                  <p class="text-center param tr-gray-two mb-0">
                    <span class="key">{{$t('tree.secret')}}</span>
                    <span class="value font-weight-bolder tr-gray-one">{{ searchAttribute('Secret Multiplier') || 'N/A' }}</span>
                  </p> 
                </div>

                <div class="genesis-box mt-4 py-md-2 pr-md-2 pl-md-2">
                  <p  class="text-center param tr-gray-two mb-0">
                    <span class="key">{{$t('tree.numbers')}} </span>
                    <span class="value font-weight-bolder tr-gray-one" v-if="tree.attribute" >
                      {{ `[${tree.attribute.attribute1},${tree.attribute.attribute2},${tree.attribute.attribute3},${tree.attribute.attribute4},${tree.attribute.attribute5},${tree.attribute.attribute6},${tree.attribute.attribute7},${tree.attribute.attribute8}]` }}
                    </span>

                    <span class="value font-weight-bolder tr-gray-one" v-else >
                      N/A
                    </span>
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
import mapDetails from "~/components/gensisTreeMap"
import SearchBar from "~/components/SearchBar";
import HistoryCard from "~/components/genesis/HistoryCard.vue";
import PeopleCard from "~/components/genesis/PeopleCard.vue";
import AuctionProcess from "~/components/genesis/AuctionProcess.vue";


export default {
  name: "tree-profile",
  layout: "landing",
  components: {SearchBar, HistoryCard, PeopleCard, AuctionProcess, mapDetails},
  data() {
    return {
      baseUrl: process.env.baseUrl,
      meta: {
        title: this.$t('tree.metaSingle.title'),
        description:this.$t('tree.metaSingle.description'),
        keywords:this.$t('tree.metaSingle.keywords')
      },

      loading: false,

      saleType: null,
      treeStatus: null,
      newName: false,
      newNameTree: null,
      treeID: this.$route.params.id,
      clusterStyle: mapDetails.clusterStyle,
      mapStyle: mapDetails.mapStyle,
      pins: mapDetails.pins,
      endDate: null,
      endDateText: null,
      auction: null,
      tree: null,
      highestBid: null,
      attributes: null,
      treeHistories: [],
      oTreeData: null,
      OtreeName: null
    };
  },
 
 head() {

    return {
      title: this.meta.title + this.OtreeName,
      meta: [
        {hid: 'description', name: 'description', content: this.meta.description},
        {hid: 'keywords', name: 'keywords', content: this.meta.keywords},

        {hid: 'og:title', property: 'og:title', content: this.meta.title + this.OtreeName},
        {hid: 'og:description', property: 'og:description', content: this.meta.description},
        {hid: 'og:url', property: 'og:url', content: this.baseUrl + '/tree/' + this.$route.params.id},
        {hid: 'og:image', property: 'og:image', content:  (this.oTreeData ? this.oTreeData.image : '' ) },

        {hid: 'twitter:title', property: 'twitter:title', content: this.meta.title + this.OtreeName},
      ]


    };
  },

 
  async created() {


    this.loading = true
    this.OtreeName = this.$route.params.id;

    this.treeID = parseInt(this.$route.params.id)
    await this.getTree()
    // await this.getOffchainTreeData();
    
    await this.$store.dispatch('setEthPrice')
    await this.getTreeAuction()

    this.getTreeHistory()

    this.OtreeName = this.oTreeData && this.oTreeData.name  ? this.oTreeData.name : this.$route.params.id

    this.loading = false
  },

  asyncData({$axios, $cookies, route}){
    return $axios.$get(`${$cookies.get('config').apiUrl}/trees/${route.params.id}`)
      .then((resp) => {
        // console.log(resp)

        if(!resp.statusCode) {
          return {oTreeData: resp}
        } else {
          return {oTreeData: null}
        }
      })
  },


  computed: {
  },
  methods: {
    async goToFindTree() {
      this.loading = true;

      if (!this.treeID) {
        this.toast("TreeId is empty!")
        this.loading = false;
        return;
      }

      let res = await this.getTreeQuery(this.$dec2hex(this.treeID));
      let tree = res.data.tree;


      if(tree === null) {
        this.toast("Tree not found!")
        this.loading = false;
        return;
      }

      this.loading = true
      this.$router.push(this.localePath(`/tree/${this.treeID}`));
    },
    async getOffchainTreeData() {
      let self = this
      await self.$axios.$get(`${this.$cookies.get('config').apiUrl}/trees/${this.treeID}`)
      .then((oTreeData) => {
        self.oTreeData = oTreeData;
      })
    },
    searchAttribute(what) {
      let attr = this.oTreeData.attributes.find(element => element.trait_type === what)
      if(attr) {
        return attr.value
      } else {
        return null
      }
    },
    async getTreeHistory() {

      //use this for pagination
      // first = 0, skip = 0

      let self = this
      await self.$axios.$post(this.$cookies.get('config').graphqlUrl, {
        query: `{
                  treeHistories(where:{ tree: "${self.$dec2hex(self.$route.params.id)}" }, orderBy: createdAt, orderDirection: desc)
                    {
                        id
                        event
                        from
                        transactionHash
                        blockNumber
                        value
                        createdAt
                    }
                }`,
        prefetch: false
      }).then((treeHistoriesRes) => {
        self.treeHistories = treeHistoriesRes.data.treeHistories ? treeHistoriesRes.data.treeHistories : []
      })

    },
    async getTreeAuction() {
      this.loading = true
      let self = this
      await self.$axios.$post(this.$cookies.get('config').graphqlUrl, {
        query: `{
            auctions(where:{tree:"${self.$dec2hex(self.$route.params.id)}"}){
                  id
                  initialPrice
                  priceInterval
                  startDate
                  endDate
                  winner{
                    id
                  }
                  highestBid
                  isActive
                  bids{
                    id
                    bid
                    bidder{
                      id
                    }
                  }
                }
                }
              `,
        prefetch: false
      }).then((res) => {

        if(res.data.auctions && res.data.auctions.length > 0) {
          self.auction = res.data.auctions.filter(auction => auction.isActive === true)[0];

          if(self.auction == null) {
            self.auction = res.data.auctions.filter(auction => auction.highestBid > 0)[0];
          }
        }

      })
    },
    async getTreeQuery(id) {
      return await this.$axios.$post(this.$cookies.get('config').graphqlUrl, {
        query: `
            {
              tree(id: "${id}") {
                id
                planter{
                  id
                }
                funder{
                  id
                }
                owner{
                  id
                }
                countryCode
                saleType
                treeStatus
                plantDate
                birthDate
                attribute{
                  attribute1
                  attribute2
                  attribute3
                  attribute4
                  attribute5
                  attribute6
                  attribute7
                  attribute8
                  generationType
                }
                
                treeSpecsEntity{
                  id
                  name
                  description
                  externalUrl
                  imageFs
                  imageHash
                  symbolFs
                  symbolHash
                  animationUrl
                  diameter
                  latitude
                  longitude
                  attributes
                }
              }
             }
             `,
        prefetch: false

      })
    },
    async getTree() {
      this.loading = true;
      let self = this;


      let res = await this.getTreeQuery(this.$dec2hex(this.$route.params.id));
      let tree = res.data.tree;

      if(tree === null) {
        self.toast("Tree not found!")
        this.loading = false;
        return;
      }

      this.tree = tree;

      if (tree.treeSpecsEntity) {
        let attr = tree.treeSpecsEntity.attributes;
        this.attributes = typeof attr === 'string' && attr.length>0 ? JSON.parse(attr): {}
      }

      this.loading = false
    },
    add() {
      this.treeID++;
      this.$router.push(
        this.localePath({name: "tree-id", params: {id: this.treeID}})
      );
    },
    toast(msg) {
      this.$bvToast.toast(msg, {
        toaster: "b-toaster-bottom-left",
        solid: true,
        headerClass: "hide",
        variant: "danger",
      })
    },
    odd() {
      if (this.treeID > 0) {
        this.treeID--;
        this.$router.push(
          this.localePath({name: "tree-id", params: {id: this.treeID}})
        );
      }
      if (this.treeID <= 0) {
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
        top: -5%;
      }

      .arrow-right {
        position: absolute;
        right: -10px;
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

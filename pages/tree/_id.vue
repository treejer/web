<template>
  <section
    :class="$route.name"
    class="position-relative pt-5 col-12 step-page mb-5 pb-5 genesis-profile"
    style="min-height: 90vh"
  >
    <!--    <span v-if="highestBid">{{ highestBid }}highestBid</span>-->
    <div v-if="tree" class="container-fluid">
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
        <div v-if="tree && tree.treeSpecsEntity" class="col-12 tree-profile-img justify-content-center">
          <img :alt="tree.treeSpecsEntity.name"
               :src="tree.treeSpecsEntity.imageFs" class="img-fluid"
               height="200" width="200"/>
          <!--          <span v-if="tree"-->
          <!--                id="edit_name"-->
          <!--                class="tr-gray-three tree-profile-number font-weight-bolder"-->
          <!--          >{{ $hex2Dec(tree.id) }}</span-->
          <!--          >-->
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
          <h4 v-if="$route.params.id === 0 " class="pt-3 text-center title-lg">TREE OF LIFE</h4>
          <h4 v-if="$route.params.id !== 0 && tree && tree.treeSpecsEntity"
              class="pt-3 text-center title-lg">{{ tree.treeSpecsEntity.name }}</h4>
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
          <!--          "free"-->
          <!--          "auction"-->
          <!--          "incrementalSell"-->
          <!--          "gift"-->
          <!--          "regularSell"-->
          <!--          "free"-->

          <AuctionProcess
            v-if="auction"
            :auction="auction"
            :ethPrice="ethPrice"
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
                <p class="text-center tr-gray-one param-xl">Story</p>
              </div>
              <div class="genesis-box mt-4 py-md-5 pr-md-4 pl-md-4">
                <p v-if="tree && tree.treeSpecsEntity" class="text-center param tr-gray-two mb-0">
                  {{ tree.treeSpecsEntity.description }}
                </p>
              </div>
            </div>
            <div class="col-md-6 col-12">
              <div class="people col-md-6 justify-content-center m-auto">
                <p class="text-center tr-gray-one param-xl">People</p>
              </div>
              <div v-if="tree" class="col-md-12 pb-md-5 justify-content-center m-auto">
                <span>
                  <PeopleCard
                    :tree="tree"
                  />
                </span>

              </div>
              <div class="Bids col-md-6 justify-content-center m-auto" v-if="auction && auction.bids.length > 0">
                <p class="text-center tr-gray-one param-xl">Bidders</p>
              </div>
              <div v-if="auction"
                   class="col-md-12 pb-md-5 justify-content-center m-auto">
                <AvatarBidders
                  :bids="auction.bids"
                />
              </div>
              <div class="history col-md-6 justify-content-center m-auto">
                <p class="text-center tr-gray-one param-xl">History</p>
              </div>
              <div class="col-md-10 justify-content-center m-auto">
                <!-- <HistoryCard :update="true"/>
                <HistoryCard :listed="true"/>
                <HistoryCard :planted="true"/>
                <HistoryCard :putToSale="true"/>
                <HistoryCard :transferred="true"/>
                <HistoryCard :Offer="true"/>
                <HistoryCard :Auction="true"/>
                <HistoryCard :bidPlaced="true"/>
                <HistoryCard :minted="true"/> -->
                <!-- ToDo: fix daiPrice and wethPrice -->
                <HistoryCard v-for="history in treeHistories" :history="history" :daiPrice="1" :wethPrice="ethPrice" :key="history.id" />

              </div>
              <div class="col-md-12" v-if="tree">
                <div v-if="tree.planter" class="card-tree-profile position-relative">
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
                        {{ $moment(tree.plantDate * 1000).strftime("%b %d, %Y at %I:%M %p") }}
                      </p>
                    </div>
                    <div class="gps part">
                      <p class="param mb-0 tr-gray-three">GPS Coordinates</p>
                      <p class="param-18 mb-0 tr-gray-two">
                        <span class="pr-2">{{ tree.treeSpecsEntity ? parseFloat( tree.treeSpecsEntity.latitude / Math.pow(10, 6) ) : '-' }}</span
                        >,<span class="pl-2">{{ tree.treeSpecsEntity ? parseFloat( tree.treeSpecsEntity.longitude / Math.pow(10, 6) ) : '-' }}</span>
                      </p>
                    </div>
                    <!--                    <div v-if="tree.type" class="species part">-->
                    <!--                      <p class="param mb-0 tr-gray-three">Species</p>-->
                    <!--                      <p class="param-18 mb-0 tr-gray-two">-->
                    <!--                        {{ tree.type.name }}-->
                    <!--                      </p>-->
                    <!--                    </div>-->
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

                <!-- <div v-else class="card-tree-profile position-relative">
                  <div class="position-absolute edit-name-position-absolute">
                    <button
                      class="btn-green edit-name"
                    >
                      Not planted Tree
                    </button>
                  </div>
                </div> -->
              </div>


            </div>
            <div class="col-md-3 col-12">
              <div class="attributes">
                <p class="text-center tr-gray-one param-xl">Attributes</p>
                <div v-for="(item,index) in attributes" :key="index" class="genesis-box mt-4 py-md-2 pr-md-2 pl-md-2">
                  <p v-if="item.trait_type === 'birthday'" class="text-center param tr-gray-two mb-0">
                    <span class="key">{{ item.trait_type }}: </span
                    ><span class="value font-weight-bolder tr-gray-one"
                  >{{ $moment(item.value * 1000).strftime("%b %d, %Y at %I:%M %p") }}</span
                  >
                  </p>

                  <p v-else class="text-center param tr-gray-two mb-0">
                    <span class="key">{{ item.trait_type }}: </span
                    ><span class="value font-weight-bolder tr-gray-one"
                  >{{ item.value }}</span
                  >
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
// import moment from "moment"
import AvatarBidders from "~/components/genesis/AvatarBidders";


export default {
  name: "tree-profile",
  layout: "landing",
  components: {SearchBar, HistoryCard, PeopleCard, AuctionProcess, AvatarBidders, mapDetails},
  head() {
    return {
      title: `Treejer`,
      meta: [
        {hid: 'description', name: 'description', content: "Enter the Tree ID below and we'll find it for you! :)"},
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'Looking for your tree?  Tree ID Forests Explore Forests Tree Status Explorer\n LeaderBoard'
        }
      ]
    }
  },

  data() {
    return {
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
      ethPrice: 4000
    };
  },
  async created() {
    // if (await this.$route.params.id >= 100) {
    // await  this.$router.push(`/increamentalSell/${this.$route.params.id}`)
    // }
    await this.getEthPrice()

    this.loading = true
    this.treeID = parseInt(this.$route.params.id)
    await this.getTree()
    console.log(this.loading, "this,.loading")
    await this.getTreeAuction()
    if (this.tree) {
      await this.checkProvideStatus(this.tree.saleType)
      // await this.checkMintStatus(this.tree.mintStatus)
      await this.checkTreeStatus(this.tree.treeStatus)
    }
    this.getTreeHistory()




    this.loading = false
  },

  methods: {
    async getEthPrice() {
      console.log(process.env.ethPrice, "process.env.ethPrice");
      this.$axios.$get(process.env.ethPrice).then(res => {
        this.ethPrice = res.result.ethusd;
      });
    },
    async goToFindTree() {
      this.loading = true;
      let self = this;
      if (self.treeID) {
        self.loading = true
        self.$router.push(`/tree/${self.treeID}`);
      } else {
        self.toast("TreeId is empty!")
        self.loading = false;
      }
    },
    async getTreeHistory() {

      //use this for pagination
      // first = 0, skip = 0

      let self = this
      await self.$axios.$post(process.env.graphqlUrl, {
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

        console.log(treeHistoriesRes, "treeHistoriesRes")

        self.treeHistories = treeHistoriesRes.data.treeHistories ? treeHistoriesRes.data.treeHistories : []

      })

    },
    async getTreeAuction() {
      this.loading = true
      let self = this
      await self.$axios.$post(process.env.graphqlUrl, {
        query: `{
            auctions(where:{tree:"${self.$dec2hex(self.$route.params.id)}"}){
                  id
                  tree{
                    id
                  }
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

        console.log(res, "auctions")
        // self.auction = res.data.auctions ? res.data.auctions[0] : null


        if(res.data.auctions && res.data.auctions.length > 0) {
          self.auction = res.data.auctions.filter(auction => auction.isActive === true)[0];


          if(self.auction == null) {
            self.auction = res.data.auctions.filter(auction => auction.highestBid > 0)[0];
          }

        }


        // if(self.auction) {
        //     self.endDate = self.birthDate(self.auction.endDate)
        //     self.highestBid = self.$web3.utils.fromWei(self.auction.highestBid)

        // }

        //         console.log(self.highestBid, " self.highestBid is here")

      })
    },
    async getTree() {
      this.loading = true;
      let self = this;
      await self.$axios.$post(process.env.graphqlUrl, {
        query: `
            {
              tree(id: "${self.$dec2hex(self.$route.params.id)}") {
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
             }`,
        prefetch: false

      }).then((res) => {
        self.tree = res.data.tree

        if(res.data.tree === null) {
          self.toast("Tree not found!")
          return;
        }

        if (self.tree.treeSpecsEntity) {
          let attr = self.tree.treeSpecsEntity.attributes;
          // self.attributes = JSON.parse(self.tree.treeSpecsEntity.attributes.replace(/,([^,]*)$/, '$1'))
          self.attributes = typeof attr === 'string' && attr.length>0 ? JSON.parse(attr): {}
        }


      })
      // if (result.data) {
      //   console.log(result.data.tree, "result is here")
      //   self.tree = result.data.tree
      //
      //     let parse =JSON.parse(self.tree.treeSpecsEntity.attributes)
      //     console.log(parse,"|parse")
      //
      //
      //
      // }
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
    },
    checkProvideStatus(data) {
      switch (data) {
        case '0':
          this.saleType = "free"
          break;
        case '1':
          this.saleType = "auction"
          break;
        case '2':
          this.saleType = "incrementalSell"
          break;
        case '3':
          this.saleType = "gift"
          break;
        case '4':
          this.saleType = "regularSell"
          break;
        default:
          this.saleType = "free"
          break;
      }
      console.log(this.saleType, "this.saleType")


    },
    // checkMintStatus(data) {
    //   switch (data) {
    //     case '0':
    //       this.mintStatus = "regular"
    //       break;
    //     case '1':
    //       this.mintStatus = "incrementalSell"
    //       break;
    //     case '2':
    //       this.mintStatus = "auction"
    //       break;
    //     default:
    //       this.mintStatus = "regular"
    //       break;
    //   }
    //   console.log(this.mintStatus, "this.mintStatus")


    // },
    checkTreeStatus(data) {
      switch (data) {
        case '0':
          this.treeStatus = "notExisted"
          break;
        case '1':
          this.treeStatus = "reported"
          break;
        case '2':
          this.treeStatus = "genesis"
          break;
        case '3':
          this.treeStatus = "pendingPlant"
          break;
        case '4':
          this.treeStatus = "planted"
          break;
        default:
          this.treeStatus = "notExisted"
          break;
      }
      console.log(this.treeStatus, "this.treeStatus")


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

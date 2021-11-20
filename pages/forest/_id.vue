<template>
  <section
    ref="dashboard"
    :class="$route.fullPath"
    class="position-relative pt-5 col-lg-10 col-12 my-forest"
  >
    <div class="container-fluid p-0">
      <div class="row article justify-content-between">
        <div class="col-lg-8 col-12">
          <div class="row">
            <div class="col-lg-5 col-md-5 col-5">
              <h2
                class="title-sm d-inline-flex Montserrat-Medium"
              >
                <span v-coin
                      class="pr-2 pl-0 text-capitalize Montserrat-Medium">{{
                    $route.params.id != $cookies.get('account') ? $route.params.id : 'MY'
                  }}</span>
                Forest
              </h2>
            </div>

          </div>
          <div class="row treejer-desc">
            <div v-for="(item ,index) in treejerDesc" :key="index" class="col-lg-3 col-md-6 col-12 border-right">
              <p class="tr-gray-two">{{ item.name }}</p>
              <p class="d-flex justify-content-start align-items-center mb-0">
                <span
                ><img
                  :src="treeIcon"
                  alt="tree"
                  class="img-fluid"
                /></span>
                <span>
                  <span>{{ owner ? owner.treeCount : 0 }}</span>
                </span>
              </p>
            </div>

          </div>
<!--          v-if="$cookies.get('account') === $route.params.id"-->
          <div class="row treejer-user-flow" >
            <div class="col-12">
              <div class="bg-brown">
                <div class="row">
                  <div class="col-md-6">
                    <p class="tr-gray-one param-18 mb-1 font-weight-bold">
                      Getting Started
                    </p>
                    <p class="param tr-gray-three">
                      Let’s help you get started setting up your forest. Here
                      are some key things to do.
                    </p>
                  </div>
                  <div class="col-md-6">
                    <ul class="p-0">
                      <li
                        class="list-style-none param-sm mb-1 Montserrat-Medium"
                      >
                        <span class="step-number mr-2">
                          <button
                            :class="
                              $cookies.get('account')
                                ? 'btn-outline-green disabled'
                                : 'btn-green'
                            "
                            @click="showModal"
                          >
                            {{ $cookies.get("account") ? "Done" : "step 1" }}
                          </button>
                        </span>
                        <span
                          :class="
                            $cookies.get('account')
                              ? 'tr-gray-four'
                              : 'tr-gray-three'
                          "
                        >
                          Connect your wallet
                        </span>
                      </li>
                      <li
                        class="list-style-none param-sm mb-1 Montserrat-Medium"
                      >
                        <span class="step-number mr-2">
                          <button
                            :class="
                              owner && owner.treeCount > 0 ? 'btn-outline-green' : 'btn-green'
                            "
                            @click.prevent="goToAddTree"
                          >
                            {{ owner && owner.treeCount > 0 ? "Done" : "step 2" }}
                          </button>
                        </span>
                        <span
                          :class="owner && owner.treeCount > 0 ? 'tr-gray-four' : 'tr-gray-two'"
                        >
                          Add trees to your forest
                        </span>
                      </li>

                      <li
                        class="list-style-none param-sm mb-1 Montserrat-Medium"
                      >
                        <span class="step-number mr-2">
                          <button
                            :class=" owner && owner.treeCount > 0? 'btn-outline-green': 'btn-green' "
                            @click="comunity()"
                          >
                            step 3
                          </button>
                        </span>
                        <span> Join our community! </span>
                      </li>
                      <li
                        class="list-style-none param-sm mb-1 Montserrat-Medium"
                      >
                        <span class="step-number mr-2">
                          <button
                            :class=" owner && owner.treeCount > 0? 'btn-outline-green': 'btn-green' "
                            @click="$router.push('/forest/referral')"
                          >
                            step 4
                          </button>
                        </span>
                        <span> Invite Friends </span>
                      </li>

                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row forest-status position-relative">
            <div class="col-12 mt-5">
              <p class="param-18 tr-gray-three Montserrat-Medium p-0">
                Forest Status
              </p>
            </div>
            <div class="col-12 position-relative p-0">
              <div class="col-12 mb-3 p-0">
                <span v-for="(item, index) in test" :key="index">
                  <img
                    class="img-fluid p-2"
                    src="~/assets/images/myforest/trees.png"
                    style="mix-blend-mode: luminosity"
                  />
                </span>
              </div>
              <div
                v-if="owner && owner.treeCount > 0"
                class="col-12 p-0 befor-res"
                style="left: 0"
              >
                <span
                  v-for="(item, index) in trees.slice(0, 50)"
                  :id="item.id"
                  :key="index"
                  class=""
                >
                  <b-button
                    v-b-tooltip.top
                    :tabindex="index"
                    :title="$hex2Dec(item.id)"
                    class="p-2 bg-transparent border-0"
                    @click="goToTreeProfile($hex2Dec(item.id))"
                  >
                    <img
                      class="img-fluid"
                      src="~/assets/images/myforest/trees.png"
                    />
                  </b-button>
                  <!--                <b-tooltip :target="item.id">{{ item.id }}</b-tooltip>-->
                </span>
              </div>
              <div
                v-if="owner && owner.treeCount > 50 && showMoreTreeData"
                class="col-12 p-0"
                style="transition: all 0.3s ease"
              >
                <span
                  v-for="(item, index) in trees.slice(50)"
                  :id="item.id"
                  :key="index"
                  class="pointer-event"
                  style="transition: all 0.3s ease"
                >
                  <b-button
                    v-b-tooltip.top
                    :tabindex="index"
                    :title="$hex2Dec(item.id)"
                    class="p-2 bg-transparent border-0"
                    @click="goToTreeProfile($hex2Dec(item.id))"
                  >
                    <img
                      class="img-fluid pointer-event"
                      src="~/assets/images/myforest/trees.png"
                    />
                  </b-button>
                </span>
                <span
                  class="btn-green d-block text-center mt-3 pointer-event show-more-tree-all"
                  @click="showMoreTreeData = !showMoreTreeData"
                >{{ showMoreTreeData ? "&#8679;" : "&#8681;" }}</span
                >
              </div>
            </div>
          </div>

          <div class="row treejer-earth d-md-block d-none pb-5 pt-5">
            <div class="col-12">
              <p class="param-18 tr-gray-three Montserrat-Medium">
                Forest on the Map
              </p>
            </div>
            <div class="col-12 mt-5">
              <GMap
                v-if="owner && owner.treeCount > 0 && ownerTreesLoaded"
                ref="gMap"
                :center="{
                            lat: trees[0].treeSpecsEntity ? parseFloat( trees[0].treeSpecsEntity.latitude / Math.pow(10, 6) )   : 24.06448,
                            lng: trees[0].treeSpecsEntity ? parseFloat( trees[0].treeSpecsEntity.longitude / Math.pow(10, 6) ) : 81.30946,
                          }"
                :cluster="{ options: { styles: mapConfigData.clusterStyle } }"
                :options="{
                            fullscreenControl: true,
                            streetViewControl: false,
                            mapTypeControl: false,
                            zoomControl: true,
                            gestureHandling: 'cooperative',
                            styles: mapConfigData.mapStyle,
                          }"
                :zoom="6"
              >
                <GMapMarker
                  v-for="tree in trees"
                  v-if="owner && owner.treeCount > 0 && ownerTreesLoaded && tree.treeSpecsEntity"
                  :key="tree.id"
                  :options="{
                              icon:
                                tree === currentTree ? mapConfigData.pins.selected : mapConfigData.pins.notSelected,
                            }"
                  :position="{ lat: parseFloat( tree.treeSpecsEntity.latitude / Math.pow(10, 6) ) || 24.06448, lng: parseFloat( tree.treeSpecsEntity.longitude / Math.pow(10, 6) ) || 81.30946 }"
                  @click="currentTree = tree"
                >
                  <GMapInfoWindow :options="{ maxWidth: 200 }">
                    <b>{{ tree.id }}</b>
                    <br/>
                    <br/>
                    <code>
                      Lat: {{ parseFloat(tree.treeSpecsEntity.latitude / Math.pow(10, 6)) }},
                      <br/>
                      Lng: {{ parseFloat(tree.treeSpecsEntity.longitude / Math.pow(10, 6)) }}
                    </code>
                  </GMapInfoWindow>
                </GMapMarker>
              </GMap>

              <div v-if="(owner && owner.treeCount == 0) || ownerTreesLoaded === false">
                <GMap
                  ref="gMap"
                  :center="{ lat: 24.06448, lng: 81.30946 }"
                  :cluster="{ options: { styles: mapConfigData.clusterStyle } }"
                  :options="{
                              fullscreenControl: true,
                              streetViewControl: false,
                              mapTypeControl: false,
                              zoomControl: true,
                              gestureHandling: 'cooperative',
                              styles: mapConfigData.mapStyle,
                            }"
                  :zoom="2"
                >
                </GMap>
              </div>
            </div>
          </div>

        </div>

        <div class="col-lg-3 col-12 justify-content-center overflow-hidden">
          <div class="box-right">
            <div
              class="avatar-card border-0 text-center justify-content-center"
            >
              <div class="card-img position-relative">
                <img
                  :alt="$route.params.id"
                  :src="icon"
                  class="avatar-pic img-fluid"
                />

              </div>
              <p
                v-coin
                class="param-sm mt-3 tr-gray-three token-one"
                v-text="$route.params.id"
              ></p>

              <!--              <p class="param-sm mt-4 tr-gray-four font-weight-bold" style="">-->
              <!--                Wallet Balance-->
              <!--              </p>-->
              <div class="row tokens">
                <div class="col-md-12 mt-3">
                  <div class="d-flex border-bottom mb-2 justify-content-between align-self-center align-items-center">
                    <p
                      class="pb-1 logo-tokens tr-gray-three param-sm font-weight-bold "
                    >
                      <img
                        class="img-fluid"
                        src="~/assets/images/myforest/tree.svg"
                      />

                      {{ owner && owner.treeCount >= 0 ? ' Tree' : 'Trees' }}
                    </p>
                    <p
                      v-if="owner"
                      class="pb-2 text-right pr-4 tr-green param-sm font-weight-bold "
                    >
                      {{  owner.treeCount }}
                    </p>
                  </div>
                  <div class="d-flex border-bottom mb-2 justify-content-between align-self-center align-items-center">
                    <p
                      class="pb-1 logo-tokens tr-gray-three param-sm font-weight-bold"
                    >
                      <img
                        class="img-fluid"
                        src="~/assets/images/myforest/weth.svg"
                      />

                      WETH
                    </p>

                    <p
                      class="pb-2 text-right pr-4 tr-green param-sm font-weight-bold "
                    >
                      {{ wethBalance || 0 }}
                    </p></div>
                  <div class="d-flex border-bottom mb-2  justify-content-between align-self-center align-items-center">
                    <p
                      class="pb-1 logo-tokens tr-gray-three param-sm font-weight-bold"
                    >
                      <img
                        class="img-fluid"
                        src="~/assets/images/myforest/dai.svg"
                        style="margin-right: 7px"
                      />
                      DAI
                    </p>


                    <p
                      class="pb-2 text-right pr-4 tr-green param-sm font-weight-bold "
                    >
                      {{ daiBalance || 0 }}
                    </p></div>
                </div>
              </div>
              <!--            <p class="param-sm-light"> @JaneJoe</p>-->
            </div>
            <div class="trees">
              <div class="add-tree">
                <button class="btn-lg" @click="goToAddTree()">
                  Plant trees
                </button>
              </div>
            </div>
            <FindTreeButton/>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Fas from "@/components/font-awsome/Fas";
// import content from "./static/data/world.json";
import Wallets from "../../components/Wallets";
import Metamask from "../../components/Metamask";
import owner from "~/apollo/queries/owner";
// import ForestMap from "@/components/ForestMap";
import mapConfig from "~/static/data/mapConfig.json";
import FindTreeButton from "../../components/forest/FindTreeButton";

export default {
  name: "forest",
  layout: "dashboard",
  components: {Metamask, Fas, Wallets, FindTreeButton},

  head() {
    return {
      title: "Treejer",
      meta: [
        {hid: 'description', name: 'description', content: "My Forest\n profile your forest page"},
        {
          hid: 'keywords',
          name: 'keywords',
          content: "FOREST SIZE RELEASED Seed RELEASED O2 Wallet Balance Forest on the Map Forest Status"
        }
      ]
    }
  },
  apollo: {
    owner: {
      query: owner,
      skip() {
        return this.$route.params.id === 'guest' ? true : false
      },
      prefetch: ({route}) => ({id: route.params.id.toLowerCase()}),
      variables() {
        return {id: this.$route.params.id.toLowerCase()}
      },
      fetchPolicy: "network-only"
    },
  },
  watch: {
    async owner() {
      await this.getFunderTrees();
    }
  },

  data() {
    return {
      title: this.$route.name,
      icon: `${process.env.gravatar}${(this.$route.params.id ?? '0')}`,
      showMoreTreeData: false,
      test: [{}],
      treeIcon: require("~/assets/images/myforest/tree.svg"),
      avatar: require("~/assets/images/myforest/avatar.png"),
      treejerDesc: [{name: 'Forest Size'}, {name: 'Genesis Trees'}, {name: 'Regular Trees'}],
      activeIndexSteps: null,
      loading: false,
      ethBalance: 0,
      treeID: null,
      trees: [],
      ownerTreesLoaded: false,
      mapConfigData: mapConfig,
      currentTree: {},
      daiBalance: null,
      wethBalance: null

    };
  },
  async created() {
    await this.$store.commit('SET_SIDEBAR_INDEX', 0)
    console.log(this, 'this, is here')
  },
  async mounted() {
    await this.createTestObject();
    await this.getEthBalance();
    await this.getDaiBalance();
    await this.getWethBalance();
    console.log(this,"this.owner")

  },
  methods: {
    async getFunderTrees() {
      if (!this.owner || this.$route.params.id === 'guest' || this.owner.treeCount <= 0) {
        return;
      }

      //use this for pagination
      // first = 0, skip = 0

      let self = this
      await self.$axios.$post(process.env.graphqlUrl, {
        query: `{
                    trees(first: 50, skip: 0, where:{ owner: "${this.$route.params.id.toLowerCase()}" }, orderBy: createdAt, orderDirection: desc)
                      {
                          id
                          treeSpecsEntity {
                            latitude
                            longitude
                          }
                          createdAt
                      }
                  }`,
        prefetch: false
      }).then((treesRes) => {

        console.log(treesRes, "treesRes")
        if (treesRes.data.trees && treesRes.data.trees.length > 0) {
          self.trees = treesRes.data.trees
          self.ownerTreesLoaded = true
        }

      })


    },
    goToAddTree() {
      let self = this;
      if (!self.$cookies.get("account")) {
        self.$bvToast.toast("you're not login", {
          toaster: 'b-toaster-bottom-left',
          solid: true,
          headerClass: 'hide',
          variant: 'danger'
        })
        self.$bvModal.show("five");
      } else {
        self.$router.push("/forest/checkout");
      }
    },
    comunity() {
      window.open("https://discuss.treejer.com", "_blank");
    },
    showModal(e) {
      this.$bvModal.show("five");
    },
    changeRoute(item) {
      window.open(item, "_blank");
    },
    async getEthBalance() {

      if (this.$cookies.get("account") == null) {
        return;
      }

      let self = this
      await this.$web3.eth
        .getBalance(this.$cookies.get("account"))
        .then(async (ethBalance) => {
          const test = await self.$web3.utils.fromWei(ethBalance);
          this.ethBalance = parseFloat(test).toFixed(4);
        });
    },
    goToTreeProfile(item) {
      this.$router.push(
        this.localePath({name: "tree-id", params: {id: item}})
      );
    },
    createTestObject() {
      for (let i = this.test.length; i < 50; i++) {
        this.test.push({i})
      }
    },
    async getDaiBalance() {
      const daiBalance = await this.$store.dispatch('dai/balanceOf')
      this.daiBalance = parseFloat(daiBalance).toFixed(2)
    },
    async getWethBalance() {
      const wethBalance = await this.$store.dispatch('weth/balanceOf')
      this.wethBalance = parseFloat(wethBalance).toFixed(2)
      console.log(this.wethBalance, " this.wethBalance  is here")
    },
    // async getDaiAllowance() {
    //   const daiAllowance = await this.$store.dispatch('dai/allowance')
    //   console.log(daiAllowance, "daiAllowance")
    // }
  },
};
</script>
<style lang="scss" scoped>
.my-forest {
  * {
    font-family: Montserrat-Medium;
  }

  .box-right {
    margin-top: 64px;

    .tokens {
      display: flex;
      align-self: center;
      align-item: center;

      p {
        margin-bottom: 5px;
      }

      img {
        padding-right: 10px;
      }
    }
  }

  .show-more-tree-all {
    font-size: 26px;
    display: flex;
    justify-content: center;
    text-align: center;
    width: 100px;

    margin: auto;
  }

  .logo-tokens {
    display: flex;
    padding: 0 20px;

  }

  .token-one {
    width: 75%;
    margin: auto;
    background: #e5e7db;
    border: 2px solid #ffffff;
    box-sizing: border-box;
    border-radius: 18px;
    padding: 5px 15px;
  }


  .bg-brown {
    background: rgba(208, 169, 69, 0.25);
    border-radius: 12px;
    padding: 30px 20px;
    margin-top: 48px;
    font-family: Montserrat-Medium;

    button.bg-outline-green {
      width: 48px;
      height: 16px;
      border: 1px solid #757575;
      box-sizing: border-box;
      border-radius: 10px;
    }
  }

  .avatar-pic {
    width: 80px;
    height: 80px;
  }

  .treejer-desc {
    margin-top: 35px;

    .border-right:last-child {
      border: none !important;
    }

    p,
    span {
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

  .btn-wallet {
    border: 1px solid #5a9d79;
    box-sizing: border-box;
    border-radius: 6px;
    font-size: 14px;
    padding: 10px 20px;
    font-weight: bolder;
  }

  .add-tree {
    margin: auto;
    text-align: center;

    button {
      box-shadow: 0 4px 11px 0 rgba(0, 0, 0, 0.16);
      background-color: #67b68c;
      width: 176px;
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

    .avatar-pic {
      border: solid 2px white;
      border-radius: 50px !important;
      background-color: white;
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

      svg,
      img {
        position: absolute;
        z-index: +999;
        top: 12px;
        left: 35px;
      }
    }
  }


}

@media (max-width: 768px) {
  .my-forest
  > div
  > div
  > div.col-lg-9
  > div:nth-child(1)
  > div.col-lg-7.col-12.justify-content-end.text-right {
    text-align: left !important;
    justify-content: flex-start !important;
  }
  .my-forest
  > div
  > div
  > div.col-lg-3.col-12.justify-content-center
  > div.trees
  > div.redeem-trees
  > input {
    margin-bottom: 15px;
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
      border-bottom: none !important;
    }
  }
}
</style>

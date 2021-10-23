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
                <span v-coin class="pr-4 pl-0">{{$route.params.id != $cookies.get('account') ? $route.params.id : 'MY'}}</span>
                Forest
              </h2>
            </div>
            <div class="col-lg-7 col-md-7 col-7 justify-content-end text-right">
              <div class="form-group">
                <label>
                  <img
                    alt="search"
                    class="pointer-event"
                    src="../../assets/images/search.svg"
                    @click="goToFindTree"
                  />
                  <input
                    v-model="treeID"
                    class="form-control-lg"
                    placeholder="Enter Tree ID"
                    @keyup.enter="goToFindTree()"
                  />
                </label>
              </div>
            </div>
          </div>
          <div class="row treejer-desc">
            <div class="col-lg-3 col-md-6 col-12 border-right">
              <p class="tr-gray-two">FOREST SIZE</p>
              <p class="d-flex justify-content-start align-items-center mb-0">
                <span
                ><img
                  alt="tree"
                  class="img-fluid"
                  src="../../assets/images/myforest/tree.svg"
                /></span>
                <span>
                  <span>{{ funder ? funder.treeCount : 0 }}</span>
                </span>
              </p>
            </div>
            <div class="col-lg-3 col-md-6 col-12 border-right">
              <p>RELEASED Seed</p>
              <p class="d-flex justify-content-start align-items-center mb-0">
                <span
                ><img alt="seed" src="~/assets/images/myforest/SeedLogo.svg"
                /></span>
                <span class="param-18 font-weight-bold">
                  {{ 0 }}
                </span>
              </p>
            </div>

            <div class="col-lg-3 col-md-6 col-12">
              <p>RELEASED O2</p>
              <p class="d-flex justify-content-start align-items-center mb-0">
                <span
                ><img alt="o2" src="../../assets/images/myforest/O2Logo.svg"
                /></span>

                <span>{{ 0 }}</span>
              </p>
            </div>
            <!-- <div
              class="col-lg-3 col-md-6 col-12 align-items-center justify-content-center p-0 mt-3"
            >
              <button class="btn-outline-green btn-wallet">
                Send to Wallet
              </button>
            </div> -->
          </div>
          <div class="row treejer-user-flow">
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
                              funder && funder.treeCount > 0 ? 'btn-outline-green' : 'btn-green'
                            "
                            @click.prevent="goToAddTree"
                          >
                            {{ funder && funder.treeCount > 0 ? "Done" : "step 2" }}
                          </button>
                        </span>
                        <span
                          :class="funder && funder.treeCount > 0 ? 'tr-gray-four' : 'tr-gray-two'"
                        >
                          Add trees to your forest
                        </span>
                      </li>

                      <li
                        class="list-style-none param-sm mb-1 Montserrat-Medium"
                      >
                        <span class="step-number mr-2">
                          <button
                            :class=" funder && funder.treeCount > 0? 'btn-outline-green': 'btn-green' "
                            @click="comunity()"
                          >
                            step 3
                          </button>
                        </span>
                        <span> Join our community! </span>
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
                v-if="funder && funder.treeCount > 0"
                class="col-12 p-0 befor-res"
                style="left: 0"
              >
                <span
                  v-for="(item, index) in funder.trees.slice(0, 50)"
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
                v-if="funder && funder.treeCount > 50 && showMoreTreeData"
                class="col-12 p-0"
                style="transition: all 0.3s ease"
              >
                <span
                  v-for="(item, index) in funder.trees.slice(50)"
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
          <ForestMap
            :funder="funder"
          />
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
                class="param-sm mt-3 tr-gray-three token"
                v-text="$route.params.id"
              ></p>

              <p class="param-sm mt-4 tr-gray-four font-weight-bold" style="">
                Wallet Balance
              </p>
              <div class="row tokens">
                <div class="col-6 p-0">
                  <p
                    class="pb-1 logo-tokens tr-gray-three param-sm font-weight-bold border-bottom"
                  >
                    <img
                      class="img-fluid"
                      src="~/assets/images/myforest/ETHLogo.svg"
                    />
                    ETH
                  </p>
                  <p
                    class="pb-1 logo-tokens tr-gray-three param-sm font-weight-bold border-bottom"
                  >
                    <img
                      class="img-fluid"
                      src="~/assets/images/myforest/SeedLogo.svg"
                      style="margin-right: 7px"
                    />
                    Seed
                  </p>
                  <p
                    class="pb-1 logo-tokens tr-gray-three param-sm font-weight-bold"
                  >
                    <img
                      class="img-fluid"
                      src="~/assets/images/myforest/O2Logo.svg"
                    />
                    O2
                  </p>
                </div>
                <div class="col-6 p-0">
                  <p
                    class="pb-2 text-right pr-4 tr-green param-sm font-weight-bold border-bottom"
                  >
                    {{ ethBalance > 0 ? ethBalance : 0 }}
                  </p>
                  <p
                    class="pb-2 text-right pr-4 tr-green param-sm font-weight-bold border-bottom"
                  >
                    {{ 0 }}
                  </p>
                  <p
                    class="pb-2 text-right pr-4 tr-green param-sm font-weight-bold"
                  >
                    0
                  </p>
                </div>
              </div>
              <!--            <p class="param-sm-light"> @JaneJoe</p>-->
            </div>
            <div class="trees">
              <div class="add-tree">
                <button class="btn-lg" @click="goToAddTree()">
                  ADD A TREE
                </button>
              </div>
              <div class="gift-tree mb-4">
                <!--                <nuxt-link class="position-relative" to="/forest/giftTree">-->
                <button class="btn-lg disabled">GIFT A TREE</button>
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
import Fas from "@/components/font-awsome/Fas";
import content from "./world.json";
import Wallets from "../../components/Wallets";
import Metamask from "../../components/Metamask";
import treesSearchById from "~/apollo/queries/treesSearchById";
import funder from "~/apollo/queries/funder";
import ForestMap from "@/components/ForestMap";

export default {
  name: "forest",
  layout: "dashboard",
  components: {Metamask, Fas, Wallets, ForestMap},

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
    funder: {
      query: funder,
      prefetch: ({route}) => ({id: route.params.id.toLowerCase()}),
      variables() {
        return {id: this.$route.params.id.toLowerCase()}
      }
    },
  },
  computed: {
    messages() {
      return content;
    }
  },

  data() {
    return {
      title: this.$route.name,
      icon: `${process.env.gravatar}${(this.$route.params.id ?? '0')}`,
      showMoreTreeData: false,
      test: [{}],
      avatar: require("~/assets/images/myforest/avatar.png"),
      steps: [
        {active: true, step: "step 1", text: "Connect your wallet"},
        {active: false, step: "step 2", text: "Add trees to your forest"},
        {
          active: false,
          step: "step 3",
          text: "Release Seed/O2 to your wallet",
        },
        {active: false, step: "step 4", text: "Join our community!"},
      ],
      activeIndexSteps: null,
      loading: false,
      ethBalance: 0,
      treeID: null,
    };
  },
  mounted() {
    console.log(this.$dec2hex,": this.$dec2hex")
    this.createTestObject();
    this.getEthBalance();
    console.log(this.funder ,"this.funder");
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
        self.$bvToast.toast("TreeId is empty!", {
          toaster: "b-toaster-bottom-left",
          solid: true,
          headerClass: "hide",
          variant: "danger",
        });
      }
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
        self.$router.push("/forest/addTree");
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
      let self = this
      await this.$web3.eth
        .getBalance(this.$route.params.id)
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
    }
  },
};
</script>
<style lang="scss" scoped>
.my-forest {
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
    justify-content: space-between;
    padding: 0 20px;
  }

  .token {
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
        right: 150px;
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

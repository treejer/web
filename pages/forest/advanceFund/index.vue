<template>
  <section
    class="position-relative pt-5 col-lg-10 col-12 advance-fund mb-5 pb-5 slide-left"
  >
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-12 col-12 box-left-treebox">
          <h1 class="title tr-gray-two font-weight-bold">
            {{ $t("advanceFund.title") }}
          </h1>
          <p class="param tr-gray-three">
            {{ $t("advanceFund.description") }}
            <a class="d-inline tr-green font-weight-bolder" href="#">
              {{ $t("header.learnmore") }}</a
            >
          </p>
          <div class="sort-advanceFund">
            <div
              class="search-advancefund param-18 tr-gray-two tr-margin-top col-lg-3 col-12"
              id="search"
            >
              <b-form-input
                :placeholder="$t('forest.entertreeID')"
                class="search tr-gray-two param"
                v-model="advanceFundSearch"
                type="text"
                @keyup.enter="getTreeModels()"
              ></b-form-input>
              <span class="search pointer-event"
                ><img
                  class="pointer-event"
                  @click.prevent="getTreeModels()"
                  :src="searchIcon"
                  alt="search-icon"
                />
              </span>
            </div>
            <div class="param-18 tr-gray-two tr-margin-top col-lg-3 col-12">
              {{ $t("advanceFund.country") }}
              <b-form-select
                class="city-selected tr-gray-two param"
                v-model="selectedCountry"
                :options="optionsCountries"
              ></b-form-select>
            </div>
            <div class="param-18 tr-gray-two tr-margin-top col-lg-3 col-12">
              {{ $t("advanceFund.price") }}
              <b-form-select
                class="city-selected tr-gray-two param"
                v-model="selectedPrice"
                :options="optionsPrices"
              ></b-form-select>
            </div>

            <div class="param-18 tr-gray-two tr-margin-top col-lg-3 col-12">
              {{ $t("advanceFund.spieces") }}
              <b-form-select
                class="city-selected tr-gray-two param"
                v-model="selectedSpiece"
                :options="optionsSpieces"
              ></b-form-select>
            </div>

            <div class="col-12 position-fixed buy" v-if="listItems.length > 0">
              <nuxt-link
                :to="localePath('/forest/advanceFund/checkout')"
                class="btn btn-green"
                >Buy</nuxt-link
              >
            </div>
            <div class="param-18 tr-gray-two tr-margin-top position-absolute">
              <div class="shopping-card pointer-event">
                <img
                  src="@/assets/images/advanceFund/shopping.svg"
                  width="20"
                  height="20"
                  @click.prevent="showShoppinglist = !showShoppinglist"
                />
                <b-badge variant="warning tr-white">{{
                  listItems.length
                }}</b-badge>
                <div class="shopping-list-box" v-if="showShoppinglist">
                  <div
                    class="shopping-list d-flex justify-content-between mb-2"
                    v-for="(item, index) in listItems"
                    :key="index"
                  >
                    <span class="param-sm tr-gray-three">
                      Count: {{ item.count }}
                    </span>
                    <img
                      class="img-fluid"
                      :src="icon +item.list.planter.id"
                      alt="tree"
                    />
                    <span class="param-sm tr-gray-three">
                      Price:{{
                        parseFloat(
                          $web3.utils.fromWei(item.list.price)
                        ).toFixed(2)
                      }}
                      DAI
                    </span>

                    <!-- <p class="param-sm tr-gray-three">
                      country:
                      <span class="">{{ item.list.country }}</span>
                    </p> -->
                  </div>
                  <nuxt-link
                    :to="localePath('/forest/advanceFund/checkout')"
                    v-if="listItems"
                    class="btn btn-green param-sm tr-white"
                    >Buy</nuxt-link
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 main-content-advanceFund">
          <div class="row mt-5">
            <!-- @click.prevent="addedTotheBasket(item)" -->
            <div
              class="col-lg-4 col-12 pointer-event mb-4"
              v-for="(item, index) in models"
              :key="index"
            >
              <CardAdvanceFund :fund="item" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import CardAdvanceFund from "@/components/advanceFund/CardAdvanceFund.vue";
// import countries from "@/static/data/countries.min.json";
export default {
  layout: "dashboard",
  middleware: "auth",
  components: {
    CardAdvanceFund,
  },
  head() {
    return {
      title: this.meta.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.meta.description,
        },
        { hid: "keywords", name: "keywords", content: this.meta.keywords },

        { hid: "og:title", property: "og:title", content: this.meta.title },
        {
          hid: "og:description",
          property: "og:description",
          content: this.meta.description,
        },
        {
          hid: "og:url",
          property: "og:url",
          content: this.baseUrl + "/tree/" + this.$route.params.id,
        },
        {
          hid: "og:image",
          property: "og:image",
          content: this.baseUrl + "/featureImage/jake-hills.jpg",
        },

        {
          hid: "twitter:title",
          property: "twitter:title",
          content: this.meta.title,
        },
      ],
    };
  },
  data() {
    return {
      baseUrl: process.env.baseUrl,

      meta: {
        title: this.$t("treebox.meta.title"),
        description: this.$t("treebox.meta.description"),
        keywords: this.$t("treebox.meta.keywords"),
      },
      searchIcon: require("~/assets/images/search.svg"),
      advanceFundSearch: "",
      numberRecepient: [
        { name: "1" },
        { name: "10" },
        { name: "20" },
        { name: "50" },
      ],
      numberRecepientTreebox: [
        { name: "1" },
        { name: "2" },
        { name: "3" },
        { name: "4" },
      ],

      activeIndexRecepient: 3,
      activeIndexRecepientTreebox: 0,
      countOfRecepient: 50,
      countOfRecepientTreebox: 1,
      // message: "",
      // wallets: [],
      // assignTreeOption: "desc",
      // ownerTrees: [],
      // showAdvance: false,
      // approved: false,
      // messageIPFSHash: "",
      selectedCountry: null,
      selectedSpiece: null,
      selectedPrice: null,
      optionsSpieces: [
        { value: null, text: "Please select an option" },

        { value: "a", text: "This is First option" },
        { value: "b", text: "Please select an option" },
      ],
      optionsCountries: [{ value: null, text: "Please select an country" }],
      optionsPrices: [{ value: null, text: "Please select an price" }],
      models: [],
      countries: require("~/static/data/countries.min.json"),
      showShoppinglist: false,
      icon: process.env.gravatar,
      // listItems: new Array(),
    };
  },
  computed: {
    listItems() {
      return this.$store.state.advanceFund.shoppingList;
    },
  },

  created() {
    this.checkItems();
    this.getTreeModels();
    // await this.isApprovedForAll();
    this.pushCountreisToData();
    // this.statusShopping = statusShopping.length
  },
  methods: {
    setActiveIndex(index) {
      this.activeIndex = index;
    },
    setActiveIndexRecepient(index, count) {
      this.activeIndexRecepient = index;
      this.countOfRecepient = count;
    },
    setActiveIndexRecepientTreebox(index, count) {
      this.activeIndexRecepientTreebox = index;
      this.countOfRecepientTreebox = count;
    },
    getTreeModels() {
      let self = this;
      let search = self.advanceFundSearch ? self.advanceFundSearch : null;

      const url =
        "https://api.thegraph.com/subgraphs/name/treejer/treejer-subgraph-goerli";
      self.$axios
        .$post(url, {
          query: `
         {
            models {
              id
              planter {
                id
              }
              price
              country
              lastFund
              lastPlant
              status
              start
              lastReservePlant
              createdAt
              updatedAt
        }
            }
        `,
        })
        .then((res) => {
          self.models = [];

          res.data.models.map((item, index) => {
            // if(item.country === )
            self.models.push(item);
            self.optionsCountries.map((option, index) => {
              if (option.numcode === item.country) {
                item.country = option.name;
              }
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    pushCountreisToData(numcode) {
      this.countries.map((item, index) => {
        this.optionsCountries.push({
          value: item.id,
          iso: item.iso,
          iso3: item.iso3,
          name: item.name,
          text: item.nicename,
          numcode: item.numcode,
          phonecode: item.phonecode,
        });
      });
    },
    goToCheckout() {
      this.$router.push(this.localePath("forest/advanceFund/checkout"));
    },

    checkItems() {
      let self = this;
      console.log( this.$cookies.get("shoppingList"),' this.$cookies.get("shoppingList")')
      if (this.$cookies.get("shoppingList") && self.listItems.length <= 0) {
        this.$store.dispatch(
          "advanceFund/setListItems",
          this.$cookies.get("shoppingList")
        );
      }
    },

    // async isApprovedForAll() {
    //   this.approved = await this.$store.dispatch("tree/isApprovedForAll", {
    //     owner: this.$cookies.get("account"),
    //     operator: this.$TreeBox._address,
    //   });
    // },

    // async createTreebox() {
    //   this.loadingCreate = true;

    //   if (!this.checkLogin()) {
    //     this.loadingCreate = false;
    //     return;
    //   }

    //   if ((await this.checkNetwork()) === false) {
    //     this.loadingCreate = false;
    //     return;
    //   }

    //   await this.isApprovedForAll();
    //   if (this.approved === false) {
    //     this.loadingCreate = false;
    //     return;
    //   }

    //   if (this.countOfRecepient <= 0 || this.countOfRecepientTreebox <= 0) {
    //     this.$bvToast.toast(this.$t("alert.tryagain"), {
    //       toaster: "b-toaster-bottom-left",
    //       title: this.$t("alert.error"),
    //       variant: "danger",
    //       noAutoHide: true,
    //     });
    //     this.loadingCreate = false;
    //     return;
    //   }

    //   if (this.owner === null) {
    //     this.$bvToast.toast(this.$t("alert.youdonthaveanytree"), {
    //       toaster: "b-toaster-bottom-left",
    //       title: this.$t("alert.treesareempty"),
    //       variant: "danger",
    //       noAutoHide: true,
    //     });
    //     this.loadingCreate = false;
    //     return;
    //   }

    //   if (this.ownerTrees.length < Number(this.owner.regularTreeCount)) {
    //     await this.getOwnerTrees();
    //   }

    //   let totalTreesCount = Number(
    //     this.countOfRecepient * this.countOfRecepientTreebox
    //   );
    //   if (
    //     this.owner.regularTreeCount < totalTreesCount ||
    //     this.ownerTrees.length < totalTreesCount
    //   ) {
    //     this.$bvToast.toast(
    //       `${this.$t("alert.regulartrees")} ${
    //         this.owner.regularTreeCount
    //       } ${this.$t("alert.less")} ${totalTreesCount} `,
    //       {
    //         toaster: "b-toaster-bottom-left",
    //         title: this.$t("alert.treesarenotenough"),
    //         solid: true,
    //         headerClass: "hide",
    //         variant: "danger",
    //       }
    //     );
    //     this.loadingCreate = false;
    //     return;
    //   }

    //   if (this.message !== null && this.message.length > 0) {
    //     await this.uploadContentToIPFS(
    //       JSON.stringify({
    //         message: this.message,
    //       })
    //     );

    //     if (
    //       this.messageIPFSHash.length === 0 ||
    //       this.messageIPFSHash === null
    //     ) {
    //       this.loadingCreate = false;
    //       return;
    //     }
    //   } else {
    //     if (!confirm(this.$t("alert.treeboxmessageisempty"))) {
    //       this.loadingCreate = false;
    //       return;
    //     }
    //   }

    //   if (!confirm(this.$t("alert.remembertodownload"))) {
    //     this.loadingCreate = false;
    //     return;
    //   }

    //   await this.generateWallets();
    //   if (Number(this.wallets.length) !== Number(this.countOfRecepient)) {
    //     this.$bvToast.toast(["Refresh page and Try again!"], {
    //       toaster: "b-toaster-bottom-left",
    //       title: "Wallets are not enough",
    //       variant: "danger",
    //       noAutoHide: true,
    //     });

    //     this.loadingCreate = false;
    //     return;
    //   }

    //   await this.assignTrees();
    //   let inputs = [];
    //   for (let i = 0; i < this.wallets.length; i++) {
    //     if (
    //       this.wallets[i].treeIds.length !==
    //       Number(this.countOfRecepientTreebox)
    //     ) {
    //       this.$bvToast.toast(["Refresh page and Try again!"], {
    //         toaster: "b-toaster-bottom-left",
    //         title: "Wallets trees are not enough",
    //         variant: "danger",
    //         noAutoHide: true,
    //       });

    //       this.loadingCreate = false;
    //       return;
    //     }

    //     inputs.push({
    //       recipient: this.wallets[i].address,
    //       treeIds: this.wallets[i].treeIds,
    //       ipfsHash: this.messageIPFSHash,
    //     });
    //   }

    //   let res = await this.$store.dispatch("treebox/create", {
    //     inputs: inputs,
    //   });
    //   if (res !== null) {
    //     this.$bvToast.toast(this.$t("alert.treeboxessuccessfully"), {
    //       toaster: "b-toaster-bottom-left",
    //       title: this.$t("alert.successfullycreated"),
    //       variant: "success",
    //       href: `${this.$cookies.get("config").explorerUrl}/tx/${
    //         res.transactionHash
    //       }`,
    //     });

    //     this.treeboxCreated = true;

    //     await this.downloadCSVData(res.transactionHash);
    //   }
    //   this.loadingCreate = false;
    // },
    // async uploadContentToIPFS(content) {
    //   let self = this;

    //   const formData = new FormData();

    //   formData.append("file", content);

    //   await this.$axios
    //     .$post(process.env.ipfsPostUrl, formData, {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //     })
    //     .then((response) => {
    //       self.messageIPFSHash = response.Hash;
    //     })
    //     .catch((error) => {
    //       console.log(error, "error");
    //     });
    // },

    // async setApprovalForAll() {
    //   this.loadingApprove = true;

    //   if (!this.checkLogin()) {
    //     this.loadingApprove = false;
    //     return;
    //   }

    //   if ((await this.checkNetwork()) === false) {
    //     this.loadingApprove = false;
    //     return;
    //   }

    //   await this.isApprovedForAll();
    //   if (this.approved) {
    //     this.loadingApprove = false;
    //     return;
    //   }

    //   this.transferReceipt = await this.$store.dispatch(
    //     "tree/setApprovalForAll",
    //     {
    //       operator: this.$TreeBox._address,
    //       approved: true,
    //     }
    //   );
    //   if (this.transferReceipt !== null) {
    //     this.$bvToast.toast(this.$t("alert.approvedall"), {
    //       toaster: "b-toaster-bottom-left",
    //       title: this.$t("alert.approvaltransactionsuccessful"),
    //       variant: "success",
    //       href: `${this.$cookies.get("config").explorerUrl}/tx/${
    //         this.transferReceipt.transactionHash
    //       }`,
    //     });
    //     this.approved = true;
    //   }
    //   this.loadingApprove = false;
    // },
    // checkLogin() {
    //   if (this.$cookies.get("account")) {
    //     return true;
    //   }

    //   this.$bvToast.toast(this.$t("alert.notlogin"), {
    //     toaster: "b-toaster-bottom-left",
    //     solid: true,
    //     headerClass: "hide",
    //     variant: "danger",
    //   });
    //   this.$bvModal.show("five");
    //   return false;
    // },

    // async checkNetwork() {
    //   let connectedNetwrokID = await this.$web3.eth.net
    //     .getId()
    //     .then((networkId) => {
    //       return networkId;
    //     })
    //     .catch((err) => {
    //       console.log(err.message, "error checkNetwork");
    //       return 0;
    //     });

    //   if (
    //     connectedNetwrokID ==
    //     this.$hex2Dec(this.$cookies.get("activeNetwork").chainId)
    //   ) {
    //     return true;
    //   }

    //   this.$bvToast.toast(
    //     [
    //       this.$t("alert.pleaseconnect") +
    //         this.$cookies.get("activeNetwork").chainName.toUpperCase() +
    //         " " +
    //         this.$t("alert.network"),
    //     ],
    //     {
    //       toaster: "b-toaster-bottom-left",
    //       title: "Wrong network",
    //       variant: "danger",
    //       noAutoHide: true,
    //     }
    //   );
    //   return false;
    // },
    // async generateWallets() {
    //   let totalTreesCount = Number(
    //     this.countOfRecepient * this.countOfRecepientTreebox
    //   );

    //   if (
    //     this.owner.regularTreeCount < totalTreesCount ||
    //     this.ownerTrees.length < totalTreesCount
    //   ) {
    //     this.$bvToast.toast(
    //       `${this.$t("alert.regulartrees")} ${
    //         this.owner.regularTreeCount
    //       } ${this.$t("alert.less")} ${totalTreesCount} `,
    //       {
    //         toaster: "b-toaster-bottom-left",
    //         title: this.$t("alert.treesarenotenough"),
    //         solid: true,
    //         headerClass: "hide",
    //         variant: "danger",
    //       }
    //     );
    //     return;
    //   }

    //   if (this.wallets.length === 0) {
    //     this.wallets = [];
    //     let wallets = [];
    //     wallets = this.$web3.eth.accounts.wallet.create(
    //       Number(this.countOfRecepient),
    //       []
    //     );

    //     for (let i = 0; i < Number(this.countOfRecepient); i++) {
    //       this.wallets.push(wallets[i]);
    //     }
    //   }
    // },
    // async assignTrees() {
    //   for (let i = 0; i < Number(this.countOfRecepient); i++) {
    //     this.wallets[i].treeIds = [];
    //     for (let j = 0; j < Number(this.countOfRecepientTreebox); j++) {
    //       this.wallets[i].treeIds.push(
    //         this.$hex2Dec(
    //           this.ownerTrees[i * Number(this.countOfRecepientTreebox) + j].id
    //         )
    //       );
    //     }
    //   }
    // },
    // async assignTreeOptionChanged() {
    //   this.ownerTrees = [];
    //   await this.getOwnerTrees();
    //   await this.assignTrees();
    //   this.$forceUpdate();
    // },
    // async getOwnerTrees() {
    //   let first = Number(this.countOfRecepient * this.countOfRecepientTreebox);
    //   let skip = 0;

    //   let self = this;

    //   let account = this.$cookies.get("account")
    //     ? this.$cookies.get("account").toLowerCase()
    //     : "guest";

    //   //soldType: 4,
    //   await self.$axios
    //     .$post(this.$cookies.get("config").graphqlUrl, {
    //       query: `{
    //                 trees(first: ${first}, skip: ${skip}, where:
    //                 {
    //                   owner: "${account}"
    //                 },
    //                 orderBy: "createdAt",
    //                 orderDirection: "${this.assignTreeOption}")
    //                   {
    //                       id
    //                       createdAt
    //                   }
    //               }`,
    //       prefetch: false,
    //     })
    //     .then((treesRes) => {
    //       if (treesRes.data.trees && treesRes.data.trees.length > 0) {
    //         let trees = treesRes.data.trees;
    //         // self.ownerTrees.push(...trees);
    //         self.ownerTrees = trees;
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });

    //   //filter only reqularTrees
    //   self.ownerTrees = self.ownerTrees.filter(
    //     (tree) => self.$hex2Dec(tree.id) > 10000
    //   );
    // },
    // async downloadCSVData(hash = "") {
    //   let csv = "Link\n";
    //   this.wallets.forEach((row) => {
    //     csv += `${process.env.baseUrl}/treebox/${row.address}?privateKey=${
    //       row.privateKey
    //     }&treeIds=${row.treeIds.join("-")}`;
    //     // csv += row.join(',');
    //     csv += "\n";
    //   });

    //   const anchor = document.createElement("a");
    //   anchor.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
    //   anchor.target = "_blank";
    //   anchor.download =
    //     "treejer-tree-boxes-" +
    //     this.countOfRecepient +
    //     "-" +
    //     this.countOfRecepientTreebox +
    //     "-" +
    //     hash.substring(0, 10) +
    //     ".csv";
    //   anchor.click();
    // },
  },
};
</script>
<style lang="scss" scoped>
.advance-fund {
  .box-left-treebox {
    .sort-advanceFund {
      overflow: scroll;
      display: flex;
      margin-top: 35px;
      @media (max-width: 768px) {
        overflow: hidden;
        display: block;
        .param-18 {
          margin-bottom: 15px;
        }
      }
      .param-18 {
        padding-left: 0;
        select,
        input {
          background: #e5e7db;
          width: 100%;
          border: none;
          border-radius: 12px;
          color: #757575;
        }
      }
      #search {
        margin-top: 26px;
        position: relative;
        span {
          position: absolute;
          right: 30px;
          top: 4px;
        }
      }
      .param-18.position-absolute {
        right: -50px;
        @media (max-width: 768px) {
          right: 25px;
        }
      }

      .shopping-list-box {
        padding: 15px 10px;
        position: absolute;
        z-index: +99999;
        background: #faf8f1;
        width: 200px;
        box-shadow: 0px -2px 7px rgba(0, 0, 0, 0.25);
        margin-top: 15px;
        border-radius: 6px;

        .shopping-list {
          img {
            width: 15px;
            height: 15px;
          }
        }
      }

      // .method {
      //   display: flex;
      //   .soon {
      //     position: absolute;
      //     top: -5px;
      //     right: 10px;
      //     font-size: 10px;
      //     background: #67b68c;
      //     border-radius: 4px;
      //     color: #faf8f1;
      //   }
      //   li {
      //     margin-right: 32px;
      //   }
      //   .active {
      //     min-width: 128px;
      //     height: 64px;
      //     align-items: center;
      //     display: flex;
      //     justify-content: center;
      //     color: white;
      //     background: linear-gradient(90deg, #4776e6 0%, #8e54e9 100%);
      //     border-radius: 8px;
      //     list-style: none;
      //   }
      //   .not-active {
      //     min-width: 128px;
      //     height: 64px;
      //     align-items: center;
      //     display: flex;
      //     justify-content: center;
      //     background: #fafafa;
      //     border: 1px solid #bdbdbd;
      //     box-sizing: border-box;
      //     border-radius: 8px;
      //     list-style: none;
      //   }
      // }
      // .recipient {
      //   display: flex;
      //   li {
      //     margin-right: 32px;
      //   }
      //   .active {
      //     min-width: 48px;
      //     height: 48px;
      //     align-items: center;
      //     display: flex;
      //     justify-content: center;
      //     color: white;
      //     background: linear-gradient(90deg, #4776e6 0%, #8e54e9 100%);
      //     border-radius: 8px;
      //     list-style: none;
      //   }
      //   .not-active {
      //     min-width: 48px;
      //     height: 48px;
      //     align-items: center;
      //     display: flex;
      //     justify-content: center;
      //     background: #fafafa;
      //     border: 1px solid #bdbdbd;
      //     box-sizing: border-box;
      //     border-radius: 8px;
      //     list-style: none;
      //   }
      // }
      // .recipient-input {
      //   width: 48px;
      //   height: 48px;
      //   background: #fafafa;
      //   border: 1px solid #bdbdbd;
      //   border-radius: 8px;
      // }
      // .message {
      //   min-width: 320px;
      //   min-height: 128px;
      //   padding: 10px 15px;

      //   background: #fafafa;
      //   border: 1px solid #bdbdbd;

      //   border-radius: 8px;
      // }
      // .tr-margin-top {
      //   margin-top: 25px;
      //   font-weight: bolder;
      // }
      // .city-selected {
      //   height: 48px;
      //   align-items: center;
      //   display: flex;
      //   justify-content: center;
      //   background: #fafafa;
      //   border: 1px solid #bdbdbd;
      //   box-sizing: border-box;
      //   border-radius: 8px;
      //   list-style: none;
      //   min-width: 300px;
      //   option {
      //     border: 1px solid #bdbdbd;
      //     box-sizing: border-box;
      //     border-radius: 8px;
      //     list-style: none;
      //     background: #fafafa;
      //     padding: 15px 5px;
      //   }
      // }
    }
    .buy {
      z-index: +9;
      background: #67b68c;
      text-align: center;
      bottom: 0;
      left: 0;
    }
  }

  .box-right-treebox {
    img {
      margin-top: 127px;
      width: 144.41px;
      height: 160px;
    }
    h1 {
      margin-top: 16px;
    }
    .btn-green {
      filter: drop-shadow(0px 4px 11px rgba(0, 0, 0, 0.161));
      width: 176px;
      height: 48px;
      background: #67b68c;
      font-weight: bolder;
    }
    .btn-gray {
      filter: drop-shadow(0px 4px 11px rgba(0, 0, 0, 0.161));
      width: 176px;
      height: 48px;
      background: #757575;
      font-weight: bolder;
      margin-top: 24px;
      color: white;
    }
  }
  .main-content-advanceFund {
    .col-lg-3.col-12 {
      margin-bottom: 15px;
    }
  }
}
</style>
<!-- <ul class="method pt-4 over-flow-x-scroll">
            <li
              class="pointer-event position-relative"
              :class="activeIndex === index ? 'active' : 'not-active'"
              v-for="(item, index) in activeMethods"
              :key="index"
              @click.prevent="index === 0 ? setActiveIndex(index) : null"
            >
              <span v-if="index !== 0" class="soon btn-gree tr-white"
                >{{$t('treebox.soon')}}</span
              >
              {{ item.name }}
            </li>
          </ul> -->

<!-- <div class="col-12" v-if="showAdvance">
            <p class="param-18 tr-gray-two tr-margin-top">
              <button class="btn-green" @click.prevent="generateWallets()">
                {{ $t("treebox.generate") }}
              </button>
            </p>

            <p class="param-18 tr-gray-two tr-margin-top">
              <label for="assignTreeOption"> Assign Tree Type </label>

              <select
                id="assignTreeOption"
                v-model="assignTreeOption"
                @change="assignTreeOptionChanged"
              >
                <option
                  v-for="option in assignTreeOptions"
                  :key="option.label"
                  :value="option.value"
                >
                  {{ option.label }}
                </option>
              </select>
            </p>

            <p
              class="param-18 tr-gray-two tr-margin-top"
              v-if="wallets.length > 0"
            >
              <button class="btn-green" @click.prevent="downloadCSVData()">
                Downlaod Links
              </button>
            </p>

            <ul class="over-flow-x-scroll">
              <li
                class="pointer-event"
                v-for="(wallet, wIndex) in wallets"
                :key="`wallet-${wIndex}`"
              >
                {{ wallet.address }}
                <input
                  type="number"
                  class="tr-gray-four font-weight-bold text-center"
                  v-for="(treeId, index) in wallets[wIndex].treeIds"
                  v-model="wallets[wIndex].treeIds[index]"
                  :key="`wallet-${wIndex}-treeId-${treeId}`"
                  placeholder="Tree ID"
                />
              </li>
            </ul>
          </div> -->

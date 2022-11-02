<template>
  <section
    class="position-relative pt-5 col-lg-10 col-12 advance-fund mb-5 pb-5 slide-left"
  >
    <div class="container-fluid">
      <div class="row">
        <div
          class="col-lg-12 col-12 box-left-treebox"
          @click.prevent="
            $store.commit('advanceFund/SET_SIDEBAR_ADVANCEFUND', false)
          "
        >
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
            <div class="param-18 tr-gray-two tr-margin-top col-lg-3 col-12">
              {{ $t("advanceFund.filter.country") }}
              <b-form-select
                class="city-selected tr-gray-two param"
                v-model="selectedCountry"
                :options="optionsCountries"
              ></b-form-select>
            </div>
            <div class="param-18 tr-gray-two tr-margin-top col-lg-3 col-12">
              {{ $t("advanceFund.filter.price") }}
              <b-form-select
                class="city-selected tr-gray-two param"
                v-model="selectedPrice"
                :options="optionsPrices"
              ></b-form-select>
            </div>

            <!-- <div class="param-18 tr-gray-two tr-margin-top col-lg-3 col-12">
              {{ $t("advanceFund.filter.species") }}
              <b-form-select
                class="city-selected tr-gray-two param"
                v-model="selectedSpiece"
                :options="optionsSpieces"
              ></b-form-select>
            </div> -->

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
                  @click.prevent="setShoppingListToSidebar()"
                />
                <b-badge variant="warning tr-white">{{
                  listItems.length
                }}</b-badge>
                <SidebarCheckout :status="showShoppinglist" />
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 main-content-advanceFund">
          <div class="row mt-5">
            <!-- @click.prevent="addedTotheBasket(item)" -->

            <div
              class="col-lg-4 col-12 pointer-event mb-4"
              v-for="(model, index) in models"
              :key="index"
            >
              <CardAdvanceFund :mainPage="true" :model="model" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import CardAdvanceFund from "@/components/advanceFund/CardAdvanceFund.vue";
import SidebarCheckout from "@/components/advanceFund/SidebarCheckout.vue";
export default {
  layout: "dashboard",
  middleware: "auth",
  components: {
    CardAdvanceFund,
    SidebarCheckout,
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
        title: this.$t("advanceFund.meta.title"),
        description: this.$t("advanceFund.meta.description"),
        keywords: this.$t("advanceFund.meta.keywords"),
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
      selectedCountry: null,
      selectedSpiece: null,
      selectedPrice: null,
      optionsSpieces: [
        { value: null, text: "Please select an option" },

        { value: "a", text: "This is First option" },
        { value: "b", text: "Please select an option" },
      ],
      optionsCountries: [{ value: null, text: "Please select an country" }],
      optionsPrices: [
        { value: null, text: "Please select an price" },
        { value: "less5", text: "Less than 5" },
        { value: "less10", text: "Less than 10" },
        { value: "less20", text: "Less than 20" },
        
      ],
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
  watch: {
    selectedCountry: function (val) {
      this.getTreeModels();
    },
    selectedSpiece: function (val) {
      this.getTreeModels();
    },
    selectedPrice: function (val) {
      this.getTreeModels();
    },
  },

  async created() {
    await this.pushCountreisToData();
    await this.getTreeModels();

    let self = this;
    setTimeout(() => {
      self.checkItems();
    }, 1000);
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
    async getTreeModels() {
      let self = this;


      let whereQuery = "";
      if (this.selectedCountry) {
        whereQuery += `country: ${this.selectedCountry}`;
      }

      if (this.selectedSpiece) {
        whereQuery += `${whereQuery ? ',': ''} species: ${this.selectedSpiece}`;
      }

      if (this.selectedPrice) {
        if(this.selectedPrice == "less5"){
          whereQuery += `${whereQuery ? ',': ''} price_lte: "${this.$web3.utils.toWei("5", "ether")}"`;
        }else if(this.selectedPrice == "less10"){
          whereQuery += `${whereQuery ? ',': ''} price_lte: "${this.$web3.utils.toWei("10", "ether")}"`;
        } else if(this.selectedPrice == "less20"){
          whereQuery += `${whereQuery ? ',': ''} price_lte: "${this.$web3.utils.toWei("20", "ether")}"`;
        }
      }

      if (whereQuery != "") {
        whereQuery = `{${whereQuery}}`;
      }


      await self.$axios
        .$post(this.$cookies.get("config").graphqlUrl, {
          query: `{
                  models(first: 9 ${
                      whereQuery ? `,where: ${whereQuery}` : ""
                    }) {
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
                  }`,
          prefetch: false,
        })
        .then((res) => {
          self.models = [];

          res.data.models.map((item, index) => {
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

    async pushCountreisToData(numcode) {
      this.countries.map((item, index) => {
        this.optionsCountries.push({
          value: item.numcode,
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
    setShoppingListToSidebar() {
      this.showShoppinglist = !this.showShoppinglist;
      this.$store.commit(
        "advanceFund/SET_SIDEBAR_ADVANCEFUND",
        this.showShoppinglist
      );
    },

    async checkItems() {
      let self = this;
      if (
        self.$cookies.get("shoppingList") &&
        self.$store.state.advanceFund.shoppingList.length <= 0
      ) {
        await self.$store.commit(
          "advanceFund/EDIT_LIST",
          self.$cookies.get("shoppingList")
        );
        await self.$store.commit("advanceFund/SUM_TOTALL_PRICE_AND_COUNT");

        console.log(
          self.$store.state.advanceFund.shoppingList,
          "self.listItems.length"
        );
      }
    },
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

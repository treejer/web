<template>
  <section class="position-relative pt-5 col-lg-10 col-12 treebox mb-5 pb-5">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-8 col-12 box-left-treebox">
          <h1 class="title tr-gray-two font-weight-bold">
            {{ $t("advanceSell.title") }}
          </h1>
          <p class="param tr-gray-three">
            {{ $t("advanceSell.description") }}
            <a class="d-inline tr-green font-weight-bolder" href="#">
              {{ $t("header.learnmore") }}</a
            >
          </p>
          <p class="param-18 tr-gray-two tr-margin-top">
            {{ $t("advanceSell.distribution") }}
          </p>
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
          <b-form-select
            class="city-selected tr-gray-two param"
            v-model="selectedCity"
            :options="optionsCitys"
          ></b-form-select>
          <p class="param-18 tr-gray-two tr-margin-top">
            {{ $t("advanceSell.recipients") }}
          </p>
          <ul class="recipient over-flow-x-scroll">
            <li
              class="pointer-event"
              :class="item.name == countOfRecepient ? 'active' : 'not-active'"
              v-for="(item, index) in numberRecepient"
              :key="index"
              @click.prevent="setActiveIndexRecepient(index, item.name)"
            >
              {{ item.name }}
            </li>
            <input
              type="number"
              class="recipient-input tr-gray-four font-weight-bold text-center"
              v-model="countOfRecepient"
              @focus="activeIndexRecepient = -1"
              :class="activeIndexRecepient === -1 ? 'active' : 'not-active'"
              placeholder="Enter"
              min="1"
            />
          </ul>
          <p class="param-18 tr-gray-two tr-margin-top">
            {{ $t("advanceSell.numbertrees") }}
          </p>
          <ul class="recipient over-flow-x-scroll">
            <li
              class="pointer-event"
              :class="
                item.name == countOfRecepientTreebox ? 'active' : 'not-active'
              "
              v-for="(item, index) in numberRecepientTreebox"
              :key="index"
              @click.prevent="setActiveIndexRecepientTreebox(index, item.name)"
            >
              {{ item.name }}
            </li>
            <input
              type="number"
              :class="
                activeIndexRecepientTreebox === -1 ? 'active' : 'not-active'
              "
              class="recipient-input tr-gray-four font-weight-bold text-center"
              v-model="countOfRecepientTreebox"
              @focus="activeIndexRecepientTreebox = -1"
              placeholder="Enter"
              min="1"
            />
          </ul>
          <p class="param-18 tr-gray-two tr-margin-top">
            {{ $t("advanceSell.message") }}
          </p>
          <b-form-select
            class="city-selected tr-gray-two param"
            v-model="selectedCity"
            :options="optionsCitys"
          ></b-form-select>

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
        </div>
        <!-- <div class="col-lg-4 col-12 box-right-treebox text-center">
          <img src="~/assets/images/treebox/tree.png" alt="tree-treebox" />
          <h1 class="tr-gray-two title-md font-weight-bolder">
            {{ Number(countOfRecepient) * Number(countOfRecepientTreebox) }}
          </h1>
          <p class="param-md tr-gray-four">{{ $t("treebox.totaltrees") }}</p>

          <button
            v-if="approved"
            class="btn-green"
            @click.prevent="createTreebox"
          >
            <BSpinner v-if="loadingCreate" class="mr-2" small type="grow"
              >loading
            </BSpinner>
            {{
              loadingCreate
                ? $t("aboutus.loading")
                : $t("treebox.createtreebox")
            }}
          </button>

          <button v-else class="btn-green" @click.prevent="setApprovalForAll">
            <BSpinner v-if="loadingApprove" class="mr-2" small type="grow"
              >loading
            </BSpinner>
            {{ loadingApprove ? $t("aboutus.loading") : $t("treebox.approve") }}
          </button>

          <!-- <button class="btn-gray" @click.prevent="">Preview</button> -->
        <!-- </div> -->
      </div>
    </div>
  </section>
</template>

<script>
export default {
  layout: "dashboard",
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
      selectedCity: null,
      optionsCitys: [
        { value: null, text: "Please select an option" },

        { value: "a", text: "This is First option" },
        { value: "b", text: "Please select an option" },
      ],
    };
  },

  // apollo: {
  //   $client() {
  //     return this.$cookies.get("activeNetwork")
  //       ? this.$cookies.get("activeNetwork").key
  //       : "default";
  //   },
  //   owner: {
  //     query: owner,
  //     prefetch: false,
  //     skip() {
  //       return this.$cookies.get("account") ? false : true;
  //     },
  //     variables() {
  //       return {
  //         id: this.$cookies.get("account")
  //           ? this.$cookies.get("account").toLowerCase()
  //           : "",
  //       };
  //     },
  //     fetchPolicy: "network-only",
  //   },
  // },
  // async created() {
  //   await this.getOwnerTrees();
  //   await this.isApprovedForAll();
  // },
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
<style lang="scss">
.treebox {
  .box-left-treebox {
    .method {
      display: flex;
      .soon {
        position: absolute;
        top: -5px;
        right: 10px;
        font-size: 10px;
        background: #67b68c;
        border-radius: 4px;
        color: #faf8f1;
      }
      li {
        margin-right: 32px;
      }
      .active {
        min-width: 128px;
        height: 64px;
        align-items: center;
        display: flex;
        justify-content: center;
        color: white;
        background: linear-gradient(90deg, #4776e6 0%, #8e54e9 100%);
        border-radius: 8px;
        list-style: none;
      }
      .not-active {
        min-width: 128px;
        height: 64px;
        align-items: center;
        display: flex;
        justify-content: center;
        background: #fafafa;
        border: 1px solid #bdbdbd;
        box-sizing: border-box;
        border-radius: 8px;
        list-style: none;
      }
    }
    .recipient {
      display: flex;
      li {
        margin-right: 32px;
      }
      .active {
        min-width: 48px;
        height: 48px;
        align-items: center;
        display: flex;
        justify-content: center;
        color: white;
        background: linear-gradient(90deg, #4776e6 0%, #8e54e9 100%);
        border-radius: 8px;
        list-style: none;
      }
      .not-active {
        min-width: 48px;
        height: 48px;
        align-items: center;
        display: flex;
        justify-content: center;
        background: #fafafa;
        border: 1px solid #bdbdbd;
        box-sizing: border-box;
        border-radius: 8px;
        list-style: none;
      }
    }
    .recipient-input {
      width: 48px;
      height: 48px;
      background: #fafafa;
      border: 1px solid #bdbdbd;
      border-radius: 8px;
    }
    .message {
      min-width: 320px;
      min-height: 128px;
      padding: 10px 15px;

      background: #fafafa;
      border: 1px solid #bdbdbd;

      border-radius: 8px;
    }
    .tr-margin-top {
      margin-top: 25px;
      font-weight: bolder;
    }
    .city-selected {
      height: 48px;
      align-items: center;
      display: flex;
      justify-content: center;
      background: #fafafa;
      border: 1px solid #bdbdbd;
      box-sizing: border-box;
      border-radius: 8px;
      list-style: none;
      min-width: 300px;
      option {
        border: 1px solid #bdbdbd;
        box-sizing: border-box;
        border-radius: 8px;
        list-style: none;
        background: #fafafa;
        padding: 15px 5px;
      }
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
}
</style>

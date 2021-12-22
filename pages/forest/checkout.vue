<template>
  <section class="position-relative pt-5 col-12 add-tree mb-5 pb-5">
    <div class="container-fluid">
      <div class="row tree-count">
        <!--        <div class="col-12">-->
        <!--          <ul class="step tr-gray-three d-flex   list-style-none">-->
        <!--            <li-->
        <!--              v-for="(item, index) in steps"-->
        <!--              :key="index"-->
        <!--              :name="item.name"-->
        <!--              class="param-md font-weight-bold"-->
        <!--            >-->
        <!--              <p>{{ item.name }}</p>-->
        <!--              <p :class="{ active: activeIndex === index }">{{ item.step }}</p>-->
        <!--            </li>-khk -->
        <!--          </ul>-->
        <!--        </div>-->

        <div v-if="activeIndex === 0" class="col-12 step-one">
          <div class="row">
            <div class="col-lg-6 col-md-12 col-12">
              <div class="col-12 mt-5 input">
                <h1 class="param-18 font-weight-bolder tr-gray-two">
                  How many trees to plant?
                </h1>
                <ul class="d-flex list-style-none mt-4 pl-0">
                  <li
                    v-for="(item, index) in counts"
                    :key="index"
                    class="pointer-event pl-0"
                  >
                    <div v-if="!item.placeHolder">
                      <p
                        :key="index"
                        :class="{ active: activeCount === index }"
                        :name="item.name"
                        class="ml-0 font-weight-bolder param-18"
                        @click="activeCounts(item, index)"
                      >
                        {{ item.name }}
                      </p>
                    </div>
                    <div v-if="item.placeHolder">
                      <label :for="index">
                        <input
                          :key="index"
                          v-model="count"
                          :class="{ active: activeCount === index }"
                          :placeholder="item.placeHolder"
                          class="param-18"
                          min="1"
                          type="number"
                        />
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
              <!-- <div class="col-12 mt-5 pays">
                <h1 class="param-18 tr-gray-two font-weight-bolder">Choose tree collection type</h1>
                <ul class="d-flex list-style-none mt-4">
                  <li v-for="(item, index) in collectionType" :key="index" class="pointer-event position-relative">
                    <p
                      id="collectionType-card"
                      :key="index"
                      :class="{ active: activePay === index }"
                      :name="item.name"
                      class="text-center font-weight-bolder param-18 ml-0 mr-md-4 collectionType-card"
                      @click="activePays(item, index)">

                      {{ item.name }}<br>
                      <span class="param mb-0  "> {{ '~Ξ0.033' }} <br>
                      per tree</span>

                    </p>
                  </li>
                </ul>
              </div> -->
              <div class="col-12 col-md-12 mt-5 pt-2 send-as-gift-code">
                <div class="row justify-content-between">
                  <div class="col-md-6 col-6">
                    <p class="param-18 font-weight-bolder">Send as gift</p>
                  </div>
                  <div class="col-md-6 col-6 form-check">
                    <div class="on-off-toggle">
                      <input
                        id="bopiss"
                        v-model="sendAsGiftChecked"
                        class="on-off-toggle__input disabled"
                        type="checkbox"
                      />
                      <label
                        class="on-off-toggle__slider pointer-event"
                        for="bopiss"
                      ></label>
                    </div>
                  </div>
                </div>
                <div
                  v-show="sendAsGiftChecked"
                  class="row justify-content-between"
                >
                  <div class="col-12 col-md-8">
                    <input
                      v-model="recipient"
                      class="form-control-lg tr-input w-100 ease-out"
                      placeholder="Enter recipient’s address"
                    />
                  </div>
                  <div class="col-12 col-md-4">
                    <button
                      class="btn-gray param-xs"
                      v-text="'Paste'"
                      @click.p.prevent="pasteRecipient()"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-md-12 col-12 overflow-hidden">
              <div class="row box-right-checkout">
                <div class="col-12">
                  <h1
                    class="
                      title-sm
                      font-weight-bolder
                      tr-gray-two
                      text-center
                      mt-1
                    "
                  >
                    You’re Funding
                  </h1>
                </div>
                <div class="col-12">
                  <div class="bg-yellow-checkout m-auto">
                    <div class="row">
                      <div class="col-md-6 p-md-0 checkout-border">
                        <p class="param-xl tr-gray-two font-weight-bolder">
                          {{ count }}
                        </p>
                        <p class="param tr-gray-four font-weight-bolder mb-0">
                          {{ count > 1 ? " Trees" : " Tree" }}
                        </p>
                      </div>
                      <div class="col-md-6 p-md-0 mb-direction">
                        <p
                          class="
                            param-xl
                            text-center
                            tr-gray-two
                            font-weight-bolder
                          "
                        >
                          {{ parseFloat((treePrice * count).toFixed(0)) + "DAI" }}
                          <span class="param-sm-light">
                      {{
                              "~$" +
                              parseFloat((daiUSDPrice * treePrice * count).toFixed(0))
                            }}
                    </span>
                        </p>
                        <p
                          class="
                            param
                            text-center
                            tr-gray-four
                            font-weight-bolder
                            mb-0
                          "
                        >
                          Total DAI
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-md-8 offset-md-2 mt-4 text-center">
                  <button
                    v-if="daiBalance <= 0"
                    :class="{ disable: loading }"
                    class="btn-green-md mt-4 mb-3"
                    @click="buyDai()"
                  >
                    <BSpinner v-if="loading" class="mr-2" small type="grow"
                    >loading
                    </BSpinner
                    >
                    {{ loading ? "Loading" : " Buy Dai" }}
                  </button>

                  <button
                    v-if="daiBalance > 0 && isAllowedSpendDai"
                    :class="{ disable: loading }"
                    class="btn-green-md mt-4 mb-3"
                    @click="fundTree()"
                  >
                    <BSpinner v-if="loading" class="mr-2" small type="grow"
                    >loading
                    </BSpinner
                    >
                    {{ loading ? "Loading" : " Confirm" }}
                  </button>

                  <button
                    v-if="daiBalance > 0 && !isAllowedSpendDai"
                    :class="{ disable: loading }"
                    class="btn-green-md mt-4 mb-3"
                    @click="allowSpendDai()"
                  >
                    <BSpinner v-if="loading" class="mr-2" small type="grow"
                    >loading
                    </BSpinner
                    >
                    {{ loading ? "Loading" : " Approve" }}
                  </button>

                  <p class="mt-3 param tr-gray-two mb-0">
                    By proceeding I agree to
                    <span
                      class="param tr-green pointer-event"
                      @click.prevent="
                        goToTerm(
                          'https://docs.treejer.com/legal/terms-of-service',
                          '_blank'
                        )
                      "
                    >terms</span
                    >
                    and
                    <span
                      class="param tr-green pointer-event"
                      @click.prevent="
                        goToTerm(
                          'https://docs.treejer.com/legal/privacy-policy',
                          '_blank'
                        )
                      "
                    >conditions.</span
                    >
                  </p>
                </div>

                <div class="col-12 mt-5">
                  <div class="get-help m-auto">
                    <p
                      class="
                        param-18
                        font-weight-bolder
                        tr-gray-two
                        text-center
                      "
                    >
                      Get help
                    </p>
                  </div>
                </div>
                <div class="col-12 col-md-8 offset-md-2 mt-3">
                  <div class="row">
                    <div
                      v-for="(item, index) in pays"
                      :key="index"
                      class="get-help-pays col-md-6 mb-3"
                    >
                      <div
                        :id="item.name"
                        class="btn-purple pointer-event"
                        @click.prevent="setPaymentMethod(item.name, item.href)"
                      >
                        <span v-if="item.name === 'Bridge'">{{ !bridgeLoading ? 'Bridge' : 'Loading...' }}</span>
                        <span v-else>{{ item.name }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="sendAsTreeCard" id="sendAsTreeCard" class="row form-name">
          <div class="col-12">
            <div class="card bg-transparent p-4 mt-5">
              <div class="form-full-name">
                <div class="row">
                  <div class="col-12">
                    <p class="param-md-md font-weight-bold tr-gray-three">
                      Add your name
                    </p>
                  </div>
                  <div class="col-lg-4">
                    <label class="param tr-gray-two Montserrat-Medium"
                    >First name
                      <input
                        class="param-sm tr-gray-five"
                        placeholder="First name"
                        type="text"
                      />
                    </label>
                  </div>
                  <div class="col-lg-4">
                    <label class="param tr-gray-two Montserrat-Medium"
                    >Last name (optional)
                      <input
                        class="param-sm tr-gray-five"
                        placeholder="Last name"
                        type="text"
                      />
                    </label>
                  </div>
                  <div class="col-lg-4">
                    <label class="param tr-gray-two Montserrat-Medium"
                    >Your email
                      <input
                        class="param-sm tr-gray-five"
                        placeholder="Your email"
                        type="text"
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div class="recepient mt-5">
                <div class="row">
                  <div class="col-12">
                    <p class="param-md-md font-weight-bolder tr-gray-three">
                      Add recepient(s)
                    </p>
                  </div>
                  <div class="col-lg-4">
                    <input
                      class="param-sm tr-gray-five"
                      placeholder="Email"
                      type="text"
                    />
                    <input
                      class="param-sm tr-gray-five"
                      placeholder="Email"
                      type="text"
                    />
                    <input
                      class="param-sm tr-gray-five"
                      placeholder="Email"
                      type="text"
                    />
                  </div>
                  <div class="col-lg-4">
                    <input
                      class="param-sm tr-gray-five"
                      placeholder="Email"
                      type="text"
                    />
                    <input
                      class="param-sm tr-gray-five"
                      placeholder="Email"
                      type="text"
                    />
                    <input
                      class="param-sm tr-gray-five"
                      placeholder="Email"
                      type="text"
                    />
                  </div>
                  <div class="col-lg-4">
                    <div
                      class="cv-team bg-transparent justify-content-center text-center"
                    >
                      <img
                        alt="forest-img"
                        class="img-fluid pt-4 m-auto"
                        src="~/assets/images/myforest/file-excel.png"
                      />
                      <p class="param-sm mt-3 p-2 mb-3">
                        Drag & drop your CSV file here or
                        <span class="tr-green">
                            select a CSV file to upload.
                          </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-12">
                    <div
                      class="d-flex mt-3 align-items-center align-self-center"
                    >
                      <button
                        class="btn-outline-green-md param-sm btn-lg mr-2"
                      >
                        Add another row
                      </button>
                      <p class="param-sm mt-3">
                        Or upload email addresses using our
                        <span class="tr-green pointer-event"
                        >CSV template</span
                        >
                      </p>
                    </div>
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-12">
                    <div class="d-flex">
                      <button class="btn-green-md param mr-4">Finish</button>
                      <p class="param tr-green mt-3 pointer-event">
                        Skip for now
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="activeIndex === 1" class="col-12 step-two">
        <div v-if="this.$store.state.account === null" class="row">
          <div class="col-12 mt-5 justify-content-center text-center">
            <h1 class="title-sm font-weight-bolder text-center">
              Select Wallet
            </h1>
          </div>
          <div
            class="col-12 text-center col-lg-4 d-none d-md-block align-items-center align-self-center h-100"
          >
            <p class="param-md tr-gray-three font-weight-bold">Need help?</p>
            <p
              class="pointer-event tr-green"
              @click="localePath('contactUs')"
            >
              support@treejer.com
            </p>
          </div>
          <div
            class="col-12 col-lg-4 mt-3 justify-content-center text-center"
          >
            <Wallets/>

            <!--              <ul class="wallets tr-gray-three list-style-none">-->
            <!--                <li v-for="(item, index) in wallets" class="pointer-event">-->
            <!--                  <p-->
            <!--                    @click="activeWallets(item, index)"-->
            <!--                    :class="{ active: activeWallet === index }"-->
            <!--                    :key="index"-->
            <!--                    :name="item.name"-->
            <!--                  >-->
            <!--                    {{ item.name }}-->
            <!--                  </p>-->
            <!--                </li>-->
            <!--              </ul>-->
            <p class="param mt-3 tr-gray-five">New to Ethereum?</p>
            <p class="param tr-green">Learn more about wallets</p>
            <button
              class="btn-green param-md btn-lg mt-5 font-weight-bolder text-white"
              @click="activeIndex = 2"
            >
              CONNECT
            </button>
          </div>
          <div
            class="col-12 col-lg-4 d-none d-lg-block flex-row align-items-center align-self-center h-100"
          >
            <hr/>
            <p class="param-md font-weight-bold tr-gray-three text-center">
              Total
            </p>
            <p class="title-md text-center tr-gray-three font-weight-bolder">
              {{ parseFloat((daiUSDPrice * treePrice * count).toFixed(0)) }}$
            </p>
            <hr/>
          </div>
        </div>
        <div v-if="this.$store.state.account !== null" class="row">
          <div class="col-12 mt-5 justify-content-center text-center">
            <h1 class="title-sm font-weight-bolder text-center">
              {{ this.$store.state.account }}
            </h1>
          </div>
          <div
            class="col-12 text-center col-lg-4 d-none d-md-block align-items-center align-self-center h-100"
          >
            <p class="param-md tr-gray-three font-weight-bold">Need help?</p>
            <p
              class="pointer-event tr-green"
              @click="localePath('contactUs')"
            >
              support@treejer.com
            </p>
          </div>
          <div
            class="col-12 col-lg-4 mt-3 justify-content-center text-center"
          >
            <p class="param mt-3 tr-gray-five">New to Ethereum?</p>
            <p class="param tr-green">Learn more about wallets</p>
            <button
              class="btn-green param-md btn-lg mt-5 font-weight-bolder text-white"
              @click="activeIndex = 2"
            >
              CONNECTING
            </button>
          </div>
          <div
            class="col-12 col-lg-4 d-none d-lg-block flex-row align-items-center align-self-center h-100"
          >
            <hr/>
            <p class="param-md font-weight-bold tr-gray-three text-center">
              Total
            </p>
            <p class="title-md text-center tr-gray-three font-weight-bolder">
              ${{ parseFloat((daiUSDPrice * treePrice * count).toFixed(0)) }}
            </p>
            <hr/>
          </div>
        </div>
      </div>
      <div v-if="activeIndex === 2" class="col-12 step-three">
        <div class="row">
          <div class="col-12 mt-5 justify-content-center text-center">
            <h1 class="title-sm font-weight-bolder text-center">
              Confirm Payment Information
            </h1>
            <p class="tr-gray-three mt-5">
              You're adding
              <span class="tr-green">{{
                  count + (count > 1 ? " trees" : " tree")
                }}</span>
              to your forest!
            </p>
          </div>

          <div
            class="col-12 col-lg-4 d-none d-md-flex flex-row align-items-center align-self-center h-100"
          >
            <p class="param-md tr-gray-three font-weight-bold">Need help?</p>
            <p
              class="pointer-event tr-green"
              @click="localePath('contactUs')"
            >
              support@treejer.com
            </p>
          </div>
          <div
            class="col-12 col-lg-4 mt-3 justify-content-center text-center"
          >
            <div class="tr-table tr-card">
              <div class="row">
                <div class="col-lg-5">
                  <p class="param tr-gray-four">Total</p>
                  <p class="param tr-gray-four">Payment Fee</p>
                </div>
                <div class="col-lg-7">
                  <p
                    class="param tr-gray-five font-weight-light position-absolute"
                  >
                    <span>DAI</span><span>USD</span>
                  </p>

                  <p class="param tr-gray-four">
                      <span id="eth">{{ treePrice * count }} </span
                      ><span class="usd">{{
                      parseFloat((daiUSDPrice * treePrice * count).toFixed(2))
                    }}</span>
                  </p>
                  <p class="param tr-gray-four">
                    <span id="eths"></span><span class="usds"></span>
                  </p>
                </div>
              </div>
            </div>
            <button
              class="btn-green param-md btn-lg mt-5 font-weight-bolder text-white"
              @click="activeIndex = 3"
            >
              CONFIRM
            </button>
          </div>
          <div
            class="col-12 col-lg-4 d-none d-md-block d-flex flex-row align-items-center align-self-center h-100"
          >
            <hr/>
            <p class="title-sm tr-gray-three text-center">Total</p>
            <p class="title-md text-center tr-gray-three font-weight-bolder">
              {{ parseFloat((daiUSDPrice * treePrice * count).toFixed(0)) }}$
            </p>

            <hr/>
          </div>
        </div>
      </div>
      <div
        v-if="activeIndex === 3"
        class="col-12 final-step justify-content-center text-center"
      >
        <img
          alt="final-step"
          class="img-fluid mt-5"
          src="~/assets/images/myforest/final-step.png"
        />
        <h1 class="title-sm font-weight-bold mt-5 tr-gray-two">
          Congratulations, your forest just got bigger!!
        </h1>
        <p class="mt-3 tr-gray-three">
          Rural communities are notified to plant your trees.
        </p>
        <nuxt-link
          :to="localePath('/forest/' + $cookies.get('account'))"
          class="tr-green param pt-5"
        >Go back to My Forest
        </nuxt-link
        >
      </div>
    </div>
    </div>
  </section>
</template>

<script>
import Fab from "@/components/font-awsome/Fab";
import Wallets from "../../components/Wallets";
import transakSDK from "@transak/transak-sdk";

export default {
  name: "checkout",
  layout: "checkout",
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
  components: {
    Wallets,
    Fab,
  },
  mounted() {
    this.getPrice();
    this.setDaiBalance();
    this.setIsAllowance(this.count);

    let self = this;

    setTimeout(() => {
      this.getPrice();
      self.setIsAllowance(self.count, true);
      self.setDaiBalance();
    }, 1000);

    setInterval(() => {
      this.getPrice();
      self.setIsAllowance(self.count, true);
      self.setDaiBalance();
    }, 3000);
  },
  async created() {
    // const res = await this.$axios.get('https://api.etherscan.io/api?module=stats&action=ethprice&apikey=' + process.env.etherscanApiKEY)
    // this.daiUSDPrice = res.data.result.ethusd

    this.daiUSDPrice = 1.01;
  },
  data() {
    return {
      pays: [
        {href: "", name: "Bridge"},
        {href: "https://global.transak.com/", name: "Visa/Master"},
        {href: "https://docs.treejer.com/", name: "Learn more"},
        {href: "https://discuss.treejer.com/", name: "Questions"},
      ],
      bridgeLoading: false,
      slectedPays: null,

      recipient: null,
      sendAsGiftChecked: false,
      daiBalance: 0,
      isAllowedSpendDai: false,
      treePrice: null,
      daiUSDPrice: null,
      sendAsTreeCard: false,
      loading: false,
      count: 1,
      ethPrice: this.$store.state.ethPrice,
      steps: [
        {name: "Collect", step: 1},
        {name: "Connect to wallet", step: 2},
        {name: "Checkout", step: 3},

        // { name: "final-step", step: 4 }
      ],
      counts: [
        {name: 1, step: 1},
        {name: 5, step: 2},
        {name: 10, step: 3},
        {name: 20, step: 3},
        {name: this.countTree, step: 3, placeHolder: "Enter Number"},
      ],
      payMethods: [
        // {name: "visa", icon: "cc-visa", step: 1},
        {name: "bitcoin", icon: "ethereum", step: 2},
        // {name: "stripe", icon: "cc-stripe", step: 3}
      ],
      activeIndex: 0,
      activeCount: 0,
      activePay: 0,
      countTree: null,
    };
  },
  methods: {
    async allowSpendDai(silent = false) {
      if (silent === false) {
        this.loading = true;
      }
      let self = this;

      const transaction = await this.$store.dispatch("dai/approve", {
        count: this.count,
        context: self,
      });

      if (transaction !== null) {
        this.setIsAllowance(this.count);
        this.$bvToast.toast(["Transaction successfull"], {
          toaster: "b-toaster-bottom-left",
          title: "You approved to spend dai",
          variant: "success",
          href: `${process.env.etherScanUrl}/tx/${transaction.transactionHash}`,
        });

        if (silent === false) {
          this.loading = false;
        }

        await this.fundTree();
      }
    },
    activeMenu(item, index) {
      this.activeIndex = index;
    },
    activeCounts(item, index) {
      this.count = item.name;
      this.activeCount = index;
    },
    activePays(item, index) {
      this.slectedPays = item.name;
      this.activePay = index;
    },
    activeWallets(item, index) {
      this.activeWallet = index;
    },
    async setDaiBalance() {
      if(!this.$cookies.get("account")) {
        return; 
      }

      this.daiBalance = await this.$store.dispatch("dai/balanceOf", {
        'account': this.$cookies.get("account")
      });
    },

    async buyDai() {
      let self = this;
      if (!self.$cookies.get("account")) {
        self.$bvToast.toast("you're not login", {
          toaster: "b-toaster-bottom-left",
          solid: true,
          headerClass: "hide",
          variant: "danger",
        });
        self.$bvModal.show("five");
        return
      }

      let transak = new transakSDK({
        apiKey: process.env.transakApiKey, // Your API Key
        environment: process.env.transakEnvironment, // STAGING/PRODUCTION
        defaultCryptoCurrency: "Dai",
        // defaultCryptoAmount: this.treePrice * this.count,
        walletAddress: this.$cookies.get("account"), // Your customer's wallet address
        themeColor: "000000", // App theme color
        fiatCurrency: "USD", // INR/GBP
        email: "", // Your customer's email address
        redirectURL: "",
        hostURL: window.location.origin,
        widgetHeight: "550px",
        widgetWidth: "450px",
        networks: process.env.transakNetworks,
        defaultNetwork: process.env.transakDefaultNetwork,
      });

      transak.init();

      // To get all the events
      transak.on(transak.ALL_EVENTS, (data) => {
        console.log(data);
      });

      // This will trigger when the user marks payment is made.
      transak.on(transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (orderData) => {
        console.log(orderData);
        self.$bvToast.toast(["Your payment was successful"], {
          toaster: "b-toaster-bottom-left",
          title: "Your wallet charged",
          variant: "success",
          href: `${process.env.etherScanUrl}/address/${self.$cookies.get(
            "account"
          )}`,
        });
        self.setDaiBalance();
        transak.close();
      });
    },

    async fundTree() {
      this.loading = true;
      let self = this;
      if(this.sendAsGiftChecked && this.recipient){
        try {
          this.recipient = this.$web3.utils.toChecksumAddress(this.recipient)
        } catch(e) { 
          self.$bvToast.toast([e.message], {
            toaster: 'b-toaster-bottom-left',
            title: 'Invalid recipient address!',
            variant: 'danger',
            to: 'forest/checkout',
          })
          console.error('invalid ethereum address', e.message) 
          this.loading = false;
          return;
        }
      }

      this.transferReceipt = await this.$store.dispatch("regularSale/fundTree", {
        count: this.count,
        recipient: this.recipient,
        context: self,
      });
      if (this.transferReceipt !== null) {
        this.activeIndex = 3;
        self.$bvToast.toast(["Your payment was successful"], {
          toaster: "b-toaster-bottom-left",
          title: "Trees added to forest",
          variant: "success",
          href: `${process.env.etherScanUrl}/tx/${this.transferReceipt.transactionHash}`,
        });
        const history = this.$router.currentRoute.matched;
        let res = null;
        history.map((item, index) => {
          let name = item.name;
          res = name.match(/forest-id/g);
          if (res === "forest-id") {
            this.$router.push(`/forest/${this.$cookies.get("account")}`);
          }
        });
      }
      this.loading = false;
    },
    async getPrice() {
      this.treePrice = await this.$store.dispatch('regularSale/getPrice')
    },
    async setIsAllowance(count, silent = false) {
      if (silent === false) {
        this.loading = true;
      }

      let allowance = await this.$store.dispatch("dai/allowance");

      this.isAllowedSpendDai =
        parseInt(allowance) >= parseInt(count * this.treePrice);

      if (silent === false) {
        this.loading = false;
      }
    },
    pasteRecipient() {
      let self = this;

      window.navigator.clipboard
        .readText()
        .then((res) => {
          self.recipient = res;
        })
        .catch((err) => {
          console.log(err, "err is here");
        });
    },
    async setPaymentMethod(item, href) {
      if (item === "Bridge") {
        if (process.client) {
          const {Widget} = require("@maticnetwork/wallet-widget");
          this.bridgeLoading = true

          const widget = await new Widget({
            target: "#Bridge",
            appName: "Polygon_Bridge_Treejer",
            autoShowTime: 0,
            position: "center",
            height: 630,
            width: 540,
            overlay: false,
            network: "mainnet",
            closable: true,
          });
          await widget.create();
          await widget.show();
          this.bridgeLoading = false
        } else {
          window.open(href, "_blank");
        }
      }
    },
    goToTerm(item, target) {
      window.open(item, target);
    }
  },
  watch: {
    async count(newCount, oldCount) {
      this.setIsAllowance(newCount);

      // Our fancy notification (2).
      // console.log(`We have ${newCount} fruits now, yay!`)
    }
  },
};
</script>
<style lang="scss" scoped>
.add-tree {
  .pay-badge {
    position: absolute;
    left: -3px;
    transform: rotateZ(45deg);
    top: 20px;
    opacity: 0.8;
    background-color: blanchedalmond;
  }

  .pay-badge:hover,
  .disable {
    cursor: not-allowed;
  }

  hr {
    width: 50%;

    border-top: solid 3px #bdbdbd;
    margin: 25px auto;
  }

  .form-name {
    .finish {
      padding: 0px 45px !important;
      opacity: 0.95;
      border-radius: 6px;
    }

    label {
      font-family: Montserrat-Medium;
      font-size: 14px;
      font-weight: 500;
    }

    input {
      border-radius: 10px;
      background-color: #e5e7db;
      color: #9e9e9e;
      border: 0;
      position: relative;
      padding: 10px 25px;
      font-size: 14px;
      font-family: Montserrat-Medium;
      margin-top: 7px;
    }

    .cv-team {
      border-radius: 6px;
      border: dashed 1px #9e9e9e;
    }
  }
}

.step {
  li {
    width: 100%;
    position: relative;
    text-align: center;

    p:nth-child(2) {
      background: #9e9e9e;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 0;
      z-index: +99;
      color: white;
      text-align: center;
      margin: auto;
    }

    p:nth-child(2):after {
      content: "";
      width: 100%;
      border: solid 2px #9e9e9e;
      height: 2px;
      position: absolute;
      transform: translate(0px, 9px);
    }

    p.active:nth-child(2):after {
      content: "";
      width: 100%;
      border: solid 2px #67b68c;
      height: 2px;
      position: absolute;
      transform: translate(0px, 9px);
    }

    p.active:nth-child(2) {
      background: #67b68c;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 0;
      z-index: +99;
      color: white;
      text-align: center;
      margin: auto;
    }
  }

  li:last-child {
    p:nth-child(2):after {
      display: none;
    }
  }
}

.step-three {
  .tr-table {
    border-radius: 6px;
    border: solid 1px #9e9e9e;
    background-color: #e5e7db;
    padding: 35px 5px 15px;
    margin-top: 35px;

    .position-absolute {
      top: -25px;
      right: 20px;

      span {
        padding: 0 20px;
      }
    }

    span {
      padding: 0 20px;
    }
  }
}

.step-two {
  li {
    margin: 15px auto;
  }

  .wallets {
    p {
      width: auto;
      border-radius: 6px;
      border: solid 1px #bdbdbd;
      background-color: transparent;
      padding: 10px;
      margin: 0 10px;
      text-align: center;
    }

    p.active {
      width: auto;
      border-radius: 6px;
      border: solid 1px #bdbdbd;
      background-color: #e5e7db;
      padding: 10px;
      margin: 0 10px;
      transition: 0.5s ease-all;
    }
  }
}

.box-shadow-active {
  padding: 48px 15px 15px;
  opacity: 0.95;
  width: 275px;
  box-shadow: 0 4px 11px 0 rgba(0, 0, 0, 0.16);
  background-color: #ffffff;
  float: right;

  .btn-green {
    width: 160px;
    height: 36px;
    opacity: 0.95;
    border-radius: 6px;
    font-size: 14px;
  }
}

.tree-count {
  ul {
    padding: 0;
  }

  .input {
    p {
      width: 48px !important;
      height: 48px;

    }

    p.active {
      width: 48px !important;
      height: 48px;
    }
  }

  .input,
  .pays {
    h1 {
      font-size: 18px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
    }

    p {
      width: auto;
      border-radius: 6px;
      border: solid 1px #bdbdbd;
      background-color: #ffffff;
      padding: 10px;
      margin: 0 10px;
      text-align: center;
    }

    p.active {
      width: auto;
      border-radius: 6px;
      border: solid 1px #bdbdbd;
      background: #757575;
      padding: 10px;
      margin: 0 10px;
      transition: 0.5s ease-all;
      color: white;
    }

    input {
      padding: 10px;
      margin: 0 10px;
      border-radius: 6px;
      border: solid 1px #bdbdbd;
      background-color: #fafafa;
      width: 100px;
      height: 45px;
    }
  }

  .form-check {
    h1 {
      font-size: 14px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
    }

    /** BEGIN CSS NEEDED FOR SWITCH **/
    .on-off-toggle {
      width: 32px;
      height: 16px;
      position: relative;
      display: inline-block;
    }

    .on-off-toggle__slider {
      width: 32px;
      height: 16px;
      display: block;
      border-radius: 34px;
      background-color: #d8d8d8;
      transition: background-color 0.4s;

      &:before {
        content: "";
        display: block;
        background-color: #9e9e9e;
        box-shadow: 0 0 0 1px #949494;
        bottom: 0px;
        height: 16px;
        left: 0px;
        position: absolute;
        transition: 0.4s;
        width: 16px;
        z-index: 5;
        border-radius: 100%;
        border: solid 1px #faf8f1;
      }

      &:after {
        display: block;
        line-height: 24px;
        text-transform: uppercase;
        font-size: 12px;
        font-weight: bold;
        content: "";
        color: #484848;
        padding-left: 10px;
        transition: all 0.4s;
      }
    }

    .on-off-toggle__input {
      /*
          This way of hiding the default input is better
          for accessibility than using display: none;
        */
      position: absolute;
      opacity: 0;
    }

    .on-off-toggle__input:checked + .on-off-toggle__slider {
      background-color: #67b68c;

      &:before {
        transform: translateX(15px);
      }

      &:after {
        content: "";
        color: #757575;
        padding-left: 8px;
      }
    }
  }
}

.send-as-gift-code {
  .tr-input {
    background: #fafafa;
    border: 1px solid #bdbdbd;
    box-sizing: border-box;
    border-radius: 8px;
    font-size: 12px;
    text-align: center;
  }
}

.box-right-checkout {
  & > .col-12 {
    margin-top: 32px;
  }

  .bg-yellow-checkout {
    background: #f0e5c8;
    border: 1px solid #bdbdbd;
    box-sizing: border-box;
    border-radius: 8px;
    min-height: 96px;
    width: 272px;
    padding: 17px 30px;
    position: relative;
    text-align: center;

    .checkout-border::after {
      position: absolute;
      content: '';
      height: 75px;
      border: solid 1px #757575;
      width: 1px;
      right: 0px;
      top: 0%;
      @media (max-width: 768px) {
        display: none;
      }
    }
  }

  .get-help {
    position: relative;
    width: fit-content;

    p::after {
      content: "";
      position: absolute;
      top: 12px;
      right: 95px;
      height: 1px;
      border: solid 1px #757575;
      min-width: 70px;
    }

    p::before {
      content: "";
      position: absolute;
      top: 12px;
      left: 95px;
      height: 1px;
      border: solid 1px #757575;
      min-width: 70px;
    }
  }

  .get-help-pays {
    .btn-purple {
      background: linear-gradient(
          93.32deg,
          rgba(63, 177, 214, 0.7) -5.29%,
          #bf8bdf 98.26%
      );
      border-radius: 8px;
      color: white;
      font-size: 14px;
      padding: 6px 25px;
      text-align: center;
    }
  }

  .next-btn {
    padding: 7px 26px;
  }
}

#collectionType-card {
  padding: 16px 28px;
}

@media (max-width: 678px) {
  .send-as-gift-code {
    button.btn-gray {
      margin-top: 15px;
    }
  }
  .bg-yellow-checkout {
    .mb-direction {
      margin-top: 25px;

      p {
        text-align: left !important;
      }
    }
  }
  .step {
    flex-direction: row;
  }
  section > div > div > div:nth-child(1) {
    padding: 0;
  }
  .step li {
    p {
      font-size: 9px;
    }
  }
  .step-one > div > div:nth-child(1) > div.col-12.mt-5.input > ul {
    overflow: auto;
  }
  .step-one > div:nth-child(1) > div.col-lg-6.col-12.overflow-hidden > div {
    width: 100%;
  }
}
</style>

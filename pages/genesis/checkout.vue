<template>
  <section class="position-relative pt-5 col-12 mb-5 pb-5">
    <div class="container-fluid">
      <div class="row tree-count">
        <div class="col-12 step-one">
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
                  <!-- <div class="col-12 col-md-4">
                    <button
                      class="btn-gray param-xs"
                      v-text="'Paste'"
                      @click.p.prevent="pasteRecipient()"
                    />
                  </div> -->
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
                          {{ Number(totalWeth).toFixed(4) }}
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
                          Total WETH
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-md-8 offset-md-2 mt-4 text-center">
                  <button
                    v-if="parseFloat(wethBalance) <= parseFloat(totalWeth)"
                    :class="{ disable: loading }"
                    class="
                      btn-green
                      font-weight-bolder
                      text-white
                      m-auto
                      next-btn
                    "
                    @click="buyWeth()"
                  >
                    <BSpinner v-if="loading" class="mr-2" small type="grow"
                    >loading
                    </BSpinner>
                    {{ loading ? "Loading" : " Buy WETH" }}
                  </button>

                  <button
                    v-if="
                      parseFloat(wethBalance) > parseFloat(totalWeth) &&
                      isAllowedSpendWeth
                    "
                    :class="{ disable: loading }"
                    class="
                      btn-green
                      font-weight-bolder
                      text-white
                      m-auto
                      next-btn
                    "
                    @click="fundTree()"
                  >
                    <BSpinner v-if="loading" class="mr-2" small type="grow"
                    >loading
                    </BSpinner>
                    {{ loading ? "Loading" : " Confirm" }}
                  </button>

                  <button
                    v-if="
                      parseFloat(wethBalance) > parseFloat(totalWeth) &&
                      !isAllowedSpendWeth
                    "
                    :class="{ disable: loading }"
                    class="
                      btn-green
                      font-weight-bolder
                      text-white
                      m-auto
                      next-btn
                    "
                    @click="allowSpendWeth()"
                  >
                    <BSpinner v-if="loading" class="mr-2" small type="grow"
                    >loading
                    </BSpinner>
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
      </div>
    </div>
  </section>
</template>

<script>
import Fab from "@/components/font-awsome/Fab";
import Wallets from "../../components/Wallets";
import transakSDK from "@transak/transak-sdk";

export default {
  name: "giftTree",
  layout: "checkout",
  head() {
    return {
      title: `Treejer`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Enter the Tree ID below and we'll find it for you! :)",
        },
        {
          hid: "keywords",
          name: "keywords",
          content:
            "Looking for your tree?  Tree ID Forests Explore Forests Tree Status Explorer\n LeaderBoard",
        },
      ],
    };
  },
  components: {
    Wallets,
    Fab,
  },
  beforeMount() {
  },

  async mounted() {
    await this.calcTotalPrice();
    await this.setWethBalance();
    await this.setIsAllowance();
  },
  async created() {
  },
  data() {
    return {
      pays: [
        {href: "", name: "Bridge"},
        {href: "https://global.transak.com/", name: "Visa/Master"},
        {href: "https://docs.treejer.com/", name: "Learn more"},
        {href: "https://discuss.treejer.com/", name: "Questions"},
      ],
      slectedPays: null,
      bridgeLoading: false,

      recipient: null,
      sendAsGiftChecked: false,
      wethBalance: 0,
      isAllowedSpendWeth: false,
      loading: false,
      count: 1,
      counts: [
        {name: 1, step: 1},
        {name: 5, step: 2},
        {name: 10, step: 3},
        {name: 20, step: 3},
        {name: this.count, step: 3, placeHolder: "Enter Number"},
      ],
      collectionType: [
        {name: "Genesis", step: 1},
        {name: "Regular", step: 2},
        // {name: "stripe", icon: "cc-stripe", step: 3}
      ],
      activeCount: 0,
      activePay: 0,
      totalWeth: 0,
    };
  },
  methods: {
    activeCounts(item, index) {
      this.count = item.name;
      this.activeCount = index;
    },
    activePays(item, index) {
      this.slectedPays = item.name;
      this.activePay = index;
    },
    async buyWeth() {

      let self = this;
      if (!self.$cookies.get("account")) {
        self.$bvToast.toast("you're not login", {
          toaster: "b-toaster-bottom-left",
          solid: true,
          headerClass: "hide",
          variant: "danger",
        });
        self.$bvModal.show("five");
        return;
      }


      let transak = new transakSDK({
        apiKey: process.env.transakApiKey, // Your API Key
        environment: process.env.transakEnvironment, // STAGING/PRODUCTION
        defaultCryptoCurrency: "Weth",
        defaultCryptoAmount: this.totalWeth,
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
        self.setWethBalance();
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
            to: 'genesis/checkout',
          })
          console.error('invalid ethereum address', e.message) 
          this.loading = false;
          return;
        }
      }


      this.transferReceipt = await this.$store.dispatch(
        "incrementalSale/fundTree",
        {
          count: this.count,
          recipient: this.recipient,
          context: self,
        }
      );
      if (this.transferReceipt !== null) {
        self.$bvToast.toast(["Your payment was successful"], {
          toaster: "b-toaster-bottom-left",
          title: "Trees added to forest",
          variant: "success",
          href: `${process.env.etherScanUrl}/address/${self.$cookies.get(
            "account"
          )}`,
        });
        this.$router.push(`/genesis/success/${this.transferReceipt.transactionHash}`);

      }
      this.loading = false;
    },
    async calcTotalPrice(silent = false) {
      this.loading = true;
      this.totalWeth = await this.$store.dispatch(
        "incrementalSale/calculateTotalPrice",
        {
          count: this.count,
          context: self,
        }
      );
      this.loading = false;
    },
    async setIsAllowance(silent = false) {
      if (silent === false) {
        this.loading = true;
      }

      let allowance = await this.$store.dispatch("erc20/allowance", {
        tokenAddress: process.env.wethTokenAddress,
        spenderContract: this.$IncrementalSale._address,
      });

      this.isAllowedSpendWeth =
        parseFloat(allowance) >= parseFloat(this.totalWeth);

      if (silent === false) {
        this.loading = false;
      }
    },
    async setWethBalance() {
      this.wethBalance = await this.$store.dispatch("erc20/balanceOf", {
        tokenAddress: process.env.wethTokenAddress,
      });
    },
    async allowSpendWeth(silent = false) {
      if (silent === false) {
        this.loading = true;
      }

      const transaction = await this.$store.dispatch("erc20/approve", {
        tokenAddress: process.env.wethTokenAddress,
        spenderContract: this.$IncrementalSale._address,
        amount: this.totalWeth,
      });

      if (transaction !== null) {
        if (typeof transaction.transactionHash != "undefined") {
          this.setIsAllowance(this.count);
          this.$bvToast.toast(["Transaction successfull"], {
            toaster: "b-toaster-bottom-left",
            title: "You approved to spend weth",
            variant: "success",
            href: `${process.env.etherScanUrl}/tx/${transaction.transactionHash}`,
          });

          await this.fundTree();
        }

        if (silent === false) {
          this.loading = false;
        }
      }
    },
    pasteRecipient() {
      window.navigator.clipboard
        .readText()
        .then((res) => {
          this.recipient = res;
        })
        .catch((err) => {
          console.log(err, "err is here");
        });
    },
    async setPaymentMethod(item, href) {
      if (item === "Bridge") {
        if (process.client) {
          this.bridgeLoading = true

          // import {Widget} from '@maticnetwork/wallet-widget'
          const {Widget} = require("@maticnetwork/wallet-widget");
          this.$nuxt.$loading.start();
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

        }
      } else {
        window.open(href, "_blank");
      }
    },
    goToTerm(item, target) {
      window.open(item, target);
    },
  },
  watch: {
    async count(newCount, oldCount) {
      await this.calcTotalPrice();
      await this.setIsAllowance(true);
      await this.setWethBalance();
    },
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

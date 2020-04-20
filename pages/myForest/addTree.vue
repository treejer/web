<template>
  <section class="position-relative pt-5 col-12 add-tree mb-5 pb-5">
    <div class="container-fluid">
      <div class="row tree-count">
        <div class="col-12">
          <ul class="step tr-gray-three d-flex   list-style-none">
            <li
              v-for="(item, index) in steps"
              :key="index"
              :name="item.name"
              class="param-md font-weight-bold"
            >
              <p>{{ item.name }}</p>
              <p :class="{ active: activeIndex === index }">{{ item.step }}</p>
            </li>
          </ul>
        </div>
        <div class="col-12 step-one" v-if="activeIndex === 0">
          <div class="row">
            <div class="col-md-6 col-12">
              <div class="col-12 mt-5 input">
                <h1 class="title-sm">How many trees to plant?</h1>
                <ul class="d-flex list-style-none mt-4">
                  <li v-for="(item, index) in counts" class="pointer-event">
                    <div v-if="!item.placeHolder">
                      <p
                        @click="activeCounts(item, index)"
                        :class="{ active: activeCount === index }"
                        :key="index"
                        :name="item.name"
                      >
                        {{ item.name }}
                      </p>
                    </div>
                    <div v-if="item.placeHolder">
                      <label :for="index">
                        <input
                          :class="{ active: activeIndex === index }"
                          style="width: initial"
                          :placeholder="item.placeHolder"
                          type="number"
                          :value="item.name"
                          :key="index"
                          :name="item.name"
                        />
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="col-12 mt-5 pays">
                <h1 class="title-sm">Select payment method</h1>
                <ul class="d-flex list-style-none mt-4">
                  <li v-for="(item, index) in payMethods" class="pointer-event">
                    <p
                      @click="activePays(item, index)"
                      :class="{ active: activePay === index }"
                      :key="index"
                      :name="item.name">
                      <Fab :i="item.icon" />
                    </p>
                  </li>
                </ul>
              </div>
              <div
                class="col-12 mt-5 form-check justify-content-between d-flex"
              >
                <div>
                  <h1>Send as TreeCard</h1>
                </div>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis"
                  />
                  <label
                    for="bopis"
                    class="on-off-toggle__slider pointer-event"
                  ></label>
                </div>
              </div>
              <div
                class="col-12 mt-3 form-check justify-content-between d-flex"
              >
                <div>
                  <h1>Send as TreeBox</h1>
                </div>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopiss"
                  />
                  <label
                    for="bopiss"
                    class="on-off-toggle__slider pointer-event"
                  ></label>
                </div>
              </div>
              <div class="col-12 mt-3">
                <div class="param">
                  (You can gift your trees on My Forest page after setting up.)
                </div>
              </div>
            </div>
            <div class="col-md-6 col-12 overflow-hidden">
              <div
                class="card mt-5 box-shadow-active  justify-content-center text-center"
              >
                <div class="header">
                  <h4 class="param-lg font-weight-bolder ">Did you know?</h4>
                  <p class="param">
                    Trees can significantly reduce the risk of flood if planted
                    correctly.
                  </p>
                </div>
                <div class="body mt-5">
                  <h4>Total</h4>
                  <h1>{{ "$173.00" }}</h1>
                  <button
                    @click="activeIndex = 1"
                    class="btn-green btn-lg mt-5"
                  >
                    NEXT
                  </button>
                  <p class="pointer-event">
                    <a class="param mb-0" href=""
                      >By proceeding I agree to
                      <span class="param tr-green">terms</span> and
                      <span class="param tr-green">conditions.</span></a
                    >
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="row form-name">
            <div class="col-12">
              <div class="card bg-transparent p-4 mt-5">
                <div class="form-full-name">
                  <div class="row">
                    <div class="col-12">
                      <p class="param-md-md font-weight-bold tr-gray-three">Add your name</p>

                    </div>
                    <div class="col-md-4">
                      <label class="param tr-gray-two Montserrat-Medium">First name
                        <input class="param-sm tr-gray-five" type="text" placeholder="First name">
                      </label>
                    </div>
                    <div class="col-md-4">
                      <label class="param tr-gray-two Montserrat-Medium">Last name (optional)
                        <input class="param-sm tr-gray-five" type="text" placeholder="Last name">
                      </label>
                    </div>
                    <div class="col-md-4">
                      <label class="param tr-gray-two Montserrat-Medium">Your email
                        <input class="param-sm tr-gray-five" type="text" placeholder="Your email">
                      </label>
                    </div>
                  </div>
                </div>
                <div class="recepient mt-5">
                  <div class="row">
                    <div class="col-12">
                      <p class="param-md-md font-weight-bolder tr-gray-three">Add recepient(s)</p>

                    </div>
                    <div class="col-md-4">
                        <input class="param-sm tr-gray-five" type="text" placeholder="Email">
                        <input class="param-sm tr-gray-five" type="text" placeholder="Email">
                        <input class="param-sm tr-gray-five" type="text" placeholder="Email">
                    </div>
                    <div class="col-md-4">
                        <input class="param-sm tr-gray-five" type="text" placeholder="Email">
                        <input class="param-sm tr-gray-five" type="text" placeholder="Email">
                        <input class="param-sm tr-gray-five" type="text" placeholder="Email">
                    </div>
                    <div class="col-md-4">
                      <div class="cv-team bg-transparent justify-content-center text-center ">
                        <img src="~/assets/images/myforest/file-excel.png" class="img-fluid pt-4 m-auto">
                        <p class="param-sm mt-3 p-2 mb-3">
                          Drag & drop your CSV file here
                          or <span class="tr-green">
                          select a CSV file to upload.
                        </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12">
                      <div class="d-flex mt-3 align-items-center align-self-center">

                        <button class="btn-outline-green param-sm btn-lg mr-2 ">Add another row</button>
                        <p class="param-sm mt-3">Or upload email addresses using our <span class="tr-green pointer-event">CSV template</span> </p>
                      </div>
                    </div>
                  </div>
                  <div class="row mt-3">
                    <div class="col-12">
                      <div class="d-flex ">
                        <button class=" btn-green param mr-4 finish" >Finish</button>
                        <p class="param tr-green mt-3 pointer-event" >Skip for now </p>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 step-two" v-if="activeIndex === 1">
          <div class="row">
            <div class="col-12 mt-5 justify-content-center text-center">
              <h1 class="title-sm font-weight-bolder text-center ">
                Select Wallet
              </h1>
            </div>
            <div
              class="col-12 text-center col-md-4 d-none d-md-block d-flex flex-row align-items-center align-self-center  h-100"
            >
              <p class="param-md  tr-gray-three font-weight-bold">Need help?</p>
              <p
                class="pointer-event tr-green"
                @click="localePath('contactUs')"
              >
                support@treejer.com
              </p>
            </div>
            <div
              class="col-12 col-md-4 mt-3 justify-content-center text-center "
            >
              <ul class="wallets tr-gray-three list-style-none">
                <li v-for="(item, index) in wallets" class="pointer-event">
                  <p
                    @click="activeWallets(item, index)"
                    :class="{ active: activeWallet === index }"
                    :key="index"
                    :name="item.name"
                  >
                    {{ item.name }}
                  </p>
                </li>
              </ul>
              <p class="param  mt-3 tr-gray-five">New to Ethereum?</p>
              <p class="param   tr-green">Learn more about wallets</p>
              <button
                class="btn-green param-md btn-lg mt-5 font-weight-bolder text-white "
                @click="activeIndex = 2"
              >
                CONNECT
              </button>
            </div>
            <div
              class="col-12 col-md-4 d-none d-md-block d-flex flex-row align-items-center align-self-center  h-100"
            >
              <hr />
              <p class="param-md font-weight-bold  tr-gray-three text-center">Total</p>
              <p class="title-md text-center tr-gray-three font-weight-bolder">
                $173.00
              </p>
              <hr />
            </div>
          </div>
        </div>
        <div class="col-12 step-three" v-if="activeIndex === 2">
          <div class="row">
            <div class="col-12 mt-5 justify-content-center text-center">
              <h1 class="title-sm font-weight-bolder text-center ">
                Confirm Payment Information
              </h1>
              <p class="tr-gray-three mt-5">
                You're adding <span class="tr-green">{{ "1 tree" }}</span> to
                your forest!
              </p>
            </div>

            <div
              class="col-12 col-md-4 d-none d-md-block d-flex flex-row align-items-center align-self-center  h-100"
            >
              <p class="param-md  tr-gray-three font-weight-bold">Need help?</p>
              <p
                class="pointer-event tr-green"
                @click="localePath('contactUs')"
              >
                support@treejer.com
              </p>
            </div>
            <div
              class="col-12 col-md-4 mt-3 justify-content-center text-center "
            >
              <div class="tr-table tr-card">
                <div class="row">
                  <div class="col-md-5">
                    <p class="param tr-gray-four">Total</p>
                    <p class="param tr-gray-four">Payment Fee</p>
                  </div>
                  <div class="col-md-7">
                    <p
                      class="param tr-gray-five font-weight-light position-absolute"
                    >
                      <span>ETH</span><span>USD</span>
                    </p>

                    <p class="param tr-gray-four">
                      <span id="eth">1.5639</span
                      ><span class="usd">$173.00</span>
                    </p>
                    <p class="param tr-gray-four">
                      <span id="eths">0.0024</span
                      ><span class="usds">0.0024</span>
                    </p>
                  </div>
                </div>
              </div>
              <button
                @click="activeIndex = 3"
                class="btn-green param-md btn-lg mt-5 font-weight-bolder text-white"
              >
                CONFIRM
              </button>
            </div>
            <div
              class="col-12 col-md-4 d-none d-md-block d-flex flex-row align-items-center align-self-center  h-100"
            >
              <hr />
              <p class="title-sm  tr-gray-three text-center">Total</p>
              <p class="title-md text-center tr-gray-three font-weight-bolder">
                $173.00
              </p>
              <hr />
            </div>
          </div>
        </div>
        <div
          class="col-12 final-step justify-content-center text-center"
          v-if="activeIndex === 3"
        >
          <img
            src="~/assets/images/myforest/final-step.png"
            class="img-fluid mt-5"
            alt="final-step"
          />
          <h1 class="title-sm font-weight-bold mt-5 tr-gray-two">
            Congratulations, your forest just got bigger!!
          </h1>
          <p class="mt-3 tr-gray-three">
            Rural communities are notified to plant your trees.
          </p>
          <nuxt-link class="tr-green param pt-5" :to="localePath('myForest')"
            >Go back to My Forest</nuxt-link
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Fab from "@/components/font-awsome/Fab";

export default {
  name: "giftTree",
  layout:"checkout",

  components: {
    Fab
  },

  data() {
    return {
      steps: [
        { name: "Collect", step: 1 },
        { name: "Connect to wallet", step: 2 },
        { name: "Checkout", step: 3 },
        // { name: "final-step", step: 4 }
      ],
      counts: [
        { name: 1, step: 1 },
        { name: 5, step: 2 },
        { name: 10, step: 3 },
        { name: 20, step: 3 },
        { name: this.countTree, step: 3, placeHolder: "Enter Number" }
      ],
      payMethods: [
        { name: "visa", icon: "cc-visa", step: 1 },
        { name: "bitcoin", icon: "ethereum", step: 2 },
        { name: "stripe", icon: "cc-stripe", step: 3 }
      ],
      wallets: [
        { name: "Metamask", step: 1 },
        { name: "Wallet Connect", step: 2 },
        { name: "Trezor", step: 3 },
        { name: "Ledger Nano", step: 4 },
        { name: "Coinbase Wallet", step: 5 }
      ],
      activeIndex: 0,
      activeCount: 0,
      activePay: 0,
      activeWallet: 0,
      countTree: null
    };
  },
  methods: {
    activeMenu(item, index) {
      this.activeIndex = index;
    },
    activeCounts(item, index) {
      this.activeCount = index;
    },
    activePays(item, index) {
      this.activePay = index;
    },
    activeWallets(item, index) {
      this.activeWallet = index;
    }
  }
};
</script>

<style lang="scss" scoped>
.add-tree {
  hr {
    width: 50%;

    border-top: solid 3px #bdbdbd;
    margin: 25px auto;
  }
  .form-name{
    .finish{
     padding: 0px 45px!important;
      opacity: 0.95;
      border-radius: 6px;
    }
    label{
      font-family: Montserrat-Medium;
      font-size: 14px;
      font-weight: 500;
    }
    input{
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
    .cv-team{
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

      span {
        padding: 0 20px;
      }
    }

    span {
      padding: 0 5px;
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
  .input{
    p{
      width: 48px!important;
      height: 48px;
    }
    p.active{
      width: 48px!important;
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

    input {
      padding: 10px;
      margin: 0 10px;
      border-radius: 6px;
      border: solid 1px #bdbdbd;
      background-color: #fafafa;
      width: 100px !important;
      font-size: 10px;
      height: 45px;
    }
  }

  .pays {
    svg {
      font-size: 38px;
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
      width: 56px;
      height: 24px;
      position: relative;
      display: inline-block;
    }

    .on-off-toggle__slider {
      width: 56px;
      height: 24px;
      display: block;
      border-radius: 34px;
      background-color: #d8d8d8;
      transition: background-color 0.4s;

      &:before {
        content: "";
        display: block;
        background-color: #fff;
        box-shadow: 0 0 0 1px #949494;
        bottom: 3px;
        height: 18px;
        left: 3px;
        position: absolute;
        transition: 0.4s;
        width: 18px;
        z-index: 5;
        border-radius: 100%;
      }

      &:after {
        display: block;
        line-height: 24px;
        text-transform: uppercase;
        font-size: 12px;
        font-weight: bold;
        content: "off";
        color: #484848;
        padding-left: 26px;
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
        transform: translateX(32px);
      }

      &:after {
        content: "on";
        color: #ffffff;
        padding-left: 8px;
      }
    }
  }
}
</style>

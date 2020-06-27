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
            <div class="col-12">
              <h1 class="param-lg text-center tr-gray-four mt-5">Create Your Coupon</h1>

            </div>
            <div class="col-md-12 col-12 justify-content-center mt-4 form-coupon ">
              <div class="row justify-content-center ">
                <div class="col-12 col-md-7">
                  <div class="form">
                    <div class="form-group category ">
                      <p for="product_category" class="tr-gray-three param">Product Category </p>
                      <b-form-select v-model="category" :options="categoryOptions"></b-form-select>

                    </div>
                    <div class="form-group coupon-des mt-4">
                      <p for="product_category" class="tr-gray-three param">Coupon Title </p>
                      <b-form-textarea
                        class="tr-gray-three param border-0"
                        style="overflow-y: auto"
                        id="textarea"
                        v-model="couponTitle"
                        placeholder="Please tell us how to use your coupon."
                        rows="3"

                      ></b-form-textarea>

                    </div>
                    <div class="form-group coupon-offer mt-4">

                      <div class="row">
                        <div class="col-md-6 col-12">
                          <p for="product_category" class="tr-gray-three param expiration-date">Your offer </p>
                          <input type="text" class="form-control param" placeholder="$0.00" name="offer"
                                 v-model="offer"/>

                        </div>
                        <div class="col-md-6 col-12 d-flex align-items-center align-self-center justify-content-center">
                          <ul class="d-flex copoun-currency justify-content-around  list-style-none mb-0 p-0 mt-3">
                            <li
                              @click="activeCurrencys(item, index)"
                              :class="{ active: activeCurrency === index }"
                              v-for="(item,index) in currencys" :key="index">{{item.name}}
                            </li>
                          </ul>

                        </div>

                      </div>

                    </div>
                    <div class="form-group coupon-offer mt-4">

                      <p for="product_category" class="tr-gray-three param expiration-date">Coupon Value (min. value
                        required) </p>
                      <client-only>

                      </client-only>

                    </div>

                    <div class="next-step text-center mt-4 justify-content-center">
                      <button class="btn-green param" type="button" @click.prevent="activeIndex=1">Create</button>

                    </div>

                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div class="col-12 step-two" v-if="activeIndex === 1">
          <div class="row">
            <div class="col-12">
              <h1 class="param-lg text-center tr-gray-four mt-5">Your Coupon Details</h1>

            </div>
            <div class="col-md-12 col-12 justify-content-center mt-4 form-coupon ">
              <div class="row justify-content-center ">
                <div class="col-12 col-md-7">
                  <div class="form">
                    <div class="form-group web-site ">
                      <p for="product_category" class="tr-gray-three param">Website </p>
                      <input v-model="form.website"
                             pattern="https?://.+" title="Include http://"
                             class="form-control" required type="text" placeholder="https://yourdomain.com">

                    </div>
                    <div class="form-group coupon-code mt-4">
                      <p for="product_category" class="tr-gray-three param">Coupon Code </p>
                      <input v-model="form.couponCode"
                             pattern="https?://.+" title="Include http://"
                             class="form-control" required type="text" placeholder="https://yourdomain.com">

                    </div>
                    <div class="form-group coupon-date mt-4">

                      <div class="row">
                        <div class="col-md-6 col-12">
                          <p for="product_category" class="tr-gray-three param expiration-date">Expiration date </p>
                          <b-form-datepicker id="example-datepicker"  v-model="form.date"
                                             class="mb-2 param"></b-form-datepicker>
                        </div>
                        <div class="col-md-6 col-12">

                          <p for="product_category" class="tr-gray-three param expiration-date">Region</p>
                          <select name="'choice your country'" v-model="form.country">
                            <option class="tr-black" v-for="(item , index) in regions" :value="form.country ">
                              {{item.country }}
                            </option>
                          </select>
                        </div>

                      </div>

                    </div>
                    <div class="form-group coupon-count  mt-4">
                      <p for="product_category" class="tr-gray-three param">Number of coupons</p>
                      <ul class="d-flex input p-0 list-style-none mt-2">
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
                    <div class="form-group coupon-des mt-4">
                      <p for="product_category" class="tr-gray-three param">Coupon Description </p>
                      <b-form-textarea
                        class="tr-gray-three param"
                        style="overflow-y: auto"
                        id="textarea"
                        v-model="form.des"
                        placeholder="Please tell us how to use your coupon."
                        rows="3"
                        max-rows="6"
                      ></b-form-textarea>

                    </div>

                    <div class="next-step text-center mt-4 justify-content-center">
                      <button class="btn-green" type="button" @click.prevent="activeIndex=2">Next</button>

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

  export default {
    name: "create",
    components: {

    },
    layout: "checkout",
    data() {
      return {
        category: null,
        min: 0,
        max: 10,
        offer: null,
        categoryOptions: [
          {value: null, text: 'select category'},
          {value: 'a', text: 'Holiday'},
          {value: 'b', text: 'Selected Option'},
        ],
        couponTitle: null,


        regions: null,

        form: {
          website: null,
          couponCode: null,
          date: null,
          country: 'choice your country',
          countTree: null,
          des: null

        },
        steps: [
          {name: "Create", step: 1},
          {name: "Coupon Details", step: 2},
          {name: "Brand Details", step: 3},

          // { name: "final-step", step: 4 }
        ],
        counts: [
          {name: 50, step: 1},
          {name: 100, step: 2},
          {name: 200, step: 3},
          {name: 250, step: 4},
          {name: this.countTree, step: 5, placeHolder: "Enter Number"}
        ],
        currencys: [
          {name: '$', step: 1},
          {name: '%', step: 2},
        ],
        payMethods: [
          {name: "visa", icon: "cc-visa", step: 1},
          {name: "bitcoin", icon: "ethereum", step: 2},
          {name: "stripe", icon: "cc-stripe", step: 3}
        ],
        wallets: [
          {name: "Metamask", step: 1},
          {name: "Wallet Connect", step: 2},
          {name: "Trezor", step: 3},
          {name: "Ledger Nano", step: 4},
          {name: "Coinbase Wallet", step: 5}
        ],
        activeIndex: 0,
        activeCount: 0,
        activeCurrency: 0,
        activeWallet: 0,
        countTree: null,


      };
    },
    mounted() {
       this.$axios.$get('https://api.first.org/data/v1/countries')
        .then((res)=>{
          console.log(res.data)
          this.regions =res.data
        })
         .then((err)=>{
          console.log(err)
       })
    } ,
    methods: {
      activeMenu(item, index) {
        this.activeIndex = index;
      },
      activeCounts(item, index) {
        this.activeCount = index;
      },
      activeCurrencys(item, index) {
        this.activeCurrency = index;
      },
      activeWallets(item, index) {
        this.activeWallet = index;
      },
    }

  }
</script>

<style scoped lang="scss">
  .coupon-count.mt-4 > ul{
    overflow-x: auto;

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

  .form-coupon {
    .btn-green {
      padding: 7px 45px;
    }

    p {
      margin-bottom: 0;
    }

    input, .b-form-datepicker, select, option {
      height: 36px;
      background: #E5E7DB;
      border-radius: 6px;
      border: none;
      font-size: 12px;
      color: #757575;
      width: 100%;
    }

    textarea {
      background: transparent;
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
  }

  .step-one {
    textarea {
      height: 69px;
      background: #E5E7DB;
      border-radius: 6px;
    }
  }

  .coupon-offer {
    .copoun-currency {
      li {
        cursor: pointer;
        font-weight: bolder;
        font-size: 21px;
        line-height: 26px;
        color: #616161;
        text-align: center;
        width: 40px;
      }

      li.active {
        background: #67B68C;
        width: 33px;
        height: 34px;
        color: white;
        padding-top: 5px;
      }
    }

    ul {
      text-align: center;
      width: 75px;
      height: 36px;
      background: #E5E7DB;
      border-radius: 6px;
      align-items: center;
      align-self: center;
      display: flex !important;

      li {
        text-align: center;
        justify-content: center;
      }
    }
  }

  @media (max-width: 678px) {
    .step-three > div > div.col-12.col-lg-4.mt-3.justify-content-center.text-center > div > div > div.col-lg-7 > p.param.tr-gray-five.font-weight-light.position-absolute {
      position: relative !important;
      display: block;
      top: 0;
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

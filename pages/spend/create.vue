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
              <h1 class="param-lg text-center tr-gray-four mt-5">Your Coupon Details</h1>

            </div>
            <div class="col-md-12 col-12 justify-content-center mt-4 form-coupon ">
              <div class="row justify-content-center ">
                <div class="col-12 col-md-8">
                  <div class="form">
                    <div class="form-group web-site ">
                      <p for="product_category" class="tr-gray-three param">Website </p>
                      <input v-model="form.website"
                        pattern="https?://.+" title="Include http://"
                        class="form-control" required  type="text" placeholder="https://yourdomain.com">

                    </div>
                    <div class="form-group coupon-code mt-4">
                      <p for="product_category" class="tr-gray-three param">Coupon Code </p>
                      <input v-model="form.couponCode"
                        pattern="https?://.+" title="Include http://"
                        class="form-control" required  type="text" placeholder="https://yourdomain.com">

                    </div>
                    <div class="form-group coupon-code mt-4">

                      <div class="row">
                        <div class="col-md-6 col-12">
                          <p for="product_category" class="tr-gray-three expiration-date">Expiration date </p>
                          <b-form-datepicker id="example-datepicker" v-model="form.date" class="mb-2"></b-form-datepicker>
                        </div>
                        <div class="col-md-6 col-12">

                            <p for="product_category" class="tr-gray-three expiration-date">Region</p>
                          <select v-model="form.country">
                            <option v-for="(item , index) in regions" :value="form.country ===null ?'select on item' :item.country ">{{item.country }}</option>
                          </select>








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
    </div>
  </section>

</template>

<script>
  export default {
    name: "create",
    layout: "checkout",
    data() {
      return {


        regions:null,

        form:{
          website:null,
          couponCode:null,
          date:null,
          country: null,

        },
        steps: [
          {name: "Create", step: 1},
          {name: "Coupon Details", step: 2},
          {name: "Brand Details", step: 3},

          // { name: "final-step", step: 4 }
        ],
        counts: [
          {name: 1, step: 1},
          {name: 5, step: 2},
          {name: 10, step: 3},
          {name: 20, step: 3},
          {name: this.countTree, step: 3, placeHolder: "Enter Number"}
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
        activePay: 0,
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
      activePays(item, index) {
        this.activePay = index;
      },
      activeWallets(item, index) {
        this.activeWallet = index;
      },
    }

  }
</script>

<style scoped lang="scss">
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
  .form-coupon{
    p{
      margin-bottom: 0;
    }
    input,.b-form-datepicker,select,option{
      height: 36px;
      background: #E5E7DB;
      border-radius: 6px;
      border: none;
      font-size: 12px;
      color: #9E9E9E;

      width: 100%;
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

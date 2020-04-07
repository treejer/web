<template>
  <section class="position-relative pt-5 col-10 gift-tree">
    <div class="container-fluid">
      <div class="row article">
        <div class="col-8 d-none d-md-block">
          <div class="row">
            <div class="col-12">
              <h2 class="title-sm ">
                Create Redeemable Trees

              </h2>
              <p class="param-sm">Browse your recent payment events, notifications and verified trees.</p>

            </div>
          </div>
          <div class="row">
            <ul class="nav flex-lg-row">
              <li
                class="nav-item pointer-event "
                v-for="(item, index) in menus"
                :key="index"
                :name="item.name"
              >
                <a
                  @click="activeMenu(item, index)"
                  :class="{ 'active': activeIndex === index }"
                  class="nav-link "
                >

                  <p class="mb-0">{{ item.name }}</p></a
                >
              </li>
            </ul>
          </div>
          <div id="create_new" v-if="activeIndex === 0" class="row mt-4">
            <div class="col-1 steps">
              <ul class="p-0">
                <li class="pointer-event" @click="step =1" :class="{'active-doted':step ===1}"><span
                  :class="{'bg-green' : step <=1}">
                  1
                </span></li>
                <li class="pointer-event" @click="step =2" :class="{'active-doted':step ===2}"><span
                  :class="{'bg-green' : step <2}">2</span></li>
                <li class="pointer-event" @click="step =3" :class="{'active-doted':step ===3}"><span
                  :class="{'bg-green' : step <3}">3</span></li>
              </ul>
            </div>
            <div class="col-11">
              <div class="create-voucher" v-if="step===1">
                <div class="title">
                  <h2 class="param-lg font-weight-bold " style="color: #616161">
                    Create Voucher

                  </h2>

                </div>
                <div class="form-group mt-4 voucher-select position-relative">
                  <div class="arrow">
                    <Fas i="angle-down"/>
                  </div>
                  <b-form-select v-model="selected" :options="options"></b-form-select>

                </div>
                <div class="status-voucher d-flex justify-content-between ">
                  <div class="tree-balance param-sm tr-green"><span>Tree Balance:  </span><span>38</span></div>
                  <div class="eth-balance param-sm tr-green"><span>ETH Balance: </span><span>4.0865 </span></div>
                </div>
                <div class="title mt-4">
                  <h2 class="param-lg font-weight-bold " style="color: #616161">
                    Trees per voucher

                  </h2>

                </div>
                <div class="trees-per-voucher mt-4">
                <span class="odd position-relative" @click="treesPerVoucher >0 ? treesPerVoucher -=1 : treesPerVoucher">

                  <p>-</p></span>
                  <span><label for="trees-per-voucher"><input id="trees-per-voucher" type="text"
                                                              placeholder="1" class="form-control-lg"
                                                              v-model="treesPerVoucher"></label></span>
                  <span class="plus position-relative" @click="treesPerVoucher +=1"><p>+</p> </span>
                </div>
                <div class="title mt-4">
                  <h2 class="param-lg font-weight-bold " style="color: #616161">
                    Total vouchers to distribute

                  </h2>

                </div>
                <div class="trees-per-voucher total-vouchers-to-distribute mt-4">
                <span class="odd position-relative"
                      @click="totalVouchersToDistribute >0 ? totalVouchersToDistribute -=1 : totalVouchersToDistribute">

                  <p>-</p></span>
                  <span><label for="total-vouchers-to-distribute "><input id="total-vouchers-to-distribute " type="text"
                                                                          placeholder="1" class="form-control-lg"
                                                                          v-model="totalVouchersToDistribute"></label></span>
                  <span class="plus position-relative" @click="totalVouchersToDistribute +=1"><p>+</p> </span>
                </div>
                <div class="submit mt-4">
                  <button class="color-white text-white bg-light-green btn-lg" @click="step = 2">Next</button>
                </div>
                <div class="step-two">
                  <p class="param-md tr-gray-one">Approve to Collect Trees for Creating Vouchers</p>
                </div>
                <div class="step-three mt-4 ">
                  <p class="param-md tr-gray-one">Approve to Pay Service Fee</p>
                </div>

              </div>
              <div class="create-voucher-two" v-if="step===2">
                <div class="title">
                  <div class="step-one">
                    <p class="param-md tr-gray-one">Create Voucher</p>
                  </div>
                  <h2 class="param-lg font-weight-bold  mt-4" style="color: #616161">
                    Approve collecting <span style="color: #67b68c" class="tr-green">1 tree</span> from your forest to
                    generate
                    vouchers.

                  </h2>
                  <p class="param-md text-danger mt-4">Please do not close this page!</p>
                  <div class="submit mt-4">
                    <button class="color-white text-white bg-light-green btn-lg" @click="step = 3">CONFIRM</button>
                  </div>

                </div>

                <div class="step-three">
                  <p class="param-md tr-gray-one">Approve to Pay Service Fee</p>
                </div>

              </div>
              <div class="create-voucher-three" v-if="step===3">
                <div class="title">
                  <div class="step-one">
                    <p class="param-md tr-gray-one">Create Voucher</p>
                  </div>
                  <div class="step-two">
                    <p class="param-md tr-gray-one mb-0 mt-4"> Approve to Collect Trees for Creating Vouchers</p>
                    <span><a href="" class="tr-gray-ten text-black-50 param-sm border-right pr-2">Vouchers Generated</a></span>
                    <span><a href="" class="tr-green param-sm" style="color: #67b68c">See Details</a></span>
                  </div>
                  <h2 class="param-lg font-weight-bold  mt-3" style="color: #616161">
                    Approve spending <span style="color: #67b68c" class="tr-green">0.002 ETH</span> from your wallet for
                    service fee.

                  </h2>
                  <p class="param-md text-danger mt-4">Please do not close this page!</p>
                  <div class="submit mt-4">
                    <button class="color-white text-white bg-light-green btn-lg" @click="step = 4">CONFIRM</button>
                  </div>

                </div>

              </div>
              <div class="create-voucher-four" v-if="step===4">
                <div class="title">
                  <div class="step-one">
                    <p class="param-md tr-gray-one">Create Voucher</p>
                  </div>
                  <div class="step-two">
                    <p class="param-md tr-gray-one mb-0 mt-4"> Approve to Collect Trees for Creating Vouchers</p>
                    <span><a href="" class="tr-gray-ten text-black-50 param-sm border-right pr-2">Vouchers Generated</a></span>
                    <span><a href="" class="tr-green param-sm" style="color: #67b68c">See Details</a></span>
                  </div>
                  <div class="step-three">
                    <p class="param-md tr-gray-one mb-0 mt-4"> Approve to Pay Service Fee</p>
                    <span><a href="" class="tr-gray-ten text-black-50 param-sm border-right pr-2">Payment Successful</a></span>
                    <span><a href="" class="tr-green param-sm" style="color: #67b68c">See Details</a></span>
                  </div>

                </div>
                <div class="final-box">
                  <div class="header">
                    <h2 class="title-sm ">
                      Create Redeemable Trees

                    </h2>
                    <p class="param-sm">
                      Receive your vouchers via email or download them right away. You can always access vouchers from
                      "My
                      Vouchers" tab.
                    </p>
                  </div>
                  <div class="body ">
                    <form class="d-flex" action="" @submit="addTreeFinalStep()">
                      <div class="final-box-input"><input class="form-control-lg" v-model="email"
                                                          place-holder="Enter your email here"/></div>
                      <div class="final-box-submit">
                        <button class="btn-lg bg-green" type="button">SEND</button>
                      </div>
                    </form>
                  </div>


                </div>


              </div>

            </div>
          </div>
          <div id="my_voucher" v-if="activeIndex === 1" class="row mt-4">
            <div class="col-12 ">
              <div v-if="myVoucher" class="card-voucher d-flex flex-row justify-content-around align-items-center align-self-center"
                   v-for="(item , index) in myVoucher" :key="index">
                <div class="tree-count">
                  <p class="param-md tr-black"><span>{{item.tree}}</span><span>tree</span></p>
                </div>
                <div class="voucher-count">
                  <p class="param-md tr-black"><span>{{item.voucher}}</span></p>
                </div>
                <div class="time">
                  <p class="param-md tr-black"><span>{{item.date}}</span><span></span></p>
                </div>
                <div class="download">
                  <p>
                    <a :href="item.href" class="param-md tr-green"><span>Download</span><span><Fas i="external-link-alt" /></span></a>

                  </p>
                </div>


              </div>

            </div>
          </div>

        </div>

        <div class="col-md-4 d-none d-md-block justify-content-center">


          <div class="gift-image">
            <img src="../../assets/images/myforest/gift-box.png" alt="voucher" class="img-fluid" height="214"/>
          </div>
          <div class="box-gift">
            <p class="param-md font-weight-bold">Total Vouchers: </p>
            <p class="param-sm">1</p>
            <p class="param-md font-weight-bold">Each voucher contains: </p>
            <p class="param-sm "><span>1</span><span>Tree</span></p>
            <p class="param-md font-weight-bold">Service fee:</p>
            <p class="param-sm ">
              <span>0.002</span>
              <span> ETH</span>
              <span>(0.002 </span>
              <span>ETH per voucher)</span>
            </p>

          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import Fas from "../../components/font-awsome/Fas";

  export default {
    name: "addTree",
    components: {Fas},
    data() {
      return {
        activeIndex: 0,
        treesPerVoucher: 1,
        totalVouchersToDistribute: 1,
        createNew: true,
        selected: null,
        step: 1,
        options: [
          {value: null, text: 'SELECT TREES'},
          {value: 'a', text: 'SELECT TREES ONE'},
          {value: 'b', text: 'SELECT TREES TWO'},
        ],
        menus: [
          {name: "Create New"},
          {name: "My Vouchers"},
          {name: "Analytics"},
          {name: "API"}
        ],
        myVoucher: [
          {
            tree: '1 tree',
            voucher: '1 voucher',
            date: '1/2/2019',
            href: '#'
          },

        ],
      }
    },
    created() {
      console.log(this.$route)
    },
    methods: {
      activeMenu(item, index) {

        this.activeIndex = index;
      }
    }
  }
</script>

<style scoped lang="scss">
  .gift-tree {
    min-height: 100vh;

    #my_voucher {
      .tree-count{
        p{
          color: #616161;

        }

      }
      .card-voucher {
        border-radius: 6px;
        box-shadow: 0 4px 11px 0 rgba(0, 0, 0, 0.16);
        background-color: #ffffff;
        min-height:64px;
        p{
          margin-bottom: 0;
        }
        .download{
          span{
            color: #67b68c;
          }
        }

      }


    }

    .final-box {
      box-shadow: 0 4px 22px 0 rgba(0, 0, 0, 0.16);
      background-color: #fafafa;;
      border-radius: 6px;
      padding: 30px 25px;
      margin-top: 60px;

      input {
        opacity: 0.95;
        border-radius: 6px;
        background-color: #eeeeee;
        color: #757575;
        border: 0;
        margin: 0 15px 0 0px;

      }

      button {
        border-radius: 6px;
        background-color: #67b68c;
        color: white;
        font-size: 14px;
        border: 0;
        padding: 13px 45px;
      }
    }

    .create-voucher {
      .step-two {
        margin-top: 165px;
      }

      .step-three {
      }
    }

    .create-voucher-two {
      .step-three {
        position: absolute;
        bottom: 40px;
      }
    }


    .submit {
      button {
        width: 50%;
        padding: 15px 35px;

        border-radius: 6px;
        background-color: #67b68c;
        color: white;
        font-size: 14px;
        font-weight: 500;
        border: 0;
      }
    }

    .box-gift {
      margin-top: 60px;
      padding: 10px;
      border-radius: 6px;
      border: solid 1px #616161;

      span {
        padding: 0 2px;
      }
    }

    .voucher-select {
      select {
        background: transparent;
        opacity: 0.95;
        border-radius: 6px;
        border: solid 1px #757575;

        option {
          background-color: #faf8f1 !important;

        }
      }

      .arrow {
        position: absolute;
        height: 100%;
        display: flex;
        align-items: center;
        right: 15px;
        border-left: solid 1px;
        padding: 0 0px 0 15px;
      }

    }

    .trees-per-voucher {
      input {
        border-radius: 6px;
        border: solid 1px #757575;
        width: 80px;
      }

      span {
        font-size: 14px;
        padding: 5px 10px;

        p {
          display: inline;
          font-size: 26px;
          font-weight: bolder;

        }

      }

      span:hover {
        cursor: pointer;
      }
    }

    .status-voucher {
      span {
        font-size: 12px;
        color: #67b68c;

      }
    }

    .steps ul {
      height: 100%;
      display: flex;
      flex-direction: column;
      /*justify-content: space-between;*/
      li.active-doted:after {
        content: "";
        height: 610px;
        border: dotted 1px #67B68C;
        position: absolute;
        right: 12px;
        color: gray;
        z-index: 0;


      }

      li.active-doted {
        height: 610px;

        span {
          width: 25px;
          height: 25px;
          background-color: #67b68c;
          color: white;
          border-radius: 50px;
          text-align: center;
          display: block;
          font-weight: 800;

        }
      }

      li:after {
        content: "";
        height: 60px;
        border: dotted 1px;
        position: absolute;
        right: 12px;
        color: gray;
        z-index: 0;


      }

      li {
        list-style: none;
        position: relative;
        height: 60px;

        span {
          width: 25px;
          height: 25px;
          background-color: #999999;
          color: white;
          border-radius: 50px;
          text-align: center;
          display: block;
          font-weight: 800;

        }
      }


    }

    .nav {
      border-bottom: solid 1px gray;
      color: gray;
      justify-content: space-between;
      width: 90%;


    }

    ul li .active {
      border-bottom: solid 3px #67b68c;
      color: #67b68c;
    }
  }


</style>

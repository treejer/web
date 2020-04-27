<template>
  <section class="position-relative mb-5 pb-5 pt-5 col-lg-10 col-12 my-forest">
    <div class="container-fluid">
      <div class="row article">
        <div class="col-lg-9 col-12">
          <div class="row">
            <div class="col-lg-5 col-12">
              <h2 class="title-sm Montserrat-Bold " >
                My Forest

              </h2>

            </div>
            <div class="col-lg-7 col-12 justify-content-end text-right ">
              <div class="form-group">
                <label>
                  <Fas i="search"/>
                  <input class="form-control-lg" v-model="search" placeholder="Enter Tree ID">
                </label>
              </div>
            </div>
          </div>
          <div class="row treejer-desc">
            <div class="col-lg-3 col-12 border-right ">
              <p>FOREST SIZE</p>
              <p><span>47</span> <span>Trees</span></p>
            </div>
            <div class="col-lg-3 col-12 border-right">
              <p>O2 BALANCE</p>
              <p><span>575.4 </span> <span>o2</span></p>
            </div>
            <div class="col-lg-3 col-12 border-right">
              <p>SEED BALANCE</p>
              <p><span>294.2</span><span>SEED</span></p>
            </div>
            <div class="col-lg-3 col-12 ">
              <p>TREES GIFTED</p>
              <p><span>150</span><span>Trees</span></p>
            </div>


          </div>
          <div class="row treejer-earth d-md-block d-none">
            <vue-datamaps
              :geographyConfig="geographyConfig"
              :fills="fills"
              :data="data"></vue-datamaps>
          </div>
        </div>

        <div class="col-lg-3 col-12  justify-content-center">


          <div class="avatar-card card text-center justify-content-center">
            <div class="card-img position-relative"><img src="~/assets/images/myforest/avatar.png" alt="username"
                                                         class="avatar-pic img-fluid"/>
              <span class="position-absolute">+</span>
            </div>
            <p class="param-sm mt-3"> Jeremy Greens</p>
            <p class="param-sm-light"> @JaneJoe</p>
          </div>
          <div class="trees">
            <div class="add-tree">
              <nuxt-link class="position-relative" to="/myForest/addTree">

              <button class="btn-lg">ADD A TREE</button>
              </nuxt-link>
            </div>
            <div class="gift-tree">
              <nuxt-link class="position-relative" to="/myForest/giftTree">
              <button class="btn-lg" >GIFT
                A TREE
              </button>
              </nuxt-link>
            </div>
            <div class="redeem-trees">
              <input class="form-control-lg" type="text" v-model="redeem" placeholder="Enter your voucher code">
              <p>Redeem Trees</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import Fas from '@/components/font-awsome/Fas'
  import content from './world.json';


  export default {
    name:'myForest',
    layout:'dashboard',
    components: { Fas},
    computed: {
      messages() {
        return content
      }
    },
    data() {
      return {
        search: null,
        redeem: null,
        forestSize: 47,
        geographyConfig: {
          dataUrl: '//raw.githubusercontent.com/Seungwoo321/vue-datamaps/master/demo/example-vue-cli3/public/data/world.json',
          highlightOnHover: false,
          borderWidth: 0.5,
          borderOpacity: 1,
          highlightOnHover: true,
          highlightFillColor: '#4e9e74',
          highlightBorderColor: '#4e9e74',
          highlightBorderWidth: 2,
          highlightBorderOpacity: 1
        },
        fills: {
            'Trejer': '#67b68c',
            defaultFill: '#edebe5',
        },
        data: {
            'IRN': {fillKey: 'Trejer'},
            'IND': {fillKey: 'Trejer'},
            'KEN': {fillKey: 'Trejer'},
            'ZAF': {fillKey: 'Trejer'}
        }
      }
    }
  };
</script>

<style lang="scss" scoped>

  .my-forest {
    .avatar-pic{
      width: 80px;
      height: 80px;
    }
    .treejer-desc {
      margin-top: 35px;

      p,span {
        font-size: 12px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        color: #424242;
        font-family: Montserrat-Bold;

        span:nth-child(1) {
          font-size: 24px;
          font-weight: bold;
          font-stretch: normal;
          font-style: normal;
          letter-spacing: 0.84px;
          color: #67b68c;
        }

        span:nth-child(2) {
          font-size: 12px;
          font-weight: bold;
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
      }

    }

    .gift-tree {
      button {
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
      padding: 35px 10px;

      img {
        border: solid 1px gray;
        border-radius: 50px !important;
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
        svg {
          position: absolute;
          z-index: +999;
          top: 12px;
          right: 150px;
        }
      }
    }
    .treejer-earth{
      position: relative;

      map {
        heifght: 450px;
      }
    }

  }

  @media (max-width: 768px) {

    .my-forest > div > div > div.col-lg-9 > div:nth-child(1) > div.col-lg-7.col-12.justify-content-end.text-right{
      text-align: left !important;
      justify-content: flex-start!important;
    }
   .my-forest > div > div > div.col-lg-3.col-12.justify-content-center > div.trees > div.redeem-trees > input{
    margin-bottom: 15px;
    }
  }
</style>

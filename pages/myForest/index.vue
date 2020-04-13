<template>
  <section class="position-relative pt-5 col-10 my-forest">
    <div class="container-fluid">
      <div class="row article">
        <div class="col-md-9">
          <div class="row">
            <div class="col-md-5 col-12">
              <h2 class="title-sm Montserrat-Bold " >
                My Forest

              </h2>

            </div>
            <div class="col-md-4 col-12 ">
              <div class="form-group">
                <label>
                  <Fas i="search"/>
                  <input class="form-control-lg" v-model="search" placeholder="Enter Tree ID">
                </label>
              </div>
            </div>
          </div>
          <div class="row treejer-desc">
            <div class="col-md-3 col-12 border-right ">
              <p>FOREST SIZE</p>
              <p><span>47</span> <span>Trees</span></p>
            </div>
            <div class="col-md-3 col-12 border-right">
              <p>O2 BALANCE</p>
              <p><span>575.4 </span> <span>o2</span></p>
            </div>
            <div class="col-md-3 col-12 border-right">
              <p>SEED BALANCE</p>
              <p><span>294.2</span><span>SEED</span></p>
            </div>
            <div class="col-md-3 col-12 ">
              <p>TREES GIFTED</p>
              <p><span>150</span><span>Trees</span></p>
            </div>


          </div>
          <div class="row treejer-earth d-md-block d-none">
            <div class="col-12 justify-content-center mt-5 ">
              <img src="~/assets/images/myforest/earth.png" alt="earth" class="img-fluid"/>
            </div>
          </div>
        </div>

        <div class="col-3  d-none d-md-block justify-content-center">


          <div class="avatar-card card text-center justify-content-center">
            <div class="card-img position-relative"><img src="~/assets/images/myforest/avatar.png" alt="username"
                                                         class=" img-fluid"/>
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

  export default {
    name:'myForest',
    layout:'dashboard',
    components: { Fas},
    data() {
      return {
        search: null,
        redeem: null,
        forestSize: 47,

      }
    }
  };
</script>

<style lang="scss" scoped>

  .my-forest {
    .treejer-desc {
      margin-top: 35px;

      p {
        font-size: 12px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        color: #424242;

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
        input {
          border-radius: 10px;
          background-color: #e5e7db;
          color: #9e9e9e;
          border: 0;
          position: relative;
          padding: 0 30px;
          font-size: 14px;


        }

        svg {
          position: absolute;
          left: 22px;
          z-index: +999;
          top: 10px;
        }
      }

    }
  }
</style>

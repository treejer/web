<template>
  <section :class="$route.name"
           class="referral col-12 col-lg-10 col-md-auto p-0 "
  >
    <div class="container-fluid">

      <div class="row">
        <div class="col-12 col-md-8 left-side-referral">
          <div class="title-referral">
            <h1 class="title-md tr-gray-two font-weight-bolder ">Impact Referral Program</h1>

          </div>
          <div class="referral-main">
            <div class="row">
              <div class="col-12">
                <p class="param-18 tr-gray-two font-weight-bolder">Referral Status</p>

              </div>
              <div class="col-12 mt-3">
                <div class="d-flex justify-content-between">
                  <p class="param font-weight-bolder tr-ray-two">1 Tree</p>
                  <p class="param font-weight-bolder tr-ray-two">100 Trees</p>
                </div>
              </div>
              <div class="col-12 ">
                <b-progress id="referral-progress" class="" max="100" min="0" show-value>

                  <b-progress-bar value="10" variant="success"></b-progress-bar>
                </b-progress>
              </div>
            </div>
            <div class="row mt-5">
              <div class="col-md-4 ref-left-des">
                <h1 class="param tr-gray-two font-weight-bolder">Genesis Trees</h1>
                <h1 class="param-xl mt-3 tr-gray-two font-weight-bolder">0</h1>
              </div>
              <div class="col-md-4 ref-center-des">
                <h1 class="param tr-gray-two font-weight-bolder">Regular Trees</h1>
                <h1 class="param-xl mt-3 tr-gray-two font-weight-bolder">0</h1>
              </div>
              <div class="col-md-4 ref-right-des">
                <h1 class="param tr-gray-two font-weight-bolder">Total Tree Rewards</h1>
                <h1 class="param-xl mt-3 tr-gray-two font-weight-bolder">0</h1>
              </div>
            </div>
            <div class="row mt-5 pt-3">
              <div class="col-12">
                <p class=" param tr-gray-two">One tree is planted for you every time you meet one of the following
                  goals:</p>
                <ul class="des-goals">
                  <li class=" param tr-gray-two font-weight-bolder Montserrat-Medium"><strong>Referring one genesis
                    trees</strong>
                  </li>
                  <li class=" param tr-gray-two font-weight-bolder Montserrat-Medium">
                    <strong> Referring twenty regular trees</strong>
                  </li>
                </ul>
                <p class="param mt-5 tr-gray-two pt-3">Please make sure to plant your reward trees and add them to your
                  personal forest in Treejer. You’ll receive one NFT tree for each tree you plant.</p>
              </div>
            </div>

          </div>
        </div>
        <div class="col-md-4 pr-md-0 col-12 right-side-referral">
          <div class="row">
            <div class="col-12">
              <img alt="" class="float-md-right img-fluid " src="~/assets/images/referral/referral-banner.svg"/>


            </div>
            <div class="col-12 ml-md-5 pl-md-3 ">
              <p class="param-xl tr-gray-one font-weight-bolder mt-5">Invite a friend</p>
              <p class="mt-3 param tr-gray-one font-weight-bold">Spread the word and plant more trees at no cost. We
                plant more trees for
                you
                when your friends join our community and plant trees.</p>
              <button class="invite-gray text-white font-weight-bold param mt-4">Copy
                Invite Link
              </button>
              <button class="btn-greens text-white font-weight-bold param mt-4">Plant
                Rewards
              </button>
            </div>
          </div>


        </div>
      </div>
    </div>

  </section>
</template>

<script>
export default {
  name: "referral",
  layout: "dashboard",
  async mounted() {
    this.$store.commit('SET_SIDEBAR_INDEX', 1)
  }
}
</script>

<style lang="scss">
.referral {
  .left-side-referral {
    .title-referral {
      margin-top: 65px;

      h1 {

      }
    }

    .referral-main {
      margin-top: 64px;
    }

    .des-goals {
      margin: 0 0 0 40px;
    }
  }

  .right-side-referral {
    img {
      margin-top: 64px;
    }

    .invite-gray {
      background: #757575;
      color: #FFFFFF;
      padding: 15px 25px;
      border-radius: 7px;
      box-shadow: 0 4px 22px rgba(0, 0, 0, 0.161);
      border: none;

    }

    .btn-greens {
      background: #67B68C;
      color: #FFFFFF;
      padding: 15px 32px;
      border-radius: 7px;
      box-shadow: 0 4px 22px rgba(0, 0, 0, 0.161);
      border: none;
    }
  }
}
</style>

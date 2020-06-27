<template>
  <div class="card ">
    <div class="coupon d-flex">
      <div class="col-md-9  coupon-des">
        <div class="header">
          <div class="row desc">
            <div class="col-md-4">
              <div class="log">
                <img :src="localLogo" width="90" class="img-fluid" :alt="localCouponName"/>
              </div>
            </div>
            <div class="col-md-8 text-left">
              <p class="param font-weight-bold tr-gray-three mb-0">{{localCouponName}}</p>
              <span class="off border-0 ">
                  <span class="font-weight-bold tr-gray-four param border-0">{{localCouponOff}}</span>
                  <span class="tr-gray-four param-sm pr-2">Off</span>
                </span>
              <span class="expire-count tr-gray-four param-sm pr-2">
                  {{localExpiredCountCoupon}} left

                </span>
              <span class="expire-count border-0 tr-gray-four param-sm pr-2 pl-2">
                  Expire:{{localExpiredDateCoupon}}

                </span>
              <div class="like pointer-event" @click="localCouponLike = !localCouponLike">
                  <span class="border-0">
                     <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">

                    <rect width="20" height="20" rx="3" :fill="localCouponLike ? '#E5E7DB' :'#ffffff'"/>
                  <path
                    d="M10 15.4689C9.90006 15.4689 9.80011 15.4307 9.72382 15.3544C9.43924 15.0699 9.15467 14.7906 8.87352 14.5148C6.6404 12.3237 4.53125 10.2538 4.53125 7.46106C4.53125 6.43872 5.53757 4.53137 7.46094 4.53137C8.46382 4.53137 9.3763 5.02042 10 5.86728C10.6237 5.02042 11.5362 4.53137 12.5391 4.53137C14.4624 4.53137 15.4687 6.43872 15.4687 7.46106C15.4687 10.2538 13.3596 12.3237 11.1265 14.5148C10.8453 14.7906 10.5608 15.0699 10.2762 15.3544C10.1999 15.4307 10.0999 15.4689 10 15.4689H10ZM7.46094 5.31263C5.97321 5.31263 5.3125 6.86941 5.3125 7.46106C5.3125 9.92574 7.21642 11.7942 9.42093 13.9571C9.61243 14.1456 9.80622 14.3351 10 14.5274C10.1938 14.3351 10.3876 14.1456 10.5791 13.9571C12.7836 11.7942 14.6875 9.92574 14.6875 7.46106C14.6875 6.8694 14.0268 5.31263 12.5391 5.31263C11.2291 5.31263 10.5715 6.34527 10.3494 6.7893C10.2167 7.05404 9.78333 7.05404 9.65058 6.7893C9.42857 6.34527 8.77091 5.31263 7.46095 5.31263H7.46094Z"
                    :fill="localCouponLike?'#757575':'#67b68c'"/>
                    </svg>
                  </span>
                <span class="border-0">
                                  <button class="border-0  param-sm  tr-gray-three "
                                          style="background: #E5E7DB;border-radius: 3px;padding: 4px 7px; ">Value:{{localCouponValue}}</button>

                </span>

              </div>
            </div>
          </div>
        </div>
        <div class="highlight mt-2 text-left">
          <div class="row">
            <div class="col-12">
              <p class="param-md tr-gray-two mb-1">Highlight</p>
              <p class="param-sm tr-gray-four">{{localHighlight}}</p>

            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 coupon-token">
        <div class="token d-flex justify-content-center pointer-event "@click="copyClipboard">
          <span > <input id="token" disabled class="border-0 pointer-event bg-transparent param-md " style="width: 65%" v-model="localCouponToken"></span>
          <span><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0)">
<path
  d="M14.6822 2.06066L12.9268 0.439344C12.6222 0.158039 12.2092 2.08024e-06 11.7784 0L5.95489 0C5.05793 0 4.33083 0.671562 4.33083 1.5V3H1.62406C0.727105 3 0 3.67156 0 4.5V14.5C0 15.3284 0.727105 16 1.62406 16H9.20301C10.1 16 10.8271 15.3284 10.8271 14.5V13H13.5338C14.4308 13 15.1579 12.3284 15.1579 11.5V3.12131C15.1579 2.72349 14.9868 2.34196 14.6822 2.06066ZM9 14.5H1.82707C1.77323 14.5 1.72159 14.4802 1.68352 14.4451C1.64545 14.4099 1.62406 14.3622 1.62406 14.3125V4.6875C1.62406 4.63777 1.64545 4.59008 1.68352 4.55492C1.72159 4.51975 1.77323 4.5 1.82707 4.5H4.33083V11.5C4.33083 12.3284 5.05793 13 5.95489 13H9.20301V14.3125C9.20301 14.3622 9.18162 14.4099 9.14355 14.4451C9.10548 14.4802 9.05384 14.5 9 14.5ZM13.3308 11.5H6.15789C6.10405 11.5 6.05242 11.4802 6.01435 11.4451C5.97627 11.4099 5.95489 11.3622 5.95489 11.3125V1.6875C5.95489 1.63777 5.97627 1.59008 6.01435 1.55492C6.05242 1.51975 6.10405 1.5 6.15789 1.5H9.74436V4.25C9.74436 4.66422 10.1079 5 10.5564 5H13.5338V11.3125C13.5338 11.3622 13.5124 11.4099 13.4744 11.4451C13.4363 11.4802 13.3847 11.5 13.3308 11.5ZM13.5338 3.5H11.3684V1.5H11.6943C11.7481 1.5 11.7998 1.51975 11.8379 1.55491L13.4744 3.06641C13.4932 3.08382 13.5082 3.10449 13.5184 3.12724C13.5286 3.14999 13.5338 3.17438 13.5338 3.199V3.5Z"
  fill="#BDBDBD"/>
</g>
<defs>
<clipPath id="clip0">
<rect width="15.1579" height="16" fill="white"/>
</clipPath>
</defs>
</svg>
          </span>
        </div>
        <div class="spending">
         <p class="param tr-gray-four mb-0 mt-2">Spending</p>
          <p class="font-weight-bold tr-gray-two position-relative mb-1"  style="font-size: 28px;font-weight: 900">
          <span>
                        {{localSpending}}

          </span>
            <span>O</span>
            <span style="font-size: 18px;position: absolute;bottom: 0">1</span>

          </p>

        </div>
        <div class="balanced">
          <span class="param tr-gray-four">Your balance: </span>
          <span class="param tr-green">{{localBalance}}</span>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Coupon",
    data() {
      return {
        localLogo: this.logo,
        localHighlight: this.highlight,
        localCouponName: this.couponName,
        localCouponOff: this.couponOff,
        localExpiredCountCoupon: this.expiredCountCoupon,
        localExpiredDateCoupon: this.expiredDateCoupon,
        localCouponValue: this.couponValue,
        localCouponLike: this.couponLike,
        localCouponToken: this.couponToken,
        localSpending: this.spending,
        localBalance: this.balance,
      }
    },
    props: {
      logo: {
        type: String,
        default: require('~/assets/images/spend/samsung.png')
      },
      highlight: {
        type: String,
        default: 'A trusted supplier of adult toys and accessories for more than four decades, adamandeve.com ships sultry gifts discreetlyA trusted'
      },
      couponName: {
        type: String,
        default: 'Free Galaxy Buds'
      },
      couponOff: {
        type: String,
        default: '20%'
      },
      expiredCountCoupon: {
        type: String,
        default: '49'
      },
      expiredDateCoupon: {
        type: String,
        default: '04 Jan 2020'
      },
      couponValue: {
        type: String,
        default: '$140-200'
      },
      couponLike: {
        type: Boolean,
        default: true
      },
      couponToken: {
        type: String,
        default: 'Fkjkjf65687'
      },
      spending: {
        type: String,
        default: '41'
      },
      balance: {
        type: String,
        default: '345'
      }
    },
    methods: {
      copyClipboard() {
        let token = document.querySelector('#token')
        token.setAttribute('type', 'text')    // 不是 hidden 才能複製
        token.select()

        try {
          const successful = document.execCommand('copy');
          const msg = successful ? 'successful' : 'unsuccessful';
          this.$bvToast.toast(`Copy to clipboard!! `,{
            variant:'success',
            title:'token has been on your clipboard'
          })
        } catch (err) {
          console.log(err)
        }

        /* unselect the range */
        window.getSelection().removeAllRanges()
      },
    }
  }
</script>

<style scoped lang="scss">
  .card {
    border: 0;
    padding: 20% 0;

    .coupon {
      background-image: url("../assets/images/spend/Subtract.png");
      padding: 50px 10px;
      background-size: contain;
      background-position-y: center;
      background-repeat: no-repeat;
      @media (max-width: 768px) {
        background-image: none;
      }
    }
    .token{
      background: #E5E7DB;
      border-radius: 6px;
      padding: 10px 4px;
    }

    .desc span {

      border-right: 1px solid #BDBDBD;
    }

  }

</style>

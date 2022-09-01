<template>
  <section
    :class="$route.name"
    class="referral col-12 col-lg-10 col-md-auto p-0"
  >
    <div class="container-fluid mb-5 mb-md-2">
      <div class="row">
        <div class="col-12 col-md-8 left-side-referral">
          <div class="title-referral">
            <h1 class="title-md tr-gray-two font-weight-bolder">
              {{$t('invite.title')}}
            </h1>
          </div>
          <div class="referral-main">
            <div class="row">
              <div class="col-12">
                <p class="param-18 tr-gray-two font-weight-bolder">
                  {{$t('invite.referral')}}
                </p>
              </div>
              <div class="col-12 mt-3">
                <div class="d-flex justify-content-between">
                  <p class="param font-weight-bolder tr-ray-two">  {{$t('invite.onetree')}}</p>
                  <p class="param font-weight-bolder tr-ray-two">  {{$t('invite.hundredtrees')}}</p>
                </div>
              </div>
              <div class="col-12">
                <b-progress
                  id="referral-progress"
                  class=""
                  max="100"
                  min="0"
                  show-value
                >
                  <b-progress-bar
                    :value="referrer ? totalClaimable : 0"
                    variant="success"
                  ></b-progress-bar>
                </b-progress>
              </div>
            </div>
            <div class="row mt-5">
              <div class="col-md-4 ref-left-des">
                <h1 class="param tr-gray-two font-weight-bolder">
                {{$t('invite.genesistrees')}}
                </h1>
                <h1 class="param-xl mt-3 tr-gray-two font-weight-bolder">
                  {{ referrer ? referrer.claimableTreesWeth : 0 }}
                </h1>
              </div>
              <div class="col-md-4 ref-center-des">
                <h1 class="param tr-gray-two font-weight-bolder">
                  {{$t('invite.regulartrees')}}
                </h1>
                <h1 class="param-xl mt-3 tr-gray-two font-weight-bolder">
                  {{ referrer ? referrer.claimableTreesDai : 0 }}
                </h1>
              </div>
              <div class="col-md-4 ref-right-des">
                <h1 class="param tr-gray-two font-weight-bolder">
                  {{$t('invite.totaltreerewards')}}
                </h1>
                <h1 class="param-xl mt-3 tr-gray-two font-weight-bolder">
                  {{ referrer ? totalReward : 0 }}
                </h1>
              </div>
            </div>
            <div class="row mt-5 pt-3">
              <div class="col-12">
                <p class="param tr-gray-two">
                   {{$t('invite.onetreeisplanted')}}
                </p>
                <ul class="des-goals">
                  <li
                    class="
                      param
                      tr-gray-two
                      font-weight-bolder
                      Montserrat-Medium
                    "
                  >
                    <strong>  {{$t('invite.referring')}}</strong>
                  </li>
                  <li
                    class="
                      param
                      tr-gray-two
                      font-weight-bolder
                      Montserrat-Medium
                    "
                  >
                    <strong> {{$t('invite.referringtwenty')}}</strong>

                    {{
                      referrer && referrer.referrerCount > 0
                        ? `(${referrer.referrerCount}/20)`
                        : ""
                    }}
                  </li>
                </ul>
                <p class="param mt-5 tr-gray-two pt-3">
                 {{$t('invite.pleasemakesure')}}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4 pr-md-0 col-12 right-side-referral">
          <div class="row">
            <div class="col-12">
              <img
                alt=""
                class="float-md-right img-fluid"
                src="~/assets/images/referral/referral-banner.svg"
              />
            </div>
            <div class="col-12 ml-md-5 pl-md-3">
              <p class="param-xl tr-gray-one font-weight-bolder mt-5">
               {{$t('invite.inviteafriend')}}
              </p>
              <p class="mt-3 param tr-gray-one font-weight-bold">
               {{$t('invite.spread')}}
              </p>

              <button
                v-if="$cookies.get('account')"
                class="invite-gray text-white font-weight-bold param mt-4"
                @click="shareModal()"
                
              >
               {{$t('invite.getlink')}}
              </button>
              <button
                v-else
                class="invite-gray text-white font-weight-bold param mt-4"
                @click="login"
              >
                {{$t('invite.login')}}
              </button>

              <button
                class="btn-greens text-white font-weight-bold param mt-4"
                @click="plantRewards()"
              >
                <BSpinner
                  v-if="plantRewardsLoading"
                  class="mr-2"
                  small
                  type="grow"
                  >plantRewardsLoading
                </BSpinner>
                {{$t('invite.plantrewards')}}
              </button>
            </div>
          </div>
          <b-modal id="social-target" centered hide-footer size="md">
            <ShareReferral/>
          </b-modal>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import referrer from "~/apollo/queries/referrer";
import ShareReferral from "~/components/ShareReferral.vue";


export default {
  name: "referral",
  components: {
    ShareReferral
  },
  layout: "dashboard",
  apollo: {
    $client() {
      return this.$cookies.get("activeNetwork") ? this.$cookies.get("activeNetwork").key : 'default';
    },
    referrer: {
      query: referrer,
      // prefetch: true,
      skip() {
        return this.$cookies.get("account") ? false : true;
      },
      prefetch: ({ cookies }) => ({
        id: cookies.get("account")
          ? cookies.get("account").toLowerCase()
          : "Guest",
      }),
      variables() {
        return {
          id: this.$cookies.get("account")
            ? this.$cookies.get("account").toLowerCase()
            : "Guest",
        };
      },
      // variables() {
      //   // return {id:  '0x9ec0a4472ff40cd9bee54a26a268c29c9df3872f' }
      //   return { id: "0x84ca05d617741b96e6ee3a3f59779f59931270e7" }
      // },
    },
  },
  data() {
    return {
      totalClaimable: 0,
      totalReward: 0,
      baseUrl: process.env.baseUrl,
      plantRewardsLoading: false,
       meta: {
        title: this.$t('invite.title'),
        description: this.$t('invite.description'),
        keywords: this.$t('invite.keywords')
      },
    };
  },
   head() {

    return {
      title: this.meta.title,
      meta: [
        {hid: 'description', name: 'description', content: this.meta.description},
        {hid: 'keywords', name: 'keywords', content: this.meta.keywords},

        {hid: 'og:title', property: 'og:title', content: this.meta.title},
        {hid: 'og:description', property: 'og:description', content: this.meta.description},
        {hid: 'og:url', property: 'og:url', content: this.baseUrl + '/tree/' + this.$route.params.id},
        {hid: 'og:image', property: 'og:image', content: this.baseUrl + '/featureImage/jake-hills.jpg'},

        {hid: 'twitter:title', property: 'twitter:title', content: this.meta.title},
      ]


    };
  },
  async mounted() {
    this.$store.commit("SET_SIDEBAR_INDEX", 1);
  },
  methods: {
    shareModal() {
      this.$bvModal.show("social-target");
    },
    login() {
      this.$bvModal.show("five");
    },
    onCopy: function (e) {
      this.$bvToast.toast(this.$t('alert.copytoclipboard'), {
        variant: "success",
        title: this.$t('alert.textandinvite'),
        toaster: "b-toaster-bottom-left",
      });
    },
    onError: function (e) {
      this.$bvToast.toast(this.$t('alert.failed'), {
        variant: "danger",
        title: this.$t('alert.failed'),
        toaster: "b-toaster-bottom-left",
      });
    },
    async updateData() {
      if (!this.referrer) {
        return;
      }

      this.totalClaimable =
        Number(this.referrer.claimableTreesDai) +
        Number(this.referrer.claimableTreesWeth);

      this.totalReward =
          Number(this.totalClaimable) + Number(this.referrer.claimedCount);

    },
    async plantRewards() {
      if (!this.$cookies.get("account")) {
        this.$bvToast.toast(this.$t('alert.notlogin'), {
          toaster: "b-toaster-bottom-left",
          solid: true,
          headerClass: "hide",
          variant: "danger",
        });
        this.login();
        return;
      }

      if (this.totalClaimable <= 0) {
        this.$bvToast.toast(this.$t('alert.totalclaimable'), {
          variant: "danger",
          title: this.$t('alert.plantrewardsfailed'),
          toaster: "b-toaster-bottom-left",
        });
        return;
      }

      this.plantRewardsLoading = true;

      const transaction = await this.$store.dispatch(
        "regularSale/claimReferralReward"
      );

      if (transaction !== null) {
        this.$bvToast.toast(this.$t('alert.transactionsuccessfull'), {
          toaster: "b-toaster-bottom-left",
          title: this.$t('alert.yourrewardschangedtotrees'),
          variant: "success",
          href: `${this.$cookies.get('config').explorerUrl}/tx/${transaction.transactionHash}`,
        });

        await this.$apollo.queries.referrer.refetch();
      }

      this.plantRewardsLoading = false;
    },
  },
  watch: {
    async referrer() {
      await this.updateData();
    }
  },
};
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
      color: #ffffff;
      padding: 15px 25px;
      border-radius: 7px;
      box-shadow: 0 4px 22px rgba(0, 0, 0, 0.161);
      border: none;
    }

    .btn-greens {
      background: #67b68c;
      color: #ffffff;
      padding: 15px 32px;
      border-radius: 7px;
      box-shadow: 0 4px 22px rgba(0, 0, 0, 0.161);
      border: none;
    }
  }
}
</style>

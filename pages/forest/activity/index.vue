<template>
  <section
    :page="$route.name"
    class="position-relative pt-5 col-12 col-lg-10 updates"
  >
    <div class="container-fluid">
      <div class="row article">
        <div class="col-md-8 col-12">
          <div class="row">
            <div class="col-12">
              <h2 class="title-sm">{{ $t("activity.title") }}</h2>
              <p class="param-sm">
                {{ $t("activity.description") }}
              </p>
            </div>
            <div class="col-12 mb-5 mt-2">
              <ul>
                <li
                  v-for="history in addressHistories"
                  :key="history.id"
                  class="list-style-none time-line fade-out"
                >
                  <p
                    class="
                      param-md
                      tr-gray-three
                      font-weight-lighter
                      one-minted
                    "
                  >
                    <span v-if="history.event === 'HighestBidIncreased'">
                      {{ $t("activity.yousuccessfullyincreasedbid") }}
                      <span class="tr-green font-weight-bold Montserrat-Medium"
                        >Ξ{{ $web3.utils.fromWei(history.value) }}</span
                      >
                       {{ $t("activity.onauction") }}
                      <span
                        class="tr-green font-weight-bold Montserrat-Medium"
                        >{{ $hex2Dec(history.typeId) }}</span
                      >
                    </span>

                    <span v-if="history.event === 'AuctionSettled'">
                      {{ $t("activity.yousuccessfullysettled") }}
                      <span
                        class="tr-green font-weight-bold Montserrat-Medium"
                        >{{ $hex2Dec(history.typeId) }}</span
                      >
                    </span>

                    <span v-if="history.event === 'AuctionEnded'">
                     {{ $t("activity.yousuccessfullyendedauction") }}
                      <span
                        class="tr-green font-weight-bold Montserrat-Medium"
                        >{{ $hex2Dec(history.typeId) }}</span
                      >
                    </span>

                    <span v-if="history.event === 'WonAuction'">
                      {{ $t("activity.youarethewinnerofauction") }}
                      <span
                        class="tr-green font-weight-bold Montserrat-Medium"
                        >{{ $hex2Dec(history.typeId) }}</span
                      >
                      {{ $t("activity.with") }}
                      <span class="tr-green font-weight-bold Montserrat-Medium"
                        >Ξ{{ $web3.utils.fromWei(history.value) }}</span
                      >
                    </span>

                    <span v-if="history.event === 'HonoraryClaimed'">
                     {{ $t("activity.yousuccessfullyclaimed") }}
                      <span
                        class="tr-green font-weight-bold Montserrat-Medium"
                        >{{ $hex2Dec(history.typeId) }}</span
                      >
                    </span>

                    <span v-if="history.event === 'IncrementalTreeFunded'">
                       {{ $t("activity.yousuccessfullyfunded") }}
                      <span
                        class="tr-green font-weight-bold Montserrat-Medium"
                        >{{ history.count }}</span
                      >
                       {{ $t("activity.genesistree") }}{{ history.count > 1 ? "s" : "" }}
                      <!-- with total value <span class="tr-green font-weight-bold Montserrat-Medium">Ξ{{ $web3.utils.fromWei(history.value) }}</span> -->
                    </span>

                    <span v-if="history.event === 'RegularTreeFunded'">
                     {{ $t("activity.yousuccessfullyfunded") }}
                      <span
                        class="tr-green font-weight-bold Montserrat-Medium"
                        >{{ history.count }}</span
                      >
                       {{ $t("activity.tree") }}{{ history.count > 1 ? "s" : "" }}{{ $t("activity.withtotalvalue") }}
                      <span class="tr-green font-weight-bold Montserrat-Medium"
                        >{{ $web3.utils.fromWei(history.value) }}DAI</span
                      >
                    </span>

                    <a
                      :href="`${etherScanUrl}/tx/${history.transactionHash}`"
                      target="_blank"
                      class="tr-green pointer-event pointer-event small"
                    >
                      <Fas i="external-link-alt" />
                    </a>

                    <span
                      class="
                        d-flex
                        justify-content-start
                        tr-gray-four
                        param-sm
                        font-weight-lighter
                        time-box
                      "
                    >
                      <span class="date"
                        >{{
                          $moment(history.createdAt * 1000).strftime(
                            "%b %d, %Y"
                          )
                        }}
                      </span>
                      <span class="time">{{
                        $moment(history.createdAt * 1000).strftime("%I:%M %p")
                      }}</span>
                    </span>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="col-4 d-md-block d-none justify-content-center">
          <img
            src="~/assets/images/update/updates.png"
            alt="username"
            class="img-fluid"
            id="help_img"
          />
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import addressHistoriesByAddressQuery from "~/apollo/queries/addressHistoriesByAddress";
import Fas from "@/components/font-awsome/Fas";

export default {
  name: "updates",
  layout: "dashboard",
  components: { Fas },
  data() {
    return {
      etherScanUrl: process.env.etherScanUrl,
      meta: {
        title: this.$t("activity.meta.title"),
        description: this.$t("activity.meta.description"),
        keywords: this.$t("activity.meta.keywords"),
      },
    };
  },
  head() {
    return {
      title: this.meta.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.meta.description,
        },
        { hid: "keywords", name: "keywords", content: this.meta.keywords },

        { hid: "og:title", property: "og:title", content: this.meta.title },
        {
          hid: "og:description",
          property: "og:description",
          content: this.meta.description,
        },
        {
          hid: "og:url",
          property: "og:url",
          content: this.baseUrl + "/tree/" + this.$route.params.id,
        },
        {
          hid: "og:image",
          property: "og:image",
          content: this.baseUrl + "/featureImage/jake-hills.jpg",
        },

        {
          hid: "twitter:title",
          property: "twitter:title",
          content: this.meta.title,
        },
      ],
    };
  },
  apollo: {
    addressHistories: {
      query: addressHistoriesByAddressQuery,
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
          address: this.$cookies.get("account")
            ? this.$cookies.get("account").toLowerCase()
            : "Guest",
          first: 100,
          skip: 0,
          orderBy: "createdAt",
          orderDirection: "desc",
        };
      },
    },
  },

  computed: {},
  methods: {},
  async created() {
    await this.$store.commit("SET_SIDEBAR_INDEX", 3);
    if (!this.$cookies.get("account")) {
      this.$bvToast.toast("you're not login", {
        toaster: "b-toaster-bottom-left",
        solid: true,
        headerClass: "hide",
        variant: "danger",
      });
      this.$bvModal.show("five");
      return;
    }
  },
};
</script>
<style scoped lang="scss">
.updates {
  .updates-tab {
    display: flex;
    border-radius: 20px;
    box-shadow: 0 4px 22px 0 rgba(0, 0, 0, 0.16);
    background-color: #ffffff;
    width: inherit;
    list-style: none;
    justify-content: center;
    margin-bottom: 35px;
    width: 50%;

    li {
      height: 100%;
      padding: 7.6px 0;
      width: 100%;
      text-align: center;
    }

    li.active {
      border-radius: 20px;
      border: solid 2px #ffffff;
      background-color: #67b68c;
      color: white;
    }
  }
  ul li {
    position: relative;

    p {
      position: relative;
      padding-bottom: 34px;
      transition: ease all 0.3s;
    }

    .tr-green {
      color: #67b68c !important;
    }

    .time-box {
      letter-spacing: 2px;
      margin-top: 9px;
      color: #999999 !important;

      > span.date {
        position: relative;
        border-right: solid 1px #999999;
      }

      span {
        padding-right: 9px;
        margin-right: 9px;
      }
    }
  }

  ul {
    position: relative;
  }

  .time-line .tree-funded::before,
  .time-line .one-minted::before {
    content: "";
    position: absolute;
    background: #616161;
    width: 12px;
    height: 12px;
    z-index: +9999;
    left: -16px;
    border-radius: 10px;
    transform: translate(-50%, 50%);
    top: 0px;
  }

  .time-line .tree-funded::after,
  .time-line .one-minted::after {
    content: "";
    position: absolute;
    border: 2px dashed #616161;
    z-index: +9999;
    left: -18px;
    height: 95%;
    top: 20px;
  }
}

//@media (min-width: 1024px){
//   #help_img{
//    position: fixed;
//  }
//
//}
</style>

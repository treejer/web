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
              <h2 class="title-sm">Updates</h2>
              <p class="param-sm">
                Browse your recent payment events, notifications and verified
                trees.
              </p>
            </div>
            <div class="col-12 mb-5 mt-2">
              <ul class="updates-tab">
                <li
                  class="pointer-event tr-gray-three "
                  v-for="(item, index) in updatesTabs"
                  :class="{ active: activeIndex === index }"
                  :name="item.name"
                  :key="index"
                  @click="activeMenu(index)"
                >
                  {{ item.name }}
                </li>
              </ul>
              <ul>
                <li v-show="activeIndex === 1" class="list-style-none time-line  fade-out ">
                  <p
                    class="param-md tr-gray-three font-weight-lighter one-minted"
                    v-for="(seed, index) in totalSeed"
                    :key="index"
                  >
                    You successfully sent
                    <span class="tr-green font-weight-bold Montserrat-Medium">{{
                      seed.totalSeed
                    }}</span>
                    Seed from your forest to your wallet.
                    <a
                      class="tr-green pointer-event pointer-event Montserrat-Medium font-weight-bold"
                      @click="openModal(item)"
                      >See details</a
                    >
                    <span
                      class="d-flex justify-content-start tr-gray-four param-sm font-weight-lighter time-box"
                    >
                      <span class="date"
                        >{{ seed.created_at.slice(0, 10) }}
                      </span>
                      <span class="time"
                        >{{ seed.created_at.slice(10, 20) }} UTC</span
                      >
                    </span>
                  </p>
                </li>
                <li
                  class="list-style-none time-line "
                  v-show="activeIndex === 0"
                  v-for="(item, index) in updates"
                  :key="index"
                >
                  <p
                    class="param-md tr-gray-three font-weight-lighter tree-funded"
                  >
                    You successfully added 1 Tree with id
                    <a
                      class="tr-green pointer-event Montserrat-Medium font-weight-bold"
                      >#{{ item.id }}</a
                    >
                    to your forest.
                    <a
                      class="tr-green pointer-event pointer-event Montserrat-Medium font-weight-bold"
                      @click="openModal(item)"
                      >See details</a
                    >
                    <span
                      class="d-flex justify-content-start tr-gray-four param-sm time-box"
                    >
                      <span class="date"
                        >{{ item.created_at.slice(0, 10) }}
                      </span>
                      <span class="time"
                        >{{ item.created_at.slice(10, 20) }} UTC</span
                      >
                    </span>
                  </p>
                </li>
              </ul>
              <b-modal id="update" hide-footer v-if="modalsrc">
                <div class="card border-0 p-2 param-md tr-gray-three">
                  <ul class="list-style-none">
                    <li>
                      address:
                      <span class="tr-green param-sm">
                        {{ modalsrc.address }}</span
                      >
                    </li>
                    <li>
                      blockHash:
                      <span class="tr-green param-sm">
                        {{ modalsrc.blockHash }}</span
                      >
                    </li>
                    <li>
                      blockNumber:
                      <span class="tr-green param-sm">
                        {{ modalsrc.blockNumber }}</span
                      >
                    </li>
                    <li>
                      event:
                      <span class="tr-green param-sm">
                        {{ modalsrc.event }}</span
                      >
                    </li>
                    <li>
                      id:
                      <span class="tr-green param-sm"> {{ modalsrc.id }}</span>
                    </li>
                    <li>
                      logIndex:
                      <span class="tr-green param-sm">
                        {{ modalsrc.logIndex }}</span
                      >
                    </li>
                    <li>
                      raw:
                      <span class="tr-green param-sm"> {{ modalsrc.raw }}</span>
                    </li>
                    <li>
                      removed:
                      <span class="tr-green param-sm">
                        {{ modalsrc.removed }}</span
                      >
                    </li>
                    <li>
                      returnValues:
                      <span class="tr-green param-sm">
                        {{ modalsrc.returnValues }}</span
                      >
                    </li>
                    <li>
                      signature:
                      <span class="tr-green param-sm">
                        {{ modalsrc.signature }}</span
                      >
                    </li>
                    <li>
                      transactionHash:
                      <span class="tr-green param-sm">
                        {{ modalsrc.transactionHash }}</span
                      >
                    </li>
                    <li>
                      transactionIndex:
                      <span class="tr-green param-sm">
                        {{ modalsrc.transactionIndex }}</span
                      >
                    </li>
                  </ul>
                </div>
              </b-modal>
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
export default {
  name: "updates",
  layout: "dashboard",
  head() {
    return {
      title:`Treejer`,
      meta:[
        { hid: 'description', name: 'description', content:"contact our business and team"},
    { hid: 'keywords', name: 'keywords', content: 'business team_business treejer treejer_contact_us teams ' }
  ]
  }
  },
  data() {
    return {
      updates: null,
      modalsrc: null,
      activity: null,
      totalSeed: [],
      updatesTabs: [{ name: "Tree" }, { name: "Seed" }],
      activeIndex: 0,
    };
  },
  computed: {
    activityTypes() {
      // if(this.modalsrc.event === 'TreeFunded'){
      return "Tree Funding";
      // }
    },
  },
  methods: {
    sendItem(item, index) {},
    activeMenu(index) {
      this.activeIndex = index;
    },
    openModal(item) {
      this.modalsrc = JSON.parse(item.raw_data);

      this.$bvModal.show("update");
    },
  },
  async created() {
    await this.$store.commit('SET_SIDEBAR_INDEX', 3)
  },
  async mounted() {
    const updates = await this.$axios.$get(
      `${process.env.apiUrl}/wallets/${this.$cookies.get(
        "account"
      )}/events?perPage=20&page=1`
    );
    this.activity = updates;
    console.log(this.activity.events.data.length,"this.activity.events.data.length")
    // this.$store.commit("SET_UPDATE_LENGTH","")
    this.$cookies.set("updateLength",this.activity.events.data.length)
    console.log(this.$cookies.get('updateLength'),"yessssssss")
    console.log(this.activity, "this.totalSeed");

    this.updates = updates.events.data;
    updates.events.data.map((item, index) => {
      if (item.type === "SeedMinted") {
        const pars = JSON.parse(item.data);
        this.totalSeed.push({
          totalSeed: this.$web3.utils.fromWei(pars.totalSeed),
          created_at: item.created_at,
          updated_at: item.updated_at,
        });
        console.log(this.totalSeed, "this.totalSeed");
      }
    });

    this.sendItem();
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

    li {
      height: 100%;
      padding: 7.6px 0;
      width: 50%;
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

<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 col-md-9 admin-right-side">
        <div class="row">
          <div class="col-12">
            <ul class="">
              <li
                class="d-inline-block list-style-none pr-2 pb-2"
                v-for="(item, index) in tabs"
                :key="index"
              >
                <button
                  @click="setIndex(item.text, index)"
                  :class="tabsIndex === index ? 'btn-green' : 'btn-gray'"
                  :key="index"
                >
                  {{ item.text }}
                </button>
              </li>
            </ul>
          </div>
          <div class="col-12 col-md-11 justify-content-center text-left mt-5">
            <div class="small">
              <div class="header-tab position-relative pb-3">
                <div class="row">
                  <div class="col-md-6">
                    <p class="param-md">Overview</p>
                    <p class="title-sm font-weight-bolder">{{ tabName }}</p>
                  </div>
                  <div class="col-md-6"></div>
                </div>
              </div>
              <div class="row line-chart">
                <div class="col-12" v-if="downloads">
                  <line-chart
                    :chart-data="groupData"
                    :options="chartOptions"
                  ></line-chart>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-3  admin-left-side pl-md-0">
        <div class="cards" v-for="(item, index) in allStats" :key="index">
          <div class="cards-title">
            <p class="param tr-gray-two text-capitalize" v-if="index === 'total_eth_locked'">
              {{ 'Total Funding (ETH)' }}
            </p>
            <p class="param tr-gray-two text-capitalize" v-if="index === 'total_seed_supply'">
              {{ 'Total Seed Supply' }}
            </p>
            <p class="param tr-gray-two text-capitalize" v-if="index === 'total_tree_supply'">
              {{ 'Total tree supply' }}
            </p>
            <p class="param tr-gray-two text-capitalize" v-if="index === 'total_unique_wallets'">
              {{ 'Total Users' }}
            </p>
          </div>
          <div class="cards-count">
            <h4 v-if="index === 'total_eth_locked'" class="mb-0 title-sm font-weight-bolder tr-gray-two pointer-event" :tabindex="index" v-b-tooltip.lefttop :title="totalEthLocked">
              {{ totalEthLocked  | truncate(15) }}
            </h4>
            <h4 v-else-if="index === 'total_seed_supply'" class="mb-0 title-sm font-weight-bolder tr-gray-two pointer-event" :tabindex="index" v-b-tooltip.lefttop :title="totalSeedSupply">
              {{ totalSeedSupply  | truncate(15) }}
            </h4>
            <h4 v-else class="mb-0 title-sm font-weight-bolder tr-gray-two pointer-event" :tabindex="index" v-b-tooltip.lefttop :title="item">
              {{ item }}
            </h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import LineChart from "~/plugins/lineChart";
import Vue2Filters from 'vue2-filters'



export default {
  mixins: [Vue2Filters.mixin],

  components: {
    // LineChart,
  },

  name: "index",
  layout: "admin",

  data() {
    return {
      totalEthLocked: null,
      downloads: null,
      totalSeedSupply:null,
      labels: null,
      tabs: [
        {
          text: "Tree Funding Volume",
        },
        {
          text: "Tree Planing Volume",
        },
        // {
        //   text: "User Acquisition",
        // },
        // {
        //   text: "Planter Acquisition",
        // },
        // {
        //   text: "Green Block Growth",
        // },
        // {
        //   text: "Seed Supply",
        // },
        // {
        //   text: "O2 Supply",
        // },
      ],
      tabsIndex: 0,
      allStats: null,
      tabName: "Tree Funding Growth",
      cards: [
        {
          text: "Total Funding (ETH)",
          count: "348.2355",
        },
        {
          text: "Total Locked in Escrow (ETH)",
          count: "225.7482",
        },
        {
          text: "Total Released to Planters (ETH)",
          count: "122.4873",
        },
        {
          text: "Tree Supply",
          count: "56,264",
        },
        {
          text: "Seed Supply",
          count: "234,343,872",
        },
        {
          text: "O2 Supply",
          count: "432,512",
        },
        {
          text: "Total Users",
          count: "8,539",
        },
      ],
      dataCollection: null,
      groupData: null,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  computed: {},
  mounted() {
    this.fetchStats();
    this.fetchPlantedChartData();

  },

  methods: {
    setIndex(item, index) {
      this.tabsIndex = index;
      this.tabName = item;
      if (index === 0) {
        this.fetchPlantedChartData()
      }
      if (index === 1) {
        this.fetchFundedChartData()
      }
    },
    fetchStats() {
      let self = this;

      self.$axios.get(`${this.$cookies.get('config').apiUrl}/trees/stats`).then((res) => {

        self.allStats = res.data;
        self.totalEthLocked = res.data.total_eth_locked
        self.totalSeedSupply = res.data.total_seed_supply
        self.totalEthLocked = this.$web3.utils.fromWei(res.data.total_eth_locked)
        self.totalSeedSupply = this.$web3.utils.fromWei(res.data.total_seed_supply)
      });
    },
    fetchPlantedChartData() {
      let self = this;
      let api = `${this.$cookies.get('config').apiUrl}/trees/plantedChartData?howMany=12`;
      this.$axios.get(api).then(res => {
        self.dataCollection = res.data;
        self.labels = res.data.map(item => {
          return item.labels;
        });
        self.downloads = res.data.map(item => {
          return item.count;
        });
        self.fillData()
      }).catch().finally()
    },
    fetchFundedChartData() {
      let self = this;
      let api = `${this.$cookies.get('config').apiUrl}/trees/fundedChartData?howMany=12`;
      this.$axios.get(api).then(res => {
        self.dataCollection = res.data;
        self.labels = res.data.map(item => {
          return item.labels;
        });
        self.downloads = res.data.map(item => {
          return item.count;
        });
        self.fillData()
      }).catch().finally()
    },
    fillData() {
      if (this.downloads) {
        this.groupData = {
          layout: {
            padding: {
              left: 15,
              right: 15,
              top: 15,
              bottom: 15,
            },
          },
          labels: this.labels,
          datasets: [
            {
              label: this.tabName,
              borderCapStyle: "butt",
              borderColor: "#67B68C",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              capBezierPoints: true,
              pointBackgroundColor: "rgba(0, 0, 0, 0.1)",
              data: this.downloads
            }
          ],
        };
      }

    },
  },
};
</script>

<style lang="scss" scoped>
.admin-right-side {
  .btn-green {
    padding: 5.5px 35px;
  }

  .small {
    position: relative;
    background: #ffffff;
    box-shadow: 2px 4px 44px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    .header-tab {
      padding: 15px 32px;
      border-bottom: 4px solid #e5e7db;
    }
    .line-chart {
      padding: 45px 30px;
      position: relative;
    }
  }
}

.admin-left-side {
  .cards {
    display: flex;
    flex-direction: column;
    padding: 20px 32px;
    width: 100%;
    min-height: 107px;
    background: #ffffff;
    box-shadow: 2px 4px 42px rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    align-self: center;
    margin-bottom: 32px;
  }
}
</style>

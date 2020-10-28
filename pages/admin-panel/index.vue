<template>
  <div class="container">
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
          <div class="col-11 justify-content-center text-left mt-5">
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
                <div class="col-12">
                  <line-chart
                    :styles="myStyles"
                    :chart-data="datacollection"
                    :options="chartOptions"
                  ></line-chart>
                  <button class="btn-gray mt-3" @click="fillData()">
                    Randomize
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-3 admin-left-side">
        <div class="cards" v-for="(item, index) in cards" :key="index">
          <div class="cards-title">
            <p class="param tr-gray-two">{{ item.text }}</p>
          </div>
          <div class="cards-count">
            <h4 class="mb-0 title-sm font-weight-bolder tr-gray-two">
              {{ item.count }}
            </h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from "~/plugins/lineChart";

export default {
  components: {
    LineChart,
  },

  name: "index",
  layout: "admin",

  data() {
    return {
      tabs: [
        {
          text: "Tree Funding Growth",
        },
        {
          text: "Tree Funding Volume ",
        },
        {
          text: "User Acquisition",
        },
        {
          text: "Planter Acquisition",
        },
        {
          text: "Green Block Growth",
        },
        {
          text: "O1 Supply",
        },
        {
          text: "O2 Supply",
        },
      ],
      tabsIndex: 0,
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
          text: "O1 Supply",
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
      datacollection: null,
      chartOptions: {
        responsive: true,
        maintainAspectRatio:false,
        aspectRatio:1,
        scales: {
          yAxes: [
            {
              stacked: false,
              gridLines: {
                display: true,
              },
            },
          ],
          xAxes: [
            {
              stacked: false,
              gridLines: {
                display: true,
              },
            },
          ],
        },
      },
    };
  },
  computed: {},
  mounted() {
    this.fillData();
  },

  methods: {
    setIndex(item, index) {
      this.tabsIndex = index;
      this.tabName = item;
      this.fillData();
    },

    fillData() {
      this.datacollection = {
        layout: {
          padding: {
            left: 15,
            right: 15,
            top: 15,
            bottom: 15,
          },
        },
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
        
            label: "Data One",
            borderCapStyle: "butt",
            borderColor: "#67B68C",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            capBezierPoints: true,
            pointBackgroundColor: "rgba(0, 0, 0, 0.1)",
            data: [
              {
                x: this.getRandomInt(),
                y: this.getRandomInt(),
              },
              {
                x: this.getRandomInt(),
                y: this.getRandomInt(),
              },
              {
                x: this.getRandomInt(),
                y: this.getRandomInt(),
              },
              {
                x: this.getRandomInt(),
                y: this.getRandomInt(),
              },
            ],
          },
        ],
      };
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
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
    width: 296px;
    height: 107px;
    background: #ffffff;
    box-shadow: 2px 4px 42px rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    align-self: center;
    margin-bottom: 32px;
  }
}
</style>

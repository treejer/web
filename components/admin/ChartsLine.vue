<template>
  <div class="small">
    <line-chart :styles="myStyles" :chart-data="datacollection"></line-chart>
    <button class="btn-gray mt-3" @click="fillData()">Randomize</button>
  </div>

</template>

<script>
import LineChart from '~/plugins/lineChart'

export default {


  props: {
    activeLink: {
      default: 'Tree Funding Growth',
      type: String
    }
  },
  name: "LineChart",
  data() {
    return {
      datacollection: null,
    }
  },



  methods: {
    fillData() {
      this.datacollection = {
        layout: {
          padding: {
            left: 15,
            right: 15,
            top: 15,
            bottom: 15
          }
        },
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
          {
            label: 'Data One',
            borderCapStyle: 'butt',
            borderColor: '#67B68C',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            capBezierPoints: true,
            pointBackgroundColor: 'rgba(0, 0, 0, 0.1)',
            data: [
              {
                x: this.getRandomInt(),
                y: this.getRandomInt()
              },
              {
                x: this.getRandomInt(),
                y: this.getRandomInt()
              },
              {
                x: this.getRandomInt(),
                y: this.getRandomInt()
              },
              {
                x: this.getRandomInt(),
                y: this.getRandomInt()
              },
            ]
          },

        ]
      }

    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    }
  }
}
</script>

<style scoped lang="scss">

</style>

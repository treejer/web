<template>
  <section
    class="position-relative pt-5 col-12 mb-5 pb-5 genesis-first-page"
  >

      <div>
        <h3>Auctions</h3>
        <ul>
          <li v-for="auction in auctions" :key="auction.id">
            auction id {{ auction.id }} - startdate {{ auction.startDate }}
          </li>
        </ul>

        <h3>One Auction</h3>
        <span v-if="auction">
          auction id {{ auction.id }} - startdate {{ auction.startDate }} - endDate {{ auction.endDate }}
        </span>
      </div>



  </section>
</template>

<script>

import auction from '~/apollo/queries/auction'



export default {
  layout: "landing",
  apollo: {
    auctions: {
      prefetch: true,
      query: auctions
    },
    auction: {
      query: auction,
      prefetch: false,
      variables () {
        return { id: '0x0' }
      }
    },

    //example for read id from route
    // Car: {
    //   query: car,
    //   prefetch: ({ route }) => ({ id: route.params.id }),
    //   variables () {
    //     return { id: this.$route.params.id }
    //   }
    // }
  },

  data() {
    return {
      loading:false
    };
  },
  components: {},
  methods: {
  },
  mounted() {
  }
};
</script>

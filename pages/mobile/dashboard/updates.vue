<template>
  <section :page="$route.name" class="position-relative pt-3 col-12">
    <div class="container-fluid">
      <div class="row article">
        <div class="col-12">
          <div class="row">
            <div class="col-12">
              <div class="row " @click="goToForest()">
                <div class="col-4">
                  <span class="param-20" style="line-height: 28px;font-weight: bolder"> <  </span>
                </div>
                <div class="col-8 ">
                  <span class="param pt-2 ">Updates</span>

                </div>
              </div>
            </div>
            <div class="col-12 justify-content-center text-center">


              <img src="~/assets/images/update/updates.png" alt="username"
                   class=" img-fluid" id="help_img"/>

            </div>
            <div class="col-12 text-center mt-3">
              <h2 class="title-sm">
                Updates

              </h2>
              <p class="param-sm">
                Browse your recent payment events, notifications and verified trees.
              </p>

            </div>
            <div class="col-12 mb-5 mt-2">
              <ul>
                <li class="list-style-none time-line" v-if="updates" v-for="(item , index) in updates">
                  <p class="param-md tr-gray-three font-weight-lighter one-minted"
                     v-if="item.type ==='O1Minted'">
                    You successfully sent <span class="tr-green font-weight-bold Montserrat-Medium">{{ totalO1 }}</span>
                    O1 from your forest to your wallet. <a
                    class="tr-green pointer-event pointer-event Montserrat-Medium font-weight-bold"
                    @click="openModal(item)">See
                    details</a>
                    <span class="d-flex justify-content-start tr-gray-four param-sm font-weight-lighter time-box">
                      <span class="date">{{ item.created_at.slice(0, 10) }} </span>
                      <span class="time">{{ item.created_at.slice(10, 20) }} UTC</span>

                    </span>
                  </p>
                  <p class="param-md tr-gray-three font-weight-lighter tree-funded" v-if="item.type ==='TreeFunded' ">
                    You successfully added 1 Tree with id <a
                    class="tr-green pointer-event Montserrat-Medium font-weight-bold">#{{ item.id }}</a> to your forest.
                    <a
                      class="tr-green pointer-event pointer-event Montserrat-Medium font-weight-bold"
                      @click="openModal(item)">See
                      details</a>
                    <span class="d-flex justify-content-start tr-gray-four param-sm time-box">
                      <span class="date">{{ item.created_at.slice(0, 10) }} </span>
                      <span class="time">{{ item.created_at.slice(10, 20) }} UTC</span>

                    </span>
                  </p>

                </li>

              </ul>
              <b-modal id="update" hide-footer v-if="modalsrc">
                <div class="card border-0 p-2 param-md tr-gray-three">
                  <ul class="list-style-none">
                    <li> address: <span class="tr-green param-sm"> {{ modalsrc.address }}</span></li>
                    <li> blockHash: <span class="tr-green param-sm"> {{ modalsrc.blockHash }}</span></li>
                    <li> blockNumber: <span class="tr-green param-sm"> {{ modalsrc.blockNumber }}</span></li>
                    <li> event: <span class="tr-green param-sm"> {{ modalsrc.event }}</span></li>
                    <li> id: <span class="tr-green param-sm"> {{ modalsrc.id }}</span></li>
                    <li> logIndex: <span class="tr-green param-sm"> {{ modalsrc.logIndex }}</span></li>
                    <li> raw: <span class="tr-green param-sm"> {{ modalsrc.raw }}</span></li>
                    <li> removed: <span class="tr-green param-sm"> {{ modalsrc.removed }}</span></li>
                    <li> returnValues: <span class="tr-green param-sm"> {{ modalsrc.returnValues }}</span></li>
                    <li> signature: <span class="tr-green param-sm"> {{ modalsrc.signature }}</span></li>
                    <li> transactionHash: <span class="tr-green param-sm"> {{ modalsrc.transactionHash }}</span></li>
                    <li> transactionIndex: <span class="tr-green param-sm"> {{ modalsrc.transactionIndex }}</span></li>
                  </ul>


                </div>
              </b-modal>
            </div>
          </div>
        </div>


      </div>
    </div>
  </section>
</template>

<script>
import web3 from '~/plugins/web3'

export default {
  name: "update",
  layout: "checkOutMobile",
  data() {
    return {
      updates: null,
      modalsrc: null,
      activity: null,
      totalO1: null
    }
  },
  computed: {
    activityTypes() {
      // if(this.modalsrc.event === 'TreeFunded'){
      return 'Tree Funding'
      // }
    }
  },
  methods: {
    sendItem(item, index) {
      console.log(item, index, 'item,index hereeee')
    },
    openModal(item) {
      this.modalsrc = JSON.parse(item.raw_data)

      this.$bvModal.show('update')
    },
    goToForest(){
      this.$store.commit('SET_INDEX', 0)
      if(this.$cookies.get('account')){
        this.$router.push({path: `/mobile/dashboard/${this.$cookies.get('account')}`})

      }else {
        this.$router.push({path: `/mobile/dashboard`})

      }
    }
  },

  async mounted() {
    const updates = await this.$axios.$get(`https://api.treejer.com/wallets/${this.$cookies.get('account')}/events?perPage=10&page=1`)
    this.activity = updates
    this.updates = updates.events.data
    updates.events.data.map((item, index) => {
      if (item.type === 'O1Minted') {
        const pars = JSON.parse(item.data)
        console.log(web3.utils, 'item,index heee')
        this.totalO1 = web3.utils.fromWei(pars.totalO1)
      }
    })

  }
}
</script>

<style scoped>
.time-line {
  background: #FFFFFF;
  box-shadow: 1px 3px 14px rgba(0, 0, 0, 0.13);
  border-radius: 9px;
  padding: 10px;
  margin: 10px 0;
}
</style>

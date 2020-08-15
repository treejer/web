<template>
  <section :page="$route.name" class="position-relative pt-5 col-12 col-lg-10 updates" >
    <div class="container-fluid">
      <div class="row article">
        <div class="col-md-8 col-12">
          <div class="row">
            <div class="col-12">
              <h2 class="title-sm">
                Updates

              </h2>
              <p class="param-sm">
                Browse your recent payment events, notifications and verified trees.
              </p>

            </div>
            <div class="col-12 mt-2">
              <ul>
                <li class="list-style-none" v-if="updates" v-for="(item , index) in updates">
                  <p class="param-md tr-gray-three font-weight-bold">
                    {{ index + 1 + ' ' }})  For Tree Funding
                      You successfully added 1 tree with id <a class="tr-green pointer-event">#{{ item.id }}</a>  to your forest. <a class="tr-green pointer-event pointer-event" @click="openModal(item)">See details</a>
                  </p>

                </li>

              </ul>
              <b-modal id="update" hide-footer v-if="modalsrc" >
               <div class="card border-0 p-2 param-md tr-gray-three">
                 <ul class="list-style-none">
                   <li> address:  <span class="tr-green param-sm"> {{ modalsrc.address }}</span></li>
                   <li> blockHash:  <span class="tr-green param-sm"> {{ modalsrc.blockHash }}</span></li>
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

        <div class="col-4 d-md-block d-none justify-content-center">


          <img src="~/assets/images/update/updates.png" alt="username"
               class=" img-fluid" id="help_img"/>

        </div>
      </div>
    </div>
  </section>

</template>
<script>
  export default {
    name: 'updates',
      layout: "dashboard",

    data() {
      return {
        updates: null,
        modalsrc:null
      }
    },
    methods:{
      openModal(item){
        this.modalsrc =JSON.parse(item.raw_data)

        this.$bvModal.show('update')
      }
    },
    async mounted() {
      const updates = await this.$axios.$get(`https://api.treejer.com/wallets/${this.$cookies.get('account')}/events?perPage=10&page=1`)
       this.updates = updates.events.data
      console.log(this.updates, 'update here')
    }
  }
</script>
<style scoped lang="scss">
  .updates{
    ul li {
      .tr-green{
        color: #67b68c!important;
      }
    }
  }
  //@media (min-width: 1024px){
  //   #help_img{
  //    position: fixed;
  //  }
  //
  //}
</style>

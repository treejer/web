<template>
  <section
    class="position-relative pt-5 col-12 claim-treebox mb-5 pb-5"
  >
    <div class="container-fluid">
      <div class="row justify-content-center" v-if="box">
        <div class="col-12 text-center" v-if="box.sender && box.sender !== zeroAddress">
          <img src="~assets/images/treebox/tree.png" alt="tree" />
          <h4 class="title-sm tr-gry-two">A tree is planted for you!</h4>
          <p
            v-if="box.message && box.message.length > 2"
            class="
              param-md
              tr-gary-three
              col-md-6
              offset-md-3
              font-weight-bolder
            "
          >
            {{ box.message }}
          </p>

          <div>
            <span>Reciever Address</span>
            <input type="text" v-model="recipient" placeholder="Reciver Ethereum Address">
            <button class="btn-green d-block font-weight-bolder" @click="$bvModal.show('five')" v-if="!recipient" >
              Connect Wallet
            </button>
          </div>
         

          <button class="btn-green d-block font-weight-bolder" @click="claim" v-if="recipient && !claimed" >
            

            <BSpinner v-if="loading" class="mr-2" small type="grow"
              >loading
            </BSpinner>
            {{ loading ? "Loading" : " Claim" }}


          </button>

          <NuxtLink :to="`/forest/${recipient}`" v-if="recipient && claimed">
            <button class="btn-green d-block font-weight-bolder"  >
              My Forest
            </button>
          </NuxtLink>
          


          <div v-if="box.treeIds && box.treeIds.length > 0" class="col-12 mb-3 p-0">
            <div
              v-for="treeId in box.treeIds"
              :id="treeId"
              :key="treeId"
              class="d-inline-block pointer-event"
            >
              <NuxtLink :to="`/tree/${treeId}`">
                <span
                  v-b-tooltip.top
                  :tabindex="treeId"
                  :title="treeId"
                  class="border-0 text-center"
                >
                  
                  <img
                    width="48px"
                    src="~/assets/images/myforest/trees.png"
                    :alt="treeId"
                    class="m-2"
                  />

                  <span class="param-xs tr-gray-tree">
                    #{{ treeId }}
                  </span>
                </span>
                
              </NuxtLink>
            </div>
          </div>


        </div>

        <div class="col-12 text-center" v-else>
          <img src="~assets/images/treebox/tree.png" alt="tree" />
          <h4 class="title-sm tr-gry-two">TreeBox is already Claimed!</h4>
          
          <NuxtLink :to="`/forest/checkout`">
            <button class="btn-green d-block font-weight-bolder" >
              Plant Trees
            </button>
          </NuxtLink>
              
        </div>


      </div>
    </div>
  </section>
</template>

<script>

export default {
  layout: "default",
  name: "TreeboxClaim",
  data() {
    return {
      account: null,
      recipient: null,
      box: null,
      zeroAddress: process.env.zeroAddress,
      loading: false,
      claimed: false
    };
  },
  async created() {

    this.recipient = this.$cookies.get('account')

    if (process.client) {

      console.log(this.$route.params, "this.$route.params")
      console.log(this.$route, "this.$route")
      this.account = await this.$web3.eth.accounts.privateKeyToAccount(this.$route.query.privateKey);

      console.log(this.account, "this.account")

      await this.getBox();

      console.log(this.box, "this.box")
      console.log(this.box.ipfsHash, "this.box.ipfsHash")

      await this.getBoxTreeIds();

      console.log(this.box, "this.box getBoxTreeIds")

      await this.getIPFSData();

      console.log(this.box, "this.box getIPFSData")

      this.$forceUpdate();

    }

  },
  methods: {

    async getBox() {
      this.box = await this.$store.dispatch("treebox/getBox", {
        recipient: this.account.address
      });
    },

    async getBoxTreeIds() {
      this.box.treeIds = await this.$store.dispatch("treebox/getBoxTreeIds", {
        recipient: this.account.address
      });
    },

    async getIPFSData() {

      if(this.box.ipfsHash.length <=0 || this.box.ipfsHash == null) {
        return;
      }

      let self = this

      await this.$axios.$get(`${process.env.ipfsGetUrl}${this.box.ipfsHash}`)
        .then(function (response) {
          console.log(response, "response")
          self.box.message = response.message
        })
        .catch(function (error) {
          console.log(error, "error")
        });

      
    },

    async claim() {
      this.loading = true;

      if ((await this.checkNetwork()) === false) {
        this.loading = false;
        return;
      }

      if(this.recipient == null || this.recipient.length <= 0) {
        this.$bvToast.toast(["recipient address is required"],
          {
            toaster: "b-toaster-bottom-left",
            title: "Recipient required",
            variant: "danger",
            noAutoHide: true,
          }
        );

        this.loading = false;
        return;
      }


      try {
        this.recipient = this.$web3.utils.toChecksumAddress(this.recipient)
      } catch(e) { 
        console.error('invalid recipient address', e.message) 

        this.$bvToast.toast(["Please enter valid recipient address"],
          {
            toaster: "b-toaster-bottom-left",
            title: "Invalid recipient address",
            variant: "danger",
            noAutoHide: true,
          }
        );

        this.loading = false;
        return;
      }


      if(this.recipient.toLowerCase() == this.account.address.toLowerCase()) {
        this.$bvToast.toast(["Recipient can't equal treebox recipient address: " + this.recipient],
          {
            toaster: "b-toaster-bottom-left",
            title: "Recipient invalid",
            variant: "danger",
            noAutoHide: true,
          }
        );

        this.loading = false;
        return;
      }


      if (
        !confirm(
          "Do you want to claim TreeBox for " + this.recipient + "?"
        )
      ) {
        this.loading = false;
        return;
      }


      console.log(this.account, "this.account")

      const res = await this.$store.dispatch(
        "treebox/claim",
        {
          account: this.account,
          recipient: this.recipient,
        }
      );
      if (res !== null) {

          console.log(res, "res res res")


        this.$bvToast.toast(["Your forest got bigger. Page will redirect to your forest after 20 seconds."], {
          toaster: "b-toaster-bottom-left",
          title: "Claim successful",
          variant: "success",
          href: `${process.env.etherScanUrl}/tx/${res.transactionHash}`,
          noAutoHide: true
        });
        this.claimed = true;
        this.loading = false;
        await new Promise(r => setTimeout(r, 20000));
        
        this.$router.push(`/forest/${this.recipient}`);
      }
      this.loading = false;


    },
    async checkNetwork() {
      let connectedNetwrokID = await this.$web3.eth.net
        .getId()
        .then((networkId) => {
          return networkId;
        })
        .catch((err) => {
          console.log(err.message, "error checkNetwork");
          return 0;
        });

      if (connectedNetwrokID == process.env.networkId) {
        return true;
      }

      this.$bvToast.toast(
        [
          "Please connect to " +
            process.env.networkName.toUpperCase() +
            " Network!",
        ],
        {
          toaster: "b-toaster-bottom-left",
          title: "Wrong network",
          variant: "danger",
          noAutoHide: true,
        }
      );
      return false;
    },
  }
};
</script>
<style lang="scss" scoped >
.claim-treebox {
  img {
    margin-top: 96px;
  }
  h4 {
    margin-top: 32px;
  }
  p {
    background: rgba(208, 169, 69, 0.25);
    border-radius: 12px;
    margin-top: 32px;
    padding: 13px 10px;
  }
  .btn-green {
    margin: 48px auto;
    width: 176px;
    height: 48px;
    filter: drop-shadow(0px 4px 11px rgba(0, 0, 0, 0.161));
  }
  .btn-gray {
    margin: 24px auto;
    width: 176px;
    height: 48px;
    background: #757575;
    color: white;

    filter: drop-shadow(0px 4px 11px rgba(0, 0, 0, 0.161));
  }
}
</style>
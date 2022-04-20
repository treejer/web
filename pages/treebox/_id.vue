<template>
  <section class="position-relative pt-5 col-12 claim-treebox mb-5 pb-5">
    <div class="container-fluid">
      <div class="row justify-content-center" v-if="box && boxLoaded">
        <div
          class="col-12 text-center"
          v-if="box.sender && box.sender !== zeroAddress"
        >
          <img src="~assets/images/treebox/tree.png" alt="tree" />
          <h4 class="title-sm tr-gry-two" v-if="box.treeIds && box.treeIds.length > 1">{{ box.treeIds.length }} trees are planted for you!</h4>
          <h4 class="title-sm tr-gry-two" v-else>A tree is planted for you!</h4>
          <p
            v-if="box.message && box.message.length > 2"
            class="
              box-message
              param-md
              tr-gary-three
              col-md-6
              offset-md-3
              font-weight-bolder
            "
          >
            {{ box.message }}
          </p>

          <div
            v-if="box.treeIds && box.treeIds.length > 0"
            class="col-12 mb-3 p-0"
          >
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

                  <p class="param-xs tr-gray-two font-weight-bolder">
                    #{{ treeId }}
                  </p>
                </span>
              </NuxtLink>
            </div>
          </div>

          <div class="mt-1">
            <p class="tr-gray-two">{{$t('treebox.recipientsethereum')}}</p>
            <input
              type="text"
              class="border col-md-6 col-12"
              style="background-color: #f5f5f5"
              v-model="recipient"
              :placeholder="$t('treebox.ethereumaddress')"
            />
            <button
              class="btn-green d-block font-weight-bolder"
              @click="$bvModal.show('five')"
              v-if="!recipient"
            >
             {{$t('treebox.logintoclaim')}}
            </button>
          </div>

          <button
            class="btn-green d-block font-weight-bolder"
            @click="claim"
            v-if="recipient && !claimed"
          >
            <BSpinner v-if="loading" class="mr-2" small type="grow"
              >loading
            </BSpinner>
            {{ loading ?$t('aboutus.loading') : $t('treebox.claim') }}
          </button>

          <NuxtLink :to="`/forest/${recipient}`" v-if="recipient && claimed">
            <button class="btn-green d-block font-weight-bolder">
              {{$t('treebox.forest')}}
            </button>
          </NuxtLink>

          
        </div>

        <div class="col-12 text-center" v-else>
          <img src="~assets/images/treebox/tree.png" style="filter: grayscale(100%)" alt="tree" />
          <h4 class="title-sm tr-gry-two">{{$t('treebox.thistreeBoxisemptynow')}}</h4>

          <NuxtLink :to="`/forest/checkout`">
            <button class="btn-green d-block font-weight-bolder">
              {{$t('treebox.planttrees')}}
            </button>
          </NuxtLink>
        </div>
      </div>

      <div class="row justify-content-center" v-else>
        <div
        v-if="boxLoaded"
          class="col-12 text-center"
        >
          <img src="~assets/images/treebox/tree.png" alt="tree" />
          <h4 class="title-sm tr-gry-two"> {{$t('treebox.boxnotfound')}}</h4>
          <p
            class="
              box-message
              param-md
              tr-gary-three
              col-md-6
              offset-md-3
              font-weight-bolder
            "
          >
            {{$t('treebox.thebox')}}
          </p>

          <NuxtLink :to="`/forest/checkout`">
            <button class="btn-green d-block font-weight-bolder">
             {{$t('treebox.planttrees')}}
            </button>
          </NuxtLink>


        </div>


        <div
          v-else
          class="col-12 text-center"
        >
          <img src="~assets/images/treebox/tree.png" alt="tree" />
          <h4 class="title-sm tr-gry-two"> {{$t('treebox.loadingtreeBox')}}</h4>
          <p
            class="
              box-message
              param-md
              tr-gary-three
              col-md-6
              offset-md-3
              font-weight-bolder
            "
          >
           {{$t('treebox.loadingtreeBox')}}...
          </p>

          <BSpinner class="mr-2" small type="grow"
              >loading
          </BSpinner>


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
      baseUrl: process.env.baseUrl,

      meta: {
        title: 'Treejer | Claim TreeBox',
        description: "Claim your TreeBox"
      },

      account: null,
      recipient: null,
      box: null,
      zeroAddress: process.env.zeroAddress,
      loading: false,
      claimed: false,
      boxLoaded: false,
    };
  },
    head() {

    return {
      title: this.meta.title,
      meta: [
        {hid: 'description', name: 'description', content: this.meta.description},
        {hid: 'keywords', name: 'keywords', content: 'treejer,tree,NFTTree,treeNFT,treebox, claim treebox'},

        {hid: 'og:title', property: 'og:title', content: this.meta.title},
        {hid: 'og:description', property: 'og:description', content: this.meta.description},
        {hid: 'og:url', property: 'og:url', content: this.baseUrl + '/tree/' + this.$route.params.id},
        {hid: 'og:image', property: 'og:image', content: this.baseUrl + '/featureImage/jake-hills.jpg'},

        {hid: 'twitter:title', property: 'twitter:title', content: this.meta.title},
      ]


    };
  },

  async created() {
    
    this.recipient = this.$cookies.get("account");

    if (process.client) {
      

      try {
        this.account = await this.$web3.eth.accounts.privateKeyToAccount(
          this.$route.query.privateKey
        );

        await this.getBox();

        if(this.box)  {
          this.boxLoaded = true;
          await this.getBoxTreeIds();
          await this.getIPFSData();
        } else {
          this.boxLoaded = true;
        }
      } catch(e) {
        console.log(e, "error created");
        this.boxLoaded = true;
      }
    }

    this.$forceUpdate();
  },
  methods: {
    async getBox() {
      this.box = await this.$store.dispatch("treebox/getBox", {
        recipient: this.account.address,
      });
    },

    async getBoxTreeIds() {
      
      if(this.$route.query.treeIds && this.$route.query.treeIds.length > 0) {
        this.box.treeIds = this.$route.query.treeIds.split("-");

      } else {
        
        if(this.box) {
          this.box.treeIds = await this.$store.dispatch("treebox/getBoxTreeIds", {
            recipient: this.account.address,
          });
        }
      }
    },

    async getIPFSData() {
      if (this.box.ipfsHash.length <= 0 || this.box.ipfsHash == null) {
        return;
      }

      let self = this;

      await this.$axios
        .$get(`${process.env.ipfsGetUrl}${this.box.ipfsHash}`)
        .then(function (response) {
          self.box.message = response.message;
        })
        .catch(function (error) {
          console.log(error, "error");
        });
    },

    async claim() {
      this.loading = true;

      if ((await this.checkNetwork()) === false) {
        this.loading = false;
        return;
      }

      if (this.recipient == null || this.recipient.length <= 0) {
        this.$bvToast.toast(this.$t('alert.recipientaddressisrequired'), {
          toaster: "b-toaster-bottom-left",
          title:this.$t('alert.recipientrequired'),
          variant: "danger",
          noAutoHide: true,
        });

        this.loading = false;
        return;
      }

      try {
        this.recipient = this.$web3.utils.toChecksumAddress(this.recipient);
      } catch (e) {
        console.error("invalid recipient address", e.message);

        this.$bvToast.toast(this.$t('alert.validrecipientaddress'), {
          toaster: "b-toaster-bottom-left",
         
          variant: "danger",
          noAutoHide: true,
        });

        this.loading = false;
        return;
      }

      if (this.recipient.toLowerCase() == this.account.address.toLowerCase()) {
        this.$bvToast.toast(
          [
           this.$t('alert.recipient') +
              this.recipient,
          ],
          {
            toaster: "b-toaster-bottom-left",
            title: this.$t('alert.recipientinvalid') ,
            variant: "danger",
            noAutoHide: true,
          }
        );

        this.loading = false;
        return;
      }

      if (
        !confirm(this.$t('alert.Do you want to claim') + this.recipient + "?")
      ) {
        this.loading = false;
        return;
      }

      const res = await this.$store.dispatch("treebox/claim", {
        account: this.account,
        recipient: this.recipient,
      });
      if (res !== null) {

        this.$bvToast.toast(
          [
            this.$t('alert.recipient'),
          ],
          {
            toaster: "b-toaster-bottom-left",
            title: "Claim successful",
            variant: this.$t('alert.claimsuccessful'),
            href: `${process.env.etherScanUrl}/tx/${res.transactionHash}`,
            noAutoHide: true,
          }
        );
        this.claimed = true;
        this.loading = false;
        await new Promise((r) => setTimeout(r, 20000));

        this.$router.push(this.localePath(`/forest/${this.recipient}`));
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
          this.$t('alert.pleaseconnect') +
            process.env.networkName.toUpperCase() +
            this.$t('alert.network'),
        ],
        {
          toaster: "b-toaster-bottom-left",
          title:  this.$t('alert.wrongnetwork'),
          variant: "danger",
          noAutoHide: true,
        }
      );
      return false;
    },
  },
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
  .box-message {
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

  input {
    background: #e5e7db;
    border: 0;
    padding: 5px 15px;
    border-radius: 6px;

  }
}
</style>
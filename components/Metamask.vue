<template>
  <b-navbar-nav>
    <b-nav-form v-if="!isLoggedIn">
      <b-button
        @click.prevent="log()"
        class="connect-button m-auto"
        type="submit"
      >Connect Wallet
      </b-button
      >
      <img
        alt="tree"
        name="tree"
        src="/tree.svg"
        class="img-fluid tree pointer-event"
      />
    </b-nav-form>
    <b-nav-form v-if="isLoggedIn">
      <!--              <b-button-->
      <!--                @click.prevent="logout"-->
      <!--                class="connect-buttons m-auto"-->
      <!--                type="submit"-->
      <!--              >{{ account }}-->
      <!--              </b-button-->
      <div class="accounting-card d-flex align-items-center align-self-center pointer-event" @click="logout" >
        <span class="param-sm tr-gray-three">{{account}}</span>
        <span class="img"><img src="../assets/images/home/accounting.png" alt="accounting" class="img-fluid" width="42" height="42" /></span>
      </div>
      <img
        alt="tree"
        name="tree"
        src="/tree.svg"
        class="img-fluid tree pointer-event"
      />
    </b-nav-form>
    <Loading :trLoading="trLoading" />


    <!-- Using 'button-content' slot -->
  </b-navbar-nav>
</template>

<script>
  import Loading from '../components/treejerLoading'

  export default {
    components:{Loading},
    data() {
      return {
        account: null,
        isLoggedIn: false,
        trLoading:false


      };
    },
    created() {
    },
    methods: {
      log() {
        if (typeof window.ethereum !== 'undefined') {
          console.log('MetaMask is installed!');
          this.isLoggedIn = true
          this.getAccount();


          const ethereumButton = document.querySelector('.connect-button');
          let self = this;

          ethereumButton.addEventListener('click', () => {
            ethereum.enable();
            //Will Start the metamask extension
            self.isLoggedIn = true
          });
        } else {
          this.makeToast('danger')
        }

      },
      async getAccount() {
        const accounts = await ethereum.enable();
        console.log(accounts)

        const account = accounts[0];
        this.account = account.slice(0,10);
      },
      makeToast(variant = null) {
        this.$bvToast.toast('install metamask from here', {
          title: `https://metamask.io/' ${variant || 'default'}`,
          href: 'https://metamask.io/',
          variant: variant,
          solid: true
        })
      },
    }
  };
</script>

<style scoped></style>

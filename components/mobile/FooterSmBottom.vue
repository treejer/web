<template>
  <footer class="footer-sm-bottom footer w-100"
          :class="$store.state.hasMobileProfile ? 'has-sidebar' : ''">
    <ul class="nav-tabs  d-flex justify-content-around mb-0 align-items-center h-100">
      <li class="custom-link list-style-none" @click="show =!show">
        <img v-show="show" src="../../assets/images/mobile/open.svg" class="img-fluid" alt="">
        <img v-show="!show" class="not-show" src="../../assets/images/mobile/exit.svg" alt="">

      </li>
      <li class="list-style-none border-show tr-gray-three param-md" v-show="!show">
        <span class="gift pointer-event"> <img class="pr-1 d-block" src="../../assets/images/mobile/gift.svg" alt=""><span>Gift</span></span>
        <span class="plant pointer-event" @click="goToAddTree"> <img class="pr-1 d-block" src="../../assets/images/mobile/plant.svg"
                                  alt=""><span>Plant</span></span>
        <span class="redeem pointer-event"> <img class="pl-3 d-block" src="../../assets/images/mobile/redeem.svg"
                                  alt=""><span>Redeem</span></span>
      </li>
      <li class="pointer-event list-style-none" v-for="(item,index) in navItemsFooter" :id="index "
          @click="goToNavs(index)">
        <img :src="item.src" :alt="item.name">
      </li>
    </ul>
  </footer>
</template>

<script>
export default {
  name: "SidebarSm",
  data() {
    return {
      show: true,
      hasProfileSidebar: false,
      navItemsFooter: [
        {
          name: 'profile',
          src: require('~/assets/images/mobile/footer/profile.svg'),
          href: '',
          target: ''
        },
        {
          name: 'search',
          src: require('~/assets/images/mobile/footer/search.svg'),
          href: '',
          target: ''
        },
        {
          name: 'search',
          src: require('~/assets/images/mobile/footer/forest.svg'),
          href: '',
          target: ''
        },
        {
          name: 'shop',
          src: require('~/assets/images/mobile/footer/shop.svg'),
          href: '',
          target: ''
        },
      ]
    }
  },
  methods: {
    goToNavs(index) {
      if (index === 0) {
        this.openSidebar()
      }
      if (index === 1){
        this.goToFindTree()
      }
      if (index === 2){
        this.goToAddTree()
      }
      if (index === 3){
        this.mintO1()
      }

    },
    goToAddTree(){
      this.$router.push('/forest/addTree')
    },
    openSidebar() {

      this.hasProfileSidebar = !this.hasProfileSidebar
      this.$store.commit('OPEN_PROFILE', this.hasProfileSidebar)
    },
    goToFindTree(){
        this.$router.push('/find/')
    },
    async mintO1() {
      let self = this
      if (!self.$cookies.get('account')) {
        self.$bvToast.show('four')
      } else {

        await this.$store.dispatch('o1Factory/mint').then(()=>{
          responsiveVoice.speak("Tokens transferred to wallet");

          self.$bvToast.toast(['Your transfer was successful'], {
            toaster: 'b-toaster-bottom-left',
            title: 'Tokens transferred to wallet',
            variant: 'success',
            href:`https://ropsten.etherscan.io/address/${self.$cookies.get('account')}`,
          })

        })
      }
    },
  }
}
</script>

<style scoped lang="scss">
.footer-sm-bottom {
  position: fixed;
  height: 56px;
  z-index: +9999;

  bottom: 0;
  background: #FAF8F1;
  box-shadow: 0px -2px 7px rgba(0, 0, 0, 0.11);

  .gift {
    position: absolute;
    left: 27px;
    top: 70px;
  }
  .redeem{
    position: absolute;
    right: 7px;
    top: 70px;
    span:last-child{
      padding-right: 15px;
    }
  }

  .plant {
    position: absolute;
    top: 22px;
    left: 80px;
  }

  .border-show {
    width: 200px;
    height: 244px;
    position: absolute;
    z-index: -1;
    background: #FAF8F1;
    top: -100px;
    border-radius: 60%;
    transition: all ease .3s;

  }

  .custom-link {
    background-image: url("../../assets/images/mobile/mbile-add-tree.svg");
    position: absolute;
    top: -40px;
    right: calc(50% - 25px);
    width: 70px;
    background-size: cover;
    height: 70px;

    img {
      width: 50%;
      margin-left: 18px;
      margin-top: 16px;
    }

    img.not-show {
      width: 40%;
      margin-left: 22px;
      margin-top: 23px;
    }

  }
}

.footer-sm-bottom.has-sidebar {
  border-radius: 0px 32px;

}
</style>

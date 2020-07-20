<template>
  <div class="landing-footer position-relative">
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <nuxt-link class="btn-green position-relative d-block param text-white " to="/myForest">Plant a Tree
          </nuxt-link>
          <ul class="p-0 nav">
            <li class="square" v-for="(item ,index) in listOne" :key="index">
              <nuxt-link v-if="!item.tab" class="text-left nav-item  param tr-gray-two " :to="item.href">{{item.name}}
              </nuxt-link>
              <a v-if="item.tab" class="text-left nav-item  param tr-gray-two " target="_blank" :href="item.href">{{item.name}}</a>
            </li>
          </ul>
        </div>
        <div class="col-md-3">
          <ul class="p-0">
            <li class="square mt-md-2" v-for="(item ,index) in listTwo" :key="index">
              <nuxt-link v-if="!item.tab" class="text-left nav-item  param tr-gray-two " :to="item.href">{{item.name}}
              </nuxt-link>
              <a v-if="item.tab" class="text-left nav-item  param tr-gray-two " target="_blank" :href="item.href">{{item.name}}</a>

            </li>
          </ul>
        </div>
        <div class="col-md-3">
          <ul class="p-0">
            <li class="square mt-md-2 " v-for="(item ,index) in listThree" :key="index">
              <nuxt-link v-if="!item.tab" class="text-left nav-item  param tr-gray-two " :to="item.href">{{item.name}}
              </nuxt-link>
              <a v-if="item.tab" class="text-left nav-item  param tr-gray-two " target="_blank" :href="item.href">{{item.name}}</a>

            </li>
          </ul>
        </div>
        <div class="col-md-3 p-0">
          <div class="logo">
            <nuxt-link to="/" class="position-relative ">
              <img src="../assets/images/landing-footer/logo.png" class="img-fluid pointer-event" alt="treejer">
            </nuxt-link>
            <p class="param tr-gray-two mt-3 ">Treejer is a blockchain-based reforestation platform providing
              incentives for
              businesses and individuals to stop Climate Change with the help of local communities.
            </p>
          </div>
          <Socials />
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import Socials from "./Socials";
  export default {
    name: "LandingFooter",
    components: {Socials},
    data() {
      return {
        listOne: [
          {name: 'Explore Forests', href: '/myForest'},
          {name: 'Find My Tree', href: '/find'},
          {name: 'Redeem Trees', href: '#'},
          {name: 'Start a Green Block', href: '#'},
        ],
        listTwo: [
          {name: 'Home', href: '/'},
          {name: 'Blog', href: 'https://blog.treejer.com/', tab: '_blank'},
          {name: 'About', href: '/about'},
          {name: 'For Business', href: '/business'},
          {name: 'Contact', href: '/contact'},
        ],
        listThree: [
          {name: 'Whitepaper', href: 'https://www.docdroid.net/4qSa3mr/treeboxcatalog-pdf', tab: '_blank'},
          {name: 'Community', href: '#', tab: '_blank'},
          {name: 'Volunteers', href: '#'},
          {name: 'Rural Ambassadors', href: '#'},
          {name: 'worldtr.ee', href: '#'},
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .landing-footer {
    ul {

      li {
        margin: 15px 0;
        display: block;
        width: 100%;

        a {
          transition: all ease-in .2s;

        }

        a:hover {
          text-decoration: none;
          color: #67b68c;
        }
      }
    }

    a.text-white {
      text-decoration: none;
      padding: 10px 28px;
      color: white;
      width: max-content;



    }

    a:hover {
      color: white;
    }

    background: #E5E7DB;
    padding: 84px 65px 84px 150px;

  }
</style>

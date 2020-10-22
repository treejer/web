<template>
  <div class="container-fluid forest-type">
    <div class="row">
      <div class="col-12">
        <ul class="nav-item d-flex justify-content-center">
          <li class="list-style-none mr-2" v-for="(item,index) in types">
            <button
              :class="index === activeIndex ? 'active':'not-active'"
              class="btn-gray btn param-18" @click="activeIndexs(index)">{{ item.text }}
            </button>
          </li>
        </ul>
      </div>
    </div>
    <div class="row justify-content-center text-center">
      <div class="col-12 col-md-4 type-cards" v-for="(item,index) in cards">
        <div class="box-type-img">
          <img  :src="item.src" :alt="item.name" class="top img-fluid">
        </div>
        <div class="box-title">
          <h3 class="param-18 tr-gray-two">{{item.name}}</h3>
        </div>
        <div class="box-dec">
          <p class="param tr-gray-two">{{item.text}}</p>
        </div>
        <div class="box-learn-more">
          <button class="btn-green text-white" @click="">Learn More</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ForestType",
  data() {
    return {
      types: [
        {text: 'Fund Trees'},
        {text: 'Supply Trees'}
      ],
      cards: [
        {
          src: require('~/assets/images/home/sale.svg'),
          name: 'Personal Forests',
          text: 'Your personal forest is a few clicks away. Adopt a tree and track it as it grows. Local communities plant it for you and get rewards after updating tree status.',
        },
        {
          src: require('~/assets/images/home/sale.svg'),
          name: 'Business Forests',
          text: 'They’ve even more features to empower your business. Start a green marketing campaign by distributing redeemable trees. Plant trees for your customers!',
        },
        {
          src: require('~/assets/images/home/sale.svg'),
          name: 'Public Forests',
          text: 'Public forests have no owners. Anyone can create a public forest and invite others to add trees. See the one we created to reduce Ethereum’s CO2 footprint.',
        }
      ],
      activeIndex: 0,

    }
  },
  methods: {
    activeIndexs(index) {
      this.activeIndex = index
    }
  }
}
</script>

<style scoped lang="scss">
.forest-type {
  margin-top: 132px;

  .nav-item {
    button.param-18 {
      border-radius: 20px;
      color: #FAFAFA;
      padding: 4px 35px;
      margin-right: 32px;
    }

    button.not-active {
      background: #BDBDBD;
      transition: ease all .3s;
    }

    button.active {
      background: #757575;
      transition: ease all .3s;

    }
  }
  .type-cards{
    margin-top: 66px;
    .box-type-img img{
      background: #FFFFFF;
      box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
      border-radius: 12px;
      width: auto;
      padding: 16px;

    }
    .box-title,.box-dec{
      margin-top: 32px;
    }
    .box-dec{
      padding: 0 45px;
    }
    .box-learn-more{
      margin-top: 36px;
      button{
        padding: 4px 24px;
      }
    }
  }


}
</style>

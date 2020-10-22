<template>
  <div class="container-fluid portocol ">
    <div class="row">
      <div class="col-12">
        <div class="box-portocol">
          <h3 class="text-center title-sm tr-gray-two">An Open Protocol for Smarter Climate Action</h3>
          <div class="row justify-content-center pointer-event  text-center">
            <div  v-for="(item,index) in portocolsOne" class="col-md-12 col-lg-3 col-12 d-flex flex-column justify-content-around ">
              <img class="img-fluid m-auto" :src="item.src" :alt="item.text" :name="item.name"/>
              <p class="param-18 tr-gray-two text-center">{{ item.text }}</p>
            </div>
            <div  v-for="(item,index) in portocolsTwo" class="pointer-event col-md-12 col-lg-3 col-12 d-flex flex-column justify-content-around part-two ">
              <img class="img-fluid m-auto" :src="item.src" :alt="item.text" :name="item.name"/>
              <p class="param-18 tr-gray-two text-center">{{ item.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Portocol",
  data() {
    return {
      portocolsOne: [
        {name: 'tree', src: require('~/assets/images/home/tree.svg'), text: 'Fund Trees'},
        {name: 'trees', src: require('~/assets/images/home/trees.svg'), text: 'Locate Trees'},
        {name: 'track', src: require('~/assets/images/home/track.svg'), text: 'Track Growth'},
        {name: 'sale', src: require('~/assets/images/home/sale.svg'), text: 'Earn Credits'},
      ],
      portocolsTwo: [
        {name: 'tree', src: require('~/assets/images/home/tree.svg'), text: 'Track Money'},
        {name: 'trees', src: require('~/assets/images/home/trees.svg'), text: 'Measure Impact'},
        {name: 'track', src: require('~/assets/images/home/track.svg'), text: 'Pay Bankless'},
        {name: 'sale', src: require('~/assets/images/home/sale.svg'), text: 'Claim Trees'},
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.portocol {
  margin-top: 84px;

  .box-portocol {
    min-height: 547px;
    background: #FFFFFF;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    padding: 60px 118px 90px;
    .part-two{
      margin-top: 71px;
    }
    .pointer-event img{
      transition: ease all .1s;
    }
    .pointer-event img:hover{
      transform: scale(1.1);
      opacity: .8;
    }

    > .row {
      margin-top: 75px;
    }

    h3 {
      font-style: normal;
      font-weight: 600;
      text-align: center;

    }

    img[name='tree'] {
      width: 42.22px;
      height: 58px;
    }

    img[name='trees'] {
      width: 55.41px;
      height: 49.49px;
    }
    //img[name='track']{
    //  width: 68px;
    //  height: 68px;
    //}
  }
}
</style>

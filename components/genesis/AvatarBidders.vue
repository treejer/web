<template>
  <div>
    <img
      v-for="(item,index) in localData" :key="index"
      :name="item.id"
      :src="`${icon}${Math.floor(Math.random()*1000)}?d=robohash`" alt="avatar" class="pointer-event bidders mb-2 " height="48" width="48"/>
  </div>


</template>

<script>
export default {
  data() {
    return {
      localData: this.data,
      icon:`${process.env.gravatar}205e460b479e2e5b48aec07`
    }
  },
  props: {
    src: {
      default: require("~/assets/images/myforest/avatar.png"),
      type: String,
    },
    data: {
      type: Array,
      default: []
    }
  },
  async created(){
    console.log(this.localData,"local data is here")
  }

};
</script>

<style lang='scss'>
.bidders {
  margin-right: 19px;

  &:hover {

  }
}
</style>

<template>
  <ul class="d-flex  list-style-none justify-content-between align-items-center">
    <li v-for="(item,index) in socials" :key="index" class="pointer-event" @click.prevent="goToSocials(item.href,'_blank')">
      <img :src="item.src" :alt="item.name" >
    </li>
  </ul>
</template>

<script>
  import Fab from '@/components/font-awsome/Fab.vue'

  export default {
    name: "Socials",
    data(){
      return{
        socials: [
          {src: require('~/assets/images/landing-footer/instagram.svg'), name: 'instagram',href:'https://www.instagram.com/treejer'},
          {src: require('~/assets/images/landing-footer/twitter.svg'), name: 'twitter',href:'https://twitter.com/Treejertalks'},
          {src: require('~/assets/images/landing-footer/linkdin.svg'), name: 'linkdin',href:'https://www.linkedin.com/company/treejer'},
          {src: require('~/assets/images/landing-footer/telegram.svg'), name: 'telegram',href:'https://discuss.treejer.com/'},
          {src: require('~/assets/images/landing-footer/facebook.svg'), name: 'facebook',href:'https://www.facebook.com/treejertalks'},
          {src: require('~/assets/images/landing-footer/medium.svg'), name: 'medium',href:'https://discuss.treejer.com/'},
          {src: require('~/assets/images/landing-footer/git.svg'), name: 'git',href:'https://github.com/treejer'},
        ]
      }
    },
    components: {
      Fab
    },
    methods:{
      goToSocials(item,target){
        if(process.client){
          window.open(item,target)
        }
      }
    }
  }
</script>

<style  lang="scss">

</style>

<template>
  <ul class="d-flex  list-style-none justify-content-between align-items-center socials-footer">
    <li v-for="(item,index) in socials" :key="index" class="pointer-event" @click.prevent="goToSocials(item.href,'_blank')">
      <img :src="item.src" :alt="item.name" width="23" >
    </li>
  </ul>
</template>

<script>

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
          {src: require('~/assets/images/landing-footer/discord.svg'), name: 'discord',href:'https://discord.com/channels/724233705148645386/827735114783391785'},
        ]
      }
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
.socials-footer{
  img{
    &:hover{
      opacity:.5;
      transition: all .2s ease-in-out;
    }
  }
  img[alt='discord']{
    border-radius: 50%;
    padding: 2px;
    border: solid 1px #828281;
  }
}
</style>

<template>
  <div class="arrow" :style="{top:localTop}">
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<script>
    export default {
      name: "Arrow",
      props: {
        top: {
          type: String,
          default: '75%'
        }
      },
      data(){
        return{
          localTop:this.top,

        }
      }
    }
</script>

<style lang="scss" scoped>
  .arrow{
    position: absolute;
    top: 75%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .arrow span{
    display: block;
    width: 16px;
    height: 16px;
    border-bottom: 3px solid #67B68C;
    border-right: 3px solid #67B68C;
    transform: rotate(45deg);
    margin: -10px;
    animation: animate 2s infinite;
  }
  .arrow span:nth-child(2){
    animation-delay: -0.2s;
  }
  .arrow span:nth-child(3){
    animation-delay: -0.4s;
  }
  @keyframes animate {
    0%{
      opacity: 0;
      transform: rotate(45deg) translate(-20px,-20px);
    }
    50%{
      opacity: 1;
    }
    100%{
      opacity: 0;
      transform: rotate(45deg) translate(20px,20px);
    }
  }
</style>

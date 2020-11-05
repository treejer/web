<template>
<!--  <img src="../assets/images/myforest/avatar.png"-->
</template>

<script>

export default {
  name: "ProfilePicture",
  data() {
    return {
      apiAvatar:''
    }
  },
  computed: {
    avatar() {
      if (!window.ethereum) {
        return '../assets/images/myforest/avatar.png'
      }
      if (this.$cookies.get('account')) {
        return ''
      }
    }
  },
  props: {
    width: {
      default: '40px',
      type: String
    },
    display: {
      default: 'inline-block',
      type: String
    },
    height: {
      default: '40px',
      type: String
    },
    border: {
      default: '2px solid #FFFFFF',
      type: String
    }
  }
}
</script>

<style scoped lang="scss">

</style>

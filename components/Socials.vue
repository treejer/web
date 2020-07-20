<template>
  <b-nav class="justify-content-end  social">
    <b-nav-item
      href="https://www.instagram.com/treejer"
      rel="noopener noreferrer"
      target="_blank">

      <Fab i="instagram"/>
    </b-nav-item>
    <b-nav-item
      href="http://t.me/treejer"
      rel="noopener noreferrer"
      target="_blank"
    >
      <Fab i="telegram"/>
    </b-nav-item>
    <b-nav-item
      href="https://twitter.com/Treejertalks"
      rel="noopener noreferrer"
      target="_blank"
    >
      <Fab i="twitter"/>
    </b-nav-item>
    <b-nav-item
      href="https://www.linkedin.com/company/treejer"
      rel="noopener noreferrer"
      target="_blank"
    >
      <Fab i="linkedin-in"/>
    </b-nav-item>
    <b-nav-item
      href="https://www.facebook.com/treejertalks"
      rel="noopener noreferrer"
      target="_blank"
    >
      <Fab i="facebook"/>
    </b-nav-item>
  </b-nav>
</template>

<script>
  import Fab from '@/components/font-awsome/Fab.vue'

  export default {
    name: "Socials",
    components: {
      Fab
    }
  }
</script>

<style scoped lang="scss">

</style>

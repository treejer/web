<template>
  <div class="footer ">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-12 menu">
          <b-nav>
            <b-nav-item :to="localePath('index')">Home</b-nav-item>
            <b-nav-item target="_blank"  href="https://blog.treejer.com/">Blog</b-nav-item>
<!--            <b-nav-item :to="localePath('forBusiness')">For Business</b-nav-item>-->
            <b-nav-item :to="localePath('about')">About</b-nav-item>
            <b-nav-item :to="localePath('contactUs')">Contact</b-nav-item>
          </b-nav>
        </div>
        <div class="col-lg-4 col-12 pt-2">

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

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Fab from '@/components/font-awsome/Fab.vue'

  export default {
    name: "Footer",
    components: {Fab}
  }
</script>

<style lang="scss" scoped>
  .footer {
    width: 100%;
    height: 48px;
    background-color: #e5e7db;
    bottom: 0;
    overflow-y: hidden;
    position: relative;
    ul{
      height: 100%;

    }

    .menu {

      .nav-item {
        position: relative;
        text-align: center;
        margin: auto;



        .nav-link {
          font-size: 14px;
          font-weight: 500;
          font-stretch: normal;
          font-style: normal;
          line-height: 1.29;
          letter-spacing: normal;
          color: #424242;

        }
      }


    }

  }
  @media (max-width: 768px) {
    .footer{
      position: relative;
      height: auto;
       .menu .nav-item .nav-link {
        font-size: 10px;
      }
     .menu .nav-item{
        padding: 3px;
        position: relative;
        text-align: center;
        margin: auto;
      }
      .justify-content-end {
        justify-content: space-between !important;
      }
    }
  }
</style>

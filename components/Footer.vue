<template>
  <div class="footer" style="min-height: 5vh">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-12 menu">
          <b-nav>
            <NuxtLink :to="localePath('/')" class="nav-item">
              <span class="nav-link">{{$t('header.home')}}</span>
            </NuxtLink>

            <b-nav-item target="_blank" href="https://blog.treejer.com/"
              >{{$t('header.blog')}}</b-nav-item
            >

            <NuxtLink :to="localePath('/Partnerships')" class="nav-item">
              <span class="nav-link">{{$t('header.partnerships')}}</span>
            </NuxtLink>
            <NuxtLink :to="localePath('/About')" class="nav-item">
              <span class="nav-link">{{$t('header.about')}}</span>
            </NuxtLink>
            <NuxtLink :to="localePath('/contact')" class="nav-item">
              <span class="nav-link">{{$t('header.contact')}}</span>
            </NuxtLink>
          </b-nav>
        </div>
        <div class="col-lg-4 col-12">
          <Socials />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Fab from "@/components/font-awsome/Fab.vue";
import Socials from "../components/Socials";

export default {
  name: "Footer",
  components: { Socials, Fab },
};
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
  //height: 48px;
  background-color: #e5e7db;
  overflow-y: hidden;
  position: relative;
  z-index: +999;
  ul {
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

    a {
      transition: all ease-in 0.2s;
      text-align: left;
    }

    a:hover {
      text-decoration: none;
      color: #67b68c;
    }
  }
}
@media (max-width: 768px) {
  .footer {
    position: relative;
    height: auto;
    .menu .nav-item .nav-link {
      font-size: 10px;
    }
    .menu .nav-item {
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

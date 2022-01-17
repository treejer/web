<template>
  <div class="footer" style="min-height: 5vh">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-12 menu">
          <b-nav>
            <NuxtLink to="/" class="nav-item">
              <span class="nav-link">Home</span>
            </NuxtLink>

            <b-nav-item target="_blank" href="https://blog.treejer.com/"
              >Blog</b-nav-item
            >

            <NuxtLink to="/Partnerships" class="nav-item">
              <span class="nav-link">partnerships</span>
            </NuxtLink>
            <NuxtLink to="/About" class="nav-item">
              <span class="nav-link">about</span>
            </NuxtLink>
            <NuxtLink to="/contact" class="nav-item">
              <span class="nav-link">Contact</span>
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

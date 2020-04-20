<template>
    <section :page="$route.name" class="position-relative pt-5 col-md-12 home">
      <div class="container-fluid">
        <div class="row article">
          <div class="col-md-8 col-12">
            <div class="row">
              <div class="col-12 title">
                <h1 class="Montserrat-Bold tr-gray-three font-weight-bold">
                  A more
                    <vue-typer text='affordable Climate Action'></vue-typer>
                  <br> through financial inclusion of the rural communities
                </h1>
              </div>
              <div class="col-12 form-group mt-5">
                <button
                  class="btn-lg btn-green pointer-event param"
                  @click="$router.push('/myForest')"
                >
                  Plant One Tree
                </button>
                <button class="btn-lg btn-outline-green pointer-event param">
                 Find My Tree
                </button>
              </div>
              <div class="col-12 d-flex tr-status mt-3 ">
                <div class="planet-tree pt-2">
                  <p class="param-sm tr-black font-weight-bold Montserrat-Bold">Planted Trees</p>
                  <p class="title-md tr-green font-weight-bolder Montserrat-Bold">159</p>
                </div>
                <div class="rural-communities pt-2">
                  <p class="param-sm tr-black font-weight-bold Montserrat-Bold">
                    Rural Communities
                  </p>
                  <p class="title-md tr-green font-weight-bold Montserrat-Bold">2</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>
<script>

  export default {
    name: "index",
    props: {},
    created() {
    }
  };
</script>

<style lang="scss" scoped >

  .home {
    background-image: url(../assets/images/home/treejerStory.png);
    background-size: contain;
    background-repeat: no-repeat;
    height: 75vh;

    .loading{
      width: 100vw;
      height: 100vh;
      position: fixed;
      display: flex;
      justify-content: center;
      align-items: center;
      align-self: center;
    }

    .planet-tree {
      border-right: solid 1px #67b68c;
      padding: 0 15px;
    }
    .rural-communities {
      padding: 0 15px;
    }

    .banner {
      z-index: +9;
    }

    .title {
      h1 {
        font-size: 28px;
        font-weight: bold;
        line-height: 48px;
        color: #616161;

        span {
          font-size: 28px;
          font-weight: bold;
          color: #5a9d79;
          padding: 0 5px;
        }
      }
    }
  }
  @media (max-width:768px) {
    .home {
      background-image: none;
    }
  }
</style>

<template>
  <section :page="$route.name" class="position-relative pt-5 col-10 home">
    <div class="container-fluid">
      <div class="row article">
        <div class="col-md-8 col-12">
          <div class="row">
            <div class="col-12 title">
              <h1>A more <span class="tr-green">affordable</span>Climate Action through financial inclusion of the rural
                communities
              </h1>
            </div>
            <div class="col-12 form-group mt-5">
              <button class="btn-lg btn-green pointer-event ">Plant One Tree</button>
              <button class="btn-lg btn-outline-green pointer-event">Explore Forests</button>
            </div>
            <div class="col-12 d-flex tr-status mt-3 ">
              <div class="planet-tree pt-2  ">
                <p class="param-sm tr-black font-weight-bold">Planted Trees</p>
                <p class="title-md tr-green font-weight-bolder">159</p>
              </div>
              <div class="rural-communities pt-2">
                <p class="param-sm tr-black font-weight-bold">Rural Communities</p>
                <p class="title-md tr-green font-weight-bolder">2</p>
              </div>
            </div>

          </div>
        </div>
        <img src="../assets/images/home/treejerStory.png" alt="username"
             class="img-fluid banner d-md-block d-none"/>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: "home"
  }
</script>

<style lang="scss">
  .home {
    .planet-tree{
      border-right: solid 1px #67b68c;
      padding: 0 15px;
    }
    .rural-communities{
      padding: 0 15px;
    }

    .banner {
      position: absolute;

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

</style>

<template>
  <div class="container-fluid posts">
    <div class="row">
      <div class="col-md-6 col-12 title">
        <h1 class="title-md ">Read our latest blog posts</h1>
      </div>
      <div class="col-md-6  col-12 arrows">
        <ul class=" d-flex justify-content-end nav-item">
          <li class="list-style-none p-2 pointer-event"><img src="../../assets/images/home/back.svg" alt="back"
                                                             class="img-fluid"></li>
          <li class="list-style-none p-2 pointer-event"><img src="../../assets/images/home/next.svg" alt="next"
                                                             class="img-fluid"></li>
        </ul>
      </div>
    </div>
    <div class="row fixs">
      <div class="col-lg-3 col-md-6 mb-md-3 mbl-lg-2 " v-for="(item,index) in posts" :key="index">
        <a :href="item.url" target="_blank" class="pointer-event w-100 h-100 text-decoration-none">
          <b-spinner v-if="loading" label="Spinning"></b-spinner>

          <div v-else class="post-box" :style="{backgroundImage:'url(' + item.feature_image + ')' }">
            <div class="border-post">

              <h3 class="tr-white Montserrat-Medium  param-xl">{{ item.title }}</h3>
              <p class="tr-white param-sm">by
                <span
                  class="font-weight-bolder"
                  v-for="(item , index)  in item.authors" :key="index">{{ item ? item.name : "" }}</span></p>
              <p v-if="item.tags" class="tr-white param position-absolute font-weight-bolder" style="bottom: 0">
                <span class="position-relative param" v-for="(item,index) in item.tags"
                      :key="index">{{ item ? item.name : "" }}</span>
              </p>

            </div>
          </div>
        </a>


      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Posts",
  data() {
    return {
      posts: null,
      loading: false

    }
  },
  mounted() {
    this.getPosts()
  },
  methods: {
    async getPosts() {
      this.loading = true
      const treejerApi = 'https://blog.treejer.com/ghost/api/v3/content/posts/?key=0749370a54227533e6fd2795a1&include=tags,authors,primary_tag'
      await this.$axios.get(treejerApi).then((res) => {
        this.posts = res.data.posts
        console.log(this.posts, "res")
        this.loading = false


      }).catch((error) => {
        console.log(error)
        this.loading = false

      })
    }
  }
}
</script>

<style scoped lang="scss">
.posts {
  margin-top: 135px;
  margin-bottom: 135px;
  .fixs{
    margin-top: 64px;
  }
  .border-post {
    background-color: rgba(0, 0, 0, 0.4);
    z-index: +9999;
    border-radius: 12px;
    height: 100%;
    padding: 31px 24px;
  }
  .post-box {
    height: 352px;
    border-radius: 12px;
    transition: ease all .3s;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    h3 {
      font-weight: bolder;
      line-height: 32px;
    }
  }
  .post-box:hover{
   opacity: .8;
  }
  .title {
    h1.title-md {
      font-family: Montserrat-Medium;
      font-style: normal;
      font-weight: bold;
      font-size: 34px;
      line-height: 58px;
    }
  }
}
</style>

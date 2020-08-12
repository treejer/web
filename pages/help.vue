<template>
  <section :page="$route.name" class="position-relative pt-5  col-12 col-lg-10 help">
    <div class="container-fluid">
      <div class="row article">
        <div class="col-md-8 col-12">
          <div class="row">
            <div class="col-12">
              <h2 class="title-sm">
                Get Help

              </h2>
              <!--              <div class="search-bar-help position-relative mt-5">-->
              <!--                <input type="search" class="param tr-gray-four" placeholder="Ask a question" v-model="question"/>-->
              <!--                <span class="icon position-absolute">-->
              <!--                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">-->
              <!--<path-->
              <!--  d="M23.6578 20.7502L18.9865 16.079C18.882 15.9745 18.7578 15.8917 18.6211 15.8354C18.4845 15.779 18.3381 15.7502 18.1903 15.7505H17.427C18.9553 13.7954 19.6804 11.3309 19.4543 8.85958C19.2283 6.38825 18.0682 4.0962 16.2105 2.45075C14.3528 0.805299 11.9374 -0.0696366 9.45689 0.00433549C6.97635 0.0783076 4.61743 1.09562 2.86108 2.84884C1.10474 4.60207 0.0832453 6.95918 0.00486738 9.43958C-0.0735105 11.92 0.797134 14.3369 2.43928 16.1975C4.08143 18.0581 6.37142 19.2223 8.84234 19.4528C11.3133 19.6832 13.779 18.9625 15.7369 17.4376V18.2009C15.7366 18.3487 15.7654 18.4951 15.8217 18.6318C15.8781 18.7684 15.9609 18.8926 16.0653 18.9972L20.7381 23.67C20.8422 23.7746 20.9659 23.8576 21.1022 23.9142C21.2384 23.9708 21.3846 24 21.5321 24C21.6797 24 21.8258 23.9708 21.9621 23.9142C22.0983 23.8576 22.2221 23.7746 22.3262 23.67L23.6518 22.3443C23.8631 22.1333 23.9824 21.8472 23.9835 21.5485C23.9846 21.2498 23.8675 20.9629 23.6578 20.7502ZM9.73848 15.749C8.55211 15.749 7.39237 15.3972 6.40594 14.7381C5.4195 14.079 4.65067 13.1422 4.19666 12.0461C3.74266 10.9501 3.62387 9.74398 3.85532 8.5804C4.08677 7.41682 4.65806 6.348 5.49696 5.50911C6.33585 4.67021 7.40467 4.09892 8.56825 3.86747C9.73183 3.63602 10.9379 3.75481 12.034 4.20881C13.13 4.66282 14.0669 5.43165 14.726 6.41809C15.3851 7.40452 15.7369 8.56426 15.7369 9.75063C15.7369 11.3415 15.1049 12.8672 13.98 13.9922C12.8551 15.1171 11.3294 15.749 9.73848 15.749Z"-->
              <!--  fill="#9E9E9E"/>-->
              <!--</svg>-->
              <!--                </span>-->

              <!--              </div>-->
              <!--              <div class="param-sm-light tr-gray-four mt-5">-->
              <!--                Find answers to common questions or ask a new one here. Our community usually responds in a few days.-->
              <!--              </div>-->
              <client-only>
                <BSpinner type="" label="loading" />
                <div id="questions-widget"></div>
                <script>
                  Tribe('questions', {
                    topicId: '5babe5eb3d9228aa7c423c66',
                    id: 'questions-widget',
                    components: ['input']
                  })
                </script>
              </client-only>


            </div>
            <div class="col-12 mt-2">
            </div>
          </div>
        </div>

        <div class="col-4 d-md-block d-none justify-content-center">


          <img src="~/assets/images/help/get-help.svg" id="help_img" alt="get-help"
               class=" img-fluid"/>

        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: "help",
  layout: "dashboard",
  head() {
    return {
      title: this.title,
      script: [
        {
          src: (function (t, r, i, b, e) {
            if (typeof t.Tribe === 'function') {
              t.Tribe('reload', {portal: i});
            } else {
              b = function () {
                b.r(arguments);
              };
              b.q = [];
              b.r = function (args) {
                b.q.push(args);
              };
              t.Tribe = b;
              e = r.createElement('script');
              e.type = 'text/javascript';
              e.async = true;
              e.src = i + '/widget/v1/main.js?t=' + Math.ceil(new Date() / 3e5) * 3e5;
              var x = r.getElementsByTagName('script')[0];
              x.parentNode.insertBefore(e, x);
              t.Tribe('boot', {portal: i});
            }
          })(window, document, 'https://community.tribe.so')
        }
      ]
    }
  }
};
</script>
<style lang="scss">
.help {
  .search-bar-help {
    input {
      height: 64px;
      background: #FAFAFA;
      border-radius: 12px;
      width: 75%;
      border: 0;
      padding: 0 45px;
      filter: drop-shadow(2px 6px 44px rgba(0, 0, 0, 0.1));
    }

    span.icon {
      left: 10px;
      top: 20px;

      &:hover {
      }
    }
  }

  .search-bar-help:hover {
    cursor: pointer;
  }

}
@media (min-width: 1024px){
  #help_img{
    position: fixed;
  }

}
</style>

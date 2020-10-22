<template>
  <div class="container-fluid partner-comp"  >
    <div class="row  social-partner justify-content-center text-center">
      <div class="col-4 col-md-2 position-relative">
        <img src="~/assets/images/for-business/earth-logo.svg" class="img-fluid " alt="earth-logo">
      </div>
      <div class="col-4 col-md-2 position-relative">
        <img src="~/assets/images/for-business/samsung.svg" class="img-fluid " alt="samsung">
      </div>
      <div class="col-4 col-md-2 position-relative">
        <img src="~/assets/images/for-business/get-boarded.svg" class="img-fluid " alt="get-boarded">
      </div>
      <div class="col-4 col-md-2 position-relative">
        <img src="~/assets/images/for-business/flash-back.svg" class="img-fluid " alt="flash-back">
      </div>
      <div class="col-4 col-md-2 position-relative">
        <img src="~/assets/images/for-business/uni-cube.svg" class="img-fluid " alt="uni-cube">
      </div>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {}
  }
}
</script>
<style lang="scss">
.partner-comp{
  .social-partner {


    .col-md-2 {
      align-items: center;
      justify-content: center;
      align-self: center;

      img.img-fluid {
        height: 80px;
        cursor: pointer;
        -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
        filter: grayscale(100%);
        transition: all ease-out .2s;

        @media (max-width: 769px) {
          height: 30px;
        }

      }

      img.img-fluid:hover {
        -webkit-filter: none; /* Safari 6.0 - 9.0 */
        filter: none;

      }

    }
  }
}
</style>

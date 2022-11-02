<template>
  <section class="position-relative pt-5 col-12 add-tree mb-5 pb-5">
    <div class="container-fluid">
      <div class="row tree-count">
        <div class="col-12 final-step justify-content-center text-center">
          <img
            alt="final-step"
            class="img-fluid mt-5"
            src="~/assets/images/myforest/final-step.png"
          />
          <h1 class="title-sm font-weight-bold mt-5 tr-gray-two">
            {{ $t("forest.congratulations") }}
          </h1>
         
          <nuxt-link
            :to="localePath('/forest/' + $cookies.get('account'))"
            class="tr-green param pt-5"
            > {{ $t("forest.gobacktomyforest") }}
          </nuxt-link>
          <br />

          
        </div>


      </div>
    </div>
  </section>
</template>


<script>

export default {
  name: "advanceFundSuccess",
  components: { },

  data() {
    return {
      
    };
  },
  created() {
    
  },

  methods: {
    
  },
};
</script>
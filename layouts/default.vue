<template>
  <div>
    <TreejerHeader/>
    <div class="container">
      <div class="row">
          <Sidebar/>

          <nuxt/>
        </div>
      </div>

    <Footer/>
  </div>
</template>

<style lang="scss"></style>
<script>
  import TreejerHeader from "../components/TreejerHeader";
  import Footer from "../components/Footer";
  import Sidebar from "../components/Sidebar";
  export default {
    components: {Sidebar, Footer, TreejerHeader},
    data() {
      return {
        account: {}
      };
    },

    methods: {
      onComplete(data) {
        console.log("data:", data);
        this.account = data;
      }
    }
  };
</script>

<template>
  <div>
    <TreejerHeader/>
    <Sidebar/>

    <nuxt/>
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

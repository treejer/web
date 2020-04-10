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
        account: {},
        user: false

      };
    },
    computed: {
      isLoggedIn() {
        this.$store.state.dashboard !== null ? this.user = true : this.user = false;
      }
    },
    created() {


    },
    mounted() {
      console.log(this.$store.state.dashboard, 'here')
    },

    methods: {
      onComplete(data) {
        console.log("data:", data);
        this.account = data;
      },
      hasUser() {
        const token = this.$cookies.get('token')
        if (token !== undefined) {
          return null
        } else {
          this.user = true
        }
      }
    }
  };
</script>

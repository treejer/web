<template>


  <div class="loading">  <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
  </div>
</template>

<script>
    export default {
      name: "index.vue",
      created() {
          this.$router.push('/myForest')
      }
    }
</script>

<style scoped>
.loading{
  width: 100vw;
  height: 100vh;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
}
</style>

<template>
  <section :page="$route.name" class="position-relative pt-5 col-12  volunteer" style="min-height: 88vh">
    <client-only>
  
      <iframe @ended="loading =false" src="https://form.typeform.com/to/INs6wu" class="border-0" height="100%" width="100%" title="Iframe typeform"></iframe>


    </client-only>
  </section>
</template>

<script>
export default {
  name: "volunteer",
  data() {
    return {
      loading: true
    }
  },
  mounted() {


  }
}
</script>

<style scoped>

</style>

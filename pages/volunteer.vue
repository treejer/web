<template>
  <section :page="$route.name" class="position-relative pt-5 col-12  volunteer" style="min-height: 105vh">
    <client-only>
      <iframe @load="$nuxt.$loading.finish()" src="https://form.typeform.com/to/INs6wu" class="border-0" height="100%" width="100%" title="Iframe typeform"></iframe>
    </client-only>
  </section>
</template>

<script>
export default {
  name: "volunteer",
  layout:'landing',
  loading:false,
  head() {
    return {
      title:`Treejer`,
      meta:[
        { hid: 'description', name: 'description', content:"contact our business and team"},
    { hid: 'keywords', name: 'keywords', content: 'business team_business treejer treejer_contact_us teams'}
  ]
  }
  },
  data() {
    return {

    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 1000)
    })

  }
}
</script>

<style scoped>

</style>

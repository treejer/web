<template>
  <div class="mt-5 mb-5">
    <h1 class="tr-gray-two">dawdad{{$route.name}}</h1>

  </div>
</template>

<script>

  export default {
    name: "index",
    components: {
    },
    data() {
      return {
        msg: "This is demo net work"
      }
    },
    methods: {
      onComplete(data) {
        console.log('data:', data);
      }
    }
  }
</script>

<style scoped>

</style>

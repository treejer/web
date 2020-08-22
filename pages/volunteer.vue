<template>
  <section :page="$route.name" class="position-relative pt-5 col-12  volunteer" style="min-height: 88vh">
    <client-only>
      <BSpinner class="mr-2" type="grow" size="lg" v-if="loading">
      </BSpinner>

      <div class="typeform-widget" data-url="https://form.typeform.com/to/INs6wu"
           style="width: 100%; height: 100%;"></div>
      <script> (function () {
        var qs, js, q, s, d = document, gi = d.getElementById, ce = d.createElement, gt = d.getElementsByTagName,
          id = "typef_orm", b = "https://embed.typeform.com/";
        if (!gi.call(d, id)) {
          js = ce.call(d, "script");
          js.id = id;
          js.src = b + "embed.js";
          q = gt.call(d, "script")[0];
          q.parentNode.insertBefore(js, q)
        }
      })() </script>

    </client-only>
  </section>
</template>

<script>
export default {
  name: "volunteer",
  data() {
    return {
      loading: false
    }
  }
}
</script>

<style scoped>

</style>

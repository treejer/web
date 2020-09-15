<template>
  <div>
    <client-only>
      <b-breadcrumb :items="crumbs"/>
    </client-only>
  </div>
</template>
<script>
  export default {
    name: 'BreadCrumbs',
    computed: {
      crumbs: function () {
        let pathArray = this.$route.path.split("/")
        pathArray.shift()
        let breadcrumbs = pathArray.reduce((breadcrumbArray, path, idx) => {
          breadcrumbArray.push({
            path: path,
            to: breadcrumbArray[idx - 1]
              ? "/" + breadcrumbArray[idx - 1].path + "/" + path
              : "/" + path,
            text: this.$route.matched[idx].meta.breadCrumb || path,
          });
          return breadcrumbArray;
        }, [])
        return breadcrumbs;
      }
    }
  };
</script>
<style scoped>
  .container {
    margin: auto;
    width: 50%
  }
</style>

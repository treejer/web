!--- components/Fab.vue -->

<!---
  FontAwesome 5 Free Brands Icon Component

  Usage Example:

  <Fab i="facebook" />

  Props:
  - i: The FontAwesome 5 Free Brands icon name (like "twitter" or "reddit")
  - classes: CSS classes to add to the icon

  Caveats:
  - Each icon has to be pre-loaded in nuxt.config.js or it won't show up

-->
<template>
  <fa :class="`${classes}`" :icon="['fab', i]" />
</template>

<script>
export default {
  props: {
    i: {
      type: String,
      required: true,
      default: 'facebook'
    },
    classes: {
      type: String,
      required: false,
      default: 'icon is-medium'
    }
  }
}
</script>

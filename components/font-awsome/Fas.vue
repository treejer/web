<!--- components/Fas.vue -->

<!---
  FontAwesome 5 Free Solid Icon Component

  Usage Example:

  <Fas i="arrow-down" />

  Props:
  - i: The FontAwesome 5 Free Solid icon name (like "arrow-up" or "ad")
  - classes: CSS classes to add to the icon

  Caveats:
  - Each icon has to be pre-loaded in nuxt.config.js or it won't show up

-->
<template>
  <fa :class="`${classes}`" :icon="['fas', i]" />
</template>

<script>
export default {
  props: {
    i: {
      type: String,
      required: true,
      default: 'arrow-down'
    },
    classes: {
      type: String,
      required: false,
      default: 'icon is-medium'
    }
  }
}
</script>

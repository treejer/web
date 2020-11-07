<template>
  <img
    src="/logo/treejer.png"
    alt="treejer"
    class="pointer-event"
    @click="$router.push('/')">
</template>

<script>
export default {
  name: "BackToHome"
}
</script>

<style scoped lang="scss">
img[alt="treejer"] {
  position: absolute;
  right: 35px;
  top: 25px;
  width: 60px;
  height: 60px;
  z-index: +8888;

  :hover {
    cursor: pointer;
  }
}

img[alt="treejer"]:hover {
  cursor: pointer;
}
</style>

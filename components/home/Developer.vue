<template>
  <div class="container-fluid developer">
    <div class="row justify-content-center ">
      <div class="col-12 ">
        <h3 class="title-sm tr-gray-two text-center">Are you a developer?</h3>
      </div>
    </div>
    <div class="row justify-content-center text-center">
      <div class="col-md-6 col-12 p-md-0">
        <p class="param-18 tr-gray-two des">Build your own climate idea on top of Treejer Protocol. Treejer is a collection
          of blockchain-based smart contracts. Projects can connect to our open-source protocol and get supplied with
          traceable and collectible trees. It’s easy, free and permissionless!</p>
        <button class="btn-gray tr-white">Learn More</button>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "Developer",
}
</script>

<style scoped lang="scss">
.developer {
  margin-top: 132px;
  .des{
    margin-top: 32px;
  }
  .btn-gray{
    padding: 5px 25px;
    background: #757575;
    border-radius: 6px;
    margin-top: 32px;
  }
}
</style>

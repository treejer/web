<template>
  <section
    class="position-relative pt-5 col-lg-10 col-12 claim-treebox mb-5 pb-5"
  >
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-12 text-center">
          <img src="~assets/images/treebox/tree.png" alt="tree" />
          <h4 class="title-sm tr-gry-two">A tree is planted for you!</h4>
          <p
            class="
              param-md
              tr-gary-three
              col-md-6
              offset-md-3
              font-weight-bolder
            "
          >
            Dear friend, I wish you a happy New Year. Here’s a small gift from
            me. I planted this tree to thank you for following me on Twitter.
            Take care and do good. (Treejer)
          </p>
          <button class="btn-green d-block font-weight-bolder">
            Login to Claim
          </button>
          <button class="btn-gray d-block font-weight-bolder">
            See Tree Info
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  layout: "dashboard",
  name: "claimTree",
};
</script>
<style lang="scss" scoped >
.claim-treebox {
  img {
    margin-top: 96px;
  }
  h4 {
    margin-top: 32px;
  }
  p {
    background: rgba(208, 169, 69, 0.25);
    border-radius: 12px;
    margin-top: 32px;
    padding: 13px 10px;
  }
  .btn-green {
    margin: 48px auto;
    width: 176px;
    height: 48px;
    filter: drop-shadow(0px 4px 11px rgba(0, 0, 0, 0.161));
  }
  .btn-gray {
    margin: 24px auto;
    width: 176px;
    height: 48px;
    background: #757575;
    color: white;

    filter: drop-shadow(0px 4px 11px rgba(0, 0, 0, 0.161));
  }
}
</style>
<template>
  <div class="offset-checkout">
    <div class="d-flex offset-checkbox">
      <p class="param-18 tr-gray-one font-weight-bolder">Offset carbon footprint</p>
      <div class="on-off-toggle">
        <input
          id="bopisss"
          @click="showOffsetCountBox()"
          class="on-off-toggle__input disabled"
          type="checkbox"
        />
        <label
          class="on-off-toggle__slider pointer-event"
          for="bopisss"
        ></label>
      </div>
    </div>
    <div class="description-offest param-xs tr-gray-four">
      Add $1 per tree and <span class="tr-green">offset 25.2</span> tonnes of
      CO2 in this transaction. Carbon credits are supplied from 3rd-party
      projects. <span class="tr-green">Learn more</span>
    </div>
    <div v-if="activeOffestCountBox" class="offset-count d-flex">
      <div class="left-side-offest-box col-md-8 text-center">
        <p class="title-lg font-weight-bolder">
          {{ parseFloat($store.state.co2Count * 25.2).toFixed(2) }}
        </p>
        <p class="param tr-gray-four font-weight-bolder">Tonnes of Carbon</p>
      </div>
      <div class="right-side-offest-box col-md-4 border-left mt-4">
        <span
          class="obb title-lg tr-gray-one pointer-event font-weight-bolder"
          @click="obb()"
        >
          +
        </span>
        <span
          class="odd title-lg tr-gray-two pointer-event pl-4 font-weight-bolder"
          @click="odd()"
        >
          -
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeOffestCountBox: false,
      co2Count: 0,
    };
  },
  methods: {
    showOffsetCountBox() {
      this.activeOffestCountBox = !this.activeOffestCountBox;
      if (this.activeOffestCountBox) {
         this.co2Count = 1;
        this.$store.commit("SET_CHECKOUT_FOR_CO2", this.co2Count );
      }

      if (!this.activeOffestCountBox) {
        this.co2Count = 0;
        this.$store.commit("SET_CHECKOUT_FOR_CO2",  this.co2Count );
      }
    },
    obb() {
      
      this.co2Count++;
      this.$store.commit("SET_CHECKOUT_FOR_CO2", this.co2Count);
    },
    odd() {
      if (this.$store.state.co2Count > 0) {
        this.co2Count--;
        this.$store.commit("SET_CHECKOUT_FOR_CO2", this.co2Count);
      } else {
        this.showAlert();
      }
    },

    showAlert() {
      this.$bvToast.toast(
        this.$t("You can not decrease the Co2 price when samller than zero "),
        {
          variant: "danger",
          title: "Added Co2 price to the trees price failed",
          toaster: "b-toaster-bottom-left",
        }
      );
    },
  },

  created() {
    if (this.activeOffestCountBox) {
      this.$store.commit("SET_CHECKOUT_FOR_CO2", 1);
    }

    if (!this.activeOffestCountBox) {
      this.$store.commit("SET_CHECKOUT_FOR_CO2", 0);
    }
  },
};
</script>

<style lang="scss">
.offset-checkout {
  .offset-checkbox {
    justify-content: space-between;
    margin-top: 40px;
    .on-off-toggle {
      width: 32px;
      height: 16px;
      position: relative;
      display: inline-block;
      cursor: pointer;
    }

    .on-off-toggle__slider {
      width: 32px;
      height: 16px;
      display: block;
      border-radius: 34px;
      background-color: #d8d8d8;
      transition: background-color 0.4s;

      &:before {
        content: "";
        display: block;
        background-color: #9e9e9e;
        box-shadow: 0 0 0 1px #949494;
        bottom: 0px;
        height: 16px;
        left: 0px;
        position: absolute;
        transition: 0.4s;
        width: 16px;
        z-index: 5;
        border-radius: 100%;
        border: solid 1px #faf8f1;
      }

      &:after {
        display: block;
        line-height: 24px;
        text-transform: uppercase;
        font-size: 12px;
        font-weight: bold;
        content: "";
        color: #484848;
        padding-left: 10px;
        transition: all 0.4s;
      }
    }

    .on-off-toggle__input {
      /*
          This way of hiding the default input is better
          for accessibility than using display: none;
        */
      position: absolute;
      opacity: 0;
    }

    .on-off-toggle__input:checked + .on-off-toggle__slider {
      background-color: #67b68c;

      &:before {
        transform: translateX(15px);
      }

      &:after {
        content: "";
        color: #757575;
        padding-left: 8px;
      }
    }
  }
  .offset-count {
    background: #e5e7db;
    border: 1px solid #bdbdbd;
    border-radius: 8px;
    padding: 10px 32px 10px 60px;
    margin-top: 32px;
  }
}
</style>

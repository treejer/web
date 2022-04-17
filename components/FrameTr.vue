<template>
  <div class="tr-frame" style="border: none">
    <form  style="border: none" @submit.prevent="Submit()">
        <FormulateInput
          type="email"
          class="mb-2"
          name="email"
          :label="$t('aboutus.email')"
          :placeholder="$t('aboutus.exmaple')"
          validation="email"
          error-behavior="blur"
        />
        <button
          @click.prevent="submit()"
          class="btn-lg  btn-green param-md mb-4" style="padding: 10px 25px;margin-top: -14px">
          <b-spinner v-if="loading" small class="mr-1"></b-spinner>
          {{loading ? $t('aboutus.loading') : $t('aboutus.subscribe')}}
        </button>

    </form>
  </div>


</template>
<script>
  export default {
    name: "FrameTR",
    data() {
      return {
        schema: [
          {
            "label": "Your email",
            "name": "email",
            "validation": "required|email"
          },

        ],
        values: {},
        loading: false
      }
    },
    async mounted() {
    },
    methods: {
      submit() {
        window.open(process.env.SUBSCRIBE_LINK,'_blank');
      }
    }
  }

</script>

<style lang="scss" scoped>
  .tr-frame {
    border: 0;
    width: 100%;

    input:not([type=submit]) {
      border: 1px solid #ccc;
    }

    label.is-required::after {
      content: '';
      position: absolute;
      background: #ff0000;
      margin: 4px;
      height: 4px;
      width: 4px;
      border-radius: 100%;
    }

    input[type=submit] {
      cursor: pointer;
    }

    input[type=submit].loading {
      color: rgba(0, 0, 0, 0) !important;
    }

    #submit-container {
      position: relative;
      display: inline-flex;
      align-items: center;
      width: fit-content;
      margin-top: 20px;
    }

    #loader-container {
      position: absolute;
      display: flex;
      width: 100%;
    }

    #confirmation-message {
      margin: auto;
    }

    #error-message,
    #recaptcha-error-message,
    #timeout-error-message,
    #invalid-email-error-message {
      background-color: white;
      color: red;
      padding: 20px;
    }

    .g-recaptcha {
      margin-top: 20px;
    }

    .hidden {
      display: none;
    }

    .no-visibility {
      visibility: hidden;
    }

    .fragment-loader {
      width: 30px;
      height: 10px;
      margin: auto;
    }

    .fragment-loader .fragment-square {
      opacity: 0;
      transform: translateZ(0);
      animation: loader 1.6s infinite both;
      will-change: opacity;
      fill: #a9b5c0;
    }

    .fragment-loader .left {
      transform: translate(0);
      animation-delay: 0;
    }

    .fragment-loader .middle {
      transform: translate(10px);
      animation-delay: .2s;
    }

    .fragment-loader .right {
      transform: translate(20px);
      animation-delay: .4s;
    }
  }


  @keyframes loader {
    0%, 80%, to {
      opacity: 0
    }
    40% {
      opacity: 1
    }
  }
</style>

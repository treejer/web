<template>
  <div class="tr-frame" style="border: none">
    <form  style="border: none" @submit.prevent="Submit()">
        <FormulateInput
          type="email"
          name="email"
          label="Email "
          placeholder="exmaple@example.com"
          validation="required|email"
          error-behavior="live"
        />
        <button
          @click.prevent="submit()"
          class="btn-lg  btn-green param-md mb-4"style="padding: 10px 25px;margin-top: -14px">

          <b-spinner v-if="loading" small class="mr-1"></b-spinner>
          {{loading ? ' Loading...' : 'submit'}}
        </button>


      <recaptcha class="g-recaptcha" data-sitekey="6Lfa9H0UAAAAAMAGt_pKuycKsKYFnIouFWeqInvd"></recaptcha>

    </form>
  </div>


</template>
<script>
  export default {
    name: "FrameTR",
    data() {
      return {
        schema: [

          // {
          //   "label": "Your First Name",
          //   "name": "first-name",
          //   "validation": "required"
          // },
          // {
          //   "label": "Your Last Name",
          //   "name": "last-name",
          //   "validation": "required"
          // },
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
      await this.$recaptcha.init()
    },
    methods: {
      submits(){
        this.loading = true
        let self = this
        const body = JSON.stringify({
          first_name: self.values.first - name,
          last_name: self.values.last - name,
          email: self.values.email,
          user_id: 10211987,
          form_id: "7888deb9-ccb4-11ea-a818-d22e287687ec",
          recaptcha: self.$recaptcha.getResponse(),
        })
        this.$axios({
          method: 'post',
          url: baseUrl + 'applications/' + appName + '/dataexport/plantypes' + plan,
          headers: {},
          data: {
           body
          }
        });
      },

      submit() {
        this.loading = true
        let self = this
        const body = JSON.stringify({
          first_name: self.values.first - name,
          last_name: self.values.last - name,
          email: self.values.email,
          user_id: 10211987,
          form_id: "7888deb9-ccb4-11ea-a818-d22e287687ec",
          recaptcha: self.$recaptcha.getResponse(),
        })
        this.$axios.post('https://api.sg-form.com/signup', {

          body
        })
          .then(function (response) {
            self.loading = false
          })
          .catch(function (error) {
            console.log(error);
            self.loading = false
          });

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

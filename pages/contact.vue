<template>
  <div class="mt-5 mb-5 position-relative contact col-12">
    <div class="container">
      <div class="row ">
        <div class="row col-12 col-md-6 forms justify-content-center mt-5 ">
          <FormulateForm
            class="login-form"
            v-model="form"
            @submit="subscribe"
          >
            <FormulateInput
              name="first name"
              type="text"
              label="First name"
              placeholder="First name"
              validation="required"
              v-model="form.userName"
            />
            <FormulateInput
              name="last name"
              type="text"
              label="Last name"
              placeholder="Last name"
              validation="required"
              v-model="form.lastName"
            />
            <FormulateInput
              name="email"
              type="email"
              v-model="form.email"
              label="Email address"
              placeholder="Email address"
              validation="required|email"
            />
            <FormulateInput
              type="textarea"
              v-model="form.text"
              label="Message"
              validation-name="tweet"
              error-behavior="live"
              :help="`Keep it under 250 characters. ${250 - form.text.length} left.`"
            />

             <FormulateInput
               label="Submit"
               type="submit"
               @submit="subscribe"
             >

               <b-spinner v-if="loading" small class="mr-1"> </b-spinner>
               {{loading ? 'Loading...' : 'Submit'}}

             </FormulateInput>
            </FormulateForm>
        </div>
        <div class=" col-12 d-none d-md-block col-md-6">
          <img src="../assets/images/contact/contact.png" alt="conatct" class="img-fluid" height="415">
        </div>

      </div>

    </div>

  </div>
</template>

<script>
  import VueFormulate from '@braid/vue-formulate'

  export default {
    name: "contactUs",
    components:{
      VueFormulate
    },
    head() {
      return {
        title:`Treejer`,
        meta:[
          { hid: 'description', name: 'description', content:"contact our business and team"},
      { hid: 'keywords', name: 'keywords', content: 'business team_business treejer treejer_contact_us teams ' }
    ]
    }
    },
    data() {
      return {
        form: {
          email: '',
          userName: '',
          lastName:'',
          text: ''
        },
        url: null,
        loading: false
      }
    },

    mounted() {


    },
    methods: {
      subscribe(){
        let self =this
        self.loading = true
        this.url = 'https://api.hsforms.com/submissions/v3/integration/submit/7239953/054fc018-4eb2-49c9-b12e-909f88c1c840'
        this.$axios.$post(this.url, {
          "fields": [
            {
              "name": "email",
              "value": self.form.email
            },
            {
              "name": "firstname",
              "value": self.form.userName
            },
            // {
            //   "name": "name",
            //   "value": self.form.lastName
            // },
            {
              "name": "message",
              "value":self.form.text
            }
          ],
          "context": {
            "pageUri": self.$route.path,
            "pageName": self.$route.name
          },
        }).then(res => {
          if(process.env.NODE_ENV !== 'production'){
            console.log(res,"res post is here")
          }

          self.loading = false
          self.$bvToast.toast('Your message was sent successfully.', {
            variant: 'success',
            toaster: 'b-toaster-bottom-left',

          })
        }).catch(function(err) {
          self.$bvToast.toast(err.message, {
            variant: 'danger',
            toaster: 'b-toaster-bottom-left',

          })
          self.loading = false
        })
      }
    }

  }
</script>

<style scoped lang="scss">
  .contact{
    p{
      margin-bottom: 0!important;
    }
    input{
      height: 36px;
      background: #E5E7DB;
      border-radius: 6px;
      border: none;
      font-size: 12px;
      color: #757575;
      width: 100%;
    }

  }
</style>

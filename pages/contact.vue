<template>
  <div class="mt-5 mb-5 position-relative contact col-12">
    <div class="container">
      <div class="row ">
        <div class="row col-12 col-md-6 forms justify-content-center mt-5 "  >
          <div class="form-group ">
              <p for="product_category mb-0" class="tr-gray-three param">Email</p>
              <input v-model="form.email"
                     class="form-control mb-3" required type="text" >
            <p for="product_category mb-0" class="tr-gray-three param">Username </p>
            <input v-model="form.userName"
                   class="form-control mb-3" required type="email" id="email" name="email"
                   pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$">
            <button class="btn-green param"  style="padding: 10px 77px"  @click="subscribe">Subscribe</button>

          </div>
        </div>
        <div class=" col-12 d-none d-md-block col-md-6">
          <img src="../assets/images/contact/contact.png" alt="conatct" class="img-fluid" height="415">
        </div>
      </div>

    </div>

  </div>
</template>

<script>

  export default {
    name: "contactUs",
    data() {
      return {
        form: {
          email:null,
          userName: null
        },
        url: null
      }
    },
    head: {
      script: [
        {type: 'text/javascript', src: '//js.hsforms.net/forms/shell.js'},
      ]
    },
    mounted() {


    },
    methods: {
      subscribe(){
        let self =this

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
            }
          ],
          "context": {
            "pageUri": self.$route.path,
            "pageName": self.$route.name
          },
        }).then(res => {
          self.$bvToast.toast('Your email has been successfully registered.',{
            variant:'success',
            title:'Subscribed'
          })
          self.form.email=null
          self.form.userName=null
        }).catch(function(err) {
          self.$bvToast.toast(err.message,{
            variant:'danger',
            title:'Error'
          })
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

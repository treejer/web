<template>
  <div class="mt-5 mb-5 position-relative about col-12 ">
    <div class="justify-content-center text-center img-fluid position-relative">
      <img src="../assets/images/about/about-banner.png" class="img-fluid m-auto" alt="about-us">

    </div>
    <div class="mt-4 justify-content-center text-center position-relative">
      <h4 class="title-md font-weight-bold tr-gray-two">Planters
        without Borders</h4>


    </div>
    <div class="position-relative mb-5 pb-5">
      <div class="about-text-card position-relative ">
        <p class="param-18 tr-gray-two font-weight-lighter ">
          Rural development ambassadors in Treejer are people who interact with
          Local communities and the introduction of existing opportunities, the process of creating a
          the greenery and Rural development ambassadors in Treejer are people who interact with
          Local communities and the introduction of existing opportunities, the process of creating a
          the greenery andRural development ambassadors in Treejer are people who interact with
          Local communities and the introduction of existing opportunities, the
        </p>

      </div>
      <Arrow top="90%" />

    </div>
    <div class="mt-5 justify-content-center text-center">
      <h4 class="title-md font-weight-bold tr-gray-two">Meet Our Team</h4>
    </div>
    <div class="mt-4 justify-content-center text-center">
      <p class="col-md-10 m-auto param-18 font-weight-bold tr-gray-two">oost reforestation efforts around the
        globe.international project
        aims to inspire various groups to join an inclusive and sustainable </p>
    </div>
    <div class="mt-5 team-card-row">
      <div class="row">
        <div class="col-lg-3 col-6">
          <div class="team-card"></div>
        </div>
        <div class="col-lg-3 col-6">
          <div class="team-card"></div>
        </div>
        <div class="col-lg-3 col-6">
          <div class="team-card"></div>
        </div>
        <div class="col-lg-3 col-6">
          <div class="team-card"></div>
        </div>
        <div class="col-lg-3 col-6">
          <div class="team-card"></div>
        </div>
        <div class="col-lg-3 col-6">
          <div class="team-card"></div>
        </div>
        <div class="col-lg-3 col-6">
          <div class="team-card"></div>
        </div>
        <div class="col-lg-3 col-6">
          <div class="team-card"></div>
        </div>
      </div>
    </div>
    <div class="mt-5 col-lg-10 ml-auto mr-auto  mb-5 subscribe-box-row">
      <div class="row">
        <div class="col-md-4 box-img text-center">
          <img src="../assets/images/about/pm.png" class="img-fluid m-auto" alt="message">
        </div>
        <div class="col-md-8 box-text text-left">
          <p class="param-xl mb-1 tr-gray-two text-uppercase">Subscribe</p>
          <p class="param-18 mb-0 tr-gray-three font-weight-lighter"> Subscribe to our newsletter & stay updated</p>
          <div class="row mt-3  ">
            <div class="col-md-8">
              <FormulateInput
                type="email"
                name="email"
                class="search param-sm input-sub "
                place-holder="Your Email"
                validation="required|email"
                v-model="email"
              />
            </div>
            <div class="col-md-4">
              <FormulateInput

                type="submit"
                name="Submit"
                @click="subscribe()"
              />


            </div>
            <recaptcha @error="onError" @success="onSuccess" @expired="onExpired"/>
          </div>

        </div>

      </div>
    </div>

  </div>
</template>

<script>

  import AboutCard from "../components/AboutCard";
  import Arrow from "../components/Arrow";

  export default {
    name: "about",
    layout: 'landing',
    data() {
      return {
        email:String
      }
    },
    methods: {
      onError(error) {
        console.log('Error happened:', error)
      },
      onSuccess(token) {
        console.log('Succeeded:', token)
        // here you submit the form
        this.$refs.form.submit()
      },
      onExpired() {
        console.log('Expired')
      },
      async subscribe() {
        const token = await this.$recaptcha.getResponse()
        debugger
        console.log('ReCaptcha token:', token)
        await this.$recaptcha.reset()
        this.$axios.post('https://api.sg-form.com/signup', {
          email: this.email,
          first_name: "",
          form_id: token,
          last_name: "",
          recaptcha: "",
          user_id: "",
        }).then(res => {
          console.log(res)
        })
      },
    },
    components: {Arrow, AboutCard},
    created() {
      this.$axios.post('https://www.google.com/recaptcha/api/siteverify', {
        secret: '6Lck6LUZAAAAAFXxC7XDxcYNjCJSrfTn2pds6eTz',
        response:null,
        remoteip:null
      }).then((res) => {
        console.log(res)
      })
    }
  }
</script>

<style scoped lang="scss">
  .about {
    .about-text-card {
      margin-top: 38px;
      background: #E5E7DB;
      border-radius: 14px;
      padding: 15px 20px;
    }

    .team-card-row {
      .team-card {
        background: linear-gradient(358.04deg, rgba(33, 33, 33, 0.48) 35.13%, rgba(196, 196, 196, 0) 90.75%);
        background-blend-mode: multiply;
        border-radius: 20px;
        height: 303px;
        margin-bottom: 15px;
        cursor: pointer;

          box-shadow: 0 0 3rem -1rem rgba(0,0,0,0.5);
          transition: transform 0.1s ease-in-out, box-shadow 0.1s;





      }
      .team-card:hover {
        transform: translateY(-0.5rem) scale(1.0125);
        box-shadow: 0 0.5em 3rem -1rem rgba(0,0,0,0.5);
      }
    }

    .subscribe-box-row {
      padding: 60px 50px;
      background: #FAF8F1;
      box-shadow: 0px 4px 22px rgba(0, 0, 0, 0.16);
      border-radius: 20px;
    }

  }
</style>

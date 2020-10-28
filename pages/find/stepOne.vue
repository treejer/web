<template>
  <section class="position-relative pt-5 col-12 add-tree mb-5 pb-5">
    <div class="container-fluid">
      <div class="row tree-count">
        <div class="col-12">
          <ul class="step tr-gray-three d-flex   list-style-none">
            <li
              v-for="(item, index) in steps"
              :key="index"
              :name="item.name"
              class="param-md font-weight-bold"
            >
              <p>{{ item.name }}</p>
              <p :class="{ active: activeIndex === index }">{{ item.step  }}</p>
            </li>
          </ul>
        </div>
        <div class="col-12 step-one" v-if="activeIndex === 0">
          <div class="row">
            <div class="col-lg-6 col-12">
              <div class="col-12 mt-5 input">
                <h1 class="title-sm">How many trees to plant?</h1>
                <ul class="d-flex list-style-none mt-4">
                  <li v-for="(item, index) in counts" class="pointer-event">
                    <div v-if="!item.placeHolder">
                      <p
                        @click="activeCounts(item, index)"
                        :class="{ active: activeCount === index }"
                        :key="index"
                        :name="item.name"
                      >
                        {{ item.name }}
                      </p>
                    </div>
                    <div v-if="item.placeHolder">
                      <label :for="index">
                        <input
                          :class="{ active: activeIndex === index }"
                          style="width: initial"
                          :placeholder="item.placeHolder"
                          type="number"
                          :value="item.name"
                          :key="index"
                          :name="item.name"
                        />
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="col-12 mt-5 pays">
                <h1 class="title-sm">Select payment method</h1>
                <ul class="d-flex list-style-none mt-4">
                  <li v-for="(item, index) in payMethods" class="pointer-event">
                    <p
                      @click="activePays(item, index)"
                      :class="{ active: activePay === index }"
                      :key="index"
                      :name="item.name">
                      <Fab :i="item.icon" />
                    </p>
                  </li>
                </ul>
              </div>
              <div
                class="col-12 mt-5 form-check justify-content-between d-flex"
              >
                <div>
                  <h1>Send as TreeCard</h1>
                </div>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis"
                    v-model="sendAsTreeCard"

                  />
                  <label
                    for="bopis"
                    class="on-off-toggle__slider pointer-event"
                  ></label>
                </div>
              </div>
              <div
                class="col-12 mt-3 form-check justify-content-between d-flex"
              >
                <div>
                  <h1>Send as TreeBox</h1>
                </div>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input disabled"
                    type="checkbox"
                    id="bopiss"


                  />
                  <label
                    for="bopiss"
                    class="on-off-toggle__slider pointer-event"
                  ></label>
                </div>
              </div>
              <div class="col-12 mt-3">
                <div class="param">
                  (You can gift your trees on My Forest page after setting up.)
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-12 overflow-hidden">
              <div
                class="card mt-5 box-shadow-active  justify-content-center text-center"
              >
                <div class="header">
                  <h4 class="param-lg font-weight-bolder ">Did you know?</h4>
                  <p class="param">
                    Trees can significantly reduce the risk of flood if planted
                    correctly.
                  </p>
                </div>
                <div class="body mt-5">
                  <h4>Total</h4>
                  <h1>{{ "$173.00" }}</h1>
                  <button
                    @click="activeIndex = 1"
                    class="btn-green-md  mt-5"
                  >
                    NEXT
                  </button>
                  <p class="pointer-event">
                    <a class="param mb-0" href=""
                    >By proceeding I agree to
                      <span class="param tr-green">terms</span> and
                      <span class="param tr-green">conditions.</span></a
                    >
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="row form-name" id="sendAsTreeCard" v-if="sendAsTreeCard">
            <div class="col-12">
              <div class="card bg-transparent p-4 mt-5">
                <div class="form-full-name">
                  <div class="row">
                    <div class="col-12">
                      <p class="param-md-md font-weight-bold tr-gray-three">Add your name</p>

                    </div>
                    <div class="col-lg-4">
                      <label class="param tr-gray-two Montserrat-Medium">First name
                        <input class="param-sm tr-gray-five" type="text" placeholder="First name">
                      </label>
                    </div>
                    <div class="col-lg-4">
                      <label class="param tr-gray-two Montserrat-Medium">Last name (optional)
                        <input class="param-sm tr-gray-five" type="text" placeholder="Last name">
                      </label>
                    </div>
                    <div class="col-lg-4">
                      <label class="param tr-gray-two Montserrat-Medium">Your email
                        <input class="param-sm tr-gray-five" type="text" placeholder="Your email">
                      </label>
                    </div>
                  </div>
                </div>
                <div class="recepient mt-5">
                  <div class="row">
                    <div class="col-12">
                      <p class="param-md-md font-weight-bolder tr-gray-three">Add recepient(s)</p>

                    </div>
                    <div class="col-lg-4">
                      <input class="param-sm tr-gray-five" type="text" placeholder="Email">
                      <input class="param-sm tr-gray-five" type="text" placeholder="Email">
                      <input class="param-sm tr-gray-five" type="text" placeholder="Email">
                    </div>
                    <div class="col-lg-4">
                      <input class="param-sm tr-gray-five" type="email" placeholder="Email"/>
                      <input class="param-sm tr-gray-five" type="email" placeholder="Email"/>
                      <input class="param-sm tr-gray-five" type="email" placeholder="Email"/>
                    </div>
                    <div class="col-lg-4">
                      <div class="cv-team bg-transparent justify-content-center text-center ">
                        <img src="~/assets/images/myforest/file-excel.png" class="img-fluid pt-4 m-auto">
                        <p class="param-sm mt-3 p-2 mb-3">
                          Drag & drop your CSV file here
                          or <span class="tr-green">
                          select a CSV file to upload.
                        </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12">
                      <div class="d-flex mt-3 align-items-center align-self-center">

                        <button class="btn-outline-green-md param-sm btn-lg mr-2 ">Add another row</button>
                        <p class="param-sm mt-3">Or upload email addresses using our <span class="tr-green pointer-event">CSV template</span> </p>
                      </div>
                    </div>
                  </div>
                  <div class="row mt-3">
                    <div class="col-12">
                      <div class="d-flex ">
                        <button class=" btn-green-md param mr-4" >Finish</button>
                        <p class="param tr-green mt-3 pointer-event" >Skip for now </p>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

</template>

<script>
    export default {
        name: "stepOne",

      data(){
          return{
            activeIndex:0,
            steps: [
              { name: "Processing", step: 1 },
              { name: "Pending Plantation", step: 2 },
              { name: "Planted", step: 3 },

              // { name: "final-step", step: 4 }
            ],
          }
      }
    }
</script>

<style scoped lang="scss">
  .step {
    li {
      width: 100%;
      position: relative;
      text-align: center;

      p:nth-child(2) {
        background: #9e9e9e;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 0;
        z-index: +99;
        color: white;
        text-align: center;
        margin: auto;
      }

      p:nth-child(2):after {
        content: "";
        width: 100%;
        border: solid 2px #9e9e9e;
        height: 2px;
        position: absolute;
        transform: translate(0px, 9px);
      }

      p.active:nth-child(2):after {
        content: "";
        width: 100%;
        border: solid 2px #67b68c;
        height: 2px;
        position: absolute;
        transform: translate(0px, 9px);
      }

      p.active:nth-child(2) {
        background: #67b68c;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 0;
        z-index: +99;
        color: white;
        text-align: center;
        margin: auto;
      }
    }

    li:last-child {
      p:nth-child(2):after {
        display: none;
      }
    }
  }

</style>

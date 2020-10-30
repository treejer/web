<template>
  <div class="container-fluid admin-security">
    <div class="row">
      <div class="col-12 col-md-7 admin-left-side">
        <div class="box"> 
          <div class="header-box border-bottom">
            <p class="param-18 font-weight-bolder tr-gray-two">Security Settings</p>
          </div>
          <div class="body-box border-bottom">
            <div class="title">
              <p class="param tr-gray-three">GREEN BLOCK CREATION</p>
            </div>
            <div class="main w-100 d-flex">
              <form class="form-group">
                <label for="current_price" class="first-input param tr-gray-two"
                  >Current mode
                  <input
                    class="form-control param tr-gray-three"
                    type="text"
                    id="current_price"
                    placeholder="Running"
                  />
                </label>
                <button class="btn-green">Lock</button>
              </form>
            </div>
          </div>
            <div class="body-box border-bottom">
            <div class="title">
              <p class="param tr-gray-three">TREE SUBMISSION</p>
            </div>
            <div class="main w-100 d-flex">
              <form class="form-group">
                <label for="current_price" class="first-input param tr-gray-two"
                  >Current mode
                  <input
                    class="form-control param tr-gray-three"
                    type="text"
                    id="current_price"
                    placeholder="Locked"
                  />
                </label>
                <button class="btn-green">Lock</button>
              </form>
            </div>
          </div>
            <div class="body-box border-bottom">
            <div class="title">
              <p class="param tr-gray-three">O1 SUPPLY</p>
            </div>
            <div class="main w-100 d-flex">
              <form class="form-group">
                <label for="current_price" class="first-input param tr-gray-two"
                  >Current mode
                  <input
                    class="form-control param tr-gray-three"
                    type="text"
                    id="current_price"
                    placeholder="Running"
                  />
                </label>
                <button class="btn-green">Lock</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-5 admin-right-side">
        <div class="box">
          <p class="param-18 font-weight-bolder tr-gray-two">Getting Started</p>
          <p class="param tr-gray-three">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            venenatis, sem sit amet pretium facilisis, felis ligula sollicitudin
            neque, a vestibulum metus leo sit amet orci. Vivamus iaculis nibh ac
            est viverra euismod. Ut ac varius justo, eget mattis urna. Donec non
            lacus sit amet nisl egestas suscipit. Vivamus bibendum elementum
            lacus ac varius.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from "~/plugins/lineChart";

export default {
  components: {
    LineChart,
  },

  name: "index",
  layout: "admin",

  data() {
    return {}
  },
};
</script>

<style lang="scss" scoped>
.admin-security {
  .admin-left-side {
    .box {
      min-height: 591px;
      width: 100%;
      background: #ffffff;
      box-shadow: 4px 4px 44px rgba(0, 0, 0, 0.1);
      border-radius: 12px;
      input {
        background: #ffffff;
        border: 1px solid #bdbdbd;
        box-sizing: border-box;
        border-radius: 6px;
        margin-top: 10px;
      }
      button {
        padding: 10px 16px;
      }
      label.first-input {
        margin-right: 32px;
      }
      .header-box {
        padding: 32px;
      }
      .body-box {
        background: #f5f5f5;
        padding: 32px;
        height: 100%;
        border-radius: 0px 0px 12px 12px;
      }
    }
  }
  .admin-right-side {
    .box {
      padding: 32px;
      min-height: 230px;
      background: #efe4c6;
      border-radius: 12px;
    }
  }
}
</style>

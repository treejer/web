<template>
  <section class="position-relative pt-5 col-lg-10 col-12 treebox mb-5 pb-5">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-8 col-12 box-left-treebox">
          <h1 class="title tr-gray-two font-weight-bold">TreeBox</h1>
          <p class="param tr-gray-three">
            Plant trees and send them as gift with a personal message. TreeBox
            recipients don’t need to have a web 3.0 wallet to recieve NFT trees.
            <a class="d-inline tr-green font-weight-bolder" href="#">
              Learn more</a
            >
          </p>
          <p class="param-18  tr-gray-two tr-margin-top">Distribution method</p>
          <ul class="method pt-4  over-flow-x-scroll">
            <li
              class="pointer-event position-relative"
              :class="activeIndex === index ? 'active' : 'not-active'"
              v-for="(item, index) in activeMethods"
              :key="index"
              @click.prevent="setActiveIndex(index)"
            >
              <span v-if="index !== 0" class="soon btn-gree tr-white ">SOON</span>
              {{ item.name }}
            </li>
          </ul>
          <p class="param-18 tr-gray-two tr-margin-top">Number of recipients</p>
          <ul class="recipient over-flow-x-scroll">
            <li
              class="pointer-event"
              :class="activeIndexRecepient === index ? 'active' : 'not-active'"
              v-for="(item, index) in numberRecepient"
              :key="index"
              @click.prevent="setActiveIndexRecepient(index, item.name)"
            >
              {{ item.name }}
            </li>
            <input
              type="number"
              class="recipient-input tr-gray-four font-weight-bold text-center"
              v-model="countOfRecepient"
              placeholder="Enter"
            />
          </ul>
          <p class="param-18 tr-gray-two tr-margin-top">
            Number of trees in each TreeBox (max. 100)
          </p>
          <ul class="recipient over-flow-x-scroll">
            <li
              class="pointer-event"
              :class="
                activeIndexRecepientTreebox === index ? 'active' : 'not-active'
              "
              v-for="(item, index) in numberRecepientTreebox"
              :key="index"
              @click.prevent="setActiveIndexRecepientTreebox(index, item.name)"
            >
              {{ item.name }}
            </li>
            <input
              type="number"
              class="recipient-input tr-gray-four font-weight-bold text-center"
              v-model="countOfRecepientTreebox"
              placeholder="Enter"
            />
          </ul>
          <p class="param-18 tr-gray-two tr-margin-top">
            Message (max. 200 characters)
          </p>
          <textarea
            class="message param-sm tr-gray-four font-weight-bold"
            v-model="message"
            placeholder="Write your message here..."
          />
        </div>
        <div class="col-lg-4 col-12 box-right-treebox text-center">
          <img src="~/assets/images/treebox/tree.png" alt="tree-treebox" />
          <h1 class="tr-gray-two title-md font-weight-bolder">
            {{ Number(countOfRecepient) * Number(countOfRecepientTreebox) }}
          </h1>
          <p class="param-md tr-gray-four">Total Trees to Send</p>
          <button class="btn-green" @click.prevent="$router.push('/forest/treebox/claimTree')">
            Create TreeBox
          </button>
          <button class="btn-gray" @click.prevent="">Preview</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  layout: "dashboard",
  data() {
    return {
      activeMethods: [{ name: "Link" }, { name: "Email" }, { name: "API" }],
      numberRecepient: [
        { name: "1" },
        { name: "10" },
        { name: "20" },
        { name: "50" },
      ],
      numberRecepientTreebox: [
        { name: "1" },
        { name: "10" },
        { name: "20" },
        { name: "50" },
      ],

      activeIndex: 0,
      activeIndexRecepient: 0,
      activeIndexRecepientTreebox: 0,
      countOfRecepient: 1,
      countOfRecepientTreebox: 1,
      message: null,
    };
  },
  methods: {
    setActiveIndex(index) {
      this.activeIndex = index;
    },
    setActiveIndexRecepient(index, count) {
      this.activeIndexRecepient = index;
      this.countOfRecepient = count;
    },
    setActiveIndexRecepientTreebox(index, count) {
      this.activeIndexRecepientTreebox = index;
      this.countOfRecepientTreebox = count;
    },
  },
};
</script>
<style lang="scss" >
.treebox {
  .box-left-treebox {
    .method {
      display: flex;
      .soon {
        position: absolute;
        top:-5px;
        right: 10px;
        font-size: 10px;
        background: #67b68c;
        border-radius: 4px;
        color: #FAF8F1;
      }
      li {
        margin-right: 32px;
      }
      li.active {
        min-width: 128px;
        height: 64px;
        align-items: center;
        display: flex;
        justify-content: center;
        color: white;
        background: linear-gradient(90deg, #4776e6 0%, #8e54e9 100%);
        border-radius: 8px;
        list-style: none;
      }
      li.not-active {
        min-width: 128px;
        height: 64px;
        align-items: center;
        display: flex;
        justify-content: center;
        background: #fafafa;
        border: 1px solid #bdbdbd;
        box-sizing: border-box;
        border-radius: 8px;
        list-style: none;
      }
    }
    .recipient {
      display: flex;
      li {
        margin-right: 32px;
      }
      li.active {
        min-width: 48px;
        height: 48px;
        align-items: center;
        display: flex;
        justify-content: center;
        color: white;
        background: linear-gradient(90deg, #4776e6 0%, #8e54e9 100%);
        border-radius: 8px;
        list-style: none;
      }
      li.not-active {
        min-width: 48px;
        height: 48px;
        align-items: center;
        display: flex;
        justify-content: center;
        background: #fafafa;
        border: 1px solid #bdbdbd;
        box-sizing: border-box;
        border-radius: 8px;
        list-style: none;
      }
    }
    .recipient-input {
      width: 48px;
      height: 48px;
      background: #fafafa;
      border: 1px solid #bdbdbd;
      border-radius: 8px;
    }
    .message {
      min-width: 320px;
      min-height: 128px;
      padding: 10px 15px;

      background: #fafafa;
      border: 1px solid #bdbdbd;

      border-radius: 8px;
    }
    .tr-margin-top {
      margin-top: 25px;
      font-weight: bolder;
    }
  }
  .box-right-treebox {
    img {
      margin-top: 127px;
      width: 144.41px;
      height: 160px;
    }
    h1 {
      margin-top: 16px;
    }
    .btn-green {
      filter: drop-shadow(0px 4px 11px rgba(0, 0, 0, 0.161));
      width: 176px;
      height: 48px;
      background: #67b68c;
      font-weight: bolder;
    }
    .btn-gray {
      filter: drop-shadow(0px 4px 11px rgba(0, 0, 0, 0.161));
      width: 176px;
      height: 48px;
      background: #757575;
      font-weight: bolder;
      margin-top: 24px;
      color: white;
    }
  }
}
</style>
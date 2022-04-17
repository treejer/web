<template>
  <div class="position-relative about col-12">
    <div class="justify-content-center text-center img-fluid position-relative">
      <img
        src="../assets/images/about/aboutpage-banner.png"
        class="img-fluid m-auto"
        alt="about-us"
      />
    </div>
    <div class="justify-content-center text-center position-relative">
      <h4 class="title-md font-weight-bold tr-gray-two title-banner">
        {{ $t("aboutus.title") }}
      </h4>
      <p class="param-18 tr-gray-two font-weight-lighter des-banner">
        {{ $t("aboutus.unique") }}
      </p>

      <Arrow top="160%" />
    </div>
    <div class="position-relative border-about">
      <div class="position-relative">
        <div
          class="justify-content-center text-center img-fluid position-relative"
        >
          <img
            src="../assets/images/about/about-page-timline.png"
            class="img-fluid m-auto"
            alt="about-us"
          />
        </div>
        <p
          class="
            param-18
            tr-gray-two
            font-weight-lighter
            border-about-des
            col-md-8
            text-center
            justify-content-center
            m-auto
          "
        >
          {{ $t("aboutus.linkbetween") }}
        </p>
      </div>
    </div>
    <div class="position-relative about-text-card-border">
      <div class="about-text-card position-relative col-lg-10 m-auto">
        <p
          class="
            param-18
            tr-gray-two
            font-weight-lighter
            justify-content-center
            m-auto
          "
        >
          {{ $t("aboutus.each") }}
        </p>
      </div>
    </div>
    <div class="about-faq col-lg-6 col-md-10 m-auto">
      <h4 class="title-md font-weight-bold tr-gray-two title-banner">
        {{ $t("aboutus.frequently") }}
      </h4>
      <div class="card-groups">
        <a
          v-for="(item, key) in faq"
          class="text-decoration-none"
          target="_blank"
          :key="key"
          :href="item.answer"
        >
          <b-card no-body class="mb-1 pointer-event">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <div class="btn-faq w-100 h-100 pointer-event">
                <span class="text">{{ item.question }} </span
                ><span class="icon">
                  <span class="p-3" v-html="caretRight" />
                </span>
              </div>
            </b-card-header>
          </b-card>
        </a>
      </div>
    </div>
    <!--    <div class="justify-content-center text-center main-our-team">-->
    <!--      <h4 class="title-md font-weight-bold tr-gray-two">Meet Our Team</h4>-->
    <!--    </div>-->
    <!--    <div class="mt-4 justify-content-center text-center">-->
    <!--      <p class="col-lg-8 col-md-10 m-auto param-18 font-weight-bold tr-gray-two">-->
    <!--        We’re a distrubuted community working for a common mission across continents.-->
    <!--        Join our <span> <a href="https://discuss.treejer.com/" target="_blank " class="tr-green d-inline">community</a> </span> today, we’re the #PlantersWithoutBorders!-->
    <!--&lt;!&ndash;        We’re a distrubuted community working&ndash;&gt;-->
    <!--&lt;!&ndash;        for a&ndash;&gt;-->
    <!--&lt;!&ndash;        common mission across continents. Join the <span> <a href="https://twitter.com/" target="_blank"&ndash;&gt;-->
    <!--&lt;!&ndash;                                                             class="tr-green d-inline">#PantersWithoutBorders!</a> </span>&ndash;&gt;-->
    <!--      </p>-->
    <!--    </div>-->
    <!--    <div class="team-card-row">-->
    <!--      <div class="row justify-content-center">-->
    <!--        <div class="col-lg-3 col-12">-->
    <!--          <div class="team-card">-->
    <!--            <img class="img-fluid" src="../assets/images/about/ermia.png" alt="ermia shahrakhiz">-->
    <!--          </div>-->

    <!--        </div>-->
    <!--        <div class="col-lg-3 col-12">-->
    <!--          <div class="team-card">-->
    <!--            <img class="img-fluid" src="../assets/images/about/amir.png" alt="amir habibzadeh">-->

    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <div class="row">-->
    <!--        <div class="col-lg-3 col-12">-->
    <!--          <div class="team-card">-->
    <!--            <img class="img-fluid" src="../assets/images/about/iraj.png" alt="iraj habibzadeh">-->

    <!--          </div>-->
    <!--        </div>-->
    <!--        <div class="col-lg-3 col-12">-->
    <!--          <div class="team-card">-->
    <!--            <img class="img-fluid" src="../assets/images/about/ali.png" alt="ali hamidian">-->

    <!--          </div>-->
    <!--        </div>-->
    <!--        <div class="col-lg-3 col-12">-->
    <!--          <div class="team-card">-->
    <!--            <img class="img-fluid" src="../assets/images/about/bahare.png" alt="bahare tavakoli">-->

    <!--          </div>-->
    <!--        </div>-->
    <!--        <div class="col-lg-3 col-12">-->
    <!--          <div class="team-card">-->
    <!--            <img class="img-fluid" src="../assets/images/about/mohammad.png" alt="mohammad mohebifar">-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
    <div class="col-lg-10 ml-auto mr-auto subscribe-box-row">
      <div class="row">
        <div class="col-md-4 box-img text-center">
          <img
            src="../assets/images/about/pm.png"
            class="img-fluid m-auto"
            alt="message"
          />
        </div>
        <div class="col-md-8 box-text text-left">
          <FrameTr />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AboutCard from "../components/AboutCard";
import Arrow from "../components/Arrow";
import FrameTr from "../components/FrameTr";
import Fas from "../components/font-awsome/Fas";

export default {
  name: "about",
  layout: "landing",
  data() {
    return {
      baseUrl: process.env.baseUrl,
      meta: {
        title: this.$t("aboutus.meta.title"),
        description: this.$t("aboutus.meta.description"),
        keywords: this.$t("aboutus.meta.keywords"),
      },
      that: "000",
      caretRight: `<svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 8.8197H17.4754" stroke="#FAFAFA" stroke-width="2.7157" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.1803 2L18 8.81967L11.1803 15.6393" stroke="#FAFAFA" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
      email: "",
      token: "",
      faq: [
        {
          question: this.$t("aboutus.questionOne"),
          answer: this.$t("aboutus.answerOne"),
        },
        {
          question: this.$t("aboutus.questionTwo"),
          answer: this.$t("aboutus.answerTwo"),
        },
        {
          question: this.$t("aboutus.questionthree"),
          answer: this.$t("aboutus.answerthree"),
        },
        {
          question: this.$t("aboutus.questionfour"),
          answer: this.$t("aboutus.answerfour"),
        },
      ],
      teamMembers: [
        {
          src: "../assets/images/about/ermia.png",
          alt: this.$t("aboutus.ermiashahrakhiz"),
        },
        {
          src: "../assets/images/about/amir.png",
          alt: this.$t("aboutus.amirhabibzade"),
        },
        {
          src: "../assets/images/about/iraj.png",
          alt: this.$t("aboutus.irajhabibzadeh"),
        },
        {
          src: "../assets/images/about/ali.png",
          alt: this.$t("aboutus.alihamidian"),
        },
        {
          src: "../assets/images/about/bahare.png",
          alt: this.$t("aboutus.baharetavakoli"),
        },
        {
          src: "../assets/images/about/mohammad.png",
          alt: this.$t("aboutus.mohammadmohibeifar"),
        },
      ],
    };
  },

  head() {
    return {
      title: this.meta.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.meta.description,
        },
        {
          hid: "keywords",
          name: "keywords",
          content: this.meta.keywords,
        },

        { hid: "og:title", property: "og:title", content: this.meta.title },
        {
          hid: "og:description",
          property: "og:description",
          content: this.meta.description,
        },
        { hid: "og:url", property: "og:url", content: this.baseUrl + "/about" },
        {
          hid: "og:image",
          property: "og:image",
          content: this.baseUrl + "/featureImage/jake-hills.jpg",
        },

        {
          hid: "twitter:title",
          property: "twitter:title",
          content: this.meta.title,
        },
      ],
    };
  },
  components: { Arrow, AboutCard, FrameTr, Fas },

  methods: {
    async onSubmit() {},
  },
};
</script>

<style scoped lang="scss">
.about {
  .about-text-card {
    margin-top: 38px;
    background: #e5e7db;
    border-radius: 14px;
    padding: 35px 45px;
  }

  .team-card-row {
    margin-top: 65px;

    .team-card:hover {
      cursor: pointer;
      transform: translateY(-0.5rem) scale(1.0125);
    }
  }

  .subscribe-box-row {
    padding: 60px 50px;
    background: #faf8f1;
    box-shadow: 0px 4px 22px rgba(0, 0, 0, 0.16);
    border-radius: 20px;
  }

  img[alt="about-us"] {
    padding-top: 93px;
  }

  > h4,
  .title-banner {
    padding-top: 40px;
  }

  .des-banner {
    margin-top: 20px;
  }

  .border-about {
    margin-top: 172px;
  }

  .border-about-des {
    padding-top: 42px;
  }

  .about-text-card-border {
    padding-top: 110px;
  }

  .about-faq {
    h4 {
      padding-top: 100px;
      text-align: center;
    }

    .card-groups {
      padding-top: 64px;

      .card {
        box-shadow: 2px 4px 36px rgba(0, 0, 0, 0.1);
        border-radius: 6px;
        border: 0;
        margin-bottom: 24px !important;

        .card-header {
          background: #ffffff;
          height: 64px;
          border: 0;
          padding: 0 !important;

          .btn-faq {
            font-size: 14px;
            justify-content: space-between;

            font-family: Montserrat-Medium;
            font-weight: 800;
            color: #424242;
            border: 0;
            align-items: center;

            display: flex;

            span.text {
              padding: 0 15px;
            }

            span.icon {
              height: 64px;
              background: #424242;
              border-radius: 0 6px 6px 0px;
              width: 48px !important;
              display: flex;
              justify-content: center;

              svg {
                color: white !important;
              }
            }
          }
        }
      }
    }
  }

  .main-our-team {
    margin-top: 124px;
  }
  .team-card-row {
  }
  .subscribe-box-row {
    margin-top: 122px;
    margin-bottom: 159px;
  }
}
</style>

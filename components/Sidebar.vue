<template>
  <section class="sidebar pt-4 col-lg-2 d-md-block" v-if="hasSideBar ">
    <ul class="nav flex-column ">
      <li class="nav-item myForest"
          @click="activeIndex=0"
      >
        <nuxt-link to="/myForest"
                   class="nav-link"
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="32" height="32">
              <path d="M32 0L32 32L-1.39876e-06 32L0 -1.39876e-06L32 0Z" fill="#C4C4C4"/>
            </mask>
            <g mask="url(#mask0)">
              <path
                d="M23.7576 6H8.59337C4.39967 6 1 9.39967 1 13.5934C1 17.7871 4.39967 21.1867 8.59337 21.1867H23.7576C27.9513 21.1867 31.351 17.7871 31.351 13.5934C31.351 9.39967 27.9513 6 23.7576 6Z"
                :stroke="activeIndex === 0 ? 'white' : '#616161'" stroke-width="1.4" stroke-linecap="round"
                stroke-linejoin="round"/>
              <path d="M8.65186 11.4419L8.65185 27.7674" :stroke="activeIndex === 0 ? 'white' : '#616161'"
                    stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M16.8145 9.17407L16.8145 27.767" :stroke="activeIndex === 0 ? 'white' : '#616161'"
                    stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M23.1626 14.1627L23.1626 27.7673" :stroke="activeIndex === 0 ? 'white' : '#616161'"
                    stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M16.7939 15.7299C16.7939 15.7299 20.9102 13.7796 21.5605 10.3137"
                    :stroke="activeIndex === 0 ? 'white' : '#616161'" stroke-width="1.4" stroke-linecap="round"
                    stroke-linejoin="round"/>
              <path d="M8.28333 17.409C8.28333 17.409 4.81666 17.6232 5.03317 13.7202"
                    :stroke="activeIndex === 0 ? 'white' : '#616161'" stroke-width="1.4" stroke-linecap="round"
                    stroke-linejoin="round"/>
              <path d="M23.3965 18.5282C23.3965 18.5282 26.4124 18.7688 27.1085 15.9797"
                    :stroke="activeIndex === 0 ? 'white' : '#616161'" stroke-width="1.4" stroke-linecap="round"
                    stroke-linejoin="round"/>
              <path
                d="M16.0067 18.496C15.3828 18.4811 14.7692 18.3345 14.2059 18.066C13.6426 17.7976 13.1423 17.4132 12.7378 16.938C12.3333 16.4629 12.0336 15.9077 11.8585 15.3087C11.6833 14.7098 11.6365 14.0806 11.7212 13.4624"
                :stroke="activeIndex === 0 ? 'white' : '#616161'" stroke-width="1.4" stroke-linecap="round"
                stroke-linejoin="round"/>
            </g>
          </svg>

          <p>My Forest</p>

        </nuxt-link>
      </li>
      <li class="nav-item Leaderboard"
          @click="activeIndex=1"
      >
        <nuxt-link to="/leaderboard"
                   class="nav-link"
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="32" height="32">
              <path d="M32 0L32 32L-1.39876e-06 32L0 -1.39876e-06L32 0Z" fill="#C4C4C4"/>
            </mask>
            <g mask="url(#mask0)">
              <path
                d="M30.6662 6.25556L30.6683 6.25556C30.7513 6.2553 30.8335 6.27145 30.9102 6.30308C30.9869 6.33471 31.0567 6.38118 31.1154 6.43984C31.1741 6.4985 31.2206 6.56818 31.2523 6.64489C31.284 6.72158 31.3002 6.80379 31.3 6.88678V6.88839V10C31.3 11.6818 30.2247 13.5328 28.1552 15.025C26.447 16.236 24.4574 16.9898 22.3756 17.2147L22.0199 17.2531L21.8427 17.5639C20.9639 19.1055 19.743 20.4247 18.274 21.42L17.9667 21.6282V21.9995V26.001V26.701H18.6667H21.3333C22.1826 26.701 22.9044 26.9503 23.4002 27.3605C23.8827 27.7596 24.1889 28.3392 24.1889 29.1116V29.7444H7.81111V29.1106C7.81111 28.3382 8.11733 27.7586 8.59983 27.3594C9.09559 26.9493 9.81737 26.7 10.6667 26.7H13.3323H14.0323V26V21.9995V21.6283L13.725 21.42C12.2564 20.4247 11.0358 19.1054 10.1574 17.564L9.98039 17.2535L9.62505 17.2147C7.54356 16.9879 5.5543 16.234 3.8452 15.0245C1.77002 13.5332 0.700004 11.6826 0.700004 10L0.700005 6.88839L0.700002 6.88678C0.699811 6.80383 0.716008 6.72167 0.747663 6.645C0.779317 6.56833 0.825805 6.49867 0.884457 6.44002C0.94311 6.38136 1.01277 6.33487 1.08944 6.30322C1.16611 6.27157 1.24828 6.25537 1.33122 6.25556H1.33283H7.11111H7.81111V5.55556L7.81111 3.33283L7.81111 3.33122C7.81092 3.24824 7.82713 3.16603 7.85882 3.08933C7.8905 3.01263 7.93703 2.94295 7.99574 2.88429L7.50095 2.38912L7.99574 2.88429C8.05444 2.82563 8.12416 2.77915 8.20088 2.74753C8.27761 2.7159 8.35983 2.69975 8.44281 2.70001H8.44495L23.555 2.70001L23.5572 2.7C23.6402 2.69975 23.7224 2.7159 23.7991 2.74753C23.8758 2.77915 23.9456 2.82563 24.0043 2.88429L24.4983 2.38984L24.0043 2.88429C24.063 2.94295 24.1095 3.01263 24.1412 3.08933C24.1729 3.16603 24.1891 3.24824 24.1889 3.33122V3.33283V5.55556V6.25556H24.8889L30.6662 6.25556ZM2.85556 10V10.0718L2.87012 10.142C3.00717 10.8034 3.28265 11.4284 3.67845 11.9757C4.06748 12.5137 4.56408 12.9648 5.13662 13.3004C5.89524 13.8379 6.7276 14.2631 7.60791 14.5626L8.85967 14.9886L8.50822 13.7139C8.0928 12.2072 7.86238 10.6555 7.82205 9.09306L7.80445 8.41112H7.12229H3.55556H2.85556V9.11112V10ZM26.8898 13.2816L26.8898 13.2816L26.8937 13.2788C27.4276 12.8931 27.9694 12.3932 28.3852 11.8533C28.7852 11.3339 29.1444 10.6794 29.1444 10V9.11112V8.41112H28.4444H24.8726H24.1905L24.1729 9.09306C24.1325 10.6555 23.9021 12.2072 23.4867 13.7139L23.1355 14.9877L24.3866 14.5628C25.2789 14.2597 26.1222 13.8281 26.8898 13.2816Z"
                :stroke="activeIndex === 1 ? 'white' :'#757575'" stroke-width="1.4"/>
            </g>
          </svg>

          <p>Leaderboard</p>

        </nuxt-link>
      </li>
      <li class="nav-item updates"
          @click="activeIndex=2"
      >
        <nuxt-link to="/updates"
                   class="nav-link"
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="32" height="32">
              <path d="M32 0L32 32L-1.39876e-06 32L0 -1.39876e-06L32 0Z"
                    :fill="activeIndex === 2 ? 'none' :'#C4C4C4' "/>
            </mask>
            <g mask="url(#mask0)">
              <path
                d="M3.32948 23.1015C5.22854 20.8122 6.56928 19.6468 6.56928 13.3353C6.56928 7.55551 9.56578 5.49635 12.032 4.49627C12.3597 4.36371 12.668 4.05924 12.7679 3.72782C13.2005 2.2776 14.4133 1 16.0254 1C17.6375 1 18.8511 2.27833 19.2793 3.72928C19.3791 4.06434 19.6875 4.36371 20.0151 4.49627C22.4843 5.49781 25.4778 7.54969 25.4778 13.3353C25.4815 19.6468 26.8223 20.8122 28.7213 23.1015C29.5082 24.0499 28.819 25.4739 27.4427 25.4739H4.6007C3.23186 25.4739 2.54707 24.0455 3.32948 23.1015Z"
                :stroke="activeIndex === 2 ? 'white' :'#616161'" stroke-width="1.4" stroke-linecap="round"
                stroke-linejoin="round"/>
              <path
                d="M10.8954 25.4736V26.5789C10.8954 27.7515 11.3944 28.876 12.2828 29.7051C13.1711 30.5342 14.376 31 15.6323 31C16.8886 31 18.0934 30.5342 18.9817 29.7051C19.8701 28.876 20.3691 27.7515 20.3691 26.5789V25.4736"
                :stroke="activeIndex === 2 ? 'white' :'#616161'" stroke-width="1.4" stroke-linecap="round"
                stroke-linejoin="round"/>
            </g>
          </svg>

          <p>Updates</p>

        </nuxt-link>
      </li>
      <li class="nav-item help"
          @click="activeIndex=3"
      >
        <nuxt-link to="/help"
                   class="nav-link"
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M27.7007 8.20812L28.1277 7.78106L27.7679 7.29604C26.9023 6.12937 25.8695 5.09659 24.7028 4.23098L24.2178 3.87111L23.7907 4.29817L19.7005 8.38845L19.0633 9.02561L19.8382 9.48543C20.9399 10.1391 21.8598 11.059 22.5134 12.1606L22.9732 12.9356L23.6104 12.2984L27.7007 8.20812ZM8.20812 4.29931L7.78108 3.87227L7.29606 4.23211C6.12936 5.09771 5.09657 6.13049 4.23098 7.2972L3.87113 7.78222L4.29817 8.20926L8.38846 12.2995L9.02562 12.9367L9.48544 12.1618C10.1391 11.0601 11.059 10.1402 12.1606 9.48657L12.9356 9.02676L12.2984 8.38959L8.20812 4.29931ZM4.29932 23.7919L3.87226 24.2189L4.23213 24.7039C5.09774 25.8706 6.13052 26.9034 7.29719 27.769L7.78221 28.1289L8.20927 27.7018L12.2996 23.6115L12.9367 22.9744L12.1618 22.5146C11.0601 21.8609 10.1403 20.941 9.48658 19.8394L9.02676 19.0644L8.3896 19.7016L4.29932 23.7919ZM24.6671 28.5135L25.6347 27.5019L25.3722 27.2428C26.2678 26.4947 27.0725 25.6427 27.769 24.7039L28.1289 24.2189L27.7018 23.7919L23.6115 19.7016L22.9744 19.0644L22.5146 19.8394C21.8609 20.941 20.941 21.8609 19.8394 22.5146L19.0593 22.9774L19.7048 23.6147L23.244 27.109L23.1925 27.1472L23.8111 27.7203L24.6671 28.5135ZM7.49978 3.27851C10.0159 1.59733 12.9739 0.7 16 0.7C20.0578 0.7 23.9494 2.31196 26.8187 5.18126C29.688 8.05057 31.3 11.9422 31.3 16C31.3 19.026 30.4027 21.9841 28.7215 24.5002C27.0403 27.0163 24.6508 28.9773 21.8551 30.1354C19.0593 31.2934 15.983 31.5964 13.0151 31.006C10.0472 30.4157 7.32102 28.9585 5.18127 26.8187C3.04153 24.679 1.58435 21.9528 0.993992 18.9849C0.403639 16.017 0.70663 12.9406 1.86465 10.1449C3.02267 7.34923 4.98371 4.9597 7.49978 3.27851ZM12.1704 21.7314C13.304 22.4889 14.6367 22.8931 16 22.8931C17.8282 22.8931 19.5815 22.1669 20.8742 20.8742C22.1669 19.5815 22.8931 17.8282 22.8931 16C22.8931 14.6367 22.4889 13.3039 21.7314 12.1704C20.974 11.0368 19.8974 10.1533 18.6379 9.63156C17.3783 9.10984 15.9924 8.97333 14.6552 9.2393C13.3181 9.50528 12.0898 10.1618 11.1258 11.1258C10.1618 12.0898 9.50529 13.3181 9.23931 14.6552C8.97334 15.9923 9.10984 17.3783 9.63157 18.6379C10.1533 19.8974 11.0368 20.974 12.1704 21.7314Z"
              :stroke="activeIndex === 3 ?'white':'#757575'" stroke-width="1.4"/>
            <path
              d="M18.854 9.14286L24.5683 4L27.9969 8C26.2826 9.90476 22.854 13.4857 22.854 12.5714C22.854 11.6571 20.1873 9.90476 18.854 9.14286Z"
              :fill="activeIndex === 3? 'white':'#757575'"/>
            <path
              d="M9.12884 12.6426L3.50849 7.0544L7.70119 3.52976C9.77367 5.19744 13.6746 8.53834 12.6985 8.5605C11.7224 8.58266 9.91201 11.2911 9.12884 12.6426Z"
              :fill="activeIndex === 3? 'white':'#757575'"/>
            <path
              d="M25.1288 28.6556L19.5085 23.0675L23.7012 19.5428C25.7737 21.2105 29.6746 24.5514 28.6985 24.5736C27.7224 24.5957 25.912 27.3042 25.1288 28.6556Z"
              :fill="activeIndex === 3? 'white':'#757575'"/>
            <path
              d="M12.6191 23.0031L6.97372 28.2215L3.49224 24.2675C5.18103 22.3401 8.56165 18.7139 8.57382 19.6281C8.58598 20.5423 11.2757 22.259 12.6191 23.0031Z"
              :fill="activeIndex === 3? 'white':'#757575'"/>
          </svg>


          <p>Help</p>

        </nuxt-link>
      </li>
    </ul>
  </section>
</template>

<script>
  import Fas from "@/components/font-awsome/Fas.vue";

  export default {
    name: "Sidebar",


    components: {Fas},
    data() {
      return {
        activeIndex: 0,
        forest: ``,
        activeForest: ``,
        user: false,
        hasSideBar: true,
      };
    },
    created() {
      if (process.client) {
        const history = this.$router.history.current.fullPath
        const href = document.querySelectorAll(`a[href='${history}']`)

        console.log(href, 'href here')
        switch (history) {
          case '/myForest':
            return this.activeIndex = 0;
            href.classList.toggle("nuxt-link-exact-active");


            break;
          case  '/leaderboard':
            return this.activeIndex = 1;
            href.classList.toggle("nuxt-link-exact-active");
            break;
          case  '/updates':
            return this.activeIndex = 2;
            href.classList.toggle("nuxt-link-exact-active");
            break;
          case  '/help':
            return this.activeIndex = 3;
            href.classList.toggle("nuxt-link-exact-active");
            break;
          default:
            return this.activeIndex = 0;
        }
      }
      debugger


    },

    methods: {
      // activeMenu(item, index) {
      //   switch (this.$route.path) {
      //     case '/myForest':
      //       return this.activeIndex = 0;
      //       break;
      //     case  '/Leaderboard':
      //       return this.activeIndex = 1;
      //       break;
      //     case  '/updates':
      //       return this.activeIndex = 2;
      //       break;
      //     case  '/help':
      //       return this.activeIndex = 3;
      //       break;
      //     default:
      //       return this.activeIndex = 0;
      //   }
      // },
      store(status) {
        return this.$store.dispatch('hasDashboard', {
          status
        })
      },

    },
  };
</script>

<style lang="scss" scoped>
section.sidebar {
  ul {
    padding-left: 10px;
  }

  a {
    text-decoration: none;
    color: #757575;
  }

  ul li a.nuxt-link-exact-active, ul li a.active-link {

    text-align: center;
    border-radius: 10px;
    box-shadow: 0 4px 22px 0 rgba(0, 0, 0, 0.16);
    background-color: #67b68c;

    p {
      color: white;
    }

    svg, path, mask {

    }
  }
    ul li a {
      text-align: center;
      position: relative;
      align-items: center;
      align-self: center;
      vertical-align: middle;
      width: 80px;
      height: 80px;
      padding: 15px 0;
      margin-bottom: 15px;

    svg {
      font-size: 30px;
      margin-top: 0px;
    }

    p {
      font-size: 10px;
    }
  }
}
@media (min-width: 100px) and (max-width: 1023px) {

 .sidebar{
   .nav.flex-column{
     flex-direction: row!important;
     justify-content: space-between;
   }

 }
}
</style>

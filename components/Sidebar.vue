<template>
  <section class="sidebar col-lg-2 d-md-block">
    <ul class="nav pt-4 desktop-sidebar flex-column d-none d-lg-block">
      <li class="nav-item forest" @click="changeIndex(0)">
        <nuxt-link
          :class="$store.state.index === 0 ? 'nuxt-link-exact-active' : ''"
          :to="
            localePath(
              $cookies.get('account')
                ? '/forest/' + $cookies.get('account')
                : '/forest/guest'
            )
          "
          class="nav-link"
        >
          <svg
            fill="none"
            height="32"
            viewBox="0 0 32 32"
            width="32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0"
              height="32"
              mask-type="alpha"
              maskUnits="userSpaceOnUse"
              width="32"
              x="0"
              y="0"
            >
              <path
                :fill="$store.state.index === 0 ? 'white' : '#C4C4C4'"
                d="M32 0L32 32L-1.39876e-06 32L0 -1.39876e-06L32 0Z"
              />
            </mask>
            <g mask="url(#mask0)">
              <path
                :stroke="$store.state.index === 0 ? 'white' : '#616161'"
                d="M23.7576 6H8.59337C4.39967 6 1 9.39967 1 13.5934C1 17.7871 4.39967 21.1867 8.59337 21.1867H23.7576C27.9513 21.1867 31.351 17.7871 31.351 13.5934C31.351 9.39967 27.9513 6 23.7576 6Z"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.4"
              />
              <path
                :stroke="$store.state.index === 0 ? 'white' : '#616161'"
                d="M8.65186 11.4419L8.65185 27.7674"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.4"
              />
              <path
                :stroke="$store.state.index === 0 ? 'white' : '#616161'"
                d="M16.8145 9.17407L16.8145 27.767"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.4"
              />
              <path
                :stroke="$store.state.index === 0 ? 'white' : '#616161'"
                d="M23.1626 14.1627L23.1626 27.7673"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.4"
              />
              <path
                :stroke="$store.state.index === 0 ? 'white' : '#616161'"
                d="M16.7939 15.7299C16.7939 15.7299 20.9102 13.7796 21.5605 10.3137"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.4"
              />
              <path
                :stroke="$store.state.index === 0 ? 'white' : '#616161'"
                d="M8.28333 17.409C8.28333 17.409 4.81666 17.6232 5.03317 13.7202"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.4"
              />
              <path
                :stroke="$store.state.index === 0 ? 'white' : '#616161'"
                d="M23.3965 18.5282C23.3965 18.5282 26.4124 18.7688 27.1085 15.9797"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.4"
              />
              <path
                :stroke="$store.state.index === 0 ? 'white' : '#616161'"
                d="M16.0067 18.496C15.3828 18.4811 14.7692 18.3345 14.2059 18.066C13.6426 17.7976 13.1423 17.4132 12.7378 16.938C12.3333 16.4629 12.0336 15.9077 11.8585 15.3087C11.6833 14.7098 11.6365 14.0806 11.7212 13.4624"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.4"
              />
            </g>
          </svg>

          <p>{{ $t("sidebar.myforest") }}</p>
        </nuxt-link>
      </li>

      <li class="nav-item treebox" @click="changeIndex(4)">
        <nuxt-link
          :class="$store.state.index === 4 ? 'nuxt-link-exact-active' : ''"
          class="nav-link"
          :to="localePath('/forest/treebox')"
        >
          <img
            :src="$store.state.index === 4 ? treeboxIconActive : treeboxIcon"
            alt=""
          />
          <p>{{ $t("sidebar.treebox") }}</p>
        </nuxt-link>
      </li>

      <li class="nav-item referral" @click="changeIndex(1)">
        <nuxt-link
          :class="$store.state.index === 1 ? 'nuxt-link-exact-active' : ''"
          class="nav-link"
          :to="localePath('/forest/referral')"
        >
          <svg
            fill="none"
            height="31"
            viewBox="0 0 25 31"
            width="25"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              :stroke="$store.state.index === 1 ? 'white' : '#757575'"
              d="M11.1544 11.629C8.77952 11.2094 7.14901 10.5697 5.98043 9.46676C4.81583 8.36759 4.01349 6.71611 3.50096 4.06321C3.41264 3.60602 3.82873 3.21087 4.2999 3.34309C6.58151 3.98331 8.18389 4.74262 9.35475 5.86703C10.517 6.98311 11.3251 8.52819 11.8788 10.879C11.9804 11.3101 11.6138 11.7102 11.1544 11.629Z"
              stroke-width="1.5"
            />
            <path
              :stroke="$store.state.index === 1 ? 'white' : '#757575'"
              d="M11.1544 24.2638C8.77952 23.8442 7.14901 23.2045 5.98043 22.1015C4.81583 21.0024 4.01349 19.3509 3.50096 16.698C3.41264 16.2408 3.82873 15.8456 4.2999 15.9779C6.58151 16.6181 8.18389 17.3774 9.35475 18.5018C10.517 19.6179 11.3251 21.163 11.8788 23.5137C11.9804 23.9449 11.6138 24.3449 11.1544 24.2638Z"
              stroke-width="1.5"
            />
            <path
              :stroke="$store.state.index === 1 ? 'white' : '#757575'"
              d="M13.3877 18.2638C15.7626 17.8442 17.3931 17.2045 18.5617 16.1015C19.7263 15.0024 20.5286 13.3509 21.0412 10.698C21.1295 10.2408 20.7134 9.84564 20.2422 9.97785C17.9606 10.6181 16.3582 11.3774 15.1874 12.5018C14.0252 13.6179 13.217 15.163 12.6633 17.5137C12.5617 17.9449 12.9283 18.3449 13.3877 18.2638Z"
              stroke-width="1.5"
            />
            <line
              :stroke="$store.state.index === 1 ? 'white' : '#757575'"
              stroke-linecap="round"
              stroke-width="1.5"
              x1="12.25"
              x2="12.25"
              y1="2.38477"
              y2="29.8848"
            />
          </svg>

          <p>{{ $t("sidebar.invite") }}</p>
        </nuxt-link>
      </li>
      <li class="nav-item Leaderboard" @click="changeIndex(2)">
        <nuxt-link
          :class="$store.state.index === 2 ? 'nuxt-link-exact-active' : ''"
          class="nav-link"
          :to="localePath('/forest/leaderboard')"
        >
          <svg
            fill="none"
            height="32"
            viewBox="0 0 32 32"
            width="32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0"
              height="32"
              mask-type="alpha"
              maskUnits="userSpaceOnUse"
              width="32"
              x="0"
              y="0"
            >
              <path
                d="M32 0L32 32L-1.39876e-06 32L0 -1.39876e-06L32 0Z"
                fill="#C4C4C4"
              />
            </mask>
            <g mask="url(#mask0)">
              <path
                :stroke="$store.state.index === 2 ? 'white' : '#757575'"
                d="M30.6662 6.25556L30.6683 6.25556C30.7513 6.2553 30.8335 6.27145 30.9102 6.30308C30.9869 6.33471 31.0567 6.38118 31.1154 6.43984C31.1741 6.4985 31.2206 6.56818 31.2523 6.64489C31.284 6.72158 31.3002 6.80379 31.3 6.88678V6.88839V10C31.3 11.6818 30.2247 13.5328 28.1552 15.025C26.447 16.236 24.4574 16.9898 22.3756 17.2147L22.0199 17.2531L21.8427 17.5639C20.9639 19.1055 19.743 20.4247 18.274 21.42L17.9667 21.6282V21.9995V26.001V26.701H18.6667H21.3333C22.1826 26.701 22.9044 26.9503 23.4002 27.3605C23.8827 27.7596 24.1889 28.3392 24.1889 29.1116V29.7444H7.81111V29.1106C7.81111 28.3382 8.11733 27.7586 8.59983 27.3594C9.09559 26.9493 9.81737 26.7 10.6667 26.7H13.3323H14.0323V26V21.9995V21.6283L13.725 21.42C12.2564 20.4247 11.0358 19.1054 10.1574 17.564L9.98039 17.2535L9.62505 17.2147C7.54356 16.9879 5.5543 16.234 3.8452 15.0245C1.77002 13.5332 0.700004 11.6826 0.700004 10L0.700005 6.88839L0.700002 6.88678C0.699811 6.80383 0.716008 6.72167 0.747663 6.645C0.779317 6.56833 0.825805 6.49867 0.884457 6.44002C0.94311 6.38136 1.01277 6.33487 1.08944 6.30322C1.16611 6.27157 1.24828 6.25537 1.33122 6.25556H1.33283H7.11111H7.81111V5.55556L7.81111 3.33283L7.81111 3.33122C7.81092 3.24824 7.82713 3.16603 7.85882 3.08933C7.8905 3.01263 7.93703 2.94295 7.99574 2.88429L7.50095 2.38912L7.99574 2.88429C8.05444 2.82563 8.12416 2.77915 8.20088 2.74753C8.27761 2.7159 8.35983 2.69975 8.44281 2.70001H8.44495L23.555 2.70001L23.5572 2.7C23.6402 2.69975 23.7224 2.7159 23.7991 2.74753C23.8758 2.77915 23.9456 2.82563 24.0043 2.88429L24.4983 2.38984L24.0043 2.88429C24.063 2.94295 24.1095 3.01263 24.1412 3.08933C24.1729 3.16603 24.1891 3.24824 24.1889 3.33122V3.33283V5.55556V6.25556H24.8889L30.6662 6.25556ZM2.85556 10V10.0718L2.87012 10.142C3.00717 10.8034 3.28265 11.4284 3.67845 11.9757C4.06748 12.5137 4.56408 12.9648 5.13662 13.3004C5.89524 13.8379 6.7276 14.2631 7.60791 14.5626L8.85967 14.9886L8.50822 13.7139C8.0928 12.2072 7.86238 10.6555 7.82205 9.09306L7.80445 8.41112H7.12229H3.55556H2.85556V9.11112V10ZM26.8898 13.2816L26.8898 13.2816L26.8937 13.2788C27.4276 12.8931 27.9694 12.3932 28.3852 11.8533C28.7852 11.3339 29.1444 10.6794 29.1444 10V9.11112V8.41112H28.4444H24.8726H24.1905L24.1729 9.09306C24.1325 10.6555 23.9021 12.2072 23.4867 13.7139L23.1355 14.9877L24.3866 14.5628C25.2789 14.2597 26.1222 13.8281 26.8898 13.2816Z"
                stroke-width="1.4"
              />
            </g>
          </svg>

          <p>{{ $t("sidebar.leaderboard") }}</p>
        </nuxt-link>
      </li>
      <li class="nav-item updates" @click="changeIndex(3)">
        <nuxt-link
          :class="$store.state.index === 3 ? 'nuxt-link-exact-active' : ''"
          class="nav-link"
          :to="localePath('/forest/activity')"
        >
          <svg
            fill="none"
            height="32"
            viewBox="0 0 32 32"
            width="32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0"
              height="32"
              mask-type="alpha"
              maskUnits="userSpaceOnUse"
              width="32"
              x="0"
              y="0"
            >
              <path
                :fill="$store.state.index === 3 ? 'none' : '#C4C4C4'"
                d="M32 0L32 32L-1.39876e-06 32L0 -1.39876e-06L32 0Z"
              />
            </mask>
            <g mask="url(#mask0)">
              <path
                :stroke="$store.state.index === 3 ? 'white' : '#616161'"
                d="M3.32948 23.1015C5.22854 20.8122 6.56928 19.6468 6.56928 13.3353C6.56928 7.55551 9.56578 5.49635 12.032 4.49627C12.3597 4.36371 12.668 4.05924 12.7679 3.72782C13.2005 2.2776 14.4133 1 16.0254 1C17.6375 1 18.8511 2.27833 19.2793 3.72928C19.3791 4.06434 19.6875 4.36371 20.0151 4.49627C22.4843 5.49781 25.4778 7.54969 25.4778 13.3353C25.4815 19.6468 26.8223 20.8122 28.7213 23.1015C29.5082 24.0499 28.819 25.4739 27.4427 25.4739H4.6007C3.23186 25.4739 2.54707 24.0455 3.32948 23.1015Z"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.4"
              />
              <path
                :stroke="$store.state.index === 3 ? 'white' : '#616161'"
                d="M10.8954 25.4736V26.5789C10.8954 27.7515 11.3944 28.876 12.2828 29.7051C13.1711 30.5342 14.376 31 15.6323 31C16.8886 31 18.0934 30.5342 18.9817 29.7051C19.8701 28.876 20.3691 27.7515 20.3691 26.5789V25.4736"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.4"
              />
            </g>
          </svg>

          <p>{{ $t("sidebar.activity") }}</p>
        </nuxt-link>
      </li>

      <li class="nav-item help">
        <a
          class="nav-link pointer-event"
          href="https://discuss.treejer.com/"
          target="_blank"
        >
          <svg
            fill="none"
            height="32"
            viewBox="0 0 32 32"
            width="32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              :stroke="'#757575'"
              d="M27.7007 8.20812L28.1277 7.78106L27.7679 7.29604C26.9023 6.12937 25.8695 5.09659 24.7028 4.23098L24.2178 3.87111L23.7907 4.29817L19.7005 8.38845L19.0633 9.02561L19.8382 9.48543C20.9399 10.1391 21.8598 11.059 22.5134 12.1606L22.9732 12.9356L23.6104 12.2984L27.7007 8.20812ZM8.20812 4.29931L7.78108 3.87227L7.29606 4.23211C6.12936 5.09771 5.09657 6.13049 4.23098 7.2972L3.87113 7.78222L4.29817 8.20926L8.38846 12.2995L9.02562 12.9367L9.48544 12.1618C10.1391 11.0601 11.059 10.1402 12.1606 9.48657L12.9356 9.02676L12.2984 8.38959L8.20812 4.29931ZM4.29932 23.7919L3.87226 24.2189L4.23213 24.7039C5.09774 25.8706 6.13052 26.9034 7.29719 27.769L7.78221 28.1289L8.20927 27.7018L12.2996 23.6115L12.9367 22.9744L12.1618 22.5146C11.0601 21.8609 10.1403 20.941 9.48658 19.8394L9.02676 19.0644L8.3896 19.7016L4.29932 23.7919ZM24.6671 28.5135L25.6347 27.5019L25.3722 27.2428C26.2678 26.4947 27.0725 25.6427 27.769 24.7039L28.1289 24.2189L27.7018 23.7919L23.6115 19.7016L22.9744 19.0644L22.5146 19.8394C21.8609 20.941 20.941 21.8609 19.8394 22.5146L19.0593 22.9774L19.7048 23.6147L23.244 27.109L23.1925 27.1472L23.8111 27.7203L24.6671 28.5135ZM7.49978 3.27851C10.0159 1.59733 12.9739 0.7 16 0.7C20.0578 0.7 23.9494 2.31196 26.8187 5.18126C29.688 8.05057 31.3 11.9422 31.3 16C31.3 19.026 30.4027 21.9841 28.7215 24.5002C27.0403 27.0163 24.6508 28.9773 21.8551 30.1354C19.0593 31.2934 15.983 31.5964 13.0151 31.006C10.0472 30.4157 7.32102 28.9585 5.18127 26.8187C3.04153 24.679 1.58435 21.9528 0.993992 18.9849C0.403639 16.017 0.70663 12.9406 1.86465 10.1449C3.02267 7.34923 4.98371 4.9597 7.49978 3.27851ZM12.1704 21.7314C13.304 22.4889 14.6367 22.8931 16 22.8931C17.8282 22.8931 19.5815 22.1669 20.8742 20.8742C22.1669 19.5815 22.8931 17.8282 22.8931 16C22.8931 14.6367 22.4889 13.3039 21.7314 12.1704C20.974 11.0368 19.8974 10.1533 18.6379 9.63156C17.3783 9.10984 15.9924 8.97333 14.6552 9.2393C13.3181 9.50528 12.0898 10.1618 11.1258 11.1258C10.1618 12.0898 9.50529 13.3181 9.23931 14.6552C8.97334 15.9923 9.10984 17.3783 9.63157 18.6379C10.1533 19.8974 11.0368 20.974 12.1704 21.7314Z"
              stroke-width="1.4"
            />
            <path
              :fill="'#757575'"
              d="M18.854 9.14286L24.5683 4L27.9969 8C26.2826 9.90476 22.854 13.4857 22.854 12.5714C22.854 11.6571 20.1873 9.90476 18.854 9.14286Z"
            />
            <path
              :fill="'#757575'"
              d="M9.12884 12.6426L3.50849 7.0544L7.70119 3.52976C9.77367 5.19744 13.6746 8.53834 12.6985 8.5605C11.7224 8.58266 9.91201 11.2911 9.12884 12.6426Z"
            />
            <path
              :fill="'#757575'"
              d="M25.1288 28.6556L19.5085 23.0675L23.7012 19.5428C25.7737 21.2105 29.6746 24.5514 28.6985 24.5736C27.7224 24.5957 25.912 27.3042 25.1288 28.6556Z"
            />
            <path
              :fill="'#757575'"
              d="M12.6191 23.0031L6.97372 28.2215L3.49224 24.2675C5.18103 22.3401 8.56165 18.7139 8.57382 19.6281C8.58598 20.5423 11.2757 22.259 12.6191 23.0031Z"
            />
          </svg>

          <p>{{ $t("sidebar.gethelp") }}</p>
        </a>
      </li>
    </ul>
    <div class="d-lg-none d-block mobile-sidebars">
      <img
        src="../assets/images/sidebar/burger-menu.svg"
        width="32"
        height="16"
        class="pointer-event float-right burger-menu-open"
        alt="burger-menu"
        @click="$store.commit('SET_MOBILE_SIDEBAR', true)"
      />
      <div
        v-if="$store.state.showMobileSidebar"
        class="sidebar-box text-right page-enter-active"
      >
        <img
          class="pointer-event close-sidebar"
          src="../assets/images/sidebar/close.png"
          width="32"
          height="16"
          alt="burger-menu"
          @click="$store.commit('SET_MOBILE_SIDEBAR', false)"
        />
        <b-navbar-nav class="mobile-navbar">
          <client-only>
            <div class="d-lg-none d-block w-md-100">
              <Metamask :mobile="true" @showModal="showModal()" />
            </div>
          </client-only>
        </b-navbar-nav>
        <ul
          class="
            mobile-nav
            d-flex
            flex-column
            text-center
            justify-content-center
          "
        >
          <li class="nav-item forest" @click="changeIndex(0)">
            <nuxt-link
              :class="$store.state.index === 0 ? 'nuxt-link-exact-active' : ''"
              :to="
                localePath(
                  $cookies.get('account')
                    ? '/forest/' + $cookies.get('account')
                    : '/forest/guest'
                )
              "
              class="nav-link"
            >
              <svg
                fill="none"
                height="32"
                viewBox="0 0 32 32"
                width="32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="mask0"
                  height="32"
                  mask-type="alpha"
                  maskUnits="userSpaceOnUse"
                  width="32"
                  x="0"
                  y="0"
                >
                  <path
                    fill="white"
                    d="M32 0L32 32L-1.39876e-06 32L0 -1.39876e-06L32 0Z"
                  />
                </mask>
                <g mask="url(#mask0)">
                  <path
                    stroke="white"
                    d="M23.7576 6H8.59337C4.39967 6 1 9.39967 1 13.5934C1 17.7871 4.39967 21.1867 8.59337 21.1867H23.7576C27.9513 21.1867 31.351 17.7871 31.351 13.5934C31.351 9.39967 27.9513 6 23.7576 6Z"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.4"
                  />
                  <path
                    stroke="white"
                    d="M8.65186 11.4419L8.65185 27.7674"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.4"
                  />
                  <path
                    stroke="white"
                    d="M16.8145 9.17407L16.8145 27.767"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.4"
                  />
                  <path
                    stroke="white"
                    d="M23.1626 14.1627L23.1626 27.7673"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.4"
                  />
                  <path
                    stroke="white"
                    d="M16.7939 15.7299C16.7939 15.7299 20.9102 13.7796 21.5605 10.3137"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.4"
                  />
                  <path
                    stroke="white"
                    d="M8.28333 17.409C8.28333 17.409 4.81666 17.6232 5.03317 13.7202"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.4"
                  />
                  <path
                    stroke="white"
                    d="M23.3965 18.5282C23.3965 18.5282 26.4124 18.7688 27.1085 15.9797"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.4"
                  />
                  <path
                    stroke="white"
                    d="M16.0067 18.496C15.3828 18.4811 14.7692 18.3345 14.2059 18.066C13.6426 17.7976 13.1423 17.4132 12.7378 16.938C12.3333 16.4629 12.0336 15.9077 11.8585 15.3087C11.6833 14.7098 11.6365 14.0806 11.7212 13.4624"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.4"
                  />
                </g>
              </svg>

              <p>{{ $t("sidebar.myforest") }}</p>
            </nuxt-link>
          </li>

          <li class="nav-item treebox" @click="changeIndex(4)">
            <nuxt-link
              :class="$store.state.index === 4 ? 'nuxt-link-exact-active' : ''"
              class="nav-link"
              :to="localePath('/forest/treebox')"
            >
              <img :src="treeboxIconActive" alt="" />
              <p>{{ $t("sidebar.treebox") }}</p>
            </nuxt-link>
          </li>

          <li class="nav-item referral" @click="changeIndex(1)">
            <nuxt-link
              :class="$store.state.index === 1 ? 'nuxt-link-exact-active' : ''"
              class="nav-link"
              :to="localePath('/forest/referral')"
            >
              <svg
                fill="none"
                height="31"
                viewBox="0 0 25 31"
                width="25"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke="white"
                  d="M11.1544 11.629C8.77952 11.2094 7.14901 10.5697 5.98043 9.46676C4.81583 8.36759 4.01349 6.71611 3.50096 4.06321C3.41264 3.60602 3.82873 3.21087 4.2999 3.34309C6.58151 3.98331 8.18389 4.74262 9.35475 5.86703C10.517 6.98311 11.3251 8.52819 11.8788 10.879C11.9804 11.3101 11.6138 11.7102 11.1544 11.629Z"
                  stroke-width="1.5"
                />
                <path
                  stroke="white"
                  d="M11.1544 24.2638C8.77952 23.8442 7.14901 23.2045 5.98043 22.1015C4.81583 21.0024 4.01349 19.3509 3.50096 16.698C3.41264 16.2408 3.82873 15.8456 4.2999 15.9779C6.58151 16.6181 8.18389 17.3774 9.35475 18.5018C10.517 19.6179 11.3251 21.163 11.8788 23.5137C11.9804 23.9449 11.6138 24.3449 11.1544 24.2638Z"
                  stroke-width="1.5"
                />
                <path
                  stroke="white"
                  d="M13.3877 18.2638C15.7626 17.8442 17.3931 17.2045 18.5617 16.1015C19.7263 15.0024 20.5286 13.3509 21.0412 10.698C21.1295 10.2408 20.7134 9.84564 20.2422 9.97785C17.9606 10.6181 16.3582 11.3774 15.1874 12.5018C14.0252 13.6179 13.217 15.163 12.6633 17.5137C12.5617 17.9449 12.9283 18.3449 13.3877 18.2638Z"
                  stroke-width="1.5"
                />
                <line
                  stroke="white"
                  stroke-linecap="round"
                  stroke-width="1.5"
                  x1="12.25"
                  x2="12.25"
                  y1="2.38477"
                  y2="29.8848"
                />
              </svg>

              <p>{{ $t("sidebar.invite") }}</p>
            </nuxt-link>
          </li>
          <li class="nav-item Leaderboard" @click="changeIndex(2)">
            <nuxt-link
              :class="$store.state.index === 2 ? 'nuxt-link-exact-active' : ''"
              class="nav-link"
              :to="localePath('/forest/leaderboard')"
            >
              <svg
                fill="none"
                height="32"
                viewBox="0 0 32 32"
                width="32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="mask0"
                  height="32"
                  mask-type="alpha"
                  maskUnits="userSpaceOnUse"
                  width="32"
                  x="0"
                  y="0"
                >
                  <path
                    d="M32 0L32 32L-1.39876e-06 32L0 -1.39876e-06L32 0Z"
                    fill="#C4C4C4"
                  />
                </mask>
                <g mask="url(#mask0)">
                  <path
                    stroke="white"
                    d="M30.6662 6.25556L30.6683 6.25556C30.7513 6.2553 30.8335 6.27145 30.9102 6.30308C30.9869 6.33471 31.0567 6.38118 31.1154 6.43984C31.1741 6.4985 31.2206 6.56818 31.2523 6.64489C31.284 6.72158 31.3002 6.80379 31.3 6.88678V6.88839V10C31.3 11.6818 30.2247 13.5328 28.1552 15.025C26.447 16.236 24.4574 16.9898 22.3756 17.2147L22.0199 17.2531L21.8427 17.5639C20.9639 19.1055 19.743 20.4247 18.274 21.42L17.9667 21.6282V21.9995V26.001V26.701H18.6667H21.3333C22.1826 26.701 22.9044 26.9503 23.4002 27.3605C23.8827 27.7596 24.1889 28.3392 24.1889 29.1116V29.7444H7.81111V29.1106C7.81111 28.3382 8.11733 27.7586 8.59983 27.3594C9.09559 26.9493 9.81737 26.7 10.6667 26.7H13.3323H14.0323V26V21.9995V21.6283L13.725 21.42C12.2564 20.4247 11.0358 19.1054 10.1574 17.564L9.98039 17.2535L9.62505 17.2147C7.54356 16.9879 5.5543 16.234 3.8452 15.0245C1.77002 13.5332 0.700004 11.6826 0.700004 10L0.700005 6.88839L0.700002 6.88678C0.699811 6.80383 0.716008 6.72167 0.747663 6.645C0.779317 6.56833 0.825805 6.49867 0.884457 6.44002C0.94311 6.38136 1.01277 6.33487 1.08944 6.30322C1.16611 6.27157 1.24828 6.25537 1.33122 6.25556H1.33283H7.11111H7.81111V5.55556L7.81111 3.33283L7.81111 3.33122C7.81092 3.24824 7.82713 3.16603 7.85882 3.08933C7.8905 3.01263 7.93703 2.94295 7.99574 2.88429L7.50095 2.38912L7.99574 2.88429C8.05444 2.82563 8.12416 2.77915 8.20088 2.74753C8.27761 2.7159 8.35983 2.69975 8.44281 2.70001H8.44495L23.555 2.70001L23.5572 2.7C23.6402 2.69975 23.7224 2.7159 23.7991 2.74753C23.8758 2.77915 23.9456 2.82563 24.0043 2.88429L24.4983 2.38984L24.0043 2.88429C24.063 2.94295 24.1095 3.01263 24.1412 3.08933C24.1729 3.16603 24.1891 3.24824 24.1889 3.33122V3.33283V5.55556V6.25556H24.8889L30.6662 6.25556ZM2.85556 10V10.0718L2.87012 10.142C3.00717 10.8034 3.28265 11.4284 3.67845 11.9757C4.06748 12.5137 4.56408 12.9648 5.13662 13.3004C5.89524 13.8379 6.7276 14.2631 7.60791 14.5626L8.85967 14.9886L8.50822 13.7139C8.0928 12.2072 7.86238 10.6555 7.82205 9.09306L7.80445 8.41112H7.12229H3.55556H2.85556V9.11112V10ZM26.8898 13.2816L26.8898 13.2816L26.8937 13.2788C27.4276 12.8931 27.9694 12.3932 28.3852 11.8533C28.7852 11.3339 29.1444 10.6794 29.1444 10V9.11112V8.41112H28.4444H24.8726H24.1905L24.1729 9.09306C24.1325 10.6555 23.9021 12.2072 23.4867 13.7139L23.1355 14.9877L24.3866 14.5628C25.2789 14.2597 26.1222 13.8281 26.8898 13.2816Z"
                    stroke-width="1.4"
                  />
                </g>
              </svg>

              <p>{{ $t("sidebar.leaderboard") }}</p>
            </nuxt-link>
          </li>
          <li class="nav-item updates" @click="changeIndex(3)">
            <nuxt-link
              :class="$store.state.index === 3 ? 'nuxt-link-exact-active' : ''"
              class="nav-link"
              :to="localePath('/forest/activity')"
            >
              <svg
                fill="none"
                height="32"
                viewBox="0 0 32 32"
                width="32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="mask0"
                  height="32"
                  mask-type="alpha"
                  maskUnits="userSpaceOnUse"
                  width="32"
                  x="0"
                  y="0"
                >
                  <path
                    :fill="$store.state.index === 3 ? 'none' : '#C4C4C4'"
                    d="M32 0L32 32L-1.39876e-06 32L0 -1.39876e-06L32 0Z"
                  />
                </mask>
                <g mask="url(#mask0)">
                  <path
                    stroke="white"
                    d="M3.32948 23.1015C5.22854 20.8122 6.56928 19.6468 6.56928 13.3353C6.56928 7.55551 9.56578 5.49635 12.032 4.49627C12.3597 4.36371 12.668 4.05924 12.7679 3.72782C13.2005 2.2776 14.4133 1 16.0254 1C17.6375 1 18.8511 2.27833 19.2793 3.72928C19.3791 4.06434 19.6875 4.36371 20.0151 4.49627C22.4843 5.49781 25.4778 7.54969 25.4778 13.3353C25.4815 19.6468 26.8223 20.8122 28.7213 23.1015C29.5082 24.0499 28.819 25.4739 27.4427 25.4739H4.6007C3.23186 25.4739 2.54707 24.0455 3.32948 23.1015Z"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.4"
                  />
                  <path
                    stroke="white"
                    d="M10.8954 25.4736V26.5789C10.8954 27.7515 11.3944 28.876 12.2828 29.7051C13.1711 30.5342 14.376 31 15.6323 31C16.8886 31 18.0934 30.5342 18.9817 29.7051C19.8701 28.876 20.3691 27.7515 20.3691 26.5789V25.4736"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.4"
                  />
                </g>
              </svg>

              <p>{{ $t("sidebar.activity") }}</p>
            </nuxt-link>
          </li>

          <li class="nav-item help">
            <a
              class="nav-link pointer-event"
              href="https://discuss.treejer.com/"
              target="_blank"
            >
              <svg
                fill="none"
                height="32"
                viewBox="0 0 32 32"
                width="32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke="white"
                  d="M27.7007 8.20812L28.1277 7.78106L27.7679 7.29604C26.9023 6.12937 25.8695 5.09659 24.7028 4.23098L24.2178 3.87111L23.7907 4.29817L19.7005 8.38845L19.0633 9.02561L19.8382 9.48543C20.9399 10.1391 21.8598 11.059 22.5134 12.1606L22.9732 12.9356L23.6104 12.2984L27.7007 8.20812ZM8.20812 4.29931L7.78108 3.87227L7.29606 4.23211C6.12936 5.09771 5.09657 6.13049 4.23098 7.2972L3.87113 7.78222L4.29817 8.20926L8.38846 12.2995L9.02562 12.9367L9.48544 12.1618C10.1391 11.0601 11.059 10.1402 12.1606 9.48657L12.9356 9.02676L12.2984 8.38959L8.20812 4.29931ZM4.29932 23.7919L3.87226 24.2189L4.23213 24.7039C5.09774 25.8706 6.13052 26.9034 7.29719 27.769L7.78221 28.1289L8.20927 27.7018L12.2996 23.6115L12.9367 22.9744L12.1618 22.5146C11.0601 21.8609 10.1403 20.941 9.48658 19.8394L9.02676 19.0644L8.3896 19.7016L4.29932 23.7919ZM24.6671 28.5135L25.6347 27.5019L25.3722 27.2428C26.2678 26.4947 27.0725 25.6427 27.769 24.7039L28.1289 24.2189L27.7018 23.7919L23.6115 19.7016L22.9744 19.0644L22.5146 19.8394C21.8609 20.941 20.941 21.8609 19.8394 22.5146L19.0593 22.9774L19.7048 23.6147L23.244 27.109L23.1925 27.1472L23.8111 27.7203L24.6671 28.5135ZM7.49978 3.27851C10.0159 1.59733 12.9739 0.7 16 0.7C20.0578 0.7 23.9494 2.31196 26.8187 5.18126C29.688 8.05057 31.3 11.9422 31.3 16C31.3 19.026 30.4027 21.9841 28.7215 24.5002C27.0403 27.0163 24.6508 28.9773 21.8551 30.1354C19.0593 31.2934 15.983 31.5964 13.0151 31.006C10.0472 30.4157 7.32102 28.9585 5.18127 26.8187C3.04153 24.679 1.58435 21.9528 0.993992 18.9849C0.403639 16.017 0.70663 12.9406 1.86465 10.1449C3.02267 7.34923 4.98371 4.9597 7.49978 3.27851ZM12.1704 21.7314C13.304 22.4889 14.6367 22.8931 16 22.8931C17.8282 22.8931 19.5815 22.1669 20.8742 20.8742C22.1669 19.5815 22.8931 17.8282 22.8931 16C22.8931 14.6367 22.4889 13.3039 21.7314 12.1704C20.974 11.0368 19.8974 10.1533 18.6379 9.63156C17.3783 9.10984 15.9924 8.97333 14.6552 9.2393C13.3181 9.50528 12.0898 10.1618 11.1258 11.1258C10.1618 12.0898 9.50529 13.3181 9.23931 14.6552C8.97334 15.9923 9.10984 17.3783 9.63157 18.6379C10.1533 19.8974 11.0368 20.974 12.1704 21.7314Z"
                  stroke-width="1.4"
                />
                <path
                  fill="white"
                  d="M18.854 9.14286L24.5683 4L27.9969 8C26.2826 9.90476 22.854 13.4857 22.854 12.5714C22.854 11.6571 20.1873 9.90476 18.854 9.14286Z"
                />
                <path
                  fill="white"
                  d="M9.12884 12.6426L3.50849 7.0544L7.70119 3.52976C9.77367 5.19744 13.6746 8.53834 12.6985 8.5605C11.7224 8.58266 9.91201 11.2911 9.12884 12.6426Z"
                />
                <path
                  fill="white"
                  d="M25.1288 28.6556L19.5085 23.0675L23.7012 19.5428C25.7737 21.2105 29.6746 24.5514 28.6985 24.5736C27.7224 24.5957 25.912 27.3042 25.1288 28.6556Z"
                />
                <path
                  fill="white"
                  d="M12.6191 23.0031L6.97372 28.2215L3.49224 24.2675C5.18103 22.3401 8.56165 18.7139 8.57382 19.6281C8.58598 20.5423 11.2757 22.259 12.6191 23.0031Z"
                />
              </svg>

              <p>{{ $t("sidebar.gethelp") }}</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
<script>
import Metamask from "../components/Metamask";

export default {
  name: "Sidebar",
  components: {
    Metamask,
  },
  data() {
    return {
      forest: ``,
      activeForest: ``,
      user: false,
      activeIndex: null,
      treeboxIconActive: require("~/assets/images/treebox/treebox-active.svg"),
      treeboxIcon: require("~/assets/images/treebox/treebox.svg"),
    };
  },

  methods: {
    goToDiscuss() {
      window.open("https://discuss.treejer.com/", "_blank");
    },
    showModal(e) {
      this.$store.commit("SET_MOBILE_SIDEBAR", false);
      this.$bvModal.show("five");
    },
    async changeIndex(id) {
      await this.$store.commit("SET_SIDEBAR_INDEX", id);

      await this.$cookies.set("setSideBarIndex", id);
      this.activeIndex = id;
      await this.$store.commit("SET_MOBILE_SIDEBAR", false);
    },
  },

  created() {
    if (this.$cookies.get("setSideBarIndex")) {
      this.activeIndex = this.$cookies.get("setSideBarIndex");
      this.$store.commit("SET_SIDEBAR_INDEX", this.activeIndex);
    } else {
      this.activeIndex = 0;
    }
  },
};
</script>

<style lang="scss" >
ul.desktop-sidebar {
  padding-left: 10px;
  .nav-item a p {
    margin-top: 7px;
  }

  li a.nuxt-link-exact-active {
    text-align: center;
    border-radius: 10px;
    box-shadow: 0 4px 22px 0 rgba(0, 0, 0, 0.16);
    background-color: #67b68c;

    p {
      color: white;
    }
  }

  li a {
    text-align: center;
    position: relative;
    align-items: center;
    align-self: center;
    vertical-align: middle;
    width: 80px;
    height: 80px;
    padding: 15px 0;
    margin-bottom: 15px;
    text-decoration: none;
    color: #757575;

    svg {
      font-size: 30px;
      margin-top: 0px;
    }

    p {
      font-size: 10px;
    }
  }
}
.mobile-sidebars {
  list-style-type: none;
  .burger-menu-open {
    position: absolute;
    top: -45px;
    right: 15px;
  }

  .sidebar-box {
    background: #212121;
    border-radius: 32px 0px 0px 32px;
    height: 100vh;
    width: 100vw;
    z-index: +8888;
    left: 5px;

    position: fixed;
    top: 0px;
    @media (max-width: 768px) {
      .accounting-card {
        .switch-wallet {
          margin-right: 0;
          width: 110px;
          position: absolute;
          left: 140px;
          z-index: +10;
          padding: 0;
        }
      }
    }
    .close-sidebar {
      margin: 36px;
    }
    .mobile-nav {
      li {
        margin-bottom: 16px;
        a {
          display: flex;
          padding-left: 50px;

          align-items: center;
          align-self: center;
          p {
            color: #faf8f1;
            margin-bottom: 0;
            padding-left: 15px;
            padding-top: 5px;
          }
        }
        a.nuxt-link-exact-active {
          font-weight: bolder;
          background: #67b68c;
          border-radius: 10px;
          width: 75%;
          display: flex;
          color: #faf8f1;
          float: left;
          margin-left: 5px;
          text-align: left;
          justify-content: start;
          height: 64px;
          box-shadow: 2px 5px 16px 0px #0b5e0e;
        }
      }
    }

    .nav-item.updates {
      border-bottom: 2px solid rgba(103, 182, 140, 0.25);
      padding-bottom: 45px;
    }
    .nav-item.forest {
      margin-top: 36px;
    }
    .nav-item.help {
      bottom: 25px;
      position: absolute;
    }
  }
  @media (min-width: 100px) and (max-width: 1024px) and (orientation: landscape) {
    .sidebar-box {
      .close-sidebar {
        margin: 15px;
      }
      .mobile-metamask {
        position: absolute;
        top: 27px;
        left: 50px;
      }
      .mobile-nav {
        li.nav-item {
          margin-bottom: 5px;
          a.nav-link,
          a.nuxt-link-exact-active {
            height: 32px;
            font-size: 12px;
            svg,
            img {
              width: 15px;
              height: 15px;
            }
          }
        }
      }
    }
  }
}
</style>

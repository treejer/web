
<template>
    <section :page="$route.name" class="position-relative pt-5 col-md-12 for-business" style="overflow-x: hidden">
      <section class="for-header">
        <div class="container">
          <div class="row justify-content-center mt-2 text-center">
            <div class="col-12">
             <img :src="banner" alt="banner" class="img-fluid">

            </div>
          </div>
          <div class="row mt-5 text-center justify-content-center">
            <div class="col-12">
              <h1 class="tr-gray-two title-md font-weight-bold">It’s called the magic of trees!</h1>
              <p class="param-18 tr-gray-two" style="margin-bottom: 75px">Empower your business by committing to make the Earth a better place for
                all!</p>
<!--              <button class="btn-green lets-go mt-4">-->
<!--                Let’s Go-->
<!--              </button>-->
              <Arrow />
            </div>
          </div>
        </div>
        <div class="container-fluid social-partner-border">
          <div class="row social-partner mt-5 pt-3 pb-3 justify-content-center text-center" style="min-height: 110px">
            <div class="col-4 col-md-2 position-relative">

              <img src="../assets/images/for-business/earth-logo.svg" class="img-fluid " alt="earth-logo">
            </div>
            <div class="col-4 col-md-2 position-relative">
              <img src="../assets/images/for-business/samsung.svg" class="img-fluid " alt="samsung">
            </div>
            <div class="col-4 col-md-2 position-relative">
              <img src="../assets/images/for-business/get-boarded.svg" class="img-fluid " alt="get-boarded">
            </div>
            <div class="col-4 col-md-2 position-relative">
              <img src="../assets/images/for-business/flash-back.svg" class="img-fluid " alt="flash-back">
            </div>
            <div class="col-4 col-md-2 position-relative">
              <img src="../assets/images/for-business/uni-cube.svg" class="img-fluid " alt="uni-cube">
            </div>
          </div>

        </div>
      </section>
      <section class="main-for-business mt-5 pt-5">
        <div class="container">
          <div class="row justify-content-center ">
            <div class="col-md-8 col-12">
              <h1 class="tr-gray-two title-md font-weight-bold text-center">How Treejer Can Help You</h1>
              <p class="param-18 tr-gray-two mt-4 text-center ">We cover a wide range of green services to businesses to
                help them become more sustainable and socially responsible.</p>


            </div>
          </div>
          <div class="row cards justify-content-center text-center mt-5">
            <div class="col-12 col-md-10 mb-4">
              <div class="card for-business-card">
                <div class="row">
                  <div class="col-md-2 img">
                    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M38.7563 9C36.6349 9 34.6005 9.8427 33.1005 11.3427C31.6004 12.8427 30.7577 14.8772 30.7577 16.9985C30.7596 17.2692 30.6709 17.5328 30.5059 17.7473C30.3408 17.9619 30.1089 18.1152 29.8468 18.1828C28.5853 18.4952 27.4649 19.2212 26.6645 20.2451C25.8642 21.2689 25.43 22.5314 25.4315 23.831C25.4303 24.0645 25.4445 24.2978 25.474 24.5294C25.4993 24.7857 25.44 25.0432 25.3051 25.2626C25.1702 25.482 24.9671 25.6511 24.727 25.7441C22.9783 26.4324 21.4877 27.6488 20.4626 29.224C19.4376 30.7991 18.9291 32.6546 19.008 34.5323C19.0868 36.4099 19.7491 38.2163 20.9025 39.6999C22.056 41.1836 23.6434 42.2707 25.4436 42.8101C25.4436 43.0408 25.9295 47.11 29.4824 48.8105C30.3955 49.2209 31.3823 49.4422 32.3833 49.461C33.3843 49.4798 34.3787 49.2957 35.3067 48.9198C36.698 48.358 37.8964 47.4044 38.7563 46.1747C39.6161 47.4044 40.8145 48.358 42.2059 48.9198C43.1338 49.2957 44.1283 49.4798 45.1292 49.461C46.1302 49.4422 47.1171 49.2209 48.0302 48.8105C51.5892 47.11 52.0507 43.0408 52.069 42.8101C53.8692 42.2707 55.4565 41.1836 56.61 39.6999C57.7635 38.2163 58.4258 36.4099 58.5046 34.5323C58.5835 32.6546 58.075 30.7991 57.0499 29.224C56.0249 27.6488 54.5343 26.4324 52.7856 25.7441C52.546 25.6509 52.3436 25.4815 52.2098 25.262C52.0759 25.0425 52.0179 24.7851 52.0447 24.5294C52.0711 24.2975 52.0853 24.0644 52.0872 23.831C52.0872 22.5309 51.6518 21.2683 50.8504 20.2445C50.049 19.2208 48.9279 18.495 47.6658 18.1828C47.4037 18.1152 47.1717 17.9619 47.0067 17.7473C46.8416 17.5328 46.753 17.2692 46.7548 16.9985C46.7548 14.8772 45.9121 12.8427 44.4121 11.3427C42.9121 9.8427 40.8776 9 38.7563 9Z"
                        fill="#8DC63F"/>
                      <path
                        d="M38.7563 9C36.6349 9 34.6005 9.8427 33.1005 11.3427C31.6004 12.8427 30.7577 14.8772 30.7577 16.9985C30.7596 17.2692 30.6709 17.5328 30.5059 17.7473C30.3408 17.9619 30.1089 18.1152 29.8468 18.1828C28.5853 18.4952 27.4649 19.2212 26.6645 20.2451C25.8642 21.2689 25.43 22.5314 25.4315 23.831C25.4303 24.0645 25.4445 24.2978 25.474 24.5294C25.4993 24.7857 25.44 25.0432 25.3051 25.2626C25.1702 25.482 24.9671 25.6511 24.727 25.7441C22.9783 26.4324 21.4877 27.6488 20.4626 29.224C19.4376 30.7991 18.9291 32.6546 19.008 34.5323C19.0868 36.4099 19.7491 38.2163 20.9025 39.6999C22.056 41.1836 23.6434 42.2707 25.4436 42.8101C25.4436 43.0408 25.9295 47.11 29.4824 48.8105C30.3955 49.2209 31.3823 49.4422 32.3833 49.461C33.3843 49.4798 34.3787 49.2957 35.3067 48.9198C36.698 48.358 37.8964 47.4044 38.7563 46.1747C39.6161 47.4044 40.8145 48.358 42.2059 48.9198C43.1338 49.2957 44.1283 49.4798 45.1292 49.461C46.1302 49.4422 47.1171 49.2209 48.0302 48.8105C51.5892 47.11 52.0507 43.0408 52.069 42.8101C53.8692 42.2707 55.4565 41.1836 56.61 39.6999C57.7635 38.2163 58.4258 36.4099 58.5046 34.5323C58.5835 32.6546 58.075 30.7991 57.0499 29.224C56.0249 27.6488 54.5343 26.4324 52.7856 25.7441C52.546 25.6509 52.3436 25.4815 52.2098 25.262C52.0759 25.0425 52.0179 24.7851 52.0447 24.5294C52.0711 24.2975 52.0853 24.0644 52.0872 23.831C52.0872 22.5309 51.6518 21.2683 50.8504 20.2445C50.049 19.2208 48.9279 18.495 47.6658 18.1828C47.4037 18.1152 47.1717 17.9619 47.0067 17.7473C46.8416 17.5328 46.753 17.2692 46.7548 16.9985C46.7548 14.8772 45.9121 12.8427 44.4121 11.3427C42.9121 9.8427 40.8776 9 38.7563 9Z"
                        stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M20.4937 62.5665H44.3132" stroke="black" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round"/>
                      <path d="M34.0732 67H61.8767" stroke="black" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round"/>
                      <path d="M48.9962 62.5665H56.4117" stroke="black" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round"/>
                      <path d="M38.9383 29.9468V62.0503" stroke="black" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round"/>
                      <path d="M39.5148 39.8888L44.3795 35.024" stroke="black" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round"/>
                      <path d="M38.7557 37.9939L34.0732 33.3114" stroke="black" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round"/>
                      <circle cx="40" cy="40" r="39.4" stroke="black" stroke-width="1.2"/>
                    </svg>


                  </div>
                  <div class="col-md-8 text text-left">
                    <p class="param-18 mb-1 tr-gray-two font-weight-bold">Plant trees to engage customers</p>
                    <p class="param tr-gray-two mb-0 ">Impact marketing with trees increases brand affinity with the
                      growing number of consumers who prefer brands that contribute to the well-being of the planet, to
                      brands that do not.</p>
                  </div>
                  <div class="col-md-2 arrow" @click="$router.push('/forest/'+$cookies.get('account'))">
                    <div style="background-color: #D2EDB1;"
                    >
                      <svg width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 12.2295H25.2131" stroke="#424242" stroke-width="2.7157" stroke-linecap="round"
                              stroke-linejoin="round"/>
                        <path d="M15.7704 2L26 12.2295L15.7704 22.459" stroke="#424242" stroke-width="3"
                              stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-10 mb-4">
              <div class="card for-business-card">
                <div class="row">
                  <div class="col-md-2 img">
                    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0)">
                        <path
                          d="M56.3349 52.3387C60.1501 52.3387 63.2429 48.8419 63.2429 44.5285C63.2429 40.2151 60.1501 36.7183 56.3349 36.7183C52.5197 36.7183 49.4269 40.2151 49.4269 44.5285C49.4269 48.8419 52.5197 52.3387 56.3349 52.3387Z"
                          fill="#8DC63F"/>
                        <path
                          d="M44.108 13.7646C42.6082 13.7646 41.1697 14.3602 40.1088 15.4203C39.0479 16.4804 38.4513 17.9184 38.4501 19.4182C38.4514 19.6097 38.3887 19.7961 38.272 19.9479C38.1552 20.0997 37.9911 20.2081 37.8057 20.2559C36.9127 20.477 36.1196 20.9913 35.5534 21.7164C34.9872 22.4415 34.6806 23.3356 34.6825 24.2555C34.6823 24.4206 34.6909 24.5855 34.7083 24.7496C34.7273 24.9305 34.6862 25.1126 34.5915 25.2678C34.4968 25.4231 34.3537 25.5429 34.1842 25.6088C32.9467 26.0946 31.8916 26.9545 31.166 28.0684C30.4403 29.1824 30.0803 30.495 30.1361 31.8233C30.1919 33.1515 30.6607 34.4293 31.4772 35.4785C32.2937 36.5277 33.4172 37.296 34.6911 37.6763C34.6911 37.8396 35.0348 40.7222 37.548 41.9251C38.1945 42.2133 38.8923 42.3686 39.6001 42.3819C40.3078 42.3952 41.011 42.2662 41.6679 42.0024C42.6514 41.606 43.499 40.933 44.108 40.0649C44.7158 40.9362 45.5635 41.6123 46.5481 42.011C47.2041 42.2748 47.9064 42.4043 48.6133 42.3917C49.3203 42.3792 50.0175 42.2249 50.6637 41.938C53.1769 40.7351 53.5034 37.8568 53.5206 37.6892C54.7945 37.3089 55.918 36.5406 56.7345 35.4914C57.551 34.4422 58.0198 33.1644 58.0756 31.8362C58.1314 30.5079 57.7714 29.1953 57.0458 28.0813C56.3201 26.9673 55.265 26.1075 54.0275 25.6217C53.858 25.5558 53.7149 25.436 53.6202 25.2807C53.5255 25.1254 53.4845 24.9434 53.5034 24.7625C53.5208 24.5984 53.5294 24.4335 53.5292 24.2684C53.5292 23.3499 53.2217 22.4578 52.6556 21.7345C52.0896 21.0111 51.2976 20.4982 50.406 20.2774C50.2221 20.2289 50.0595 20.1208 49.9437 19.97C49.8278 19.8192 49.7653 19.6342 49.7659 19.444C49.7687 18.6992 49.6244 17.9612 49.3414 17.2722C49.0583 16.5833 48.642 15.957 48.1163 15.4294C47.5907 14.9017 46.966 14.4831 46.2782 14.1974C45.5903 13.9117 44.8528 13.7646 44.108 13.7646Z"
                          fill="#8DC63F"/>
                        <path
                          d="M35.3917 39.0081C35.3917 45.9934 30.3266 51.6642 24.0759 51.6642C17.8252 51.6642 12.7602 45.9934 12.7602 39.0081C12.7602 32.0228 17.8295 13.7646 24.0759 13.7646C30.3224 13.7646 35.3917 32.0228 35.3917 39.0081Z"
                          fill="#40A743"/>
                        <path
                          d="M57.2887 36.0267C58.0571 35.0637 58.5633 33.9182 58.758 32.7016C58.7807 32.5996 58.7822 32.494 58.7625 32.3914C58.7428 32.2887 58.7023 32.1912 58.6434 32.1049C58.5846 32.0185 58.5086 31.9451 58.4203 31.8893C58.332 31.8334 58.2331 31.7962 58.1299 31.78C58.0266 31.7639 57.9212 31.769 57.82 31.7952C57.7188 31.8214 57.6241 31.868 57.5416 31.9322C57.4592 31.9964 57.3908 32.0769 57.3406 32.1686C57.2905 32.2602 57.2597 32.3612 57.2501 32.4653C57.0899 33.4562 56.6677 34.3862 56.0271 35.1589C55.3866 35.9316 54.551 36.519 53.607 36.8601C53.3811 36.9454 53.181 37.0874 53.026 37.2725C52.871 37.4577 52.7663 37.6796 52.722 37.917C52.5846 38.6516 52.0648 40.4473 50.342 41.2722C49.7909 41.5172 49.1959 41.6485 48.5928 41.6581C47.9897 41.6677 47.3909 41.5554 46.8322 41.328C46.0568 41.0167 45.3789 40.5035 44.8689 39.8416V36.5293L48.1683 33.23C48.3024 33.1017 48.3875 32.9306 48.4087 32.7462C48.4299 32.5618 48.3858 32.3758 48.2842 32.2204C48.2194 32.1303 48.1359 32.0552 48.0393 32.0005C47.9428 31.9457 47.8355 31.9124 47.7249 31.903C47.6143 31.8937 47.5029 31.9083 47.3985 31.9461C47.2941 31.9838 47.1991 32.0437 47.12 32.1216L44.8689 34.3727V29.3679C44.8719 29.1806 44.8084 28.9984 44.6896 28.8536C44.5708 28.7088 44.4044 28.611 44.2202 28.5774C44.1135 28.5634 44.005 28.5722 43.9019 28.6033C43.7988 28.6344 43.7035 28.687 43.6223 28.7577C43.541 28.8283 43.4758 28.9154 43.4307 29.0132C43.3857 29.111 43.3619 29.2172 43.361 29.3249V32.9078L41.1442 30.691C41.0158 30.5559 40.8442 30.4698 40.659 30.4479C40.4739 30.4259 40.2869 30.4694 40.1304 30.5708C40.0402 30.6356 39.9652 30.7191 39.9104 30.8157C39.8556 30.9122 39.8224 31.0195 39.813 31.1301C39.8036 31.2407 39.8183 31.3521 39.856 31.4565C39.8938 31.5609 39.9536 31.6559 40.0316 31.735L43.361 35.0644V39.8201C42.8519 40.4811 42.1757 40.9942 41.402 41.3065C40.8433 41.5339 40.2445 41.6462 39.6414 41.6366C39.0383 41.627 38.4433 41.4958 37.8922 41.2507C37.1665 40.8942 36.5669 40.3247 36.1737 39.6182C36.3026 36.2501 35.3145 31.3312 33.884 26.6141C34.071 26.5034 34.2646 26.4044 34.4639 26.3177C34.7929 26.1898 35.0701 25.9563 35.252 25.6538C35.4339 25.3514 35.5103 24.9971 35.4692 24.6465C35.4521 24.5126 35.4435 24.3777 35.4434 24.2427C35.4427 23.4943 35.6928 22.7673 36.1538 22.1778C36.6148 21.5882 37.2602 21.1703 37.9867 20.9906C38.333 20.9038 38.6411 20.7052 38.8632 20.4256C39.0853 20.146 39.2091 19.801 39.2153 19.444C39.2626 17.4163 40.3839 15.539 42.2913 14.843C43.0388 14.551 43.8463 14.4461 44.6435 14.5375C45.4408 14.6289 46.2036 14.9139 46.8656 15.3675C47.5276 15.8211 48.0687 16.4296 48.4417 17.1401C48.8148 17.8506 49.0085 18.6416 49.006 19.444C49.0087 19.8035 49.1309 20.1518 49.3534 20.4341C49.5758 20.7164 49.8858 20.9167 50.2346 21.0035C51.0283 21.2008 51.7226 21.6813 52.187 22.3545C52.6514 23.0277 52.8539 23.8474 52.7564 24.6594C52.7162 25.0071 52.7921 25.3583 52.9724 25.6582C53.1527 25.9582 53.4272 26.1901 53.7531 26.3177C54.4619 26.5976 55.107 27.0178 55.6495 27.553C56.1921 28.0882 56.6211 28.7274 56.9107 29.4323C56.9533 29.536 57.0182 29.6291 57.1008 29.705C57.1835 29.7808 57.2818 29.8376 57.3888 29.8712C57.4958 29.9048 57.6088 29.9144 57.72 29.8995C57.8311 29.8845 57.9376 29.8453 58.0319 29.7846C58.1811 29.682 58.29 29.5309 58.3401 29.3569C58.3903 29.183 58.3785 28.9971 58.3069 28.8309C57.9392 27.9408 57.3959 27.134 56.7095 26.4586C56.023 25.7832 55.2075 25.2531 54.3116 24.9L54.2643 24.8227C54.4061 23.6418 54.1114 22.4499 53.4357 21.4712C52.76 20.4925 51.7499 19.7944 50.5955 19.5085C50.574 19.5017 50.5555 19.4878 50.543 19.469C50.5305 19.4503 50.5248 19.4278 50.5268 19.4054C50.5242 18.5625 50.3557 17.7284 50.0308 16.9507C49.7059 16.173 49.231 15.4668 48.6332 14.8726C48.0354 14.2784 47.3265 13.8078 46.5468 13.4876C45.7671 13.1674 44.932 13.0039 44.0892 13.0064C43.2463 13.009 42.4122 13.1775 41.6345 13.5024C40.8568 13.8273 40.1506 14.3022 39.5564 14.9C38.9622 15.4978 38.4916 16.2067 38.1714 16.9864C37.8512 17.7661 37.6877 18.6012 37.6902 19.444C37.691 19.4652 37.6847 19.4861 37.6722 19.5032C37.6598 19.5203 37.6419 19.5328 37.6215 19.5386C36.565 19.7975 35.6256 20.4027 34.9529 21.2575C34.2802 22.1124 33.913 23.1678 33.9097 24.2556C33.9106 24.4523 33.9221 24.6487 33.9441 24.8441C33.9441 24.973 33.4758 25.0847 33.3727 25.1492C33.1794 24.5864 32.9861 24.0322 32.7842 23.4995C29.5235 14.8215 26.2499 13 24.0761 13C20.287 13 17.3872 18.3443 15.6216 22.825C15.5475 23.013 15.5511 23.2227 15.6317 23.408C15.7123 23.5933 15.8632 23.739 16.0512 23.8131C16.2392 23.8872 16.4489 23.8835 16.6342 23.8029C16.8195 23.7224 16.9652 23.5715 17.0392 23.3835C19.256 17.7514 21.8207 14.5251 24.0761 14.5251C26.4347 14.5251 29.0896 17.992 31.3794 24.0365C33.5274 29.7287 34.6444 35.8763 34.6444 39.0082C34.6444 45.2761 30.3183 50.4227 24.8537 50.8652V41.7834L28.0328 38.6043C28.1752 38.461 28.2552 38.2672 28.2552 38.0652C28.2552 37.8631 28.1752 37.6693 28.0328 37.526C27.9624 37.4545 27.8785 37.3976 27.7859 37.3588C27.6934 37.32 27.594 37.3 27.4936 37.3C27.3933 37.3 27.2939 37.32 27.2013 37.3588C27.1088 37.3976 27.0248 37.4545 26.9545 37.526L24.8408 39.6354V36.4262C24.8264 36.2339 24.7398 36.0541 24.5984 35.9229C24.4569 35.7917 24.2712 35.7188 24.0783 35.7188C23.8854 35.7188 23.6996 35.7917 23.5582 35.9229C23.4168 36.0541 23.3302 36.2339 23.3157 36.4262V42.8445L21.215 40.7395C21.1359 40.6615 21.0409 40.6016 20.9365 40.5639C20.8321 40.5262 20.7207 40.5115 20.6101 40.5209C20.4995 40.5303 20.3922 40.5635 20.2957 40.6183C20.1991 40.6731 20.1156 40.7481 20.0508 40.8383C19.9486 40.9931 19.9039 41.1788 19.9243 41.3632C19.9447 41.5476 20.0289 41.719 20.1625 41.8478L23.3114 44.9968V50.8652C17.8469 50.4356 13.5208 45.2804 13.5208 39.0082C13.5208 36.0654 14.4659 31.1035 15.875 26.6657C15.9365 26.4731 15.9191 26.264 15.8264 26.0843C15.7338 25.9047 15.5735 25.7692 15.381 25.7077C15.1884 25.6461 14.9793 25.6636 14.7996 25.7563C14.62 25.8489 14.4845 26.0091 14.423 26.2017C12.9537 30.85 12 35.8763 12 39.0082C12 46.1181 17.0092 51.9521 23.3157 52.3903V58.5035C23.3157 58.7052 23.3958 58.8986 23.5385 59.0412C23.6811 59.1838 23.8745 59.2639 24.0761 59.2639C24.176 59.2639 24.2749 59.2443 24.3671 59.206C24.4594 59.1678 24.5432 59.1118 24.6138 59.0412C24.6844 58.9706 24.7404 58.8868 24.7786 58.7945C24.8169 58.7023 24.8365 58.6034 24.8365 58.5035V52.3903C30.314 52.0122 34.8119 47.5572 35.8988 41.7361C36.291 42.1021 36.7355 42.4076 37.2177 42.6426C37.9579 42.9774 38.7582 43.1587 39.5704 43.1757C40.3826 43.1927 41.1898 43.0449 41.9433 42.7414C42.4505 42.5398 42.9275 42.2695 43.361 41.938V58.5035C43.361 58.7052 43.4411 58.8986 43.5837 59.0412C43.7263 59.1838 43.9197 59.2639 44.1214 59.2639C44.3231 59.2639 44.5165 59.1838 44.6591 59.0412C44.8017 58.8986 44.8818 58.7052 44.8818 58.5035V41.938C45.3116 42.2612 45.7826 42.5256 46.2823 42.7242C47.0226 43.009 47.809 43.1546 48.6022 43.1538C48.6737 43.604 48.6996 44.0603 48.6795 44.5157C48.6795 48.9578 51.7168 52.618 55.5875 53.0476V58.4906C55.5875 58.6923 55.6676 58.8857 55.8102 59.0283C55.9528 59.1709 56.1462 59.251 56.3479 59.251C56.5496 59.251 56.743 59.1709 56.8856 59.0283C57.0282 58.8857 57.1083 58.6923 57.1083 58.4906V53.0605C60.9747 52.6309 64.012 48.9706 64.012 44.5285C64.0034 40.1638 61.0692 36.5508 57.2887 36.0267ZM57.1083 51.5225V49.2671L59.5141 46.8613C59.6571 46.7189 59.7376 46.5255 59.738 46.3237C59.7384 46.1218 59.6586 45.9281 59.5162 45.7851C59.3738 45.6421 59.1804 45.5616 58.9786 45.5612C58.7768 45.5608 58.583 45.6406 58.4401 45.783L57.1083 47.1148V44.7648C57.0938 44.5725 57.0072 44.3927 56.8658 44.2615C56.7244 44.1303 56.5386 44.0574 56.3457 44.0574C56.1528 44.0574 55.9671 44.1303 55.8257 44.2615C55.6843 44.3927 55.5976 44.5725 55.5832 44.7648V51.5225C52.5545 51.0929 50.2003 48.12 50.2003 44.5285C50.1989 43.9755 50.2565 43.424 50.3721 42.8832C52.7049 42.1013 54.0409 39.369 54.2128 38.2649C54.7227 38.0734 55.2098 37.8255 55.6648 37.526C59.3637 37.0492 62.4912 40.4087 62.4912 44.5285C62.4826 48.12 60.1155 51.0886 57.1083 51.5225Z"
                          fill="black"/>
                        <path d="M16.8288 58.5035H48.0351" stroke="black" stroke-width="1.71841" stroke-linecap="round"
                              stroke-linejoin="round"/>
                        <path d="M32.3066 61.6353H66.5503" stroke="black" stroke-width="1.71841" stroke-linecap="round"
                              stroke-linejoin="round"/>
                        <path d="M51.3512 58.5035H61.8464" stroke="black" stroke-width="1.71841" stroke-linecap="round"
                              stroke-linejoin="round"/>
                      </g>
                      <circle cx="40" cy="40" r="39.4" stroke="black" stroke-width="1.2"/>
                      <defs>
                        <clipPath id="clip0">
                          <rect width="55.4102" height="49.4945" fill="white" transform="translate(12 13)"/>
                        </clipPath>
                      </defs>
                    </svg>


                  </div>
                  <div class="col-md-8 text text-left">
                    <p class="param-18 mb-1 tr-gray-two font-weight-bold">Adopt a forest for Corporate Social
                      Responsiblity (CSR)</p>
                    <p class="param tr-gray-two mb-0 ">Employee ​and customer engagement is possible when sponsoring one
                      of our projects : everyone loves trees. You will be able to regularly share communication material
                      about your project.</p>
                  </div>
                  <div class="col-md-2 arrow" @click="$router.push('/forest/'+ $cookies.get('account'))" >
                    <div style="background: #ADF1D2;"
                    >
                      <svg width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 12.2295H25.2131" stroke="#424242" stroke-width="2.7157" stroke-linecap="round"
                              stroke-linejoin="round"/>
                        <path d="M15.7704 2L26 12.2295L15.7704 22.459" stroke="#424242" stroke-width="3"
                              stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-10 mb-4">
              <div class="card for-business-card">
                <div class="row">
                  <div class="col-md-2 img">
                    <img src="../assets/images/for-business/tree-three.png"/>

                  </div>
                  <div class="col-md-8 text text-left">
                    <p class="param-18 mb-1 tr-gray-two font-weight-bold">Offset your carbon footprint</p>
                    <p class="param tr-gray-two mb-0 ">When carbon sequestration is needed, the best technology is a
                      tree. They are an amazing carbon sink.</p>
                  </div>
                  <div class="col-md-2 arrow" @click="$router.push('/forest/'+$cookies.get('account'))">
                    <div style="background: #FAC9B8;"
                    >
                      <svg width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 12.2295H25.2131" stroke="#424242" stroke-width="2.7157" stroke-linecap="round"
                              stroke-linejoin="round"/>
                        <path d="M15.7704 2L26 12.2295L15.7704 22.459" stroke="#424242" stroke-width="3"
                              stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-10 mb-4">
              <div class="card for-business-card">
                <div class="row">
                  <div class="col-md-2 img">
                    <img src="../assets/images/for-business/three-four.png"/>


                  </div>
                  <div class="col-md-8 text text-left">
                    <p class="param-18 mb-1 tr-gray-two font-weight-bold">List your product coupon to engage our
                      ecosystem</p>
                    <p class="param tr-gray-two mb-0 ">Offer products and services to our growing community of
                      eco-conscious users worldwide. Listing vouchers and disount coupons generates sales and stronger
                      brand recognition for your business at no cost.</p>
                  </div>
                  <div class="col-md-2 arrow" @click="$router.push('/forest/'+$cookies.get('account'))">
                    <div style="background: #EFE9AE;
"
                    >
                      <svg width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 12.2295H25.2131" stroke="#424242" stroke-width="2.7157" stroke-linecap="round"
                              stroke-linejoin="round"/>
                        <path d="M15.7704 2L26 12.2295L15.7704 22.459" stroke="#424242" stroke-width="3"
                              stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>

                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      <section class="echo-chain">
        <div class="container">
          <div class="row mt-5 pt-5 justify-content-center text-center">
            <div class="col-12 col-md-8">
              <h1 class="tr-gray-two title-md font-weight-bold">What People Say</h1>

            </div>
          </div>
        </div>
      </section>
      <section class="echo-chain-slider mt-5 mb-5">
        <div class="container">
          <div class="row  justify-content-center ">
            <div class="col-12 col-md-8">
              <div class="step tr-gray-three d-flex justify-content-center p-0   list-style-none">
                <div
                  v-for="(item, index) in peoples"
                  :key="index"
                  @click="activeMenu(item, index)"
                  :name="item.name"
                  class="pointer-event   m-2"
                >
                  <img
                    :class="{ 'active': activeIndex === index }"
                    :src="item.src" :alt="item.src">
                </div>
              </div>
            </div>
            <div class="col-12 col-md-8 echo-card mb-4" v-for="(item, index) in peoples" :key="index"
                 v-if="activeIndex===index">
              <div class="row">
                <div class="col-md-12 p-0">
                  <div class="card-text mt-3 "><p class="tr-gray-two param">{{item.text ? item.text :'soon'}}</p>
                  </div>

                </div>
                <div class="col-md-12 d-flex  justify-content-center  p-0 text-center ">
                  <div class="card-image pr-4 border-right">
                    <img class=" m-auto align-self-center align-items-center"
                         :src="item.logo" :alt="item.name"/>

                  </div>

                  <div class="card-author text-left pl-4">
                    <span class="param-18 tr-gray-two">{{item.name}}</span>
                    <span class="param-18 tr-gray-two font-weight-bold">{{item.brand}}</span>
                    <span class="param tr-gray-four d-block">{{item.work}}</span>
                  </div>

                </div>
              </div>
            </div>
          </div>
          </div>

      </section>


    </section>

</template>

<script>
    import Arrow from "../components/Arrow";
    export default {
      name: "forBusiness",
      layout:'landing',
      components: {Arrow},
      head() {
        return {
          title:`Treejer partnerships`,
          meta:[
            { hid: 'description', name: 'description', content:"About our business and team"},
            { hid: 'keywords', name: 'keywords', content: 'business teambusiness ' }
          ]
        }
      },
      methods: {
        activeMenu(item, index) {
          this.activeIndex = index;
        },
      },
      data() {
        return {
          activeIndex: 0,
          banner:require('~/assets/images/for-business/banner.png'),
          peoples: [
            // {
            //   src: require('~/assets/images/for-business/Ellipse-3.png'),
            //   name: null,
            //   text: null,
            //   logo: null,
            //   work: null,
            //   brand: null
            // },
            // {
            //   src: require('~/assets/images/for-business/Ellipse-2.png'),
            //   name: null,
            //   text: null,
            //   logo: null,
            //   work: null,
            //   brand: null
            // },
            {
              src: require('~/assets/images/for-business/MaskGroup.png'),
              name: `Shivam Dhawan,`,
              text: 'From year to year, environmental changes are incremental and often barely register in our lives, but from evolutionary or geological perspectives, what is happening is exponential explosive change. Being into the science of future careers, we hope that "Ecosystem Maintenance" will develop to be an independent industry in a few years with pioneers like Treejer leading the charge.',
              logo: require('~/assets/images/for-business/get-boarded.svg'),
              brand: `GetBoarded`,
              work: `Founder and CEO`
            },
            // {
        //       src: require('~/assets/images/for-business/Ellipse-1.png'),
        //       name: null,
        //       text: null,
        //       logo: null,
        //       work: null,
        //       brand: null
        //     },
        //     {
        //       src: require('~/assets/images/for-business/Ellipse.png'),
        //       name: null,
        //       text: null,
        //       logo: null,
        //       work: null,
        //       brand: null
        //     },
          ]
        }
      },
      mounted() {
        let self =this

        setInterval(function () {
          while(self.activeIndex > self.peoples){
            self.activeIndex ++
          }
        }, 3000);
      },

    }
</script>

<style scoped lang="scss">
  .for-business {
    .lets-go {
      padding: 9px 50px;
    }

    .social-partner-border {

    }

    .social-partner {
      border-top: 1px solid #E0E0E0;
      border-bottom: 1px solid #E0E0E0;

      .col-md-2 {
        align-items: center;
        justify-content: center;
        align-self: center;

        img {
          height: 80px;
          cursor: pointer;
          -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
          filter: grayscale(100%);
          transition: all ease-out .2s;
          @media(max-width: 769px){
            height: 30px;
          }
        }

        img:hover {
          -webkit-filter: none; /* Safari 6.0 - 9.0 */
          filter: none;

        }
      }
    }

    .for-business-card {
      background: #FFFFFF;
      box-shadow: 0px 1.2694px 6.22458px rgba(0, 0, 0, 0.141);
      border-radius: 10px;
      min-height: 150px;

      .row {
        min-height: 150px;
        align-items: center;

      }


      .col-md-8.text {
        p {
          padding-top: 5px;
        }
      }
      @media (min-width: 769px) {
        .col-md-2.arrow{
          padding-right: 13px;
        }
        .col-md-2.arrow >div{
          border-radius: 0 10px 10px 0;
        }

      }

      .col-md-2.arrow > div {
        background-color: #D2EDB1;
        min-height: 154px;
        align-items: center;
        display: flex;
        justify-content: center;
        cursor: pointer;
        width: 60%;
        float: right;

        flex-direction: column;
        flex-grow: inherit;
        @media (max-width: 768px) {
          min-height: 25px;
          width: 100%;
        }


      }


      .col-md-2.img {

        padding: 24px;

      }

    }

    .card-chain {
      box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.16);
      border-radius: 12.944px;
      background: white;
      height: 250px;

      .cout {

      }
    }

    .echo-chain-slider {
      .step {
        li {
          padding: 5px;
        }

        .active {
          border: solid 2px black;
          border-radius: 50%;

        }

        .position-absolute {
          left: 55px;
          top: 75px;
          transition: all ease .5s;
          text-align: center;
        }
      }
    }

    .echo-card {
    }
  }

  @media (max-width: 768px) {
    .for-business {
      .col-md-8.text.text-left {
        padding: 5px 25px;
      }

      section.for-header > div.container > div.row.justify-content-center.mt-2.text-center > div > svg {
        width: 100%;
      }

    }
  }
</style>

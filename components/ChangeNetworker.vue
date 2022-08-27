<template>
  <div class="network-changer d-none d-md-block" @click.prevent="showNetworks = !showNetworks">
    <p class="font-weight-bolder btn-green p-md-1 text-capitalize">
      {{ ActiveNetwork }}
    </p>
    <ul v-if="showNetworks" class="list-style-none text-capitalize  bg-light-green">
      <li
        v-for="(item, index) in networks"
        :key="index"
        @click.prevent="changeNetworks(item)"
        class="text-left"
      >
        <img :src="item.logo" :alt="item.name" width="100" height="35" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      networks: [
        {
          name: "Ethereum Mainnet RPC",
          logo: require("~/assets/images/wallets/ethereum.svg"),
          chainId: "0x1",
          chainName: "ETH",
          rpcUrls: [
            "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
          ],
          nativeCurrency: [
            { nativeCurrencyname: "ETH" },
            { symbol: "ETH" },
            { decimals: 0 },
          ],
          blockExplorerUrls: "https://etherscan.io",
        },
        {
          name: "Binance Smart Chain Mainnet RPC",
          logo: require("~/assets/images/wallets/binance.svg"),
          chainId: "56",
          chainName: "BNB",
          rpcUrls: ["https://bsc-dataseed.binance.org/"],
          nativeCurrency: [
            { nativeCurrencyname: "BNB" },
            { symbol: "BNB" },
            { decimals: 0 },
          ],
          blockExplorerUrls: "https://bscscan.com",
        },

        {
          name: "Matic Mainnet RPC",
          logo: require("~/assets/images/wallets/polygon.svg"),
          chainId: "0x89",
          chainName: "MATIC",
          rpcUrls: ["https://polygon-rpc.com"],
          nativeCurrency: [
            { nativeCurrencyname: "MATIC" },
            { symbol: "MATIC" },
            { decimals: 0 },
          ],
          blockExplorerUrls: "https://explorer.matic.network/",
        },

        {
          name: "Arbitrum Mainnet RPC",
          logo: require("~/assets/images/wallets/arbitrum.svg"),
          chainId: "4689",
          chainName: "ETH",
          rpcUrls: ["https://babel-api.mainnet.iotex.io"],
          nativeCurrency: [
            { nativeCurrencyname: "ETH" },
            { symbol: "ETH" },
            { decimals: 0 },
          ],
          blockExplorerUrls: "https://arbiscan.io/",
        },
      ],
      ActiveNetwork: "matic",
      showNetworks: false,
      connectedNetwrokID: process.env.NETWORK_NAME,
    };
  },
  methods: {
    async changeNetworks(item) {
      this.ActiveNetwork = item.chainName;
      console.log(item, "item is here");
      await this.$web3.currentProvider.enable();

      try {
        await this.$web3.currentProvider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: this.$dec2hex(item.chainId) }],
        });

        // window.location.reload();
      } catch (error) {
        if (error.code === 4902) {
          try {
            if (process.env.NETWORK_ID.toString() === "137") {
              await this.$web3.currentProvider.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: item.chainId,
                    chainName: item.chainName,
                    rpcUrls: item.rpcUrls,
                    nativeCurrency: item.nativeCurrency,
                    blockExplorerUrls: item.blockExplorerUrls,
                  },
                ],
              });
            }
          } catch (error) {
            console.log(error, "error is here");
          }
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.network-changer {
  z-index: +999;
  margin-right: 105px;
  position: relative;
  margin-top: 15px;
  @media (max-width: 420px) {
    margin-right:5px;
  }
  .list-style-none {
    width: 140px;
    position: absolute;
    top: 50px;
    border-radius: 7px;
    list-style: none;
    z-index: +999;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 8px 16px;

    li {
      text-align: left;
      padding: 10px 15px;
    }
  }
}
</style>

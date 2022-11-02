import { BToast } from "bootstrap-vue";
import Dai from "~/contracts/IERC20";
const BN = require("bn.js");

export const state = () => ({
  shoppingList: [],
  totalPrices: 0,
  totalCounts: 0,
  sidebarAdvanceFundStatus: false,
});

export const actions = {
  async setListItems({ commit, state }, props) {
    await commit("SET_LIST", {
      model: props.model,
      count: props.count,
      id: props.model.id,
    });
    await commit("SUM_TOTALL_PRICE_AND_COUNT");
    await this.$cookies.set("shoppingList", state.shoppingList);
  },
  async removeListItemsShopping({ commit, state }, props) {
    console.log(props, "props");
    await commit("REMOVE_LIST", props);
    await commit("SUM_TOTALL_PRICE_AND_COUNT");
    this.$cookies.set("shoppingList", state.shoppingList);
  },
  async emptyShoppingList({ commit, state }, props) {
    await commit("EMPTY_LIST");
    this.$cookies.set("shoppingList", []);
  },
  async editCountShoppingList({ commit, state }, props) {
    let self = this;
    console.log(props, "props is here");
    await state.shoppingList.map((item, index) => {
      console.log(item, " item.count , props.count");

      if (item.id === props.id) {
        item.count = props.count;
      }
    });
  },

  async fundTree(context, params) {
    let self = this;
    let account = this.$cookies.get("account");
    let referrer = this.$cookies.get("referrer");

    if (referrer) {
      if (referrer.toLowerCase() === account.toLowerCase()) {
        referrer = process.env.zeroAddress;
      }

      try {
        referrer = this.$web3.utils.toChecksumAddress(referrer);
      } catch (e) {
        console.error("invalid referrer address", e.message);
        referrer = process.env.zeroAddress;
      }
    } else {
      referrer = process.env.zeroAddress;
    }

    let recipient = params.recipient;
    if (
      !recipient ||
      recipient === "" ||
      recipient.toLowerCase() === account.toLowerCase()
    ) {
      recipient = process.env.zeroAddress;
    }

    try {
      recipient = this.$web3.utils.toChecksumAddress(recipient);
    } catch (e) {
      console.error("invalid recipient address", e.message);
      recipient = process.env.zeroAddress;
    }

    this.$web3.currentProvider.enable();

    let input = params.models.map((item) => {
      return [self.$hex2Dec(item.id), parseInt(item.count)];
    });

    console.log(input, referrer, recipient);

    const tx = this.$MarketPlace.methods.fundTree(input, referrer, recipient);

    const data = tx.encodeABI();

    let gas = await this.$MarketPlace.methods
      .fundTree(input, referrer, recipient)
      .estimateGas({ from: account });

    try {
      const receipt = await this.$web3.eth
        .sendTransaction({
          from: account,
          to: this.$MarketPlace._address,
          value: 0,
          data: data,
          gas: gas,
          type: "0x2",
          maxPriorityFeePerGas: null,
          maxFeePerGas: null,
        })
        .on("transactionHash", (transactionHash) => {
          let bootStrapToaster = new BToast();
          bootStrapToaster.$bvToast.toast(
            this.$translates.alert.checkprogressonetherscan,
            {
              toaster: "b-toaster-bottom-left",
              title: this.$translates.alert.processingtransaction,
              variant: "warning",
              href: `${
                self.$cookies.get("config").explorerUrl
              }/tx/${transactionHash}`,
              bodyClass: "bid error",
              noAutoHide: true,
            }
          );
        })
        .on("error", (error) => {
          console.log(error, "errorr");
          const bootStrapToaster = new BToast();
          if (error.code === 32602) {
            bootStrapToaster.$bvToast.toast(this.$translates.alert.haveenough, {
              toaster: "b-toaster-bottom-left",
              title: this.$translates.alert.transactionfailed,
              variant: "danger",
              noAutoHide: true,
              bodyClass: "fund-error",
            });
          } else if (error.code === -32602) {
            //do nothing
          } else {
            bootStrapToaster.$bvToast.toast([error.message], {
              toaster: "b-toaster-bottom-left",
              title: this.$translates.alert.transactionfailed,
              variant: "danger",
              noAutoHide: true,
              bodyClass: "fund-error",
            });
          }
          return null;
        });
      return receipt;
    } catch (error) {
      console.log(error, "errorr");

      return null;
    }
  },
};

export const mutations = {
  SET_LIST(state, props) {
    state.shoppingList.push(props);
  },
  EDIT_LIST(state, props) {
    state.shoppingList = props;
  },
  REMOVE_LIST(state, props) {
    const removedArray = state.shoppingList.filter((item) => {
      return item.model.id !== props.id;
    });

    state.shoppingList = removedArray;
  },
  EMPTY_LIST(state) {
    state.shoppingList = [];
    state.totalPrices = 0;
    state.totalCounts = 0;
  },
  REMOVE_TOTALPRICES(state, props) {
    state.totalPrices = props;
  },
  SUM_TOTALL_PRICE_AND_COUNT(state) {
    state.totalCounts = 0;
    state.totalPrices = 0;

    state.shoppingList.map((item, index) => {
      let countBN = new BN(item.count);
      let priceBN = new BN(item.model.price);

      state.totalCounts = parseInt(item.count) + state.totalCounts;
      state.totalPrices =
        parseFloat(this.$web3.utils.fromWei(countBN.mul(priceBN).toString())) +
        state.totalPrices;
    });
  },
  SET_SIDEBAR_ADVANCEFUND(state, props) {
    state.sidebarAdvanceFundStatus = props;
  },
};

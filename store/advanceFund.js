export const state = () => ({
  shoppingList: [],
});

export const actions = {
  setListItems({ commit, state }, props) {
    console.log(props, "list is here");
    let list = [];
    state.shoppingList.push(props);
    console.log(state, "state.shoppingList is here");
    //  console.log(
    //   list,
    //   "list befor commit"
    // );

    //  commit('SET_LIST', list)
  },
  removeListItem({ state }, props) {
    state.shoppingList.pop(props)
  },
};

export const mutations = {
  SET_LIST(state, props) {
    state.shoppingList = props;
  },
};

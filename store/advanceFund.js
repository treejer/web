export const state = () => ({
  shoppingList: [],
});

export const actions = {
  setListItems({ state }, list) {
    console.log(list, "store list");
    state.shoppingList.push(list);

    return state.shoppingList.push(list);
  },
};

export const mutations = {
  SET_LIST(state, shoppingList) {
    state.shoppingList = shoppingList;
  },
};

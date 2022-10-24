export const state = () => ({
  shoppingList: [],
  equalList: [],
  notEqualList: [],

});

export const actions = {
  setListItems({
    state
  }, list) {

    list.sort((a, b) => {
      if (a.id === b.id) {
        console.log(a, "equalList is here")
        state.equalList.push({
          a
        })
      }
      if (a.id !== b.id) {
        console.log(b, "notEqualList is here")
        state.notEqualList.push({
          b
        })

      }
      return console.log(state, "state is here")
    })

  },
};

export const mutations = {
  SET_LIST(state, shoppingList) {
    state.shoppingList = shoppingList;
  },
};

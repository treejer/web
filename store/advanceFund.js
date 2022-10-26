export const state = () => ({
  shoppingList: [],
  equalList: [],
  notEqualList: [],

});

export const actions = {
  async setListItems({context},props) {
    console.log(props, "list is here")
    this.state.advanceFund.shoppingList.push(props)
    // state.shoppingList.push({
    //   counts:props.counts,
    //   list:props.list,  
    // })
    // await commit('SET_LIST', new Array()[{
    //   props
    // }])
    await console.log(this.state.advanceFund.shoppingList, "state.shoppingList is here")
    // list.sort((a, b) => {
    //   if (a.id === b.id) {
    //     console.log(a, "equalList is here")
    //     state.equalList.push({
    //       a
    //     })
    //   }
    //   if (a.id !== b.id) {
    //     console.log(b, "notEqualList is here")
    //     state.notEqualList.push({
    //       b
    //     })

    //   }
    //   return console.log(state, "state is here")
    // })

  },
};

export const mutations = {
  SET_LIST(state, props) {
    console.log(props, "props set item")
    state.shoppingList.concat([props]) 
  },
};

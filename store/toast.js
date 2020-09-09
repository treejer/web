/// toast
export const state = () => ({
  show:false,
  variant:'success',
  title:'Trees added to forest',
  message:'Your payment was successful',
  hasDuration:false,
  hasSideBar:true,
  hasAction:false,
  actions:'Check',
})

export const mutations = {
  SET_TOAST(state, {show, variant, title, message, hasDuration, hasSideBar, hasAction, actions}) {
      state.show = show
      state.variant = variant
      state.title = title
      state.message = message
      state.hasDuration = hasDuration
      state.hasSideBar = hasSideBar
      state.hasAction = hasAction
      state.actions = actions
  }
}

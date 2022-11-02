import {BToast} from 'bootstrap-vue'


export default function ({app,store,redirect}) {
  // If the user is not authenticated
  if (!store.$cookies.get('account')) {
    const toast =new BToast()
    toast.$bvToast.toast(app.i18n.messages.en.alert.notlogin, {
      toaster: 'b-toaster-bottom-left',
      variant: 'danger',
      noAutoHide: true,
      bodyClass: 'fund-error'
    })
    const history = store.$router.history.current.fullPath
    return redirect(history)
    // return store.app._vm.$bvModal.show('five')
  }
  return null
}

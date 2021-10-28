export default ({ app }, inject) => {
    // Inject $dec2hex(dec) in Vue, context and store.
    inject('avatarByWallet', walletAdress => process.env.gravatar + walletAdress)
}

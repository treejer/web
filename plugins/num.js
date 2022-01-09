export default ({ app }, inject) => {
    // Inject $dec2hex(dec) in Vue, context and store.
    inject('dec2hex', dec => '0x' + Number(dec).toString(16))
    inject('hex2Dec', hex => parseInt(hex, 16))
}

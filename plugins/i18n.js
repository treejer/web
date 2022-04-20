export default({ app }, inject) => {
    
    let code = app.i18n.localeProperties.code
    let translates = app.i18n.messages[code]

    inject('translates', translates)

}
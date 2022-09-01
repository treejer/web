export default async ({ app }, inject) => {
    if (app.$cookies.get('config') &&  app.$cookies.get('activeNetwork')) {
        return;
    }

    app.$cookies.set('config', process.env.polygon, {
        maxAge: 60 * 60 * 24 * 365,
        path: '/'
    });

    app.$cookies.set('activeNetwork', {
        name: "Polygon Mainnet",
        logo: require("~/assets/images/wallets/polygon.svg"),
        chainId: "0x89",
        chainName: "polygon",
        rpcUrls: ["https://polygon-rpc.com"],
        nativeCurrency: {
            nativeCurrencyname: "MATIC",
            symbol: "MATIC",
            decimals: 18,
        },
        key: 'polygon',
        blockExplorerUrls: ["https://explorer.matic.network/"],
    },
        {
            maxAge: 60 * 60 * 24 * 365,
            path: '/'
        }
    );
}

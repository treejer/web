import Web3 from 'web3'
import RegularSale from '~/contracts/RegularSale'
import Auction from  '~/contracts/Auction'
import IncrementalSale from  '~/contracts/IncrementalSale'
import WalletConnectProvider from "@walletconnect/web3-provider";


export default async ({ app }, inject) => {
    const walletName = app.$cookies.get('walletName');

    let instance = new Web3(Web3.givenProvider || 'http://localhost:9545');

    if (walletName === 'torus') {

        const Torus = require("@toruslabs/torus-embed");

        const torus = new Torus();
        await torus.init();


        await torus.setProvider({
            host: process.env.NETWORK_NAME, // default : 'mainnet',
            chainId: parseInt(process.env.NETWORK_ID),
        });

        instance = new Web3(torus.provider);

    } else if (walletName === 'fortmatic') {
        const Fortmatic = require("fortmatic");
        const fm = new Fortmatic(process.env.FORTMATIC, process.env.NETWORK_NAME);
        instance = new Web3(fm.getProvider());

    } else if (walletName === 'portis') {
        const Portis = require("@portis/web3");
        const portis = new Portis(process.env.PORTIS, process.env.NETWORK_NAME, {
            scope: ["email"],
        });

        instance = new Web3(portis.provider);
    } else if (walletName === 'walletconnect') {
        const provider = new WalletConnectProvider({
            infuraId: process.env.WALLETCONNECT_PROJECT_ID,
        });
        await provider.enable();

        instance = new Web3(provider);
    }



    inject('web3', instance)
    // inject('treeFactory', new instance.eth.Contract(TreeFactory.abi, process.env.contractTreeFactoryAddress))
    inject('RegularSale', new instance.eth.Contract(RegularSale.abi, process.env.contractTreeRegularSale))
    inject('Auction', new instance.eth.Contract(Auction.abi, process.env.contractAuctionAddress))
    inject('IncrementalSale', new instance.eth.Contract(IncrementalSale.abi, process.env.contractIncrementalSale))
}

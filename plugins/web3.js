import Web3 from 'web3'
import TreeFactory from '~/contracts/TreeFactory'
import SeedFactory from '~/contracts/SeedFactory'
import TreeAuction from  '~/contracts/TreeAuction'
import WalletConnectProvider from "@walletconnect/web3-provider";

export default async ({ app }, inject) => {
    const walletName = app.$cookies.get('walletName');

    let instance = new Web3(Web3.givenProvider || 'http://localhost:9545');

    if (walletName === 'torus') {

        const Torus = require("@toruslabs/torus-embed");

        const torus = new Torus();
        await torus.init();


        await torus.setProvider({
            host: "ropsten", // default : 'mainnet',
            chainId: 3,
        });

        instance = new Web3(torus.provider);

    } else if (walletName === 'fortmatic') {
        const Fortmatic = require("fortmatic");
        const fm = new Fortmatic(process.env.FORTMATIC, 'ropsten');
        instance = new Web3(fm.getProvider());

    } else if (walletName === 'portis') {
        const Portis = require("@portis/web3");
        const portis = new Portis(process.env.PORTIS, "ropsten", {
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
    inject('treeFactory', new instance.eth.Contract(TreeFactory.abi, process.env.contractTreeFactoryAddress))
    inject('seedFactory', new instance.eth.Contract(SeedFactory.abi, process.env.contractSeedFactoryAddress))
    inject('TreeAuction', new instance.eth.Contract(TreeAuction.abi, process.env.treeActionAddress))
}

import Web3 from 'web3'
import RegularSale from '~/contracts/RegularSale'
import Auction from  '~/contracts/Auction'
import IncrementalSale from  '~/contracts/IncrementalSale'
import IHonoraryTree from  '~/contracts/IHonoraryTree'
import TreeAbi from  '~/static/abis/Tree'
import TreeBoxAbi from  '~/static/abis/TreeBox'
import FundWithOffsetAbi from  '~/static/abis/FundWithOffset'
import UniswapV2Router02Abi from  '~/static/abis/UniswapV2Router02'
import WalletConnectProvider from "@walletconnect/web3-provider";


export default async ({ app }, inject) => {
    const walletName = app.$cookies.get('walletName');
    const account = app.$cookies.get('account');

    let instance = null;
    if(Web3.givenProvider) {
        instance = new Web3(Web3.givenProvider);
        await instance.eth.net.getId().then(netId => {
            if (account || netId.toString() === process.env.NETWORK_ID.toString()) {
                return;
            } 
            
            instance = new Web3(new Web3.providers.HttpProvider(process.env.WEB3_PROVIDER));
        })
    } else {
        instance = new Web3(new Web3.providers.HttpProvider(process.env.WEB3_PROVIDER));
    }

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
        let rpc = [];
        rpc[parseInt(process.env.NETWORK_ID)] = process.env.WEB3_PROVIDER;

        const provider = new WalletConnectProvider({
            infuraId: process.env.INFURA_ID,
            rpc: rpc
        });
        await provider.enable();

        instance = new Web3(provider);
    }



    inject('web3', instance)
    // inject('treeFactory', new instance.eth.Contract(TreeFactory.abi, process.env.contractTreeFactoryAddress))
    inject('RegularSale', new instance.eth.Contract(RegularSale.abi, process.env.contractTreeRegularSale))
    inject('Auction', new instance.eth.Contract(Auction.abi, process.env.contractAuctionAddress))
    inject('IncrementalSale', new instance.eth.Contract(IncrementalSale.abi, process.env.contractIncrementalSale))
    inject('IHonoraryTree', new instance.eth.Contract(IHonoraryTree.abi, process.env.contractHonoraryTree))
    inject('Tree', new instance.eth.Contract(TreeAbi, process.env.treeAddress))
    inject('TreeBox', new instance.eth.Contract(TreeBoxAbi, process.env.treeboxContractAddress))
    inject('FundWithOffset', new instance.eth.Contract(FundWithOffsetAbi, process.env.fundWithOffsetContractAddress))
    inject('UniswapV2Router02', new instance.eth.Contract(UniswapV2Router02Abi, process.env.uniswapV2Router02ContractAddress))
}

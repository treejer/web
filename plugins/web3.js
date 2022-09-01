import Web3 from 'web3'
import RegularSale from '~/contracts/RegularSale'
import Auction from  '~/contracts/Auction'
import IncrementalSale from  '~/contracts/IncrementalSale'
import IHonoraryTree from  '~/contracts/IHonoraryTree'
import TreeAbi from  '~/static/abis/Tree'
import TreeBoxAbi from  '~/static/abis/TreeBox'
import FundWithOffsetAbi from  '~/static/abis/FundWithOffset'
import CarbonRetirementsStorageAbi from  '~/static/abis/CarbonRetirementsStorage'
import CarbonRetirementAggregatorAbi from  '~/static/abis/CarbonRetirementAggregator'
import UniswapV2Router02Abi from  '~/static/abis/UniswapV2Router02'
import WalletConnectProvider from "@walletconnect/web3-provider";


export default async ({ app }, inject) => {
    const walletName = app.$cookies.get('walletName');
    const account = app.$cookies.get('account');

    let instance = null;
    if(Web3.givenProvider) {
        instance = new Web3(Web3.givenProvider);
        await instance.eth.net.getId().then(netId => {
            if (account || netId.toString() === app.$cookies.get('activeNetwork').chainId) {
                return;
            } 
            
            instance = new Web3(new Web3.providers.HttpProvider(app.$cookies.get('config').web3Provider));
        })
    } else {
        instance = new Web3(new Web3.providers.HttpProvider(app.$cookies.get('config').web3Provider));
    }

    if (walletName === 'torus') {

        const Torus = require("@toruslabs/torus-embed");

        const torus = new Torus();
        await torus.init();


        await torus.setProvider({
            host: app.$cookies.get('config').web3Provider.chainName, // default : 'mainnet',
            chainId: parseInt(app.$cookies.get('config').web3Provider.chainId),
        });

        instance = new Web3(torus.provider);

    } else if (walletName === 'fortmatic') {
        const Fortmatic = require("fortmatic");
        const fm = new Fortmatic(process.env.fortmatic, app.$cookies.get('config').chainName);
        instance = new Web3(fm.getProvider());

    } else if (walletName === 'portis') {
        const Portis = require("@portis/web3");
        const portis = new Portis(process.env.portis, app.$cookies.get('config').chainName, {
            scope: ["email"],
        });

        instance = new Web3(portis.provider);
    } else if (walletName === 'walletconnect') {
        let rpc = [];
        rpc[app.$cookies.get('config').chainId] = app.$cookies.get('config').web3Provider;

        const provider = new WalletConnectProvider({
            infuraId: process.env.infuraId,
            rpc: rpc
        });
        await provider.enable();

        instance = new Web3(provider);
    }



    inject('web3', instance)
    inject('RegularSale', new instance.eth.Contract(RegularSale.abi, app.$cookies.get('config').contractTreeRegularSale))
    inject('Auction', new instance.eth.Contract(Auction.abi, app.$cookies.get('config').contractAuctionAddress))
    inject('IncrementalSale', new instance.eth.Contract(IncrementalSale.abi, app.$cookies.get('config').contractIncrementalSale))
    inject('IHonoraryTree', new instance.eth.Contract(IHonoraryTree.abi, app.$cookies.get('config').contractHonoraryTree))
    inject('Tree', new instance.eth.Contract(TreeAbi, app.$cookies.get('config').treeAddress))
    inject('TreeBox', new instance.eth.Contract(TreeBoxAbi, app.$cookies.get('config').treeboxContractAddress))
    inject('FundWithOffset', new instance.eth.Contract(FundWithOffsetAbi, app.$cookies.get('config').fundWithOffsetContractAddress))
    inject('CarbonRetirementsStorage', new instance.eth.Contract(CarbonRetirementsStorageAbi, app.$cookies.get('config').carbonRetirementsStorageContractAddress))
    inject('CarbonRetirementAggregator', new instance.eth.Contract(CarbonRetirementAggregatorAbi, app.$cookies.get('config').carbonRetirementAggregatorContractAddress))
    inject('UniswapV2Router02', new instance.eth.Contract(UniswapV2Router02Abi, app.$cookies.get('config').uniswapV2Router02ContractAddress))
}

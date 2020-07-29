import web3 from '~/plugins/web3'
import TreeFactory from '~/contracts/TreeFactory'
import web3Abi from 'web3-eth-abi'

const tokenAddress = '0xbf10aEA0CAD87040E8B17966040f9Fa2A4767061' // insert deployed TreeFactory token address here
const treeFactory = new web3.eth.Contract(TreeFactory.abi, tokenAddress)

let account
web3.eth.getAccounts().then(res => {
	account = res[0]
})

export const state = () => ({})

export const mutations = {}

export const actions = {
	getMyTreeCount() {
		return treeFactory.methods.balanceOf(account).call({ from: account });
	},
	getOwnerTrees() {
		return treeFactory.methods.getOwnerTrees(account).call({ from: account });
	},
	getPrice() {
		return treeFactory.methods.getPrice().call({ from: account })
			.then((treeWeiPrice) => web3.utils.fromWei(treeWeiPrice));
	},
	async plant(context, params) {
		const plantMethod = TreeFactory.abi.find(method => {
			return method.name === 'add'
		})

		// function add(
		// 	uint8 _typeId,
		// 	uint256 _gbId,
		// 	string[] calldata _stringParams,
		// 	uint8[] calldata _uintParams
		// ) external {
		// 	struct Tree {
		// 		string name;
		// 		string latitude;
		// 		string longitude;
		// 		uint256 plantedDate;
		// 		uint256 birthDate;
		// 		uint256 fundedDate;
		// 		uint8 height;
		// 		uint8 diameter;
		// 		uint256 balance;
		// 	}
		// 	trees.push(
		// 		Tree(
		// 			_stringParams[0],
		// 			_stringParams[1],
		// 			_stringParams[2],
		// 			now,
		// 			now,
		// 			0,
		// 			_uintParams[0],
		// 			_uintParams[1],
		// 			0
		// 		)
		// 	);

		console.log(plantMethod,
			['0', '0', ['firstTreeWeb3', '41.0157464', '28.6614805'], ['10', '20']]);

		const plantMethodTransactionData = web3Abi.encodeFunctionCall(
			plantMethod,
			['0', '0', ['firstTreeWeb3', '41.0157464', '28.6614805'], ['10', '20']]
		)

		console.log(plantMethod);

		console.log({
			from: account,
			to: tokenAddress,
			data: plantMethodTransactionData
		});

		const estimateGas = await web3.eth.estimateGas({
			from: account,
			to: tokenAddress,
			data: plantMethodTransactionData
		})

		console.log({
			from: account,
			to: tokenAddress,
			data: plantMethodTransactionData,
			value: 0,
			gas: estimateGas
		});

		const receipt = await web3.eth.sendTransaction({
			from: account,
			to: tokenAddress,
			data: plantMethodTransactionData,
			value: 0,
			gas: estimateGas * 2
		})

		return receipt
	}
}

export const getters = {}

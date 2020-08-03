import web3 from '~/plugins/web3'
import O1Factory from '~/contracts/O1Factory'
import web3Abi from 'web3-eth-abi'

const tokenAddress = process.env.contractO1FactoryAddress // insert deployed O1Factory token address here
const o1Factory = new web3.eth.Contract(O1Factory.abi, tokenAddress)

let account
web3.eth.getAccounts().then(res => {
  account = res[0]
})

export const state = () => ({})

export const mutations = {}

export const actions = {
  getMyTreeCount() {
    return o1Factory.methods.ownerTreesCount(account).call({ from: account });
  },
  getTree(context, params) {
    return o1Factory.methods.getTree(params.id).call({ from: account });
  },
  balanceOf() {
    return o1Factory.methods.balanceOf(account).call({ from: account })
      .then((o1Balance) => web3.utils.fromWei(o1Balance));
  },
  calculateMintableO1() {
    console.log(tokenAddress, "contarct addres")

    return o1Factory.methods.calculateMintableO1(account).call({ from: account })
      .then((mintableO1) => web3.utils.fromWei(mintableO1));
  },
  getPrice() {
    return o1Factory.methods.getPrice().call({ from: account })
      .then((treeWeiPrice) => web3.utils.fromWei(treeWeiPrice));
  },
  async mint(context, params) {
    const mintMethod = O1Factory.abi.find(method => {
      return method.name === 'mint'
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

   

    const mintMethodTransactionData = web3Abi.encodeFunctionCall(
      mintMethod,
      []
    )

    console.log(mintMethod);

    console.log({
      from: account,
      to: tokenAddress,
      data: mintMethodTransactionData
    });

    // const estimateGas = await web3.eth.estimateGas({
    //   from: account,
    //   to: tokenAddress,
    //   data: mintMethodTransactionData
    // })

    console.log({
      from: account,
      to: tokenAddress,
      data: mintMethodTransactionData,
      value: 0,
      // gas: estimateGas
    });

    const receipt = await web3.eth.sendTransaction({
      from: account,
      to: tokenAddress,
      data: mintMethodTransactionData,
      value: 0,
      // gas: estimateGas * 2
    })

    return receipt
  }
}

export const getters = {}


import { BigNumber, ethers } from 'ethers'
import fs from 'fs/promises';

// NewPair event subscription

// const info = {
//   net: {
//     rpc: "https://rpc.sepolia.org",
//   },
//   factory: {
//     address: "0x673901f0a0b0b10036477D14c0aD279fB0147bB1", // LSSVMPairFactory Contract
//     abi: [{"inputs":[{"internalType":"contract LSSVMPairEnumerableETH","name":"_enumerableETHTemplate","type":"address"},{"internalType":"contract LSSVMPairMissingEnumerableETH","name":"_missingEnumerableETHTemplate","type":"address"},{"internalType":"contract LSSVMPairEnumerableERC20","name":"_enumerableERC20Template","type":"address"},{"internalType":"contract LSSVMPairMissingEnumerableERC20","name":"_missingEnumerableERC20Template","type":"address"},{"internalType":"address payable","name":"_protocolFeeRecipient","type":"address"},{"internalType":"uint256","name":"_protocolFeeMultiplier","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"contract ICurve","name":"bondingCurve","type":"address"},{"indexed":false,"internalType":"bool","name":"isAllowed","type":"bool"}],"name":"BondingCurveStatusUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"target","type":"address"},{"indexed":false,"internalType":"bool","name":"isAllowed","type":"bool"}],"name":"CallTargetStatusUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"poolAddress","type":"address"}],"name":"NFTDeposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"poolAddress","type":"address"}],"name":"NewPair","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newMultiplier","type":"uint256"}],"name":"ProtocolFeeMultiplierUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"recipientAddress","type":"address"}],"name":"ProtocolFeeRecipientUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"contract LSSVMRouter","name":"router","type":"address"},{"indexed":false,"internalType":"bool","name":"isAllowed","type":"bool"}],"name":"RouterStatusUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"poolAddress","type":"address"}],"name":"TokenDeposit","type":"event"},{"inputs":[{"internalType":"contract ICurve","name":"","type":"address"}],"name":"bondingCurveAllowed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"callAllowed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_protocolFeeMultiplier","type":"uint256"}],"name":"changeProtocolFeeMultiplier","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"_protocolFeeRecipient","type":"address"}],"name":"changeProtocolFeeRecipient","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"contract ERC20","name":"token","type":"address"},{"internalType":"contract IERC721","name":"nft","type":"address"},{"internalType":"contract ICurve","name":"bondingCurve","type":"address"},{"internalType":"address payable","name":"assetRecipient","type":"address"},{"internalType":"enum LSSVMPair.PoolType","name":"poolType","type":"uint8"},{"internalType":"uint128","name":"delta","type":"uint128"},{"internalType":"uint96","name":"fee","type":"uint96"},{"internalType":"uint128","name":"spotPrice","type":"uint128"},{"internalType":"uint256[]","name":"initialNFTIDs","type":"uint256[]"},{"internalType":"uint256","name":"initialTokenBalance","type":"uint256"}],"internalType":"struct LSSVMPairFactory.CreateERC20PairParams","name":"params","type":"tuple"}],"name":"createPairERC20","outputs":[{"internalType":"contract LSSVMPairERC20","name":"pair","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC721","name":"_nft","type":"address"},{"internalType":"contract ICurve","name":"_bondingCurve","type":"address"},{"internalType":"address payable","name":"_assetRecipient","type":"address"},{"internalType":"enum LSSVMPair.PoolType","name":"_poolType","type":"uint8"},{"internalType":"uint128","name":"_delta","type":"uint128"},{"internalType":"uint96","name":"_fee","type":"uint96"},{"internalType":"uint128","name":"_spotPrice","type":"uint128"},{"internalType":"uint256[]","name":"_initialNFTIDs","type":"uint256[]"}],"name":"createPairETH","outputs":[{"internalType":"contract LSSVMPairETH","name":"pair","type":"address"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"contract ERC20","name":"token","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"depositERC20","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC721","name":"_nft","type":"address"},{"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"internalType":"address","name":"recipient","type":"address"}],"name":"depositNFTs","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"enumerableERC20Template","outputs":[{"internalType":"contract LSSVMPairEnumerableERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"enumerableETHTemplate","outputs":[{"internalType":"contract LSSVMPairEnumerableETH","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"potentialPair","type":"address"},{"internalType":"enum ILSSVMPairFactoryLike.PairVariant","name":"variant","type":"uint8"}],"name":"isPair","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"missingEnumerableERC20Template","outputs":[{"internalType":"contract LSSVMPairMissingEnumerableERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"missingEnumerableETHTemplate","outputs":[{"internalType":"contract LSSVMPairMissingEnumerableETH","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"protocolFeeMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"protocolFeeRecipient","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract LSSVMRouter","name":"","type":"address"}],"name":"routerStatus","outputs":[{"internalType":"bool","name":"allowed","type":"bool"},{"internalType":"bool","name":"wasEverAllowed","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract ICurve","name":"bondingCurve","type":"address"},{"internalType":"bool","name":"isAllowed","type":"bool"}],"name":"setBondingCurveAllowed","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"target","type":"address"},{"internalType":"bool","name":"isAllowed","type":"bool"}],"name":"setCallAllowed","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract LSSVMRouter","name":"_router","type":"address"},{"internalType":"bool","name":"isAllowed","type":"bool"}],"name":"setRouterAllowed","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract ERC20","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawERC20ProtocolFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawETHProtocolFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]
//   }
// }

const info = {
  net: {
    rpc: "http://127.0.0.1:7545",
  },
  factory: {
    address: "0xa466D08396026cF17Ad75Cc431E9eca34C0f974c", // LSSVMPairFactory Contract
    abi: [{ "inputs": [{ "internalType": "contract LSSVMPairEnumerableETH", "name": "_enumerableETHTemplate", "type": "address" }, { "internalType": "contract LSSVMPairMissingEnumerableETH", "name": "_missingEnumerableETHTemplate", "type": "address" }, { "internalType": "contract LSSVMPairEnumerableERC20", "name": "_enumerableERC20Template", "type": "address" }, { "internalType": "contract LSSVMPairMissingEnumerableERC20", "name": "_missingEnumerableERC20Template", "type": "address" }, { "internalType": "address payable", "name": "_protocolFeeRecipient", "type": "address" }, { "internalType": "uint256", "name": "_protocolFeeMultiplier", "type": "uint256" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "contract ICurve", "name": "bondingCurve", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "isAllowed", "type": "bool" }], "name": "BondingCurveStatusUpdate", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "target", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "isAllowed", "type": "bool" }], "name": "CallTargetStatusUpdate", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "poolAddress", "type": "address" }], "name": "NFTDeposit", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "poolAddress", "type": "address" }], "name": "NewPair", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "newMultiplier", "type": "uint256" }], "name": "ProtocolFeeMultiplierUpdate", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "recipientAddress", "type": "address" }], "name": "ProtocolFeeRecipientUpdate", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "contract LSSVMRouter", "name": "router", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "isAllowed", "type": "bool" }], "name": "RouterStatusUpdate", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "poolAddress", "type": "address" }], "name": "TokenDeposit", "type": "event" }, { "inputs": [{ "internalType": "contract ICurve", "name": "", "type": "address" }], "name": "bondingCurveAllowed", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "callAllowed", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_protocolFeeMultiplier", "type": "uint256" }], "name": "changeProtocolFeeMultiplier", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address payable", "name": "_protocolFeeRecipient", "type": "address" }], "name": "changeProtocolFeeRecipient", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "components": [{ "internalType": "contract ERC20", "name": "token", "type": "address" }, { "internalType": "contract IERC721", "name": "nft", "type": "address" }, { "internalType": "contract ICurve", "name": "bondingCurve", "type": "address" }, { "internalType": "address payable", "name": "assetRecipient", "type": "address" }, { "internalType": "enum LSSVMPair.PoolType", "name": "poolType", "type": "uint8" }, { "internalType": "uint128", "name": "delta", "type": "uint128" }, { "internalType": "uint96", "name": "fee", "type": "uint96" }, { "internalType": "uint128", "name": "spotPrice", "type": "uint128" }, { "internalType": "uint256[]", "name": "initialNFTIDs", "type": "uint256[]" }, { "internalType": "uint256", "name": "initialTokenBalance", "type": "uint256" }], "internalType": "struct LSSVMPairFactory.CreateERC20PairParams", "name": "params", "type": "tuple" }], "name": "createPairERC20", "outputs": [{ "internalType": "contract LSSVMPairERC20", "name": "pair", "type": "address" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "contract IERC721", "name": "_nft", "type": "address" }, { "internalType": "contract ICurve", "name": "_bondingCurve", "type": "address" }, { "internalType": "address payable", "name": "_assetRecipient", "type": "address" }, { "internalType": "enum LSSVMPair.PoolType", "name": "_poolType", "type": "uint8" }, { "internalType": "uint128", "name": "_delta", "type": "uint128" }, { "internalType": "uint96", "name": "_fee", "type": "uint96" }, { "internalType": "uint128", "name": "_spotPrice", "type": "uint128" }, { "internalType": "uint256[]", "name": "_initialNFTIDs", "type": "uint256[]" }], "name": "createPairETH", "outputs": [{ "internalType": "contract LSSVMPairETH", "name": "pair", "type": "address" }], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "contract ERC20", "name": "token", "type": "address" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "depositERC20", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "contract IERC721", "name": "_nft", "type": "address" }, { "internalType": "uint256[]", "name": "ids", "type": "uint256[]" }, { "internalType": "address", "name": "recipient", "type": "address" }], "name": "depositNFTs", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "enumerableERC20Template", "outputs": [{ "internalType": "contract LSSVMPairEnumerableERC20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "enumerableETHTemplate", "outputs": [{ "internalType": "contract LSSVMPairEnumerableETH", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "potentialPair", "type": "address" }, { "internalType": "enum ILSSVMPairFactoryLike.PairVariant", "name": "variant", "type": "uint8" }], "name": "isPair", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "missingEnumerableERC20Template", "outputs": [{ "internalType": "contract LSSVMPairMissingEnumerableERC20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "missingEnumerableETHTemplate", "outputs": [{ "internalType": "contract LSSVMPairMissingEnumerableETH", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "protocolFeeMultiplier", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "protocolFeeRecipient", "outputs": [{ "internalType": "address payable", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "contract LSSVMRouter", "name": "", "type": "address" }], "name": "routerStatus", "outputs": [{ "internalType": "bool", "name": "allowed", "type": "bool" }, { "internalType": "bool", "name": "wasEverAllowed", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "contract ICurve", "name": "bondingCurve", "type": "address" }, { "internalType": "bool", "name": "isAllowed", "type": "bool" }], "name": "setBondingCurveAllowed", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address payable", "name": "target", "type": "address" }, { "internalType": "bool", "name": "isAllowed", "type": "bool" }], "name": "setCallAllowed", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "contract LSSVMRouter", "name": "_router", "type": "address" }, { "internalType": "bool", "name": "isAllowed", "type": "bool" }], "name": "setRouterAllowed", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "contract ERC20", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "withdrawERC20ProtocolFees", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "withdrawETHProtocolFees", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "stateMutability": "payable", "type": "receive" }]
  },
  pair: {
    abi: [{ "inputs": [{ "internalType": "enum CurveErrorCodes.Error", "name": "error", "type": "uint8" }], "name": "BondingCurveError", "type": "error" }, { "inputs": [], "name": "Ownable_NewOwnerZeroAddress", "type": "error" }, { "inputs": [], "name": "Ownable_NotOwner", "type": "error" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "a", "type": "address" }], "name": "AssetRecipientChange", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint128", "name": "newDelta", "type": "uint128" }], "name": "DeltaUpdate", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint96", "name": "newFee", "type": "uint96" }], "name": "FeeUpdate", "type": "event" }, { "anonymous": false, "inputs": [], "name": "NFTWithdrawal", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint128", "name": "newSpotPrice", "type": "uint128" }], "name": "SpotPriceUpdate", "type": "event" }, { "anonymous": false, "inputs": [], "name": "SwapNFTInPair", "type": "event" }, { "anonymous": false, "inputs": [], "name": "SwapNFTOutPair", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "TokenDeposit", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "TokenWithdrawal", "type": "event" }, { "inputs": [], "name": "assetRecipient", "outputs": [{ "internalType": "address payable", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "bondingCurve", "outputs": [{ "internalType": "contract ICurve", "name": "_bondingCurve", "type": "address" }], "stateMutability": "pure", "type": "function" }, { "inputs": [{ "internalType": "address payable", "name": "target", "type": "address" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "call", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address payable", "name": "newRecipient", "type": "address" }], "name": "changeAssetRecipient", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint128", "name": "newDelta", "type": "uint128" }], "name": "changeDelta", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint96", "name": "newFee", "type": "uint96" }], "name": "changeFee", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint128", "name": "newSpotPrice", "type": "uint128" }], "name": "changeSpotPrice", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "delta", "outputs": [{ "internalType": "uint128", "name": "", "type": "uint128" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "factory", "outputs": [{ "internalType": "contract ILSSVMPairFactoryLike", "name": "_factory", "type": "address" }], "stateMutability": "pure", "type": "function" }, { "inputs": [], "name": "fee", "outputs": [{ "internalType": "uint96", "name": "", "type": "uint96" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getAllHeldIds", "outputs": [{ "internalType": "uint256[]", "name": "", "type": "uint256[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getAssetRecipient", "outputs": [{ "internalType": "address payable", "name": "_assetRecipient", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "numNFTs", "type": "uint256" }], "name": "getBuyNFTQuote", "outputs": [{ "internalType": "enum CurveErrorCodes.Error", "name": "error", "type": "uint8" }, { "internalType": "uint256", "name": "newSpotPrice", "type": "uint256" }, { "internalType": "uint256", "name": "newDelta", "type": "uint256" }, { "internalType": "uint256", "name": "inputAmount", "type": "uint256" }, { "internalType": "uint256", "name": "protocolFee", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "numNFTs", "type": "uint256" }], "name": "getSellNFTQuote", "outputs": [{ "internalType": "enum CurveErrorCodes.Error", "name": "error", "type": "uint8" }, { "internalType": "uint256", "name": "newSpotPrice", "type": "uint256" }, { "internalType": "uint256", "name": "newDelta", "type": "uint256" }, { "internalType": "uint256", "name": "outputAmount", "type": "uint256" }, { "internalType": "uint256", "name": "protocolFee", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_owner", "type": "address" }, { "internalType": "address payable", "name": "_assetRecipient", "type": "address" }, { "internalType": "uint128", "name": "_delta", "type": "uint128" }, { "internalType": "uint96", "name": "_fee", "type": "uint96" }, { "internalType": "uint128", "name": "_spotPrice", "type": "uint128" }], "name": "initialize", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "bytes[]", "name": "calls", "type": "bytes[]" }, { "internalType": "bool", "name": "revertOnFail", "type": "bool" }], "name": "multicall", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "nft", "outputs": [{ "internalType": "contract IERC721", "name": "_nft", "type": "address" }], "stateMutability": "pure", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256[]", "name": "", "type": "uint256[]" }, { "internalType": "uint256[]", "name": "", "type": "uint256[]" }, { "internalType": "bytes", "name": "", "type": "bytes" }], "name": "onERC1155BatchReceived", "outputs": [{ "internalType": "bytes4", "name": "", "type": "bytes4" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "bytes", "name": "", "type": "bytes" }], "name": "onERC1155Received", "outputs": [{ "internalType": "bytes4", "name": "", "type": "bytes4" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "pairVariant", "outputs": [{ "internalType": "enum ILSSVMPairFactoryLike.PairVariant", "name": "", "type": "uint8" }], "stateMutability": "pure", "type": "function" }, { "inputs": [], "name": "poolType", "outputs": [{ "internalType": "enum LSSVMPair.PoolType", "name": "_poolType", "type": "uint8" }], "stateMutability": "pure", "type": "function" }, { "inputs": [], "name": "spotPrice", "outputs": [{ "internalType": "uint128", "name": "", "type": "uint128" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256[]", "name": "nftIds", "type": "uint256[]" }, { "internalType": "uint256", "name": "minExpectedTokenOutput", "type": "uint256" }, { "internalType": "address payable", "name": "tokenRecipient", "type": "address" }, { "internalType": "bool", "name": "isRouter", "type": "bool" }, { "internalType": "address", "name": "routerCaller", "type": "address" }], "name": "swapNFTsForToken", "outputs": [{ "internalType": "uint256", "name": "outputAmount", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "numNFTs", "type": "uint256" }, { "internalType": "uint256", "name": "maxExpectedTokenInput", "type": "uint256" }, { "internalType": "address", "name": "nftRecipient", "type": "address" }, { "internalType": "bool", "name": "isRouter", "type": "bool" }, { "internalType": "address", "name": "routerCaller", "type": "address" }], "name": "swapTokenForAnyNFTs", "outputs": [{ "internalType": "uint256", "name": "inputAmount", "type": "uint256" }], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "uint256[]", "name": "nftIds", "type": "uint256[]" }, { "internalType": "uint256", "name": "maxExpectedTokenInput", "type": "uint256" }, { "internalType": "address", "name": "nftRecipient", "type": "address" }, { "internalType": "bool", "name": "isRouter", "type": "bool" }, { "internalType": "address", "name": "routerCaller", "type": "address" }], "name": "swapTokenForSpecificNFTs", "outputs": [{ "internalType": "uint256", "name": "inputAmount", "type": "uint256" }], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "contract IERC1155", "name": "a", "type": "address" }, { "internalType": "uint256[]", "name": "ids", "type": "uint256[]" }, { "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }], "name": "withdrawERC1155", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "contract ERC20", "name": "a", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "withdrawERC20", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "contract IERC721", "name": "a", "type": "address" }, { "internalType": "uint256[]", "name": "nftIds", "type": "uint256[]" }], "name": "withdrawERC721", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
  }
}

// const provider = new ethers.providers.Web3Provider(window.ethereum); // metamask
const provider = new ethers.providers.JsonRpcProvider(info.net.rpc)

const factoryContract = new ethers.Contract(info.factory.address, info.factory.abi, provider)


// console.log(await factoryContract.protocolFeeRecipient());
// console.log(await factoryContract.protocolFeeMultiplier());

// create a mock json array db that represents a table with records
const createPairDB = async (name) => {
    try {
        await fs.stat(name)
    } catch (error) {
        if (error.code == 'ENOENT') {
            await fs.writeFile(name, JSON.stringify([]))
        }
    }
    return {
        async get(pair) {
            const buf = await fs.readFile(name)
            const json =  JSON.parse(buf.toString())
            return json.find(obj => {
                return obj.pair = pair
            })
        },
        async getAll() {
            const buf = await fs.readFile(name)
            const json =  JSON.parse(buf.toString())
            return json;
        },
        async put(pair, spotPrice, delta, fee, assetRecipient) {
            const buf = await fs.readFile(name)
            const json =  JSON.parse(buf.toString())
            const index = json.findIndex(obj => obj.pair == pair)
            if (index >= 0) { // found
                json[index] = {pair, spotPrice, delta, fee, assetRecipient}
            } else {
                json.push({pair, spotPrice, delta, fee, assetRecipient})
            }
            await fs.writeFile(name, JSON.stringify(json, null, 2))
        },
    };
}

const fetchPairDetailsAndSave = async (db, pairAddress) => {
  // insert pool information in db
  const contract = new ethers.Contract(pairAddress, info.pair.abi, provider);

  // fetch default parameters
  const [
    spotPrice,
    delta,
    fee,
    assetRecipient
  ] = await Promise.all([
    contract.spotPrice(),
    contract.delta(),
    contract.fee(),
    contract.assetRecipient(),
  ])

  // fetch additional information: 
  // bondingCurve, nftAddress, poolType

  // save in db with addr as primary key
//   console.log(pairAddress, 
//     "spot:", spotPrice.toString(), 
//     "delta:", delta.toString(), 
//     'fee:', fee.toString(), 
//     "recepient:", assetRecipient.toString())
    db.put(pairAddress, 
        spotPrice.toString(), 
        delta.toString(), 
        fee.toString(), 
        assetRecipient.toString())
}



// fetch existing NewPair events from blockchain
const fetchMissingPairs = async (db ) => {
    // fetch latest pair block number from db
    const lastestPairBlockNumber = 1;

    const existingPairs = await factoryContract.queryFilter(
      factoryContract.filters.NewPair(),
      lastestPairBlockNumber, // factoryContract.deployTransaction.blockNumber,
      null
    )

    existingPairs.forEach(async (pair) => {
      await fetchPairDetailsAndSave(db, pair.args.poolAddress)
    })
}

// fetch new NewPair events from blockchain
const fetchNewPairs = (db) => {
    factoryContract.on(
        factoryContract.filters.NewPair(), // on NewPair event
        async (pair) => {
            await fetchPairDetailsAndSave(db, pair)
        })
}

export { createPairDB, fetchMissingPairs, fetchNewPairs };
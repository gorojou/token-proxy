const contract = require("@truffle/contract");
const Proxy = artifacts.require("../contracts/Proxy.sol");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const ProxyContract = contract(Proxy);
let provider = new HDWalletProvider({
  mnemonic: {
    phrase:
      "until clutch idle dwarf foster legend snap night skin gospel produce bar",
  },
  providerOrUrl:
    "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
  network_id: 3, //ropsten
  gas: 6800000, // <-- Use this high gas value
  gasPrice: 0x7a1200, // <-- Use this low gas price
  confirmations: 10,
  networkCheckTimeout: 1000000,
  timeoutBlocks: 200,
  skipDryRun: true,
});
module.exports = async (done) => {
  let data, gas, gasPrice, txData, var1, var2, implementationVal, adminVal;

  await ProxyContract.setProvider(provider);
  gasPrice = await web3.eth.getGasPrice();
  txData = {
    from: "0x1925f2B3f3f8148C6B62dB1c2046DCc4cf67F795",
    gas: 500000,
    gasPrice,
  };
  await ProxyContract.deployed()
    .then(async (contract) => {
      console.log(contract);
      await contract
        .upgrade("0x12299165697f75c61506d14878E614fed96A85F2", txData)
        .then(console.log)
        .catch(console.log);
    })
    .catch(console.log);
  done();
};

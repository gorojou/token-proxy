var json = artifacts.require('../build/contracts/Proxy');
var contract = require("@truffle/contract");
var ProxyContract = contract(json);
//contract('Proxy', ([admin, _]) => {
  //it('should upgrade', async () => {
    let data, gas, gasPrice, txData, var1, var2, implementationVal, adminVal;
    const proxy =  ProxyContract.new();
    //const v1 = await V1.new();
    const v1Web3 = new web3.eth.Contract(
     "0x12299165697f75c61506d14878E614fed96A85F2"//v1.address
    );
    //const v2 = await V2.new();
    const v2Web3 = new web3.eth.Contract(
     // V2.abi,
      "0x44C870155C58B7fe3a9d27ae49a8fCfa5caDbFFa"//v2.address
    );



    //Test Implementation
    proxy.upgrade("0x12299165697f75c61506d14878E614fed96A85F2");
    tx = v2Web3.methods.Transfer;
    data = tx.encodeABI();
    gas =  tx.estimateGas({from: admin});
    gasPrice =  web3.eth.getGasPrice();
    txData = {
      from: admin,
      to: '0x88A09Fa04c9e3f8f2a8C3567A337E39024E1DC98',//proxy.address,
      data, 
      gas: gas + 50000,
      gasPrice
    };
     web3.eth.sendTransaction(txData);
    tx = v2Web3.methods.Transfer();
    data = tx.encodeABI();
    txData = {
      from: admin,
      to: '0x88A09Fa04c9e3f8f2a8C3567A337E39024E1DC98',//proxy.address,
      data: data, 
    };
    var1 =  web3.eth.call(txData);
    assert(web3.utils.hexToNumber(var1) === 10);
    implementationVal =  proxy.implementation();
    assert(implementationVal === '0x12299165697f75c61506d14878E614fed96A85F2');
    adminVal =  proxy.admin();
    assert(adminVal === admin); 
    
    
    //Test Implementation2
     proxy.upgrade(v2.address);
    tx = v2Web3.methods.updateVar2(100);
    data = tx.encodeABI();
    gas =  tx.estimateGas({from: admin});
    gasPrice =  web3.eth.getGasPrice();
    txData = {
      from: admin,
      to: "0x44C870155C58B7fe3a9d27ae49a8fCfa5caDbFFa",
      data, 
      gas: gas + 50000,
      gasPrice
    };
     web3.eth.sendTransaction(txData);
    tx = v2Web3.methods.var1();
    data = tx.encodeABI();
    txData = {
      from: admin,
      to: "0x88A09Fa04c9e3f8f2a8C3567A337E39024E1DC98",
      data: data, 
    };
    var1 =  web3.eth.call(txData);
    tx = v2Web3.methods.var2();
    data = tx.encodeABI();
    txData = {
      from: admin,
      to: "0x88A09Fa04c9e3f8f2a8C3567A337E39024E1DC98",
      data: data, 
    };
    var2 =  web3.eth.call(txData);
    assert(web3.utils.hexToNumber(var1) === 10);
    assert(web3.utils.hexToNumber(var2) === 100);
    implementationVal =  proxy.implementation();
    assert(implementationVal === v2.address);
    adminVal =  proxy.admin();
    assert(adminVal === admin); 
  //});
//});

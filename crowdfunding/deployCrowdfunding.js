var Web3 = require('web3');
var fs = require ('fs');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var token = fs.readFileSync('Crowdfunding.sol').toString();
var solc = require('solc');
var compiledCode = solc.compile(token);
 
var abiDefinition = JSON.parse(compiledCode.contracts[':Crowdsale'].interface);
var compiledContract = web3.eth.contract(abiDefinition);
var byteCode = compiledCode.contracts[':Crowdsale'].bytecode;

var ifSuccessfulSendTo = web3.eth.accounts[0];
var fundingGoalInEthers = 10;
var durationInMinutes = 120;
var etherCostOfEachToken = 1;
var addressOfTokenUsedAsReward = '0xce0e1bf2f85580d937ff1e85ea76c05336a02fa3';

var deployedContract = compiledContract.new(ifSuccessfulSendTo, 
                                            fundingGoalInEthers, 
                                            durationInMinutes, 
                                            etherCostOfEachToken, 
                                            addressOfTokenUsedAsReward,  
                                            {from:web3.eth.accounts[0], 
                                                data: byteCode, 
                                                gas: 1000000}, 
                                                function(e, contract){
  if(!e) {

    if(!contract.address) {
      console.log("Contract transaction send: TransactionHash: " + contract.transactionHash + " waiting to be mined...");

    } else {
      console.log("Contract mined! Address: " + contract.address);
      console.log(contract);
    }
  }
});
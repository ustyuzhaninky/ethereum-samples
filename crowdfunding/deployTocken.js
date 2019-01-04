var Web3 = require('web3')
var fs = require ('fs')

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var token = fs.readFileSync('Token.sol').toString()
var solc = require('solc')
var compiledCode = solc.compile(token)

var abiDefinition = JSON.parse(compiledCode.contracts[':Ticket'].interface)
var TokenContract = web3.eth.contract(abiDefinition)
var byteCode = compiledCode.contracts[':Ticket'].bytecode
 
var initialSupply = 1000
var tokenName = 'Ticket'
var tokenSymbol = '#TKT'
var decimalUnits = 0

var deployedContract = TokenContract.new(initialSupply, tokenName, decimalUnits, tokenSymbol,  {from: web3.eth.accounts[0], data: byteCode, gas: 1000000}, function(e, contract){
  if(!e) {

    if(!contract.address) {
      console.log("Contract transaction send: TransactionHash: " + contract.transactionHash + " waiting to be mined...");

    } else {
      console.log("Contract mined! Address: " + contract.address);
      console.log(contract);
    }

  }
})
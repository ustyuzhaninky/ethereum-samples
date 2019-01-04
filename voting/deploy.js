var Web3 = require('web3')
var fs = require ('fs')

console.log('Deploy start...')
var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
var accounts = web3.eth.accounts
console.log('Available accounts:')
console.log(accounts)   //Just for seeing it
var code = fs.readFileSync('Voting.sol').toString()
var solc = require('solc')
var compiledCode = solc.compile(code)
var abiDefinition = JSON.parse(compiledCode.contracts[':Voting'].interface)
var VotingContract = new web3.eth.Contract(abiDefinition)
var byteCode = compiledCode.contracts[':Voting'].bytecode
var deployedContract = VotingContract.new(['John Snow','Sersey Lannister','Daeneris Targaryen', 'The Night King', 'Samwell Tarley'],{data: byteCode, from: web3.eth.accounts[0], gas: 4700000})
console.log('Contract address is:')
console.log(deployedContract.address)
var contractInstance = VotingContract.at(deployedContract.address)
console.log('Deploy end.')
var Web3 = require('web3')
var fs = require ('fs')
const ganache = require('ganache-cli');

console.log('Deploy start...')
var web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
var accounts = web3.eth.accounts
console.log('Available accounts:')
console.log(accounts)   //Just for seeing it
var code = fs.readFileSync('Voting.sol').toString()
var solc = require('solc')
var compiledCode = solc.compile(code)
var abiDefinition = JSON.parse(compiledCode.contracts[':Voting'].interface)
var VotingContract = web3.eth.contract(abiDefinition)
var byteCode = compiledCode.contracts[':Voting'].bytecode

// Unlock the coinbase account to make transactions out of it
console.log("Unlocking coinbase account");
var password = "";
try {
  web3.personal.unlockAccount(web3.eth.coinbase, password);
} catch(e) {
  console.log(e);
  return;
}

var deployedContract = VotingContract.new(['John Snow','Sersey Lannister','Daeneris Targaryen', 'The Night King', 'Samwell Tarley'], {data: byteCode, from: web3.eth.accounts[0], gas: 4700000})
console.log('Contract address is:')
console.log(deployedContract.address)
var contractInstance = VotingContract.at(deployedContract.address)


// Transaction has entered to ganache-cli memory pool
console.log("Your contract is being deployed in transaction at http://127.0.0.1:8545/" + VotingContract.transactionHash);

// http://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// We need to wait until any miner has included the transaction
// in a block to get the address of the contract
async function waitBlock(contract) {
  while (true) {
    let receipt = web3.eth.getTransactionReceipt(contract.transactionHash);
    if (receipt && receipt.contractAddress) {
      console.log("Your contract has been deployed at http://127.0.0.1:8545/" + receipt.contractAddress);
      console.log("Note that it might take 30 - 90 sceonds for the block to propagate befor it's visible");
      break;
    }
    console.log("Waiting a mined block to include your contract... currently in block " + web3.eth.blockNumber);
    await sleep(4000);
  }
}

waitBlock(deployedContract);
console.log('Deploy end.');

//импортируем Web3
Web3 = require('web3');
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var BigNumber = require('bignumber.js');

//abi контракта
var contract = '0x68e88d78e0ca63dc4730b1fe4df66c7957e1b926';
var abi = [{"constant":false,"inputs":[],"name":"checkGoalReached","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"deadline","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"beneficiary","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tokenReward","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"fundingGoal","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"amountRaised","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"price","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getRaised","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getGoal","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"safeWithdrawal","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"ifSuccessfulSendTo","type":"address"},{"name":"fundingGoalInEthers","type":"uint256"},{"name":"durationInMinutes","type":"uint256"},{"name":"etherCostOfEachToken","type":"uint256"},{"name":"addressOfTokenUsedAsReward","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"recipient","type":"address"},{"indexed":false,"name":"totalAmountRaised","type":"uint256"}],"name":"GoalReached","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"backer","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"isContribution","type":"bool"}],"name":"FundTransfer","type":"event"}];
var Crowdfunding = web3.eth.contract(abi);
contractInstance = Crowdfunding.at(contract);

web3.eth.defaultAccount = web3.eth.accounts[0]
var defaultAccount = web3.eth.defaultAccount;
web3.personal.unlockAccount(defaultAccount);

function update(){
    var time = new Date(1000*contractInstance.getTime.call().toString());
    var border = new Date(0, 0, 0, 2, 0, 0, 0);
    var diff = new Date(border - time);//time_convert(contractInstance.getTime.call().toNumber());

    // $("#elapsed").html('11111');
    // $("#collected").html('2222222');
    // $("#target").html('333333333333');

    $("#elapsed").html(diff.toLocaleTimeString());//diff.toLocaleTimeString());
    $("#collected").html(contractInstance.getRaised.call().toNumber());
    $("#target").html(contractInstance.getGoal.call().toNumber());

    var address = $("#clientAddress").val().toString();
    var amount =  $("#tockenAmount").val().toNumber();
    var price = contractInstance.price;

    if(web3.eth.accounts.includes(address) && amount > 0){
        $("#buyButton").attr('disabled',false);
        $("#totalNumber").val(amount * price);
        web3.eth.getBalance(address, function(balance){
            $("#balanceNumber").val(balance);
        })
    }else{
        alert('Not enough money!');
        $("#buyButton").attr('disabled', true);
    }
}

$(document).ready(function() {  
    setInterval(update, 1000);
});

function sendEth(_from, _to, _amount) {
    web3.eth.sendTransaction({
        from: _from,
        to: _to,
        value: web3.utils.toWei(_amount, 'ether'),
        gas: '0x2710'
    }).then(function(receipt) {
        console.log(receipt);
    });
}

function time_convert(num) { 
    var hours = Math.floor(num / 60);  
    var minutes = num % 60;
    return hours + ":" + minutes;         
}

$("#buyButton").click(buyTocken);

function buyTocken() {
    var to_address = contract;
    var from_address = $("#clientAddress").val().toString();
    var amount = $("#totalNumber").val().toNumber();
    sendEth(from_address, to_address, amount);
}

// function createAccount(_password) {
//   var nObj = web3.eth.accounts.create();
//   web3.eth.accounts.wallet.add(nObj);
//   web3.eth.accounts.wallet.save(_password);
//   return nObj;
// }

// function loadAccount(_password) {
//   try {
//       var l = web3.eth.accounts.wallet.load(_password);
//       console.log("Account Unlocked")
//       return l;
//   } catch (e) {
//       console.log(e);
//   }
// }
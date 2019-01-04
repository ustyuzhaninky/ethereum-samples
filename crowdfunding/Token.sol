pragma solidity ^0.4.20;

contract Ticket {
    /* Public variables of the token */
    string public name;
    string public symbol;
    uint8 public decimals;
    
    /* This creates an array with all balances */
    mapping (address => uint256) public balanceOf;
    
    /** This generates a public event on the blockchain that will notify client 
      * while transaction is pending 
      */
    event Transfer(address indexed from, address indexed to, uint256 value);    
    
    /* Initializes contract with initial supply tokens to the creator of the token */
    constructor(uint256 initialSupply, string tokenName, uint8 decimalUnits, string tokenSymbol) public{
        if (initialSupply == 0) initialSupply = 1000000;
        balanceOf[msg.sender] = initialSupply;
        name = tokenName;
        symbol = tokenSymbol;
        decimals = decimalUnits;
    }

    /* Send coins */
    function transfer(address _to, uint256 _value) public{
        if (balanceOf[msg.sender] < _value) revert();
        if (balanceOf[_to] + _value < balanceOf[_to]) revert();
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
    }
}
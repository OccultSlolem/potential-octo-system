// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";
//main contract 
abstract contract Main is ERC20 {
    // ---------------------------------------- data
    string public merchantName;
    string public productName;
    uint256 public cost;
    uint256 public timeFrame;
    address payable public merchantAddress;
   
   constructor (string memory merchantName_, string memory productName_, uint256 cost_, uint256 timeFrame_, address payable merchantAddress_){
    merchantName = merchantName_;
    productName = productName_;
    cost = cost_;
    timeFrame = timeFrame_;
    merchantAddress = merchantAddress_;
   }
    //finds users address 
    address public userAddress = msg.sender;
    uint256 userBalance = userAddress.balance;
    uint256 merchantBalace = merchantAddress.balance;

   // ------------------------------------------ paying/main 
    //function that is in charge of paying to address
    function transfer(uint256 userBalance_, address payable userAddress_, uint256 cost_, address payable merchantAddress_) public {
    // takes in merchant address, user balance, cost,  
    // transfer amount(cost) from user balance to merchant address
    // check if user has enough funds
    if(userBalance_ < cost_) {
        revert();
    } 
    else {
        _transfer(userAddress_, merchantAddress_, cost);
    }
    }

        
    

    
    




    // ------------------------------------ subscription stuff

    
    bool isSubscriptionActive = false;

    //cancel subscription
    //how do we keep track of subscrition time/ can we run something that runs every certain period of time

    



}
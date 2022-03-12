// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

//main contract 



contract Main {
    // ---------------------------------------- data
    string public merchantName;
    string public productName;
    uint256 public cost;
    uint256 public timeFrame;
    uint256 public merchantAddress;
   
   constructor (string memory merchantName_, string memory productName_, uint256 cost_, uint256 timeFrame_, uint256 merchantAddress_){
    merchantName = merchantName_;
    productName = productName_;
    cost = cost_;
    timeFrame = timeFrame_;
    merchantAddress = merchantAddress_;
   }
    //finds users address 
    address public userAddress = msg.sender;
    mapping(userAddress =>)


   // ------------------------------------------ paying/main 
    //function that is in charge of paying to address
    function transfer (address sender_, address merchantAddress_, uint amount_) public {
        if(sender_ < cost) {
            
        }
    }
        
   
    //function that checks balance
    function balanceOf(address account) external view returns(uint) {
        return address(this).balance;
    }




    // ------------------------------------ subscription stuff

    
    bool isSubscriptionActive = false;

    //cancel subscription
    //how do we keep track of subscrition time/ can we run something that runs every certain period of time

    



}
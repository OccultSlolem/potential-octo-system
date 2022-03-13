// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "https://github.com/pipermerriam/ethereum-datetime";
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

    // calculating time 
    // using blocktime to convert the data of time
    toTimestamp(uint16 year, uint8 month, uint8 day) constant returns (uint timestamp)

    // calculating time elapsed, helps us keep track of calculating remaining time 
    uint256 timeElapsed = 0;
    // find time elapsed

    //updating time counter, the time counter keeps track of how much time remains
    uint256 timeCounter = 0;

    
    

    // update time counter and set time counter to current time
    function updateTimeCounter () public {
        timeCounter = timeFrame - timeElapsed;  
    }
    // resets the time counter, would be called when timeCounter == 0 and when we charge user
    //
    function resetTimeCounter ()public {
        //resets time elapsed, time counter
    }

    //setting issubscriptActive to false
    // when isSub is false, we should remove merchantData from storage if exists
    // when is sub is true we test to see if timeCount is == 0
    // if time counter is == 0 we then charge user and reset timeElapsed, 
    bool public isSubscriptionActive;

    // sets isSubscriptionActive to false
    function updateSubscriptionFalse () public {
        isSubscriptionActive = false;
    }
    // sets isSubscriptionActive to true
    function updateSubscriptionTrue () public {
        isSubscriptionActive = true;
    }


    // cancel subscription

    function cancelSubscription () public {
        updateSubscriptionFalse();
        //end contract
    }
    


    //how do we keep track of subscrition time/ can we run something that runs every certain period of time

    



}
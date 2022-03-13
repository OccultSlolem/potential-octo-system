<script land="ts">
import { onMount } from "svelte";
import './index.css';
import '/Users/aidan/Desktop/Code/hackathonSFSU2022/potential-octo-system/DAPP/contracts/Main.sol';
import '/Users/aidan/Desktop/Code/hackathonSFSU2022/potential-octo-system/trilinkt/src/routes/purchase/payment.svelte';



import removenavbar from "../__layout.svelte"
    onMount(() => {
        // removenavbar()
    })
    
    //create variables for everything the merchant would want to input to setup the purchase page that WE will generate
    let apikey = "myapikey";
    let merchantname = "Merchant";
    let logo = "https://logos-world.net/wp-content/uploads/2020/12/Lays-Logo-700x394.png";

    //datatypes for product info
    let productname = "product";
    let price = .001;
    let period = 30;
    let id = 1234;
    let description = "product description";

    //logic for calculating the subscription
    let subscription = "";
    if(period == -1) subscription = "one time purchase"
    else subscription = `${price}ETH / ${period} days`
    
    
    //timer 

    // const timePeriod = addEventListener(#timerinput);
    // const cancelSub = addEventListener(#cancelsub);
    let timeCounter = 0;
    let subscriptionStatus = false;

   // call this the first time paying 
    function changeSubStatus () {
        subscriptionStatus == true;
    }

    //counting down by days
    //when asking for user input on time frame for sub
    //make sure to take the value as days
    // setInterval(subDay(), 1000 * 60 * 60 * 24); 
 
    //resets counter time, makes it reset to timeperiod
    function resetCounter() {
        // timeCounter = timeCounter + timePeriod;
    }
    //this runs after a day
    function subDay() {
        timeCounter = timeCounter - 1;
        // setInterval()
    }

    // if(subscriptionStatus == true) {
    //     if (timeCounter = 0) {
    //         resetCounter()
    //         transferFunds(userAddress, merchantAddress, cost)
    //   }
      
    //   else {
    //       return "error"
    //   }
    // }   

    // if(cancelSub == true) {
    //     isSubscriptionActive == false;

    // }






</script>

<div class="main">
    <h1 class="header">trilinkt</h1>
    <div class="center">
        <div class="overflow-x-auto">
        <table class="table table-normal w-full">
            <!-- table head-->
            <thead>
                <tr>
                    <th class="left-th">Merchant</th>
                    <th class="center-th">Product</th>
                    <th class="right-th">Subscription Charge</th>
                </tr>
            </thead>
            <tbody>
                <!-- table row 1 -->
                <tr>
                    <td class="left-th">{merchantname}</td>
                    <td class="center-th">{productname}</td>
                    <td class="right-th">{subscription}</td>
                </tr>
            </tbody>
        </table>
        </div>
    </div>
     <h3 class="price">Due now: {price}ETH</h3>
     <h1><b>Description</b></h1>
     <br>
     <p>{description}</p>
     
</div>






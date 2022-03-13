<script land="ts">
import { onMount } from "svelte";
import './index.css'


import removenavbar from "../__layout.svelte"
    onMount(() => {
        removenavbar()
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

    if(period != -1) let seconds = (period*24*60*60);

</script>

<!-- <div>
    <h1 class="header">trilinkt</h1>
    <div class="center"> 
        <div>
            
        </div>
        <h3 class="lining">Merchant Name: {merchantname}</h3>
        
    </div>
</div> -->

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
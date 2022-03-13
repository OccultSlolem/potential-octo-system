<script land="ts">
import { onMount } from "svelte";
import './index.css'
import removenavbar from "../__layout.svelte"
    onMount(() => {
        removenavbar()
    })
    
    //create variables for everything the merchant would want to input to setup the purchase page that WE will generate
    let apikey = "myapikey";
    let merchantname = "Gayierre";
    let logo = "https://logos-world.net/wp-content/uploads/2020/12/Lays-Logo-700x394.png";

    //datatypes for product info
    let productname = "product";
    let price = .001;
    let period = -1;
    let id = 1234;

</script>

<div>
    <h1 class="header">trilinkt</h1>
    <div class="center"> 
        <div>
            
        </div>
        <h3 class="lining">Merchant Name: {merchantname}</h3>
        
    </div>
</div>



   
<script lang="ts">
	import { page } from '$app/stores';
	import { collection, doc, getDocs, query, where, type DocumentData } from 'firebase/firestore';
	import { firestore } from '../../Firebase';

	// let period: number;
	// let price: number;
    let data: DocumentData;
    let prodName = "Coding Cavaliers+";
    let prodPrice = 0.01;
    let prodPeriod = 30;

	async function load() {
		let slug = $page.params.slug;
		let apiKeyIndex = slug.indexOf('apikey');
		let endApiIndex = slug.indexOf('_', apiKeyIndex + 7);
        let productIndex = slug.indexOf('product');
        let endProductIndex = slug.indexOf('_', productIndex + 8)
        console.log(endApiIndex)
        

		if (endApiIndex != -1 && endProductIndex != -1) {
            console.log(2);
			let apikey = slug.substring(apiKeyIndex + 7, endApiIndex);
            let productKey = slug.substring(productIndex + 8, endProductIndex);
			const q = query(collection(firestore, 'merchants'), where('apikey', '==', apikey));
			await getDocs(q)
			.then((querySnapshot) => {
                console.log(3);
			    querySnapshot.forEach((result) => {
                    console.log(4);
                    data = result.data();
                    prodName  = data['products'][productKey].name;
                    prodPrice = data['products'][productKey].price;
                    prodPeriod = data['products'][productKey].period;
                })
			})
			.catch((reason) => {
			    console.error(reason);
			});
		}
	}
</script>

<!-- {#if data != undefined} -->
<!-- <h1>{data.name}</h1> -->

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
                    <td class="left-th">Coding Cavaliers</td>
                    <td class="center-th">{prodName}</td>
                    <td class="right-th">{prodPrice}</td>
                </tr>
            </tbody>
        </table>
        </div>
    </div>
     <h3 class="price">Due now: {prodPrice}ETH</h3>
     <h1><b>Description</b></h1>
     <br>
     <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, laboriosam blanditiis rerum beatae delectus dignissimos temporibus saepe, voluptates perferendis omnis atque expedita aut tempore enim quas corrupti culpa neque magnam.</p>
     <div class="divider"></div>
     <button class="btn btn-primary">Purchase</button>
     <button class="btn btn-accent">Back to Coding Cavaliers</button>
</div>
<!-- {:else} -->
<!-- <button on:click={load} class="btn btn-primary">Reload</button> -->
<!-- {/if} -->
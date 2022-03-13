<script lang="ts">
    import { goto } from "$app/navigation";
    import { doc, DocumentReference, DocumentSnapshot, getDoc, updateDoc, type DocumentData } from "firebase/firestore";
    import { onMount } from "svelte";
    import { firestore, user, type Merchant } from "../../Firebase";
    import Product from "./Product.svelte";

    let merchant: DocumentData;
    let docRef: DocumentReference;
    let key = makeid(64);
    let products = []

    let companyName: string;
    let logoURL: string;
    let compSubmitStatus = 0;
    // 0 == none, 1 == in progress, 2 == success, -1 == fail

    onMount(() => {
        if (user != undefined) {
            docRef = doc(firestore, "merchants", user.uid);
            loadDoc();
        } 
    })

    $: {
        user;
        reload();
    }

    // $: { user; loadDoc(); }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function newProduct() {
        let id = makeid(24);
        await updateDoc(doc(firestore, 'merchants', user.uid), {
            ['products.' + id] : {
                id: id,
                name: '',
                price: 0,
                period: 0
            }
        })
        .then(() => {
            reload();
        })
        .catch((reason) => {
            console.error(reason);
            alert('Failed! :(');
        })
    }

    async function loadDoc() {
        await getDoc(docRef)
        .then((value) => {
            merchant = value.data();

            console.log(Object.values(value.data()['products']));
            products = Object.values(value.data()['products']);
            
        });
    }

    async function submitCompanyDetails() {
        if (companyName == '' || logoURL == '') {
            return;
        }

        compSubmitStatus = 1;

        await updateDoc(doc(firestore, 'merchants', user.uid), {
            name: companyName,
            logo: logoURL
        })
        .then(() => compSubmitStatus = 2)
        .catch((reason) => { console.error(reason); compSubmitStatus = -1 });
    }

    function reload() {
        if (user != undefined) {
            docRef = doc(firestore, "merchants", user.uid);
            loadDoc();
        }
    }

    function makeid(length) {
        var result = '';
        var characters  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * 
        charactersLength));
        }
        return result;
    }

    function regenKey() {
        key = makeid(64);
    }
</script>


<button class="btn" on:click={() => reload()}>Reload</button>

{#if merchant == undefined}
<h1>Loading..</h1>
{:else}
<h1 class="text-3xl font-bold underline">Hello, {user.email}!</h1>

<h3 class="text-xl font-bold">API Key</h3>

<div class="overflow-x-auto">
    <table class="table w-full">
        <tbody>
            <tr>
                <td class="text-ellipsis">{merchant['apikey']}</td>
                <td>
                    <button class="btn btn-primary" on:click={() => regenKey()}>Regenerate key</button>
                </td>
            </tr>
        </tbody>
    </table>
    <br>
</div>
<p>Your API Key won't become valid until you add a name and products. If you regenerate your API key, your existing key will be revoked.</p>
<div class="divider"></div>
<h3 class="text-xl font-bold">Company details</h3>
<p>Name</p>
<input type="text" bind:value="{companyName}" placeholder="{merchant['name']}" class="input input-bordered w-full max-w-xs"><br>
<p>Logo URL</p>
<input type="text" bind:value="{logoURL}" placeholder="{merchant['logo']}" class="input input-bordered w-full max-w-xs"><br>
<button class="btn btn-primary" on:click={submitCompanyDetails}>Save</button>
{#if compSubmitStatus == 1}
<p>Please wait...</p>
{:else if compSubmitStatus == 2}
<p>Success!</p>
{:else if compSubmitStatus == -1}
<p>Failed :(</p>
{/if}

<div class="divider"></div>

<button on:click={newProduct} class="btn btn-primary">Create new product</button>

{#if 'products' in merchant}
{#each products as product}
<Product id={product['id']} docRef={docRef} price = {product.price} period={product.period} name={product.name} />
{/each}
{:else}
<h1>:(</h1>
<p>You have no products.</p>
<p>Maybe try creating one?</p>
{/if}

<!-- <Product /> -->
{/if}
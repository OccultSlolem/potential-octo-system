<script lang="ts">
    import { deleteField, updateDoc, type DocumentReference } from "firebase/firestore";

    export let name: string;
    export let id: string;
    export let price: number;
    export let period: number;
    export let docRef: DocumentReference;

    let nameUpdate: string;
    let priceUpdate: number;
    let periodUpdate: number;

    let submitStatus = 0;
    // 0 == none, 1 == in progress, 2 == success, -1 == fail
    let nodeRef: HTMLDivElement;

    async function update() {
        submitStatus = 1;

        await updateDoc(docRef, {
            ['products.' + id] : {
                name: nameUpdate,
                id: id,
                price: priceUpdate,
                period: periodUpdate
            }
        })
        .then(() => {
            submitStatus = 2;
        })
        .catch((reason) => { console.error(reason); submitStatus = -1 });
    }
    
    async function remove() {
        submitStatus = 1;
        
        await updateDoc(docRef, {
            ['products.' +  id] : deleteField()
        })
        .then(() => {
            submitStatus = 2;
            nodeRef.parentNode.removeChild(nodeRef);
        }) // Destroy self
        .catch((reason) => { console.error(reason); submitStatus = -1 });
    }
</script>

<div bind:this={nodeRef}>
<p>Name</p>
<input type="text" bind:value={nameUpdate} placeholder={name == undefined ? "Type Here": name} class="input input-bordered w-full max-w-xs"><br>
<p>Id</p>
<input disabled type="text" placeholder={id} class="input input-bordered w-full max-w-xs"><br>
<p>Price</p>
<input type="number" bind:value={priceUpdate} placeholder={price == undefined ? "Type Here": String(price)} class="input input-bordered w-full max-w-xs"><br>
<p>period</p>
<input type="number" bind:value={periodUpdate} placeholder={period == undefined ? "Type Here": String(period)} class="input input-bordered w-full max-w-xs"><br>


<button on:click={update} class="btn btn-primary">Save</button>
<button on:click={remove} class="btn btn-warning">Delete</button>

{#if submitStatus == 1}
<p>Please wait...</p>
{:else if submitStatus == 2}
<p>Success!</p>
{:else if submitStatus == -1}
<p>Failed :(</p>
{/if}
</div>
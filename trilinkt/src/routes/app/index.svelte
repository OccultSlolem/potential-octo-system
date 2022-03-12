<script>
    import { user } from "../../Firebase";

    function onClick() {
        console.log(user.uid);
    }
</script>

<h1 class="text-3xl font-bold underline">Hello, world!</h1>
<h1 class="text-center">asdf</h1>

<button class="btn btn-primary" on:click={() => onClick()}>Hello, world!</button>
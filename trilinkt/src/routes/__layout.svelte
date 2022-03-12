<script>
    import { onMount } from "svelte";
    import { initialize } from "../Firebase";

    import Navbar from "./Navbar.svelte";

    import "../app.css";

    onMount(() => {
        initialize();
    })
</script>

<html data-theme="cyberpunk" lang="en">
    <Navbar />
    <slot />
</html>
<script lang="ts">
    import { user } from "../../Firebase";

    let name: string;


    let key = makeid(64);

    function onClick() {
        console.log(user.uid);
    }

    function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * 
        charactersLength));
        }
        return result;
    }

    function regenKey() {
        key = makeid(64);
    }
</script>

<h1 class="text-3xl font-bold underline">Hello, asdf!</h1>
<div class="divider"></div>

<h3 class="text-xl font-bold">API Key</h3>

<div class="overflow-x-auto">
    <table class="table w-full">
        <tbody>
            <tr>
                <td class="text-ellipsis">{key}</td>
                <td>
                    <button class="btn btn-primary" on:click={() => regenKey()}>Regenerate key</button>
                </td>
            </tr>
        </tbody>
    </table>
</div>

<button class="btn btn-primary" on:click={() => onClick()}>Hello, world!</button>
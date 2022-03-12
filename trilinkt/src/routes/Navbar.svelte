<script lang="ts">
import { goto } from '$app/navigation';

    import { user } from '../Firebase';

    function gotoAuth(signUp: boolean) {
      if(signUp) {
        goto('/auth/signup');
        return;
      }
      goto('/auth/signin');
    }
</script>

<div class="navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box">
  <div class="flex-1 px-2 mx-2 lg:flex">
      <a href="/">
        <span class="text-lg font-bold">Trilinkt</span>
    </a>
  </div>

  {#if user}
    <div class="dropdown dropdown-left cursor-pointer">
      <div tabindex="0" class="avatar offline placeholder m-1 pl-2">
        <div
          class="bg-neutral-focus text-neutral-content rounded-full w-10 h-10"
        >
          O
        </div>
      </div>
      <ul
        tabindex="0"
        class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52"
      >
        <li>
          <!-- TODO: Placeholder -->
          <span class="font-thin cursor-default">{user.displayName}</span>
        </li>
        <li>
          <a href="#">Preferences</a>
        </li>
        <li>
          <a href="#">Sign out</a>
        </li>
      </ul>
    </div>
  {:else}
    <div class="flex-none">
      <button class="btn" on:click={() => gotoAuth(false)}>Sign in</button>
      <button class="btn btn-primary" on:click={() => gotoAuth(true)}>Sign up</button>
    </div>
  {/if}
</div>
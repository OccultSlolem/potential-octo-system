<script lang="ts">
	import { onMount } from 'svelte';
	import { auth, user, initialize, disableTelemetry, enableTelemetry } from '../Firebase';
	import { goto } from '$app/navigation';

	import '../app.css';
	export function removenavbar(){
		shownavbar = false;
	}
	let shownavbar = true;
	let name: string;
	let userNeedsCookieConsent = false;
  let signedIn = user != undefined

	onMount(() => {
		initialize();
    auth.onAuthStateChanged((user) => {
      if (user != undefined) {
        signedIn = true;
        name = user.email;
        return;
      }
      signedIn = false;
    })
	});

  function toPortal() {
    goto('/app');
  }

	function cookieConsent(consent: Boolean) {
		localStorage.setItem('cookie-consent', JSON.stringify({ value: consent }));
		userNeedsCookieConsent = false;
		if (!consent) {
			disableTelemetry();
			return;
		}
		enableTelemetry();
	}

	function signout() {
		auth
			.signOut()
			.then(() => {
				goto('/', { replaceState: true });
			})
			.catch((error) => {
				console.error('Failed to sign out: ' + error);
			});
	}

	function navigate(destination: string) {
		switch (destination) {
			case 'home':
				goto('/', { replaceState: true });
			case 'signin':
				goto('/auth/signin', { replaceState: true });
				break;
			case 'signup':
				goto('/auth/signup', { replaceState: true });
		}
	}
</script>

<html data-theme="cyberpunk" lang="en">
	{#if shownavbar}
	<nav>
		<div
			class="navbar flex-row flex-shrink justify-evenly mb-2 shadow-lg bg-neutral text-neutral-content rounded-box"
		>
			<div class="px-2 mx-2 order-first">
				<a href="/">
					<span class="text-lg font-ubuntu font-bold">trilinkt</span>
				</a>
			</div>

			{#if signedIn}
        <button class="btn btn-primary" on:click="{toPortal}">Merchant Portal</button>
				<div class="dropdown dropdown-left dropdown-hover cursor-pointer order-last">
					<div tabindex="0" class="avatar online placeholder m-1 pl-2">
						<div
							class="rounded-full w-10 h-10 ring ring-primary ring-offset-base-100 ring-offset-2"
						>
              {#if name != undefined}
							  <span>{name.substring(0,1)}</span>
              {:else}
                <span>u</span>
              {/if}
						</div>
					</div>
          
					<ul tabindex="0" class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
						<li>
							<span class="font-thin cursor-default text-black text-ellipsis bg-black">{name}</span>
						</li>
						<li>
							<button class="btn" on:click={signout}>Sign out</button>
						</li>
					</ul>
				</div>
			{:else}
				<div class="space-x-4 order-last">
					<button on:click={() => navigate('signin')} class="btn flex-row-reverse btn-outline"
						>Sign in</button
					>
					<button on:click={() => navigate('signup')} class="btn flex-row-reverse btn-primary"
						>Sign up</button
					>
				</div>
			{/if}
		</div>
	</nav>
	{#if userNeedsCookieConsent}
		<!-- TODO: Background, margin -->
		<div class="alert shadow-lg mt-4 mb-4">
			<div>
				<!-- TODO: Reword -->
				<span
					>We use <a class="text-cyan-500" href="#">cookies</a> to provide the best experience. Please
					let us know if you agree to this.</span
				>
			</div>

			<div class="flex-none">
				<button class="btn btn-sm btn-ghost" on:click={() => cookieConsent(false)}>Deny</button>
				<button class="btn btn-sm btn-primary" on:click={() => cookieConsent(true)}>Accept</button>
			</div>
		</div>
	{/if}
	{/if}	
	<slot />
</html>

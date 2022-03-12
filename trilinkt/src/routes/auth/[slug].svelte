<script lang="ts">
    import { auth, user, validateEmail } from "../../Firebase";
    import {
      signInWithPopup,
      signInWithEmailAndPassword,
      createUserWithEmailAndPassword,
      GithubAuthProvider,
      OAuthProvider,
      GoogleAuthProvider,
    } from "firebase/auth";
    import type { AuthError, UserCredential } from "firebase/auth";
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";

    enum LoadingState {
        none = 0,
        loading = 1,
        error = 2
    }

    const loadingMessage = "Loading...";
    let email: string;
    let password: string;
    let confirmPassword: string;
    let message: string;
    let state = LoadingState.none;
    let showSignIn = true; // If false, show sign up page
    let debounce = false;
    function togglePage() {
      if (!debounce) {
        showSignIn = !showSignIn;
      }
    }
    $: {
      let params = $page.params;
      if (params.slug == "signup") {
        showSignIn = false;
      } else {
        showSignIn = true;
      }
    }
    $: {
      if (user != undefined) {
        goto("/app", { replaceState: true });
      }
    }
    $: {
      if (message != undefined && message != loadingMessage) {
        state = LoadingState.error;
      } else {
        switch (message) {
          case loadingMessage:
            state = LoadingState.loading;
            break;
          default:
            state = LoadingState.none;
            break;
        }
      }
    }
    const errorDefinitions = {
      "auth/cancelled-popup-request": undefined,
      "auth/popup-closed-by-user": undefined,
      "auth/invalid-email": "Invalid email",
      "auth/email-already-in-use": "This email is already in use",
      "auth/wrong-password": "Invalid email or password",
      "auth/user-not-found": "Invaled email or password",
    };
    function errorMsg(reason: AuthError) {
      for (let err in errorDefinitions) {
        if (reason.code == err) {
          message = errorDefinitions[err];
          if (message == undefined) {
            return;
          }
        }
      }
      setTimeout(function () {
        message = undefined;
      }, 4000);
    }
    function errorMsgString(reason: string) {
      message = reason;
      setTimeout(function () {
        message = undefined;
      }, 4000);
    }
    /**
     *
     * @param {string} element
     */
    function errorDirective(element: string) {
      switch (element) {
        case "input":
          return "input input-error input-bordered mb-4";
        case "tooltip":
          return "tooltip tooltip-open tooltip-bottom tooltip-error mb-4";
      }
    }
    function infoDirective(element: string) {
      switch (element) {
        case "input":
          return "input input-info input-bordered mb-4";
        case "tooltip":
          return "tooltip tooltip-open tooltip-bottom tooltip-info mb-4";
      }
    }
    function onKeyPress(e: any) {
      switch (showSignIn) {
        case true:
          if (e.charCode == 13) {
            passwordLogIn();
          }
          break;
        case false:
          if (e.charCode == 13) {
            passwordNewAccount();
          }
          break;
      }
    }
    function validateCredential(credential: UserCredential) {
      if (credential != null && credential != undefined) {
        message = undefined;
        goto("/app", { replaceState: true });
      }
    }
    function passwordNewAccount() {
      if (!debounce) {
        debounce = true;
        message = loadingMessage;
        if (validateEmail(email)) {
          if (password != undefined && password != "" && password.length >= 8) {
            if (password == confirmPassword) {
              createUserWithEmailAndPassword(auth, email, password)
                .then((credential) => {
                  validateCredential(credential);
                })
                .catch((reason) => {
                  errorMsg(reason);
                });
            } else {
              debounce = false;
              errorMsgString("Passwords don't match");
            }
          } else {
            debounce = false;
            errorMsgString("Password must be at least 8 characters long");
          }
        } else {
          debounce = false;
          errorMsgString("Invalid email");
        }
        debounce = false;
      }
    }
    function passwordLogIn() {
      if (!debounce) {
        debounce = true;
        message = loadingMessage;
        if (!validateEmail(email)) {
          errorMsgString("Invalid email");
          debounce = false;
          return;
        }
        if (password.length < 8) {
          errorMsgString("Invalid email or password");
          debounce = false;
          return;
        }
        signInWithEmailAndPassword(auth, email, password)
          .then((credential) => {
            debounce = false;
            validateCredential(credential);
          })
          .catch((reason) => {
            debounce = false;
            errorMsg(reason);
          });
      }
    }
    function googleLogIn() {
      if (!debounce) {
        debounce = true;
        message = loadingMessage;
        signInWithPopup(auth, new GoogleAuthProvider())
          .then((credential) => {
            debounce = false;
            validateCredential(credential);
          })
          .catch((reason) => {
            debounce = false;
            errorMsg(reason);
          });
      }
    }
    function githubLogIn() {
      if (!debounce) {
        debounce = true;
        message = loadingMessage;
        const provider = new GithubAuthProvider();
        signInWithPopup(auth, provider)
          .then((credential) => {
            debounce = false;
            validateCredential(credential);
          })
          .catch((reason) => {
            debounce = false;
            errorMsg(reason);
          });
      }
    }
  </script>
  
  <svelte:head>
    <title>trilinkt</title>
  </svelte:head>
  
  <div class="hero max-w-fit min-w-full shrink">
    <div class="hero-content flex min-h-screen">
      <div class="card lg:card-side card-bordered">
        <div class="card-body min-w-full">
          {#if showSignIn}
            <h2 class="card-title">Sign in</h2>
            <div class="form-control">
              <!-- svelte-ignore a11y-label-has-associated-control -->
              <label class="label">
                <span class="label-text">Email</span>
              </label>
              <input
                placeholder="email"
                class={state == LoadingState.error
                  ? errorDirective("input")
                  : state == LoadingState.loading
                  ? infoDirective("input")
                  : "input input-bordered"}
                type="text"
                bind:value={email}
                on:keypress={onKeyPress}
                required
              />
              <!-- svelte-ignore a11y-label-has-associated-control -->
              <label class="label">
                <span class="label-text">Password</span>
              </label>
              <input
                placeholder="password"
                class={state == LoadingState.error
                  ? errorDirective("input")
                  : state == LoadingState.loading
                  ? infoDirective("input")
                  : "input input-bordered mb-4"}
                type="password"
                bind:value={password}
                on:keypress={onKeyPress}
                required
              />
            </div>
            <div class="card-actions">
              <div
                data-tip={message}
                class={state == LoadingState.error
                  ? errorDirective("tooltip")
                  : state == LoadingState.loading
                  ? infoDirective("tooltip")
                  : ""}
              >
                <button class="btn btn-accent" on:click={passwordLogIn}
                  >Sign in</button
                >
              </div>
              <div class="divider">OR</div>
              <button class="btn btn-primary" on:click={googleLogIn}
                >Sign in with Google</button
              >
              <!-- <button class="btn btn-primary">Sign in with Apple</button> -->
              <button class="btn btn-primary" on:click={githubLogIn}
                >Sign in with GitHub</button
              >
            </div>
            <br />
            <div class="divider" />
            <br />
            <p>Need an account?</p>
            <button on:click={togglePage} class="btn btn-primary">Sign up</button>
          {:else}
            <h2 class="card-title">Sign up</h2>
            <div class="form-control">
              <!-- svelte-ignore a11y-label-has-associated-control -->
              <label class="label">
                <span class="label-text">Email</span>
              </label>
              <input
                placeholder="email"
                class={state == LoadingState.error
                  ? errorDirective("input")
                  : state == LoadingState.loading
                  ? infoDirective("input")
                  : "input input-bordered"}
                type="text"
                bind:value={email}
                required
              />
  
              <!-- svelte-ignore a11y-label-has-associated-control -->
              <label class="label">
                <span class="label-text">Password</span>
              </label>
              <input
                placeholder="password"
                class={state == LoadingState.error
                  ? errorDirective("input")
                  : state == LoadingState.loading
                  ? infoDirective("input")
                  : "input input-bordered"}
                type="password"
                bind:value={password}
                required
              />
  
              <!-- svelte-ignore a11y-label-has-associated-control -->
              <label class="label">
                <span class="label-text">Confirm password</span>
              </label>
              <input
                placeholder="confirm password"
                class={state == LoadingState.error
                  ? errorDirective("input")
                  : state == LoadingState.loading
                  ? infoDirective("input")
                  : "input input-bordered mb-4"}
                type="password"
                bind:value={confirmPassword}
                on:keypress={onKeyPress}
                required
              />
            </div>
  
            <div class="card-actions">
              <div
                data-tip={message}
                class={state == LoadingState.error
                  ? errorDirective("tooltip")
                  : state == LoadingState.loading
                  ? infoDirective("tooltip")
                  : ""}
              >
                <button on:click={passwordNewAccount} class="btn btn-accent"
                  >Create account</button
                >
              </div>
              <div class="divider">OR</div>
              <button class="btn btn-primary" on:click={googleLogIn}
                >Sign up with Google</button
              >
              <!-- <button class="btn btn-primary">Sign in with Apple</button> -->
              <button class="btn btn-primary" on:click={githubLogIn}
                >Sign up with GitHub</button
              >
            </div>
            <br />
            <div class="divider" />
            <br />
            <p>Already have an account?</p>
            <button on:click={togglePage} class="btn btn-primary">Sign in</button>
          {/if}
        </div>
      </div>
    </div>
  </div>
<script>
    import Profile from './Profile.svelte';
    import Eats from './Eats.svelte';

    import {user} from './stores.js'

    import { auth, googleProvider } from './firebase';
    import { authState } from 'rxfire/auth';

    let myuser;
    const unsubscribe = authState(auth).subscribe(u => {
        myuser = u
        user.set(u);
    });

    function login() {
        auth.signInWithPopup(googleProvider);
    }
</script>

<style>

section {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

p {
    margin: 1rem 0;
    font-size: 1.5rem;
}
p.tagline {
    margin-bottom: 3rem;
}
p.to-add {
    margin-top: 0.2em;
}
button {
    font-size: 1.5rem;
    margin-bottom: 0;
    color: var(--pink);
}

</style>

<section>
    {#if myuser}

        <!-- <Profile {...myuser} />
        <button on:click={ () => auth.signOut() }>Logout</button> -->
        <!-- <Eats uid={myuser.uid} /> -->

    {:else}

        <p class="tagline">
            Can't decide what to eat?
        </p>

        <button on:click={login}>
            Login
        </button>
        <p class="to-add">to add some eats</p>
    {/if}
</section>
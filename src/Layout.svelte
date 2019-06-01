<script>
import { auth } from './firebase';

import Profile from './Profile.svelte'
import {user} from './stores.js'
let myuser;

user.subscribe(value => {
    myuser = value
});

const logout = () => {
    auth.logout()
}

</script>


<svelte:head>
    <link href="https://fonts.googleapis.com/css?family=Bangers&display=swap" rel="stylesheet">
</svelte:head>

<div class="grid">
    <header>

        <h1>
            What are we going to eat today?<br/>
        </h1>

    </header>
    <main>
        <slot></slot>
    </main>

    <footer>
        {#if myuser}
            <div class="profile">
                <Profile class="profile" {...myuser}></Profile>
                <button class="logout-button" on:click={ () => auth.signOut() }>Logout</button>
            </div>
        {/if}
        <p>Built by <a href="https://www.grooovinger.com">Grooovinger</a></p>
    </footer>
</div>


<style>

:global(body) {
    padding: 0;
    margin: 0;
    font-family: 'Bangers', sans-serif;

    --pink: #DD00C7;
    --lightgrey: #F9F9F9;
}

:global(*) {
    box-sizing: border-box;
}


.grid {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    grid-template-areas: "header" "content";
    height: 100%;
}

header {
    transform: skewY(-5deg) translateY(-2rem);
    padding: 4rem 2rem 1rem 2rem;
    background-color: var(--pink);
    position: sticky;
    top: 0;
    width: 100%;
    grid-area: header; 
    margin-bottom: -2rem;
}

main {
    text-align: center;
    grid-area: content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 2rem;
}

footer {
    background-color: var(--pink);
    text-align: center;
    transform: skewY(-5deg) translateY(1.5rem);
    padding: 0.5rem 1rem 2rem 1rem;
    color: #fff;
    position: fixed;
    bottom: 0;
    width: 100%;
    letter-spacing: 0.03em;
}
footer p {
    margin: 0;
}

footer a {
    color: #fff;
    text-decoration: underline;
}
h1 {
    color: var(--lightgrey);
    text-align: center;
    margin: 0;
    font-size: 2.5rem;
    line-height: 110%;
    letter-spacing: 0.03em;
}

.profile {
    position: absolute;
    bottom: 10px;
    right: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

.logout-button {
    margin-top: 0.5rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: transparent;
    border: none;
    padding: 0;
    text-decoration: underline;
    color: #fff;
}

</style>

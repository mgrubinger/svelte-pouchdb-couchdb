<script>

</script>

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


header {
    transform: skewY(-5deg) translateY(-2rem);
    padding: 4rem 2rem 1rem 2rem;
    background-color: var(--pink);
    position: fixed;
    top: 0;
    width: 100%;
}

main {
    padding-top: 8.5rem;
    padding-bottom: 50rem;
    text-align: center;
}

footer {
    background-color: var(--pink);
    text-align: center;
    transform: skewY(-5deg) translateY(2rem);
    padding: 0rem 1rem 2rem 1rem;
    color: #fff;
    position: fixed;
    bottom: 0;
    width: 100%;
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

</style>


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
        <p>Built by <a href="https://www.grooovinger.com">Grooovinger</a></p>
    </footer>
</div>
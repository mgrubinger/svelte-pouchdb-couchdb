<script>
  import { createEventDispatcher } from 'svelte'
  import { fade } from 'svelte/transition'
  import { debounce } from 'lodash'

  const dispatch = createEventDispatcher()

  function remove() {
    dispatch('remove', {eat})
  }

  function updateText() {
    dispatch('update', {eat})
  }
  // We don’t want to clobber the local DB, so we debounce saving on every keystroke
  const debouncedUpdateText = debounce(updateText, 500)

  // function toggleStatus() {
  //   dispatch('update', {
  //     eat: {
  //       ...eat
  //     }
  //   })
  // }

  export let name
  export let distance
  export let price

</script>

<style>
  button {
    border-radius: 50%;
    width: 2.25em;
    height: 2.25em;
    line-height: 1.3em;
    text-align: center;
    margin-left: 0.75em;
    padding: 0;
  }
</style>

<li transition:fade>
  <!-- <input type='text' on:keyup={debouncedUpdateText} bind:value={eat.text}> -->
  <strong>{name}</strong>
  {distance}
  {price}
  <button on:click={remove}>❌</button>
</li>

<script>
  import { onMount } from 'svelte'
  import { sortBy } from 'lodash'
  import PouchDB from 'pouchdb-browser'

  import Header from './header.svelte'
  import EatItem from './eat-item.svelte'

  // Set up local PouchDB and continuous replication to remote CouchDB
  let db = new PouchDB('db')
  // const replication = PouchDB.sync('db', 'http://localhost:5984/svelte-todo-db', {
  //   live: true,
  //   retry: true
  // }).on('change', async function (info) {
  //   await updateEats()
  // }).on('error', function (err) {
  //   console.log('Replication error:', err)
  // })

  // Set up our vars and defaults
  let newEatText = ''
  let newEatDistance = ''
  let newEatPrice = ''
  let sortByWhat = 'createdAt'
  let filterByWhat = ''
  let isLoading = true

  // All the todos directly from the PouchDB. Sorting and filtering comes later
  let eats = []
  $: sortedAndFilteredEats = sortBy(eats, [sortByWhat]).filter((eat) => {
    const [filterKey, filterValue] = filterByWhat.split(':')
    // Only filter if there’s a proper filter set
    return filterKey && filterValue ? eat[filterKey].toString() === filterValue : true
  })

  // Helper for reloading all todos from the local PouchDB. It’s on-device and has basically zero latency,
  // so we can use it quite liberally instead of keeping our local state up to date like you’d do
  // in a Redux reducer. It also saves us from having to rebuild the local state todos from the data we sent
  // to the database and the `_id` and `_rev` values that were sent back.
  async function updateEats() {
    const allDocs = await db.allDocs({
      include_docs: true
    })
    eats = allDocs.rows.map(row => row.doc)
    isLoading = false
  }

  // Event handlers for adding, updating and removing todos
  async function add(event) {
    const newEat = {
      text: newEatText,
      distance: newEatDistance,
      price: newEatPrice,
      createdAt: new Date().toISOString()
    }
    const addition = await db.post(newEat)
    if (addition.ok) {
      await updateEats()
    }
    newEatText = ''
  }

  async function updateStatus(event) {
    const { eat } = event.detail
    const update = await db.put(eat)
    if (update.ok) {
      await updateEats()
    }
  }

  async function removeItem(event) {
    const { eat: eatToRemove } = event.detail
    const removal = await db.remove(eatToRemove)
    if (removal.ok) {
      // For removal, we can just update the local state instead of reloading everything from PouchDB,
      // since we no longer care about the doc’s revision.
      eats = eats.filter((eat) => {
        return eat._id !== eatToRemove._id
        })
    }
  }

  // Load todos on first run
  onMount(async () => {
    await updateEats()
  })
</script>

<style>
  ul {
    list-style: none;
    padding: 0;
  }
  button {
    margin-left: 0.75em;
  }
  input[type='text'] {
    width: 440px;
  }
</style>

<Header>

{#if isLoading}
  <h1>
    Loading your eats...
  </h1>
{:else}
  {#if eats.length === 0}
    <h1>
      Zero Eats! So hungry 🥙
    </h1>
  {:else}
    <h1>
      Showing {sortedAndFilteredEats.length} of {eats.length} eats
    </h1>
  {/if}
{/if}

<div>
  <label>Sort by:</label>
  <select bind:value={sortByWhat}>
    <option value='createdAt'>Time</option>
    <option value='distance'>Distance</option>
    <option value='price'>Price</option>
  </select>
</div>


<ul>
  {#each sortedAndFilteredEats as eat (eat._id)}
    <EatItem eat={eat} on:remove={removeItem} on:update={updateStatus}/>
  {/each}
</ul>

<form on:submit|preventDefault={add}>
  <input type='text' bind:value={newEatText}>

  <select bind:value={newEatDistance}>
    <option value='near'>Near</option>
    <option value='medium'>Medium</option>
    <option value='far'>Far</option>
  </select>

  <select bind:value={newEatPrice}>
    <option value='cheap'>Cheap</option>
    <option value='pricey'>Pricey</option>
  </select>

  <button type='submit'>➕ Add new eat</button>
</form>
</Header>
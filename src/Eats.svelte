<script>
    // import TodoItem from './TodoItem.svelte';
    import EatItem from './EatItem.svelte'
    import { db } from './firebase';
    import { collectionData } from 'rxfire/firestore';
    import { startWith } from 'rxjs/operators';
    import { getContext } from 'svelte';
    import {eatsStore} from './stores.js'


    let newEatText = '';
    let newEatDistance = null;
    let newEatPrice = null;

    // eatsStore.subscribe(value => {
    //     console.log({value});
    //     eats = value;
    // });

    function add() {
        db.collection('eats').add({ uid, name: newEatText, price: newEatPrice, distance: newEatDistance, created: Date.now() });
        newEatText = '';
        newEatDistance = null;
        newEatPrice = null;
    }

    function updateStatus(event) {
        console.log(event);
        const { id, newStatus } = event.detail;
        // db.collection('eats').doc(id).update({ complete: newStatus });
    }

    function removeItem(event) {
        const { id } = event.detail;
        db.collection('eats').doc(id).delete();
    }
</script>

<style>
    input { display: block }
    
    .form-row {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
</style>

<ul id="aaaa">
    {#each $eatsStore as eat}
        {eat.name}
    {/each}
	<!-- {#each eatsStore as eat}
    
        <EatItem {...eat} on:remove={removeItem} on:toggle={updateStatus} />
        
	{/each} -->
</ul>


<form on:submit|preventDefault={add} class="add-form">
    <div class="form-row">
        <div class="form-element">
            Name:
            <input type='text' bind:value={newEatText}>
        </div>


        <div class="form-element">
            Distance:
            <select bind:value={newEatDistance}>
                <option value=''>n/a</option>
                <option value='near'>Near</option>
                <option value='medium'>Medium</option>
                <option value='far'>Far</option>
            </select>
        </div>

        <div class="form-element">
            Price:
            <select bind:value={newEatPrice}>
                <option value=''>n/a</option>
                <option value='cheap'>Cheap</option>
                <option value='pricey'>Pricey</option>
            </select>
        </div>
    </div>

    <button type='submit' on:click={add}>➕ Add Eat</button>
</form>
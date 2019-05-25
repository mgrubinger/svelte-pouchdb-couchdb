<script>
import {random} from 'lodash'
import {fly, fade} from 'svelte/transition'
import { cubicOut } from 'svelte/easing';

export let foodList;

let foodEmojiList = ["🥙", "🍔", "🥗", "🥪", "🥯", "🍣", "🍲", "🍌", "🌭", "🥑", "🌯", "🍳", "🌽", "🦴", "🍝"]
$: currentFoodEmoji = " ";

let disabled = false;
$: chosenFood = null;


function rand(timeout) {

    if(timeout > 400) {
        disabled = false;
        getRandomFood()
        currentFoodEmoji = "";
        return;
    } 
    window.setTimeout(() => {
        currentFoodEmoji = foodEmojiList[random(0, foodEmojiList.length-1)];
        timeout *= 1.08;
        rand(timeout)
    }, timeout);
}
// kick it off

let go = () => {
    disabled = true;
    chosenFood = null;
    rand(10);
} 

let getRandomFood = () => {
    chosenFood = foodList[random(0, foodList.length-1)];
}

</script>

<style>
.randomfood {
    font-size: 6rem;
}
</style>

<section>
    <button {disabled} on:click={go}>Shuffle!</button>
    <div class="randomfood">
    {currentFoodEmoji}
    </div>
    
    {#if chosenFood}
    <div in:fly="{{ y: 200, duration: 2000, opacity: 0, easing: cubicOut }}">
        <h1>{chosenFood.text}</h1>
        <p>
            Distance: {chosenFood.distance}<br/>
            Price: {chosenFood.price}
        </p>
	</div>
    {/if}
</section>
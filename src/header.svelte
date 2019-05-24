<script>
import {random} from 'lodash'

let food = ["🥙", "🍔", "🥗", "🥪", "🥯", "🍣", "🍲", "🍌", "🌭", "🥑", "🌯"]
$: currentFood = "";


function rand(timeout) {

    if(timeout > 500) {
        console.log("stop");
        return;
    } 
    window.setTimeout(() => {
        currentFood = food[random(0, food.length-1)];
        timeout *= 1.08;
        rand(timeout)
    }, timeout);
}
// kick it off
rand(10);

</script>

<style>

:global(body) {
    padding: 0;
    margin: 0;
}

main {
    max-width: 700px;
    margin: 0 auto;
    text-align: center;
}

</style>

<main>
<h1>
What are we going to eat today?<br/>
{currentFood}
</h1>


<slot></slot>
</main>
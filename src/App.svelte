<script>
  import { onMount } from 'svelte'
  import { sortBy } from 'lodash'
  import PouchDB from 'pouchdb-browser'

  import Layout from './Layout.svelte'
  import Randomizer from './randomizer.svelte'
  import Login from './Login.svelte'
  import { getContext } from 'svelte';
  import { db } from './firebase';
  import { collectionData } from 'rxfire/firestore';
  import { startWith } from 'rxjs/operators';
  import {user, eatsStore} from './stores.js'
  import Eats from './Eats.svelte'
  import {writable} from 'svelte/store'
  
  let myuser = {};
  $: eats = [];

  user.subscribe(value => {
      myuser = value
      if(myuser.uid) {
        const query = db.collection('eats').where('uid', '==', myuser.uid).orderBy('created');
        collectionData(query, 'id')
          .pipe(startWith([]))
          .subscribe(_eats => {
            eatsStore.set(_eats)
            eats = _eats;
          });
      }   
  });


    

  // $: if (myuser.uid) {
  //   const query = db.collection('eats').where('uid', '==', myuser.uid).orderBy('created');
  //   eats = collectionData(query, 'id').pipe(startWith([]));
  //   eatsStore.set(eats);
  // }

</script>

<style>
  
</style>


<svelte:head>
  <title>What are we going to eat today?</title>
</svelte:head>


<Layout>


  <Login/>

  {#each eats as eat}
    <p>xxx{eat.name}</p>
  {/each}

  <Eats uid={myuser.uid}/>



<!-- <Randomizer foodList={eats}/> -->


  
</Layout>
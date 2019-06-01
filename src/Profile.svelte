<script>
    export let displayName;
    export let photoURL;
    export let uid;
</script>

<style>
    img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
    }
</style>

<!-- <h3>Hi { displayName }!</h3> -->

<img src={ photoURL } alt="user avatar">
<!-- <p>Your userID is { uid }</p> -->
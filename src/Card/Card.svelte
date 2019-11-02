<script>
  import { onMount } from "svelte";
  export let tweet =
    "There is no one I respect more then Vladimir Putin. He is a great leader and a tender man.";

  onMount(async () => {
    const res = await fetch("/api/tweets");
    const tweetList = await res;
    console.log(tweetList);

    const randomNumber = Math.random();
    const randomTweet = tweetList[randomNumber];
    // tweet = tweetList[0];
  });
</script>

<style>
  .card-wrapper {
    display: grid;
    grid-template-rows: 1fr 1fr 1fr;
    justify-content: center;
    align-items: center;
    width: 450px;
    height: 500px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    border-radius: 15px;
    background-color: #d81b60;
    color: white;
    padding: 16px;
    font-size: 30px;
    text-align: center;
  }

  .buttons {
    grid-row: 3/4;
  }

  button {
    width: 200px;
    height: 50px;
    background-color: white;
    border: none;
    border-radius: 5px;
    font-size: 20px;
    outline: none;
    font-weight: 700;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
  button:active {
    box-shadow: none;
    background-color: whitesmoke;
  }
</style>

<div class="card-wrapper">
  {tweet}
  <div class="buttons">
    <button>Fake News</button>
    <button>Donald</button>
  </div>
</div>

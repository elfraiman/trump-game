<script>
  import Card from "./Card/Card.svelte";
  import { playerList, playerTurn } from "./store.js";
  import { fade, fly } from 'svelte/transition';

  export let arrayOfPlayers;

  const unsubscribe = playerList.subscribe(value => {
    arrayOfPlayers = value;
  });

</script>

<style>
  main {
    display: grid;
    height: 100vh;
    padding: 16px;
    grid-template: 0.8fr 0.2fr / 1fr;
    overflow: hidden;
  }

  .card-div {
    grid-row: 1/2;
    justify-self: center;
  }
  .player-info {
    justify-self: center;
    text-align: center;
    align-self: start;
    margin-top: 6px;
  }
  .player {
    margin: 6px;
    font-size: 20px;
    color: white;
    font-weight: 700;
  }
</style>

<main>
  <div class="card-div" in:fly="{{ y: 200, duration: 500}}" out:fade>
    <Card />
  </div>

  <div class="player-info" in:fly="{{ y: 200, duration: 500}}" out:fade>
    {#if arrayOfPlayers}
      {#each arrayOfPlayers as player}
        <span class="player">{player.name.toUpperCase()}: <span style="color: red">{player.score}</span></span>
      {/each}
    {/if}
  </div>
</main>

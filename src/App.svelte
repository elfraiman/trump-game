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
    grid-template: 0.2fr 1fr 0.2fr / auto;
    overflow: hidden;
  }

  img {
    grid-row: 1/2;
    justify-self: center;
    width: 300px;
  }

  .card-div {
    grid-row: 2/3;
    justify-self: center;
  }
  .player-info {
    grid-row: 3/4;
    justify-self: center;
    align-self: center;
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
  <img src="images/trump_wall.png" alt="trump hair" />
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

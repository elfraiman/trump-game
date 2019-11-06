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
    height: 100vh;
    padding: 16px;
    overflow: hidden;
  }

  .card-div {
    display: flex;
    justify-content: center;
  }
  .player-info {
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
        <span class="player">{player.name.toUpperCase()}: <span style={player.score < 0 ? "color: red" : "color: #b2ff59"}>{player.score}</span></span>
      {/each}
    {/if}
  </div>
</main>

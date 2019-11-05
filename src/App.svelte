<script>
  import Card from "./Card/Card.svelte";
  import { playerList, playerTurn } from "./store.js";

  export let arrayOfPlayers;
  export let currentPlayerTurn;

  const unsubscribe = playerList.subscribe(value => {
    arrayOfPlayers = value;
  });

  const unsubPlayerTurn = playerTurn.subscribe(value => {
    currentPlayerTurn = value;
  });

  function handleScore(value) {
    console.log(value, "handleScore");
  }
</script>

<style>
  main {
    display: grid;
    height: 100vh;
    padding: 16px;
    grid-template: 0.2fr 1fr 0.2fr / auto;
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
  <div class="card-div">
    <Card />
  </div>

  <div class="player-info">
    {#if arrayOfPlayers}
      {#each arrayOfPlayers as player}
        <span class="player">{player.name.toUpperCase()}: <span style="color: red">{player.score}</span></span>
      {/each}
    {/if}
  </div>
</main>

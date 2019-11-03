<script>
  import Card from "./Card/Card.svelte";
  import { playerList } from './store.js';

  export let arrayOfPlayers;

  const unsubscribe = playerList.subscribe(value => {
    arrayOfPlayers = value;
  })


  function handleScore(value) {
    console.log(value, 'handleScore');
  }
</script>

<style>
  main {
    display: grid;
    width: 100%;
    height: 100vh;
    padding: 16px;
    grid-template: 0.3fr 1fr 0.5fr / 1fr 1fr 1fr;
  }

  img {
    grid-column: 2/3;
    justify-self: center;
    padding: 36px;
  }

  .card-div {
    grid-column: 2/3;
    grid-row: 2/3;
    justify-content: center;
    align-content: center;
  }

  .player-info {
    grid-row: 4/5;
    grid-column: 1/4;
  }
  .player {
    margin: 6px;
    font-size: 20px;
  }
</style>

<main>
<img src="images/trump_just_hair.png" alt="trump hair" />
  <div class="card-div">
    <Card />
  </div>


  <div class="player-info">
    {#each arrayOfPlayers as player}
      <span class="player">{player.name}: {player.score}</span>
    {/each}
  </div>
</main>

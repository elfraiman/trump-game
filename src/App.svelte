<script>
  import Card from "./Card/Card.svelte";
  import Donate from "./Donate/DonateButton.svelte";
  import { playerList, playerTurn } from "./store.js";
  import { fade, fly } from "svelte/transition";

  export let arrayOfPlayers;

  let playerTurnToPlay = 1;

  playerTurn.subscribe(turn => {
    console.log(turn, playerTurnToPlay);
    playerTurnToPlay = turn;
  });

  const unsubscribe = playerList.subscribe(value => {
    arrayOfPlayers = value;
  });
</script>

<style>
  main {
    height: 100vh;
    width: 100%;
    padding: 16px;
    overflow: hidden;
    text-align: center;
  }

  h2 {
    color: white;
    margin-top: 4px;
  }
  .card-div {
    display: flex;
    justify-content: center;
  }
  .player-info {
    text-align: center;
    align-self: start;
    margin-top: 4px;
  }
  .player {
    margin: 6px;
    font-size: 20px;
    color: white;
    font-weight: 700;
  }

  .contact-info {
    font-size: 14px;
    color: white;
    position: absolute;
    text-align: center;
    width: 100%;
    opacity: 0.5;
    margin-top: 16px;
  }
</style>

<main>
  <h2>Make shots great again!</h2>
  <div class="card-div" in:fly={{ y: 200, duration: 500 }} out:fade>
    <Card />
  </div>

  <div class="player-info" in:fly={{ y: 200, duration: 500 }} out:fade>
    {#if arrayOfPlayers}
      {#each arrayOfPlayers as player}
        <span
          class="player"
          style={player.id === playerTurnToPlay ? 'color: white' : 'color: #79d5ff'}>
          {player.name.toUpperCase()}:
          <span style={player.score < 0 ? 'color: #d50000' : 'color: #64dd17'}>
            {player.score}
          </span>
        </span>
      {/each}
    {/if}
  </div>

  <p class="contact-info">BETA VERSION - Contact - elfraiman@gmail.com <Donate /></p>
</main>



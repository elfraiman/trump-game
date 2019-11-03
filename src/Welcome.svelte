<style>
  .welcome-wrapper {
    display: grid;
    justify-content: center;
    align-content: center;
    text-align: center;
    font-family: "Trumpfont", "SF Pro Text", "SF Pro Icons", "Helvetica Neue",
      "Helvetica", "Arial", sans-serif;
  }

  input {
    height: 30px;
    border: none;
    border-radius: 5px;
    padding: 6px;
    outline: none;
  }

  img {
    width: 300px;
    padding: 26px;
  }

  button {
    width: 100%;
    margin-top: 16px;
    height: 30px;
    background-color: white;
    border: none;
    border-radius: 5px;
    font-size: 15px;
    outline: none;
    font-weight: 700;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
  button:active {
    box-shadow: none;
    background-color: whitesmoke;
  }

  select {
    height: 50px;
    border: none;
    border-radius: 5;
    width: 100%;
    font-size: 15px;
  }

  .player-inputs {
    display: flex;
    flex-direction: column;
  }

  .player-input {
    margin: 6px;
  }
</style>

<script>
  import { playerList } from './store.js';
  import App from "./App.svelte";

  export let numberOfPlayers = 0;
  let renderGame = false;
  let players = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  export let arrayOfPlayers = [];

  function handleSubmit() {
    renderGame = true;
    console.log(arrayOfPlayers);
  }

  function createPlayers() {
    if (arrayOfPlayers.length > 0 ) {
      arrayOfPlayers = [];
    }
    let num = 1;
    let tempArray = new Array(numberOfPlayers).fill({id: num});

    tempArray.forEach(player => {
      arrayOfPlayers.push({id: num++, name: '', score: 0 })
    })

    console.log(arrayOfPlayers);
    playerList.set(arrayOfPlayers);
  }

</script>


{#if renderGame}
  <App />
{:else}
  <div class="welcome-wrapper">
    <h2>Down or Donald</h2>
    <img src="images/trump_guns.png" alt="trump" />
    <form on:submit|preventDefault={handleSubmit}>
      <select bind:value={numberOfPlayers} on:change={createPlayers}>
        {#each players as player}
          <option value={player}>{player}</option>
        {/each}
      </select>

      {#if arrayOfPlayers.length > 0}
        <div class="player-inputs">
          {#each arrayOfPlayers as player (player.id)}
            <input class="player-input" placeholder="Player {player.id} name" bind:value={player.name} />
          {/each}
        </div>
      {/if}

      <button type="submit">Submit</button>
    </form>
  </div>
{/if}

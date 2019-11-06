<script>
  import { playerList } from "./store.js";
  import App from "./App.svelte";

  export let numberOfPlayers = 1;
  let renderGame = false;
  let players = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  export let arrayOfPlayers = [{ id: 1, name: "", score: 0 }];

  function handleSubmit() {
    renderGame = true;
  }

  function createPlayers() {
    console.log("change");
    // Resets array of players to an empty array
    if (arrayOfPlayers.length > 0) {
      arrayOfPlayers = [];
    }

    console.log(arrayOfPlayers, numberOfPlayers);

    // Starts the id of the players at 1
    let num = 1;
    // Fill a new temp array
    let tempArray = new Array(numberOfPlayers).fill({
      id: num,
      name: "",
      score: 0
    });
    // Push the player objects
    tempArray.forEach(player => {
      arrayOfPlayers.push({ id: num++, name: "", score: 0 });
    });

    playerList.set(arrayOfPlayers);
  }
</script>

<style>
  h2 {
    color: white;
  }
  .welcome-wrapper {
    display: grid;
    justify-self: center;
    justify-content: center;
    text-align: center;
    font-family: 'Trumpfont', "SF Pro Text", "SF Pro Icons", "Helvetica Neue",
      "Helvetica", "Arial", sans-serif;
  }

  img {
    padding: 26px;
  }

  button {
    width: 150px;
    height: 50px;
    color: white;
    border-radius: 38px;
    border: 2px solid white;
    font-size: 16px;
    padding: 14px;
    outline: none;
    background-color: inherit;
    margin: 16px;
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

  form {
    justify-self: center;
    min-width: 300px;
    width: 500px;
  }

  .player-input {
    grid-row: 3/4;
    height: 30px;
    border: none;
    border-radius: 5px;
    padding: 6px;
    outline: none;
    margin-top: 6px;
  }

  select {
    outline: none;
  }

  @media only screen and (max-width: 600px) {
    img {
      width: 300px;
    }

    form {
      width: 300px;
    }
  }
</style>

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

      {#if numberOfPlayers}
        <div class="player-inputs">
          {#each arrayOfPlayers as player (player.id)}
            <input
              class="player-input"
              placeholder="Player {player.id} name"
              bind:value={player.name} />
          {/each}
        </div>
      {/if}

      <button type="submit">Play</button>
    </form>
  </div>
{/if}

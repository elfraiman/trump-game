<script>
  import { playerList } from "./store.js";
  import { Link, navigate } from "svelte-routing";

  export let numberOfPlayers = 1;
  let renderGame = false;
  let players = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let intro = true;

  export let arrayOfPlayers = [{ id: 1, name: "", score: 0 }];

  function handleSubmit() {
    renderGame = true;
    if (arrayOfPlayers.length === 1) {
      playerList.set(arrayOfPlayers);
    }

    navigate("play", { replace: true });
  }

  function createPlayers() {
    // Resets array of players to an empty array
    if (arrayOfPlayers.length > 0) {
      arrayOfPlayers = [];
    }

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

  function navigateTo(route) {
    navigate(route, { replace: true });
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
  }

  img {
    padding: 26px;
  }

  button:active {
    box-shadow: none;
    background-color: whitesmoke;
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
    padding: 6px;
    outline: none;
    margin-top: 6px;
    background-color: inherit;
    border: 2px solid rgba(255, 255, 255, 0.57);
    color: white;
    font-size: 15px;
    border-radius: 15px;
  }

  ::placeholder {
    color: white;
  }
  ::-webkit-input-placeholder {
    color: white;
  }

  :-ms-input-placeholder {
    color: white;
  }

  select {
    outline: none;
    border: 2px solid white;
    color: black;
    background-color: inherit;
    font-size: 15px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    margin-bottom: 6px;
    border-radius: 15px;
    width: 100%;
    height: 40px;
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

<div class="welcome-wrapper">
  <h2>Make shots great again!</h2>
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
            required
            class="player-input"
            placeholder="Player {player.id} name"
            bind:value={player.name} />
        {/each}
      </div>
    {/if}

    <button type="submit">Play</button>

    <button on:click={() => navigateTo('rules')}>Rules</button>
  </form>
</div>

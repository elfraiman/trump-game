<script>
  import { playerList, firstToScore } from "./store.js";
  import { Link, navigate } from "svelte-routing";
  import Footer from "./Footer/Footer.svelte";

  export let numberOfPlayers = 1;
  let renderGame = false;
  let players = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let gameModes = [
    "First to 5",
    "First to 10",
    "First to 15",
    "All the quotes"
  ];

  let gameMode = "";

  let intro = true;

  export let arrayOfPlayers = [{ id: 1, name: "", score: 0 }];

  function handleSubmit() {
    renderGame = true;
    console.log(arrayOfPlayers, "arrayOfPlayers preGame");
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

  function createGameMode() {
    if (gameMode === "First to 5") {
      firstToScore.set(5);
    } else if (gameMode === "First to 10") {
      firstToScore.set(10);
    } else if (gameMode === "First to 15") {
      firstToScore.set(15);
    } else {
      firstToScore.set(null);
    }
  }

  function navigateTo(route) {
    navigate(route, { replace: true });
  }
</script>

<style>
  .welcome-wrapper {
    display: grid;
    justify-self: center;
    justify-content: center;
    text-align: center;
    padding: 16px;
    margin-bottom: 40px;
  }

  .card {
    display: flex;
    justify-self: center;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;
    text-align: center;
    width: 80vw;
    height: 100%;
    padding: 16px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    font-size: 18px;
    margin-top: 16px;
  }

  img {
    justify-self: center;
    max-width: 800px;
    margin-bottom: -80px;
    margin-right: -20px;
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
    border: none;
    border-bottom: 1px solid #161616;
    font-size: 15px;
  }

  ::placeholder {
    color: #161616;
  }
  ::-webkit-input-placeholder {
    color: #161616;
  }

  :-ms-input-placeholder {
    color: #161616;
  }

  select {
    outline: none;
    border: 2px solid black;
    background-color: inherit;
    font-size: 15px;
    margin-bottom: 6px;
    border-radius: 15px;
    width: 100%;
    height: 40px;
    padding: 6px;
  }

  .buttons {
    display: flex;
    width: 100%;
    margin-top: 16px;
    justify-content: space-between;
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
  <img src="images/trump_openhands.png" alt="trump" />
  <div class="card">
    <form on:submit|preventDefault={handleSubmit}>
      <p>Game Mode</p>
      <select bind:value={gameMode} on:change={createGameMode}>
        {#each gameModes as mode}
          <option value={mode}>{mode}</option>
        {/each}
      </select>
      <p>Players</p>
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
      <div class="buttons">
        <button on:click={() => handleSubmit()} style="border-color: #64d956">
          Play
        </button>

        <button
          style="border-color: #161616"
          on:click={() => navigateTo('rules')}>
          Rules
        </button>
      </div>
    </form>
  </div>
</div>

<Footer />

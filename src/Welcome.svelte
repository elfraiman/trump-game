<script>
  import { playerList } from "./store.js";
  import App from "./App.svelte";
  import Donate from './Donate/DonateButton.svelte';

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
    alert("Turn your sound on for extra trump goodness!");
  }

  function createPlayers() {
    console.log("change");
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

  function passIntro(answer) {
    intro = !answer;
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
    font-family: "Trumpfont";
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
    border-radius: 5px;
    padding: 6px;
    outline: none;
    margin-top: 6px;
    background-color: inherit;
    border: 2px solid rgba(255, 255, 255, 0.57);
    color: white;
    font-size: 15px;
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
    color: white;
    background-color: inherit;
    font-size: 15px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    margin-bottom: 6px;
  }

  .intro {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;
    text-align: center;
    padding: 16px;
  }

  ul {
    text-align: start;
    color: white;
  }

  .contact-info {
    font-size: 14px;
    color: white;
    position: absolute;
    bottom: 2px;
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
{:else if !renderGame && !intro}
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
      <button on:click={() => passIntro(false)}>Rules</button>
    </form>
  </div>
{:else}
  <div class="intro">
    <h2>Rules</h2>
    <ul>
      <li>You must guess if the quote is a real Trump quote or a fake before the timer ends!</li>
      <li>You will earn 1 point for a correct answer and -1 point for a wrong answer.</li>
      <li>If the timer runs out, -1 point and you must TAKE A SHOT!</li>
      <li>If you run out of time, TAKE A SHOT!</li>
      <li>If you get the answer wrong, TAKE A SHOT!</li>
      <li>NO PHONES! If a player touches his phone he TAKES A SHOT!</li>
      <li>NO HELPING, if a player blurts the answer he TAKES A SHOT!</li>
      <li>
        Once you click ok to dismiss the alert GET READY! The 15 seconds timer will start
      </li>
      <li>Winner will not be impeached</li>
      <li>Have fun!</li>
    </ul>

    <button on:click={() => passIntro(true)}>Play</button>
    <p style="color: #ffff00">
      BETA VERSION 1.0
    </p>
    <p class="contact-info">Contact & Information - elfraiman@gmail.com <Donate /> </p>
  </div>
{/if}

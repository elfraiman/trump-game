<script>
  import App from "./App.svelte";
  import { fade } from 'svelte/transition';
  let numberOfPlayers;
  let renderGame = false;

  function submit() {
    renderGame = true;
  }
</script>

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
</style>

{#if renderGame}
  <App />
{:else}
  <div class="welcome-wrapper">
    <h2 >Down or Donald</h2>
    <img src="images/trump_guns.png" alt="trump" />
    <input bind:value={numberOfPlayers} placeholder="Enter number of players" />
    <button on:click={() => submit()}>Submit</button>
  </div>
{/if}

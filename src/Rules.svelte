<script>
  import { Link } from "svelte-routing";
  import Modal from "./Modal/Modal.svelte";
  import Login from "./Login/Login.svelte";
  import { user } from "./store.js";

  let loginModal = false;
</script>

<style>
  h2 {
    color: white;
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
</style>

{#if loginModal && !$user.loggedIn}
  <Modal loginModal="true" on:close={() => (loginModal = false)}>
    <Login />
  </Modal>
{:else}
  <div class="intro">
    <h2>Rules</h2>
    <ul>
      <li>
        You must guess if the quote is a real Trump quote or a fake before the
        timer ends!
      </li>
      <li>
        You will earn 1 point for a correct answer and -1 point for a wrong
        answer.
      </li>
      <li>If the timer runs out, -1 point and you must TAKE A SHOT!</li>
      <li>If you run out of time, TAKE A SHOT!</li>
      <li>If you get the answer wrong, TAKE A SHOT!</li>
      <li>NO PHONES! If a player touches his phone he TAKES A SHOT!</li>
      <li>NO HELPING, if a player blurts the answer he TAKES A SHOT!</li>
      <li>
        Once you click ok to dismiss the alert GET READY! The 15 seconds timer
        will start
      </li>
      <li>Winner will not be impeached</li>
      <li>Have fun!</li>
    </ul>

    <button>
      <Link to="start-game">Start</Link>
    </button>
    <p style="color: #ffff00">BETA VERSION 1.0</p>
  </div>
{/if}

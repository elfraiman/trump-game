<script>
  import { Link, navigate } from "svelte-routing";
  import Modal from "./Modal/Modal.svelte";
  import Login from "./Login/Login.svelte";
  import { user } from "./store.js";
  import Footer from "./Footer/Footer.svelte";
  let loginModal = false;
</script>

<style>
  .wrapper {
    display: flex;
    justify-content: center;
    padding: 16px;
  }

  .header-wrapper {
    padding: 16px;
    justify-content: center;
  }

  h3 {
    text-align: center;
    color: #161616;
    font-size: 35px;
    padding: 16px;
    margin: 0px;
  }
  .card {
    display: flex;
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
  }

  button {
    color: #161616;
    border-color: #161616;
  }

  ul {
    text-align: start;
    padding-left: 16px;
    color: #161616;
  }

  img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: -280px;
    max-width: 800px;
  }

  @media only screen and (max-width: 600px) {
    .card {
      font-size: 16px;
    }
    img {
      width: 300px;
      margin-bottom: -100px;
      max-width: 800px;
    }

    h3 {
      font-size: 20px;
    }
  }
</style>

{#if loginModal && !$user.loggedIn}
  <Modal loginModal="true" on:close={() => (loginModal = false)}>
    <Login />
  </Modal>
{:else}
  <div class="header-wrapper">
    <h3>A drinking game based on President Trump's crazy quotes.</h3>
    <img src="images/trump-winner.png" alt="trump with his hands up" />
  </div>
  <div class="wrapper">
    <div class="card">
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
        <li>NO HELPING, if a player blurts the answer he TAKES A SHOT!</li>
        <li>Winner will not be impeached</li>
        <li>Have fun!</li>
      </ul>

      <button on:click={() => navigate('start-game', { replace: true })}>
        Start
      </button>

      <p>BETA VERSION 1.1</p>
    </div>
  </div>
  <Footer />
{/if}

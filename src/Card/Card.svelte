<script>
  export let cardTimer;
  export let cardTweet;
  export let cardHandleAnswer;
</script>

<style>
  .card-wrapper {
    display: grid;
    justify-content: center;
    justify-items: center;
    align-items: center;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    border-radius: 15px;
    background-color: #d81b60;
    color: white;
    padding: 16px;
    text-align: center;
    min-width: 200px;
    height: 400px;
    max-width: 500px;
    max-height: 100%;
    padding: 6px;
    contain: content;
  }

  .buttons {
    grid-row: 4/5;
    display: flex;
    margin: 6px 0px 6px 0px;
    justify-content: space-between;
    align-self: end;
    width: 100%;
  }

  button {
    color: white !important;
  }

  button:active {
    border-color: greenyellow;
    color: greenyellow;
  }

  .img-div {
    width: 100%;
    background-image: url("images/trump_just_hair.png");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    height: 130px;
    margin-top: 10px;
  }
  .tweet {
    justify-self: start;
    font-size: 20px;
  }

  .timer {
    margin: 0;
    font-size: 40px;
  }

  @media only screen and (max-width: 600px) {
    .card-wrapper {
      max-width: 90%;
      min-height: 300px;
    }

    .tweet {
      font-size: 20px;
    }

    button {
      font-size: 15px;
      height: 40px;
      padding: 6px;
      margin: 6px;
    }
  }

  @media only screen and (max-width: 360px) {
    .card-wrapper {
      max-width: 90%;
      min-height: 300px;
    }

    .tweet {
      font-size: 16px;
      width: 100%;
    }

    button {
      font-size: 11px;
      height: 30px;
      width: 100px;
      padding: 6px;
      margin: 6px;
    }

    .img-div {
      height: 100px;
    }
  }
</style>

<div class="card-wrapper">
  <h2
    class="timer"
    style={cardTimer < 4 ? 'color: #ff5722; font-size: 50px' : 'color: white'}>
    {cardTimer.toString()}
  </h2>
  <div class="tweet">"{cardTweet}"</div>
  <div class="buttons">
    <button on:click={() => cardHandleAnswer(false)}>Fake News</button>
    <button on:click={() => cardHandleAnswer(true)}>Donald</button>
  </div>
</div>

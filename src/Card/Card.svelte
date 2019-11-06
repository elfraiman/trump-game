<script>
  import { onMount } from "svelte";
  import { playerList, playerTurn } from ".././store.js";
  import { fade, fly } from "svelte/transition";

  export let tweet = "test";
  let globfakeOrReal = false;
  let generatedTweet = "";
  let cardAnimation = false;
  let gameOver = false;
  let positiveAudioList = [
    "believe-me.mp3",
    "hillary.mp3",
    "im-really-rich.mp3",
    "okay.mp3",
    "smart-people.mp3",
    "president.mp3",
    "victory.mp3",
    "dream.mp3",
    "wonderful.mp3",
    "mill.mp3"
  ];
  let negativeAudioList = [
    "wrong.mp3",
    "what.mp3",
    "what-do-you-have-to-lose.mp3",
    "were-stupid.mp3",
    "we-need-money.mp3",
    "unemployed.mp3",
    "liars.mp3",
    "stupid.mp3",
    "illegal.mp3",
    "disgrace.mp3"
  ];

  export let realTweets = [
    "There is no one I respect more then Vladimir Putin. He is a great leader and a tender man.",
    "The concept of global warming was created by and for the Chinese in order to make U.S. manufacturing non-competitive",
    "I think if this country gets any kinder or gentler, it's literally going to cease to exist.",
    "I will build a great, great wall on our southern border, and I will have Mexico pay for that wall. Mark my words.",
    "I will be phenomenal to the women. I mean, I want to help women.",
    "This is a tough hurricane, One of the wettest we've ever seen from the standpoint of water.",
    "I have a great relationship with African Americans, as you possibly have heard. I just have great respect for them. And they like me. I like them.",
    "The U.S. cannot allow EBOLA-infected people back. People that go to far away places to help out are great - but must suffer the consequences!",
    "It's really cold outside, they are calling it a major freeze, weeks ahead of normal. Man, we could use a big fat dose of global warming!",
    "To be blunt, people would vote for me. They just would. Why? Maybe because I'm so good looking.",
    "If Hillary Clinton can't satisfy her husband what makes her think she can satisfy America?",
    "If you look at Saddam Hussein, he killed terrorists. I'm not saying he was an angel, but this guy killed terrorists.",
    "While Bette Midler is an extremely unattractive woman, I refuse to say that because I always insist on being politically correct.",
    "Just tried watching Modern Family - written by a moron, really boring. Writer has the mind of a very dumb and backward child. Sorry Danny!",
    "Sorry losers and haters, but my IQ is one of the highest - and you all know it! Please don't feel so stupid or insecure, it's not your fault."
  ];

  export let fakeTweets = [
    "Nobody can dance like me, I’m one of the best dancers people have ever seen. When people see me dance they always tell me wow you’re so good at that.",
    "My Ivanka is very smart, when I’m done she could probably take over as president, she one of the smartest around, very beautiful too, she would be prettiest president.",
    "I considered running as a democrat, I would have won too, really, the American people just love me. I can run as anything and win.",
    "If I had to live in any other country it would probably be Puerto Rico.",
    "If I had gone to Vietnam we probably would have won faster, maybe, I think so. We would have won big and fast.",
    "I sometimes fight with other world leaders, but that’s ok, they can hate me first. Love and hate are very close together you know. And I make them love me, I do. Then they do start to love me for real, true love you know.",
    "Obama and I are actually very good friends, not the best but very good. He tells me he admires me. He would never admit it on air but he does, and I understand why.",
    "Iran is not doing very well, it’s leaders don’t know what to do. I would know what to do if I was them, but I am not so I won’t.",
    "My children are all great, such great kids, all equally great, I couldn’t pick a favourite, or maybe I could, but I wouldn’t tell anyone who she was.",
    "My rallies, they aren’t for me, I do it for the people. I love doing them too, it’s too bad I can’t go see myself do a rally, that would be even better.",
    "Melania is my third wife, the best so far. Newer is always better right? I think it is, we’ll know for sure if the next one is better.",
    "I don’t like bananas, I’ve never had one but I know I wouldn’t like it. I just know these things. I have a special sense for what I like and I don’t like them.",
    "If the fake news media was fair to me, my approval rating would be even better than it is now. There are lots of people that like me a lot. Because of the fake news don’t know it.",
    "The apprentice was a very high rated show. I bring high rating. If the white house was filmed it would probably have high rating too. I’m very good at that, one of the best."
  ];

  let playerTurnToPlay;
  let players;

  playerTurn.subscribe(turn => (playerTurnToPlay = turn));
  playerList.subscribe(playersState => (players = playersState));

  function generateTweet() {
    // While real or fake have items keep playing
    if (realTweets.length > 0 && fakeTweets.length > 0) {
      // 1 real 2 fake
      const fakeOrReal = Math.floor(Math.random() * 2) + 1;
      if (fakeOrReal === 1) {
        // Real
        globfakeOrReal = true;
        const randomIndex = Math.floor(Math.random() * realTweets.length);
        generatedTweet = realTweets[randomIndex];
        realTweets.splice(randomIndex, 1);
      } else {
        // Fake
        globfakeOrReal = false;
        const randomIndex = Math.floor(Math.random() * fakeTweets.length);
        generatedTweet = fakeTweets[randomIndex];
        fakeTweets.splice(randomIndex, 1);
      }
    } else {
      gameOver = true;
      generateTweet = "";
    }
  }

  function playAudio(answer) {
    let audio;
    if (answer) {
      let randNum = Math.floor(Math.random() * positiveAudioList.length);
      let positiveRandomClip = positiveAudioList[randNum];
      audio = new Audio(`audio/${positiveRandomClip}`);
    } else {
      let randNum = Math.floor(Math.random() * negativeAudioList.length);
      let negativeRandomClip = negativeAudioList[randNum];
      audio = new Audio(`audio/${negativeRandomClip}`);
    }

    audio.play();
  }

  function handleAnswer(answer) {
    if (answer && globfakeOrReal) {
      playAudio(true);
      handleScore(true);
      alert("Correct");
      generateTweet();
      animateCard();
    } else if (!answer && !globfakeOrReal) {
      playAudio(true);
      handleScore(true);
      alert("Correct");
      animateCard();
      generateTweet();
    } else {
      playAudio(false);
      handleScore(false);
      alert("Down it!");
      generateTweet();
      animateCard();
    }
  }

  onMount(() => {
    generateTweet();
    gameOver = false;
  });

  function animateCard() {
    cardAnimation = true;
    setTimeout(() => {
      cardAnimation = false;
    }, 600);
  }

  function handleScore(handler) {
    if (players) {
      const player = players.find(val => val.id === playerTurnToPlay);

      players.find(playerFromList => {
        if (handler) {
          playerFromList.id === player.id ? playerFromList.score++ : null;
        } else {
          playerFromList.id === player.id ? playerFromList.score-- : null;
        }
      });

      if (playerTurnToPlay < players.length) {
        playerTurnToPlay++;
      } else {
        playerTurnToPlay = 1;
      }

      // Since values are bond to each other in svelte all you need to do is update the store with itself
      //
      playerList.update(store => players);
      playerTurn.update(turn => turn);
    }
  }
</script>

<style>
  .card-wrapper {
    display: grid;
    grid-template-rows: 0.5fr 1fr 0.5fr;
    justify-content: center;
    justify-items: center;
    align-items: center;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    border-radius: 15px;
    background-color: #d81b60;
    color: white;
    padding: 16px 16px 16px 16px;
    font-size: 25px;
    text-align: center;
    min-width: 300px;
    min-height: 500px;
    max-width: 500px;
    max-height: 500px;
  }

  .buttons {
    grid-row: 3/4;
    display: flex;
    margin-top: 6px;
    justify-content: space-between;
    align-self: end;
    width: 100%;
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
    font-family: "Trumpfont";
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
    height: 170px;
  }
  .tweet {
    justify-self: start;
  }

  @media only screen and (max-width: 600px) {
    .tweet {
      font-size: 18px;
    }

    .img-div {
      height: 120px;
    }

    button {
      font-size: 15px;
      height: 40px;
      padding: 6px;
    }
  }
</style>

{#if !cardAnimation && !gameOver}
  <div class="card-wrapper" in:fade out:fly={{ x: -500, duration: 600 }}>
    <div class="img-div" />
    <div class="tweet">"{generatedTweet}"</div>
    <div class="buttons">
      <button on:click={() => handleAnswer(false)}>Fake News</button>
      <button on:click={() => handleAnswer(true)}>Donald</button>
    </div>
  </div>
{/if}

<script>
  import Card from "./Card/Card.svelte";
  import Donate from "./Donate/DonateButton.svelte";
  import Footer from "./Footer/Footer.svelte";
  import Modal from "./Modal/Modal.svelte";
  import { navigate } from "svelte-routing";

  import { playerList, playerTurn, firstToScore } from "./store.js";
  import { onMount } from "svelte";
  import { fade, fly } from "svelte/transition";

  // Fake or real quote boolean
  let globfakeOrReal = false;
  // Initial generated tweet
  let generatedTweet = "Get READY!";
  // Triggers the slide in animation for the card
  let cardAnimation = false;
  // Game over boolean
  let gameOver = false;
  // Interval variable for the timer, globally declared
  let intervalTrigger;
  // Default timer time, can be changed here for global change.
  let defaultTimeForTimer = 20;
  // Timer
  let timer = defaultTimeForTimer;
  // Current local player turn, this goes to state
  let playerTurnToPlay = 1;
  // General stop timer for dev
  let stopTimer = false;
  // Modal booleans
  let showPositiveModal = false;
  let showNegativeModal = false;
  let showGetReadyModal = true;
  let showGameOverModal = false;
  //Game mode score
  let toScore;
  //Winner
  let winner = "";

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
    "Sorry losers and haters, but my IQ is one of the highest - and you all know it! Please don't feel so stupid or insecure, it's not your fault.",
    "She does have a very nice figure. I’ve said if Ivanka weren’t my daughter, perhaps I’d be dating her.",
    "I have black guys counting my money. … I hate it. The only guys I want counting my money are short guys that wear yarmulkes all day.",
    "Our great African-American president hasn’t exactly had a positive impact on the thugs who are so happily and openly destroying Baltimore.",
    "I could stand in the middle of Fifth Avenue and shoot people and I wouldn't lose voters.",
    "Lyin' Ted Cruz just used a picture of Melania from a G.Q. shoot in his ad. Be careful, Lyin' Ted, or I will spill the beans on your wife!",
    "And he referred to my hands, if they are small, something else must be small. I guarantee you there’s no problem. I guarantee.",
    "26,000 unreported sexual assults in the military-only 238 convictions. What did these geniuses expect when they put men & women together?",
    "A person who is very flat-chested is very hard to be a 10.",
    "She had the height, she had the beauty, she had the skin – the whole thing. She was crazy, but these are minor details.",
    "You know, it really doesn’t matter what the media write as long as you’ve got a young and beautiful piece of ass.",
    "The problem is we have the Geneva Conventions, all sorts of rules and regulations, so the soldiers are afraid to fight.",
    "You know I’m automatically attracted to beautiful—I just start kissing them. It’s like a magnet. Just kiss. I don’t even wait.",
    "I’ve been treated very unfairly by this judge. Now, this judge is of Mexican heritage. I'm building a wall, OK? I'm building a wall.",
    "I'm also honored to have the greatest temperament that anybody has.",
    "Women: You have to treat them like s**t.",
    "I know more about ISIS than the generals do, believe me...I would bomb the sh**t out of them.",
    "I've had a beautiful, I've had a flawless campaign. You'll be writing books about this campaign.",
    "Happy Cinco de Mayo! The best taco bowls are made in Trump Tower Grill. I love Hispanics!",
    "These people—I'd like to use really foul language. I won't do it. I was going to say they're really full of s**t, but I won't say that.",
    "It is better to live one day as a lion than 100 years as a sheep.",
    "All of the women on 'The Apprentice' flirted with me—consciously or unconsciously. That's to be expected.",
    "The beauty of me is that I'm very rich.",
    "I like kids. I mean, I won’t do anything to take care of them. I’ll supply funds, and she’ll take care of the kids.",
    "I will be the greatest jobs president that God ever created.",
    "I don't think I'm going to lose, but if I do, I don't think you're ever going to see me again, folks. I think I'll go to Turnberry and play golf or something.",
    "I don’t think I’ve made mistakes. Every time somebody said I made a mistake, they do the polls and my numbers go up, so I guess I haven't made any mistakes.",
    "Well I, I loved my previous life, I had so many things going. I, I, I actually, this is more work than my previous life. I thought it would be easier.",
    "I've never seen anyone thin drink Diet Coke"
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
    "The apprentice was a very high rated show. I bring high rating. If the white house was filmed it would probably have high rating too. I’m very good at that, one of the best.",
    "Beautiful women love me, and I love them. It's probably because we have that in common, being beautiful",
    "Folks it's a shame we don't have kings anymore, a lot of people don't know we used to have kings. I would make great king",
    "My sons are great, they have me as a dad so ofcourse they are. Some would even say that's the best thing about them",
    "I can't be impeached, Obama was not impeached and I'm doing twice the job he did. I'm doing incredible, far too good to be impeached",
    "No president has ever been treated as badly as I have been treated. Some were shot yes, but what happens to me is worse, much worse.",
    "I'm a very good businessman, not because my numbers are good, they are tremendous numbers, you wouldn't believe, but my business is what makes me a good businessman.",
    "I'm one of the best in branding, probably the best out there, I have done great branding for America, the same as I did for the Trump brand, gave it some class a lot of class.",
    "Our relationship with North Korea was nothing. Then I came, and was diplomatic, you know, using diplomacy. They had never seen that before. That’s why our relationship is so much better now, the best even.",
    "These late night hosts talk about me all the time, The Colbert show and Jon Daily, they all need me. Without me they would be on the street. They should vote for me, I saved their jobs.",
    "They say my children had it easy. That’s not true, they’re my kids. Imagine having to live up to that? That’s a lot of pressure, to follow someone so successful.",
    "Kids these days, so nasty. Used be a lot better. They have a lot of hate in them now. They say things like ‘Oke Boomer’. No respect at all. In my day we didn’t do that.",
    "This whole thing because of some whistle blower, can you believe it? I don’t. I’m blowing the whistle on the whistle blower. And I blow a lot better.",
    "I don’t need anyone’s help to beat Sleepy Joe. And if I did, I would not ask Ukraine, I’ve got a lot better options, great options.",
    "It’s important I golf a lot. I’m a very good golfer, really one of the best I think. And if you want to as good as me, you’ve have to keep playing, you have to",
    "As you know, my inauguration was a huge event, absolutely huge. When I win again the crowd will probably be even bigger. A crowd so big, Obama would never even dream of getting on that big.",
    "Kim Jong-un’s father was actually also called Kim, not a lot of people know that. And his dad was a Kim too, they’re all Kims.",
    "That congresswoman from Illinois is a seven tops, if she was a republican maybe an eight.",
    "Someone told me you can't say junk or pussy anymore these day, because of the political correctness of the left. We need to say their 'private parts'. Can you believe that? What's the world coming to",
    "Nobody’s smarter than me. If I didn’t go into real estate but into science, I would have been bigger than Einstein.",
    "If I was a scientist, I would run circles around even Steven Hawking, and not because he’s in a wheelchair.",
    "Folks, I’ve got an announcement. I had the best people working on a secret project for a long time. The very best. We’re building some great technology, the greatest tech even. But that’s classified.",
    "It’s clearly a budget. It’s got lots of numbers in it.",
    "You know, if I were a single man, I might ask that mummy out. That's a good-looking mummy",
    "The vast majority of our imports come from outside the country.",
    "I would never pay for sex, I have the money to do it but don’t need to. I would even say people would pay to sleep with me, I think they would. They really want to be with me.",
    "I feel bad for Robert Mueller. He’s doing a lot a work for nothing. Poor guy, being sent on the world’s largest witch hunt can’t be fun.",
    "Crazy Bernie has no idea what he’s talking about. If he becomes president, he’ll be begging for my help. I make running the economy look easy, no socialist can do it this well."
  ];

  // Generates a random tweet from the list, also randomly generates a real or fake one.
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
      endGame();
    }
  }

  // In charge of getting a random audio clip to sound
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

  // Triggers the actions for a true answer || false
  function actions(boolean) {
    if (!gameOver) {
      generateTweet();
      startTimer();
      playAudio(boolean);
      handleScore(boolean);
      animateCard();
    }
  }

  // Answer logic
  function handleAnswer(answer, timerEnded) {
    if (
      (answer && globfakeOrReal && !timerEnded) ||
      (!answer && !globfakeOrReal && !timerEnded)
    ) {
      showPositiveModal = true;
      showNegativeModal = false;
      showGetReadyModal = false;
      actions(true);
    } else if (timerEnded) {
      showNegativeModal = true;
      showGetReadyModal = false;
      showPositiveModal = false;
      actions(false);
    } else {
      showNegativeModal = true;
      showGetReadyModal = false;
      showPositiveModal = false;
      actions(false);
    }
  }

  // Game timer logic
  function startTimer() {
    let modalTimer;
    // Checkes if any modal is open, if so it resets the time until the modal closes.
    modalTimer = setInterval(() => {
      if (showPositiveModal || showNegativeModal || showGetReadyModal) {
        timer = defaultTimeForTimer;
      } else {
        clearInterval(modalTimer);
      }
    }, 1000);

    if (!stopTimer) {
      let sound = new Audio("audio/error-sound.mp3");

      if (intervalTrigger || gameOver) {
        clearInterval(intervalTrigger);
      }

      timer = defaultTimeForTimer;

      intervalTrigger = setInterval(() => {
        // Sound effect
        if (timer < 5 && timer > 1) {
          sound = new Audio("audio/error-sound.mp3");
          sound.play();
        }

        if (timer === 1) {
          sound = new Audio("audio/bell.mp3");
          sound.play();
        }

        // Timer handler
        if (timer > 0) {
          timer--;
        } else {
          clearInterval(intervalTrigger);
          timer = defaultTimeForTimer;
          intervalTrigger = null;

          // Triggers timer ran out answer
          handleAnswer(null, true);
        }
      }, 1000);
    }
  }

  // Handles the triggering of the animation for the card
  function animateCard() {
    cardAnimation = true;

    setTimeout(() => {
      cardAnimation = false;
    }, 900);
  }

  // Handles the score
  function handleScore(scoreHandler) {
    console.log("handle score", scoreHandler, "playersList", arrayOfPlayers);
    // Safty check for arrayOfPlayers
    if (arrayOfPlayers) {
      const player = arrayOfPlayers.find(val => val.id === playerTurnToPlay);

      // Loops through the arrayOfPlayers and checkes who's turn it is using the player ID and updates score
      arrayOfPlayers.find(playerFromList => {
        if (scoreHandler) {
          playerFromList.id === player.id ? playerFromList.score++ : null;

          // Checkes if the player has a score over the firstToScore game mode
          if (playerFromList.score >= toScore) {
            endGame();
          }
        } else {
          playerFromList.id === player.id ? playerFromList.score-- : null;
        }
      });

      // Changes player turn to indicate whos turn it is
      if (playerTurnToPlay < arrayOfPlayers.length) {
        playerTurnToPlay++;
      } else {
        playerTurnToPlay = 1;
      }

      // Since values are bond to each other in svelte all you need to do is update the store with itself
      //
      playerTurn.update(() => playerTurnToPlay);
    }
  }

  // Handles ending a game, reseting the tweet and showing the game over modal
  // and finding the winner.
  function endGame() {
    console.log("Game Over");
    gameOver = true;
    showGameOverModal = true;
    generatedTweet = "";

    // Find and set the winner
    const theWinner = playersList.find(player => player.score === toScore);
    winner = theWinner.name;
  }

  // Starts the game, duh..
  function startGame() {
    generateTweet();
    startTimer();
    gameOver = false;
  }

  export let arrayOfPlayers;

  // Updates state
  playerTurn.subscribe(turn => {
    playerTurnToPlay = turn;
  });

  playerList.subscribe(value => {
    arrayOfPlayers = value;
  });

  firstToScore.subscribe(scoreState => (toScore = scoreState));

  // Mount lifecycle, I'm using this here as a sort of router guard.
  // If there's no playersList selected meaning the user deep linked
  // we kick back to the start.
  //
  onMount(() => {
    // A safeguard to make sure the user cannot play without choosing playersList
    //
    if (arrayOfPlayers === undefined) {
      console.log("Refresh - no playersList");
      navigate("/", { replace: true });
    }
  });
</script>

<style>
  .wrapper {
    width: 100%;
    text-align: center;
    margin-bottom: 36px;
  }
  h2 {
    margin-top: 16px;
  }
  .card-div {
    display: flex;
    justify-content: center;
  }
  .player-info {
    text-align: center;
    align-self: start;
    margin-top: 16px;
  }
  .player {
    margin: 6px;
    font-size: 20px;
    color: #161616;
    font-weight: 700;
  }

  img {
    max-width: 800px;
    width: 400px;
    margin-bottom: -50px;
  }

  @media only screen and (max-width: 600px) {
    img {
      width: 200px;
      margin-bottom: -30px;
    }
  }
</style>

<!-- Modals -->
{#if showGetReadyModal}
  <Modal
    imgSrc={'images/trump_wall.png'}
    on:close={() => {
      showGetReadyModal = false;
      startGame();
    }}>
    <p style="color: red">Don't forget to turn on your sound!</p>
  </Modal>
{/if}

{#if showPositiveModal}
  <Modal
    imgSrc={'images/trump_happy.png'}
    on:close={() => (showPositiveModal = false)}>
    <p>Correct!</p>
  </Modal>
{/if}

{#if showNegativeModal}
  <Modal
    imgSrc={'images/trump_sad.png'}
    on:close={() => (showNegativeModal = false)}>
    <p>Take a shot!</p>
  </Modal>
{/if}

{#if showGameOverModal}
  <Modal
    imgSrc={'images/trump_wall.png'}
    on:close={() => {
      showNegativeModal = false;
      navigate('/', { replace: true });
    }}>
    <p>Game over!</p>
    <p style="color: green">Winner is {winner}</p>
    <p>
      If you enjoyed the game and want to buy me a cup of coffee, that'd be
      tremendous, very great.
    </p>
    <p>
      <Donate />
    </p>
  </Modal>
{/if}

<!-- Main game window -->
<div class="wrapper">
  <h2>Make shots great again!</h2>
  {#if !cardAnimation && !gameOver && !showNegativeModal && !showPositiveModal && !showGetReadyModal}
    <img
      src="images/trump_kiss.png"
      alt="trump doing kiss smoochie"
      in:fade
      out:fly={{ x: -500, duration: 500 }} />
    <div class="card-div" in:fade out:fly={{ x: -500, duration: 500 }}>
      <Card
        cardTimer={timer}
        cardTweet={generatedTweet}
        cardHandleAnswer={handleAnswer} />
    </div>

    <!-- Player Scores -->
    <div class="player-info" in:fly={{ y: 200, duration: 500 }} out:fade>
      {#if arrayOfPlayers}
        {#each arrayOfPlayers as player}
          <span
            class="player"
            style={player.id === playerTurnToPlay ? 'color: #161616' : 'color: #bdbdbd'}>
            {player.name.toUpperCase()}:
            <span
              style={player.score < 0 ? 'color: #d50000' : 'color: #64dd17'}>
              {player.score}
            </span>
          </span>
        {/each}
      {/if}
    </div>
  {/if}
</div>

{#if !showGetReadyModal && !showNegativeModal && !showPositiveModal}
  <Footer />
{/if}

<script>
  import { onMount } from "svelte";
  import { playerList, playerTurn } from ".././store.js";
  import { fade, fly } from "svelte/transition";

  let globfakeOrReal = false;
  let generatedTweet = "Get READY!";
  let cardAnimation = false;
  let gameOver = false;
  let intervalTrigger;
  let defaultTimeForTimer = 15;
  let timer = defaultTimeForTimer;
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
    "I don’t think I’ve made mistakes. Every time somebody said I made a mistake, they do the polls and my numbers go up, so I guess I haven't made any mistakes."
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
    "I'm one of the best in branding, probably the best out there, I have done great branding for America, the same as I did for the Trump brand, gave it some class a lot of class."
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
      console.log(fakeOrReal, 'fake or real');
      if (fakeOrReal === 1) {
        // Real
        globfakeOrReal = true;
        const randomIndex = Math.floor(Math.random() * realTweets.length);
        generatedTweet = realTweets[randomIndex];
        console.log('generate real quote', randomIndex);
        realTweets.splice(randomIndex, 1);
      } else {
        // Fake
        globfakeOrReal = false;
        const randomIndex = Math.floor(Math.random() * fakeTweets.length);
        generatedTweet = fakeTweets[randomIndex];
        console.log('generate fake quote', randomIndex);
        fakeTweets.splice(randomIndex, 1);
      }
    } else {
      gameOver = true;
      generatedTweet = "";
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

  function actions(boolean) {
    generateTweet();
    playAudio(boolean);
    handleScore(boolean);
    startTimer();
    animateCard();
  }

  function handleAnswer(answer, timerEnded) {
    if (
      (answer && globfakeOrReal && !timerEnded) ||
      (!answer && !globfakeOrReal && !timerEnded)
    ) {
      actions(true);
      alert("Correct");
    } else if (timerEnded) {
      actions(false);
      alert("Timer ran out! Take a shot!");
    } else {
      actions(false);
      alert("Take a shot!");
    }
  }

  function startTimer() {
    let sound = new Audio("audio/error-sound.mp3");

    console.log("start timer");
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
      playerTurn.update(turn => playerTurnToPlay);
    }
  }

  onMount(() => {
    setTimeout(() => {
      alert("Ready?");
      generateTweet();
      startTimer();
      gameOver = false;
    }, 500);
  });
</script>

<style>
  .card-wrapper {
    display: grid;
    grid-template-rows: 0.3fr 0.1fr 1fr 0.5fr;
    justify-content: center;
    justify-items: center;
    align-items: center;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    border-radius: 15px;
    background-color: #d81b60;
    color: white;
    padding: 16px 16px 16px 16px;
    text-align: center;
    min-width: 300px;
    min-height: 500px;
    max-width: 500px;
    max-height: 500px;
  }

  .buttons {
    grid-row: 4/5;
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
    height: 130px;
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
    .tweet {
      font-size: 20px;
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
    <h2
      class="timer"
      style={timer < 4 ? 'color: #ff5722; font-size: 50px' : 'color: white'}>
      {timer.toString()}
    </h2>
    <div class="tweet">"{generatedTweet}"</div>
    <div class="buttons">
      <button on:click={() => handleAnswer(false)}>Fake News</button>
      <button on:click={() => handleAnswer(true)}>Donald</button>
    </div>
  </div>
{/if}

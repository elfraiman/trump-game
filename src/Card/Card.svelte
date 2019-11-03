<script>
  import { onMount } from "svelte";
  import { fade } from 'svelte/transition';
  export let tweet = "test";
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

  let globfakeOrReal = false;
  let generatedTweet = "";

  onMount(async () => {
    generateTweet();
  });

  function generateTweet() {
    // While real or fake have items keep playing
    if (realTweets.length > 0 && fakeTweets.length > 0) {
      // 1 real 2 fake
      const fakeOrReal = Math.floor(Math.random() * 2) + 1;
      console.log(fakeOrReal, "fake or real");
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
        console.log(randomIndex, "random Index fake");
        generatedTweet = fakeTweets[randomIndex];
        fakeTweets.splice(randomIndex, 1);
      }
    } else {
      generateTweet = 'Game Over!';
    }
  }

  function handleAnswer(answer) {
    if (answer === true && globfakeOrReal === true) {
      alert("Correct");
      generateTweet();
    } else if (answer === false && globfakeOrReal === false) {
      alert("Correct");
      generateTweet();
    } else {
      alert("Down it!");
      generateTweet();
    }
  }
</script>

<style>
  .card-wrapper {
    display: grid;
    grid-template-rows: 1fr 50px;
    justify-content: center;
    align-items: center;
    width: 90%;
    height: 100%;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    border-radius: 15px;
    background-color: #d81b60;
    color: white;
    padding: 16px;
    font-size: 25px;
    text-align: center;
  }

  .buttons {
    grid-row: 3/4;
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  button {
    width: 150px;
    height: 50px;
    background-color: white;
    border: none;
    border-radius: 5px;
    font-size: 20px;
    outline: none;
    font-weight: 700;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
  button:active {
    box-shadow: none;
    background-color: whitesmoke;
  }
</style>

<div class="card-wrapper">
  <p transition:fade >{generatedTweet}</p>
  <div class="buttons">
    <button on:click={() => handleAnswer(false)}>Fake News</button>
    <button on:click={() => handleAnswer(true)}>Donald</button>
  </div>
</div>

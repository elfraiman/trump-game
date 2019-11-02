<script>
  import Card from "./Card/Card.svelte";

  import { onMount } from "svelte";
  export let date;

  onMount(async () => {
    const res = await fetch("/api/date");
    const newDate = await res.text();
    date = newDate;
  });
</script>

<style>
  main {
    display: grid;
    grid-template: 0.3fr 1fr 1fr / 1fr 1fr 1fr;
    background-color: #00b0ff;
  }

  img {
    grid-column: 2/3;
    justify-self: center;
    padding: 36px;
  }

  .card-div {
    grid-column: 2/3;
    grid-row: 2/3;
  }
</style>

<main>
<img src="images/trump_just_hair.png" alt="trump hair" />
  <div class="card-div">
    <Card />
  </div>
</main>

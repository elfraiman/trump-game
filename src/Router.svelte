<script>
  import { Router, Link, Route } from "svelte-routing";
  import { auth } from "./firebase.js";
  import { user } from "./store.js";
  
  import App from "./App.svelte";
  import Rules from "./Rules.svelte";
  import Donate from "./Donate/DonateButton.svelte";
  import Footer from "./Footer/Footer.svelte";
  import PreGame from "./PreGame.svelte";
  import Login from "./Login/Login.svelte";
  export let url = "";
</script>

<style>
</style>

<Router url="{url}">
  <Route path="" component={Rules} />
  <Route path="play" component={App} />
  <Route path="start-game" component={PreGame} />
  <Route path="rules" component={Rules} />
  <Route path="login" component={Login} />
</Router>

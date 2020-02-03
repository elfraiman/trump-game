<script>
  import { auth, provider } from "./../firebase.js";
  import { navigate } from "svelte-routing";
  import { user } from "./../store.js";
  let email = "";
  let password = "";
  const handleGoogleLogin = () => {
    auth
      .signInWithPopup(provider)
      .then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var firebaseuser = result.user;
        if (firebaseuser) {
          let { email } = firebaseuser;
          console.log("Google first", $user);
          user.set({ ...$user, loggedIn: true, email });
          console.log("Google then", $user);
          navigate("/start-game");
        }
        // ...
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  };
  // Destructuring to obtain email and password from form via Event
  const handleLoginForm = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(function(result) {
        let firebaseUser = auth.currentUser;
        if (firebaseUser) {
          let { email } = firebaseUser;
          user.set({ ...$user, loggedIn: true, email });
          navigate("start-game");
        }
      })
      .catch(error => alert(error.message));
  };
</script>

<style>
  .container {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    padding: 16px;
  }

  button {
    color: white;
    border-color: white;
  }

  input {
    height: 15px;
    padding: 6px;
    outline: none;
    margin-top: 6px;
    background-color: inherit;
    border: 2px solid white;
    color: white;
    font-size: 15px;
    border-radius: 15px;
    width: 100vw;
  }

  p {
    margin-bottom: 0px;
  }

  .lower {
    width: 100%;
  }

  @media only screen and (max-width: 600px) {
  }

</style>

<div class="container">
  <div class="input-container">
    <p for="email">Email</p>
    <input type="email" name="email" bind:value={email} />
  </div>

  <div class="input-container">
    <p for="password">Password</p>
    <input type="password" name="password" bind:value={password} />
  </div>
  
  <div class="lower">
    <button class="login" on:click={handleLoginForm}>Login</button>
    <button class="googlelogin" on:click={handleGoogleLogin}>Google</button>
  </div>
</div>

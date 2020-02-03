<script>
  import { createEventDispatcher } from "svelte";
  import { user } from "../store.js";
  export let imgSrc;
  export let loginModal = false;

  const dispatch = createEventDispatcher();
</script>

<style>
  .modal-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
  }
  .modal {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    left: 50%;
    top: 50%;
    width: calc(100vw - 4em);
    max-width: 32em;
    max-height: calc(100vh - 4em);
    overflow: auto;
    transform: translate(-50%, -50%);
    padding: 1em;
    border-radius: 15px;
    background: white;
  }
  img {
    width: 150px;
  }
  button {
    border: 2px solid black;
    color: black;
    width: 100%;
  }
</style>

<div class="modal-background" on:click={() => dispatch('close')} />

<div class="modal">
  {#if imgSrc}
    <img src={imgSrc} alt="trump img" />
  {/if}
  <slot />
  {#if !loginModal}
    <button on:click={() => dispatch('close')}>Next</button>
  {/if}
</div>

<script>
  import Donate from "../Donate/DonateButton.svelte";
</script>

<style>
  .footer {
    position: relative;
    bottom: 6px;
    text-align: center;
    justify-self: center;
    width: 100%;
    display: flex;
  }
  .contact-info {
    font-size: 14px;
    width: 100%;
  }
</style>

<div class="footer">
  <p class="contact-info">
    Built by Elan Fraiman & Robert Haijje
    <Donate />
  </p>
</div>

<script>
  import Donate from "../Donate/DonateButton.svelte";
</script>

<style>
  .footer {
    position: absolute;
    bottom: 6px;
    text-align: center;
    justify-self: center;
    width: 100%;
    display: flex;
  }
  .contact-info {
    font-size: 10px;
    color: white;
    width: 100%;
  }
</style>

<div class="footer">
  <p class="contact-info">
    Contact & Information - elfraiman@gmail.com
    <Donate />
  </p>
</div>

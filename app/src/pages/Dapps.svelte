<script>
  import OmoNavBottom from "./../components/OmoNavBottom.svelte";
</script>

<style>
  section {
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-areas: "'header''main' 'nav'";
    grid-template-rows: 8rem 1fr 4rem;
    grid-template-columns: 1fr;
    overflow: hidden;
  }
  footer {
    grid-area: "nav";
  }
  header {
    grid-area: "header";
  }
  main {
    grid-area: "main";
    overflow-y: scroll;
    @apply bg-gray-200;
  }
</style>

<section>
  <header>Dapp Overview</header>
  <main>List of my dapps</main>
  <footer>
    <OmoNavBottom />
  </footer>
</section>

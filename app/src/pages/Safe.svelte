<script>
  import OmoSapiens from "./../components/OmoSapiens.svelte";
  import OmoTransactions from "./../components/OmoTransactions.svelte";
  import OmoNavBottom from "./../components/OmoNavBottom.svelte";
  import OmoNavAside from "./../components/OmoNavAside.svelte";
</script>

<style>
  section {
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-areas:
      "nav main aside"
      "nav foot foot";
    grid-template-columns: 16rem 1fr 24rem;
    grid-template-rows: 1fr 4rem;
    overflow: hidden;
  }
  footer {
    grid-area: foot;
  }
  nav {
    grid-area: nav;
  }
  aside {
    grid-area: aside;
  }
  main {
    grid-area: main;
    overflow-y: scroll;
  }
</style>

<section>
  <nav>
    <OmoNavAside />
  </nav>
  <main class="bg-gray-200 p-12">
    <OmoTransactions />
  </main>
  <aside class="bg-gray-200 py-12 pr-12">
    <OmoSapiens />
  </aside>
  <footer>
    <OmoNavBottom />
  </footer>
</section>

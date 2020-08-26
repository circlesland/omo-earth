<script>
  import OmoSapiens from "../components/OmoSapiens.svelte";
  import OmoTransactions from "../components/OmoTransactions.svelte";
  import OmoNavBottom from "../components/OmoNavBottom.svelte";
  import OmoNavAside from "../components/OmoNavAside.svelte";
</script>

<style>
  section {
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-areas:
      "aside main main"
      "aside footer footer";
    grid-template-columns: 16rem 1fr 24rem;
    grid-template-rows: 1fr 4rem;
    overflow: hidden;
  }
  footer {
    grid-area: footer;
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
  <aside>
    <OmoNavAside />
  </aside>
  <main class="bg-gray-200 p-12">
    <OmoTransactions />
  </main>
  <footer>
    <OmoNavBottom />
  </footer>
</section>

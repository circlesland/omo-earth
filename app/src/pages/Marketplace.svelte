<script>
  import OmoNavBottom from "./../components/OmoNavBottom.svelte";
  import OmoShopProducts from "./../components/OmoShopProducts.svelte";
  import OmoShopHeader from "./../components/OmoShopHeader.svelte";
</script>

<style>
  section {
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-areas: "'header''main' 'nav'";
    grid-template-rows: 7rem 1fr 4rem;
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
  <header>
    <OmoShopHeader />
  </header>
  <main>
    <OmoShopProducts />
  </main>
  <footer>
    <OmoNavBottom />
  </footer>
</section>

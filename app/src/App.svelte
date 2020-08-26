<script lang="ts">
  import Tailwind from "./Tailwind.svelte";
  import page from "page";
  import Compositor from "./components/Compositor.svelte";

  import OmoBlog from "./components/OmoBlog.svelte";
  import OmoShopProducts from "./components/OmoShopProducts.svelte";
  import OmoShopHeader from "./components/OmoShopHeader.svelte";
  import OmoNavAside from "./components/OmoNavAside.svelte";
  import OmoNavBottom from "./components/OmoNavBottom.svelte";
  import OmoTransactions from "./components/OmoTransactions.svelte";
  import OmoLanding from "./components/OmoLanding.svelte";
  import OmoNavTop from "./components/OmoNavTop.svelte";

  //import {Library} from "interfaces/library"

  let Home = {
    area: "main",
    layout: {
      areas: "'top' 'main'",
      columns: "1fr",
      rows: "2rem 1fr",
    },
    children: [
      {
        area: "top",
        component: "OmoNavTop",
      },
      {
        area: "main",
        component: "OmoLanding",
      },
    ],
  };

  let Blog = {
    area: "main",
    layout: {
      areas: "'main'",
      columns: "1fr",
      rows: "1fr",
    },
    component: "OmoBlog",
  };

  let Safe = {
    area: "main",
    layout: {
      areas: "'aside main' 'footer footer'",
      columns: "20rem 1fr",
      rows: "1fr 4rem",
    },
    children: [
      {
        area: "aside",
        component: "OmoNavAside",
      },
      {
        area: "main",
        component: "OmoTransactions",
      },
      {
        area: "footer",
        component: "OmoNavBottom",
      },
    ],
  };

  let Market = {
    area: "main",
    layout: {
      areas: "'header' 'main' 'footer'",
      columns: "1fr",
      rows: "1fr 4rem",
    },
    children: [
      {
        area: "header",
        component: "OmoShopHeader",
      },
      {
        area: "main",
        component: "OmoShopProducts",
      },
      {
        area: "footer",
        component: "OmoNavBottom",
      },
    ],
  };

  let library = {
    getComponentByName: (name) => {
      switch (name) {
        case "OmoNavBottom":
          return OmoNavBottom;
        case "OmoTransactions":
          return OmoTransactions;
        case "OmoNavAside":
          return OmoNavAside;
        case "OmoShopHeader":
          return OmoShopHeader;
        case "OmoShopProducts":
          return OmoShopProducts;
        case "OmoLanding":
          return OmoLanding;
        case "OmoBlog":
          return OmoBlog;
        case "OmoNavTop":
          return OmoNavTop;
      }
    },
  };

  // set default component
  let current = Home;

  // Map routes to page. If a route is hit the current
  // reference is set to the route's component
  page("/", () => (current = Home));
  page("/safe", () => (current = Safe));
  page("/blog", () => (current = Blog));
  page("/market", () => (current = Market));
  // activate router
  page.start();
</script>

<style>
  .app {
    width: 100vw;
    height: 100vh;
    padding: 0;
    margin: 0;
    overflow: hidden;
  }
</style>

<Tailwind />
<div class="app">
  <Compositor {library} composition={current} />
</div>

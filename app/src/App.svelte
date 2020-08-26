<script lang="ts">
  import OmoNavAside from "./components/OmoNavAside.svelte";
  import Tailwind from "./Tailwind.svelte";
  import Home from "./pages/Home.svelte";
  import Blog from "./pages/Blog.svelte";
  import OmoNavBottom from "./components/OmoNavBottom.svelte";
  import OmoTransactions from "./components/OmoTransactions.svelte";
  import page from "page";
  import Compositor from "./components/Compositor.svelte";
  //import {Library} from "interfaces/library"

  let App = {
    area: "main",
    layout: {
      areas: "'main' 'footer'",
      columns: "1fr",
      rows: "1fr 4rem",
    },
    component: "Home",
    // children: [
    //   {
    //     area: "main",
    //     component: "Home",
    //     data: {},
    //   },
    //   {
    //     area: "footer",
    //     component: "OmoNavBottom",
    //   },
    // ],
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

  let library = {
    getComponentByName: (name) => {
      switch (name) {
        case "Home":
          return Home;
        case "Blog":
          return Blog;
        case "OmoNavBottom":
          return OmoNavBottom;
        case "OmoTransactions":
          return OmoTransactions;
        case "OmoNavAside":
          return OmoNavAside;
      }
    },
  };

  // set default component
  let current = App;

  // Map routes to page. If a route is hit the current
  // reference is set to the route's component
  page("/", () => (current = App));
  page("/safe", () => (current = Safe));
  // activate router
  page.start();
</script>

<Tailwind />

<main>
  <nav>
    <a href="/">home</a>
    <a href="/about">about</a>
    <a href="/blog">blog</a>
  </nav>

  <Compositor {library} composition={current} />
</main>

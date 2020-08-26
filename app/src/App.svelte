<script lang="ts">
  import Tailwind from "./Tailwind.svelte";
  import Home from "./pages/Home.svelte";
  import Blog from "./pages/Blog.svelte";
  import Safe from "./pages/Safe.svelte";
  import OmoNavBottom from "./components/OmoNavBottom.svelte";
  import page from "page";
  import Compositor from "./components/Compositor.svelte";
  //import {Library} from "interfaces/library"

  // set default component
  let current = Home;

  // Map routes to page. If a route is hit the current
  // reference is set to the route's component
  page("/", () => (current = Home));
  page("/blog", () => (current = Blog));
  // activate router
  page.start();

  let App = {
    area: "main",
    layout: {
      areas: "'main' 'footer'",
      columns: "1fr",
      rows: "1fr 4rem",
    },
    component: "Compositor",
    children: [
      {
          area: "main",
          component: "Home",
          data: {}
      },
      {
          area: "footer",
          component: "OmoNavBottom",
      }
    ],
  };

  let library = {
    getComponentByName: (name) => {
      switch(name) {
        case "Home": return Home;
        case "Blog": return Blog;
        case "Safe": return Safe;
        case "OmoNavBottom": return OmoNavBottom;
      }
    }
  }
</script>

<Tailwind />

<main>
  <nav>
    <a href="/">home</a>
    <a href="/about">about</a>
    <a href="/blog">blog</a>
  </nav>

  <Compositor library={library} composition={App}></Compositor>

  <svelte:component this={current} />
</main>

<script lang="ts">
  import Tailwind from "./Tailwind.svelte";
  import Home from "./pages/Home.svelte";
  import Blog from "./pages/Blog.svelte";
  import page from "page";

  // set default component
  let current = Home;

  // Map routes to page. If a route is hit the current
  // reference is set to the route's component
  page("/", () => (current = Home));
  page("/blog", () => (current = Blog));
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

  <svelte:component this={current} />
</main>

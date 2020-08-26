<script lang="ts">
  import Compositor from "./components/Compositor.svelte";
  import Tailwind from "./Tailwind.svelte";
  import page from "page";
  import { library } from "./library";

  // Import Page Compositions
  import { Home } from "./components/pages/Home";
  import { Blog } from "./components/pages/Blog";
  import { Market } from "./components/pages/Market";
  import { Safe } from "./components/pages/Safe";

  //import {Library} from "interfaces/library"

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

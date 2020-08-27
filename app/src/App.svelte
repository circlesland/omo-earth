<script lang="ts">
  import Compositor from "./components/Compositor.svelte";
  import Tailwind from "./Tailwind.svelte";
  import page from "page";
  import { library } from "./library";

  // Import Page Compositions
  import { Home } from "./pages/Home";
  import { Blog } from "./pages/Blog";
  import { Market } from "./pages/Market";
  import { Safe } from "./pages/Safe";
  import { Product } from "./pages/Product";
  import { transactions } from "./organisms/transactions";
  import { products } from "./organisms/products";
  import { token } from "./organisms/token";
  import { productDetail } from "./organisms/productDetail";
  import Lost404 from "./pages/Lost404.svelte";

  import { actionRepository } from "./actions/actionRepository";

  // set default component
  let viewDocument = Home;

  // Map routes to page. If a route is hit the current
  // reference is set to the route's component
  page("/", () => {
    viewDocument = Home;
  });
  page("/safe", () => {
    viewDocument = Safe(transactions);
  });
  page("/safe/transactions", () => {
    viewDocument = Safe(transactions);
  });
  page("/safe/token", () => {
    viewDocument = Safe(token);
  });
  page("/product/:id", (ctx) => {
    viewDocument = Product(productDetail(ctx.params.id));
    console.log(viewDocument);
  });
  page("/blog", () => {
    viewDocument = Blog;
  });
  page("/market", () => {
    viewDocument = Market(products);
  });
  page("*", () => {
    viewDocument = Lost404;
  });

  window.shellEvents.observable.subscribe((event) => {
    if (event.triggers) {
      // This event should trigger some action. Find it in the action repo and execute it.
      const foundAction = actionRepository[event.triggers];
      if (foundAction) {
        foundAction(event);
      }
    }
  });

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
  <Compositor {library} composition={viewDocument} />
</div>

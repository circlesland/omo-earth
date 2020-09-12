<script lang="ts">
  import OmoFavicon from "./components/OmoFavicon.svelte";
  import GridCompositor from "./components/GridCompositor.svelte";
  import Tailwind from "./Tailwind.svelte";
  import page from "page";
  import { library } from "./library";
  import { Home } from "./pages/Home";
  import { Blog } from "./pages/Blog";
  import { Market } from "./pages/Market";
  import { Safe } from "./pages/Safe";
  import { Product } from "./pages/Product";
  import { safeDashboard } from "./organisms/safeDashboard";
  import { products } from "./organisms/products";
  import { safeToken } from "./organisms/safeToken";
  import { productDetail } from "./organisms/productDetail";
  import { actionRepository } from "./actions/actionRepository";
  import { profile } from "./organisms/profile";

  // set default component
  let viewDocument = Home;

  // Map routes to page. If a route is hit the current
  // reference is set to the route's component
  page("/", () => {
    viewDocument = Home;
  });
  page("/safe", () => {
    viewDocument = Safe(safeDashboard);
  });
  page("/safe/dashboard", () => {
    viewDocument = Safe(safeDashboard);
  });
  page("/safe/token", () => {
    viewDocument = Safe(safeToken);
  });
  page("/safe/profile/:id", (ctx) => {
    viewDocument = Safe(profile(ctx.params.id));
  });
  page("/product/:id", (ctx) => {
    viewDocument = Product(productDetail(ctx.params.id));
  });
  page("/blog", () => {
    viewDocument = Blog;
  });
  page("/market", () => {
    viewDocument = Market(products);
  });

  window.shellEvents.observable.subscribe((event) => {
    // TODO: This is the same code as in GridCompositor.svelte
    if (event.triggers) {
      // This event should trigger some action. Find it in the action repo and execute it.
      const foundAction = actionRepository[event.triggers];
      if (foundAction) {
        foundAction(event);
      }
    }
  });

  // activate router
  page.start({
    hashbang: true,
  });
</script>

<OmoFavicon />
<Tailwind />
<GridCompositor {library} component={viewDocument} />

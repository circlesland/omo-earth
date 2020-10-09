<script lang="ts">
  import OmoFavicon from "./components/OmoFavicon.svelte";
  import GridCompositor from "./components/GridCompositor.svelte";
  import Tailwind from "./Tailwind.svelte";
  import page from "page";
  import { library } from "./library";
  import { Home } from "./pages/Home";
  import { SignIn } from "./pages/SignIn";
  import { Blog } from "./pages/Blog";
  import { Market } from "./pages/Market";
  import { Safe } from "./pages/Safe";
  import { Product } from "./pages/Product";
  import { safeDashboard } from "./organisms/safeDashboard";
  import { products } from "./organisms/products";
  import { safeToken } from "./organisms/safeToken";
  import { productDetail } from "./organisms/productDetail";
  import {
    actionRepository,
    jwtLocalStorageKey,
  } from "./actions/actionRepository";
  import { profile } from "./organisms/profile";
  import { ExchangeMagicLoginCodeForJwt } from "./trigger/auth/exchangeMagicLinkCodeForJwt";
  // set default component
  let viewDocument = Home;

  function route(path: string, handler /*:(ctx:any)=>void*/) {
    const handlerWrapper = (ctx) => {
      const meData = sessionStorage.getItem("me");
      console.log("check route.", path, meData);
      if (!meData || path !== "/sign-in/onetime/:code") {
        const me = JSON.parse(meData);
        if (!me.type || !me.key)
          viewDocument = Home;
        else
          handler(ctx);
      } else {
        handler(ctx);
      }
    };
    page(path, handlerWrapper);
  }

  // Map routes to page. If a route is hit the current
  // reference is set to the route's component
  route("/", () => {
    viewDocument = Home;
  });
  route("/sign-in/onetime/:code", (ctx) => {
    // Display a spinner (should be displayed only for a short time, since the
    // tab should close itself when the code was exchanged for a JWT and the JWT
    // was written to the localStorage).
    viewDocument = SignIn;
    window.trigger(new ExchangeMagicLoginCodeForJwt(ctx.params.code));
  });
  route("/safe", () => {
    viewDocument = Safe(safeDashboard);
  });
  route("/safe/dashboard", () => {
    viewDocument = Safe(safeDashboard);
  });
  route("/safe/token", () => {
    viewDocument = Safe(safeToken);
  });
  route("/safe/profile/:id", (ctx) => {
    viewDocument = Safe(profile(ctx.params.id));
  });
  route("/product/:id", (ctx) => {
    viewDocument = Product(productDetail(ctx.params.id));
  });
  route("/blog", () => {
    viewDocument = Blog;
  });
  route("/market", () => {
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

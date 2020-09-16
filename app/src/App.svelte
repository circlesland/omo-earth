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
  import { actionRepository } from "./actions/actionRepository";
  import { profile } from "./organisms/profile";

  // set default component
  let viewDocument = Home;

  // Map routes to page. If a route is hit the current
  // reference is set to the route's component
  page("/", () => {
    viewDocument = Home;
  });
  page("/sign-in/onetime/:code", (ctx) => {
    viewDocument = SignIn;
    function verifyToken(oneTimeToken) {
      const payload = {
        "operationName": null,
        "variables": {},
        "query": "mutation { verify(oneTimeToken: \"" + oneTimeToken + "\") { success errorMessage jwt }}"
      };

      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      xhr.open("POST", "http://omo.local:8080/auth");
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.send(JSON.stringify(payload));
      xhr.onreadystatechange = (e) => {
        console.log("onreadystatechange:", e)
        if (xhr.readyState !== XMLHttpRequest.DONE) {
          return;
        }
        const responseData = JSON.parse(xhr.response);
        if (responseData.data){
          localStorage.setItem("JWT", responseData.data.verify.jwt);
          window.close();
        }
        if (responseData.errors){
          alert("Couldn't login. Please try again");
        }
      }
    }
    verifyToken(ctx.params.code);
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

import Home from "./pages/Home.svelte";
import Blog from "./pages/Blog.svelte";
import Dapps from "./pages/Dapps.svelte";
import Marketplace from "./pages/Marketplace.svelte";
import Safe from "./pages/Safe.svelte";
import Lost404 from "./pages/Lost404.svelte";

function userIsAdmin() {
  //check if user is admin and returns true or false
}

const routes = [{
    name: "/",
    component: Home,
  },
  {
    name: "blog",
    component: Blog,
  },
  {
    name: "dapps",
    component: Dapps,
  },
  {
    name: "marketplace",
    component: Marketplace,
  },
  {
    name: "safe",
    component: Safe,
  },
  {
    name: "404",
    component: Lost404,
  },
  {
    name: "admin",
    onlyIf: {
      guard: userIsAdmin,
      redirect: "/login",
    },
  },
];

export {
  routes
};
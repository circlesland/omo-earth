import { LayoutHeaderMain } from "../layouts/LayoutHeaderMain";

export const Home = {
  layout: LayoutHeaderMain,
  children: [
    {
      area: "header",
      component: "OmoNavTop",
    },
    {
      area: "main",
      component: "OmoLanding",
    },
  ],
};

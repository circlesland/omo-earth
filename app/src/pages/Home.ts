import { LayoutHeaderMain } from "../layouts/LayoutHeaderMain";

export const Home = {
  area: "main",
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

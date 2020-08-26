import { LayoutHeaderMain } from "../layouts/LayoutHeaderMain";

export const Blog = {
  area: "main",
  layout: LayoutHeaderMain,
  children: [
    {
      area: "header",
      component: "OmoNavTop",
    },
    {
      area: "main",
      component: "OmoBlog",
    },
  ],
};

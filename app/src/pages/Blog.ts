import { LayoutHeaderMain } from "../layouts/LayoutHeaderMain";

export const Blog = {
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

import type { Component } from "../interfaces/component";

export const products: Component = {
  area: "main",
  layout: "LayoutMain",
  children: [
    {
      area: "main",
      component: "OmoColumnContainer",
      children: [
        {
          area: "",
          component: "OmoMarketProducts",
        },
      ],
    },
  ],
};

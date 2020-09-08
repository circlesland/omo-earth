import type { Component } from "../interfaces/component";

export const products: Component = {
  area: "main",
  layout: "LayoutMain",
  children: [
    {
      area: "main",
      cssClasses: "overflow-y-scroll p-12 bg-gray-200",
      component: "OmoMarketProducts",
    },
  ],
};

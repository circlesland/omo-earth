import type { Component } from "../interfaces/component";

export const safeDashboard: Component = {
  area: "main",
  layout: "LayoutMain",
  children: [
    {
      area: "main",
      component: "ListCompositor",
      mobile: {
        cssClasses: "overflow-y-auto overflow-x-hidden",
      },
      children: [
        {
          component: "OmoBalance",
        },
        {
          component: "OmoTransactions",
        },
      ],
    },
  ],
};

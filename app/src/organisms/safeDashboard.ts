import type { Component } from "../interfaces/component";

export const safeDashboard: Component = {
  area: "main",
  layout: "LayoutMain",
  children: [
    {
      area: "main",
      cssClasses: "overflow-y-scroll p-12 bg-gray-200",
      component: "SafeDashboard",
    },
  ],
};

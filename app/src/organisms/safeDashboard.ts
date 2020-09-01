import type { Component } from "../interfaces/component";

export const safeDashboard: Component = {
  mobile: {
    area: "main",
    layout: "LayoutMain",
    children: [
      {
        mobile: {
          area: "main",
          cssClasses: "overflow-y-scroll",
          component: "SafeDashboard",
        },
        tablet: {
          area: "main",
          cssClasses: "overflow-y-scroll p-12 bg-gray-200",
          component: "SafeDashboard",
        },
        desktop: {
          area: "main",
          cssClasses: "overflow-y-scroll p-12 bg-gray-200",
          component: "SafeDashboard",
        },
      },
    ],
  },
};

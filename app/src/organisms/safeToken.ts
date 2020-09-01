import type { Component } from "../interfaces/component";

export const safeToken: Component = {
  mobile: {
  area: "main",
  layout: "LayoutMain",
  children: [{
    mobile: {
      area: "main",
      cssClasses: "overflow-y-scroll p-12 bg-gray-200",
      component: "SafeToken",
    }
  }]
  }
};
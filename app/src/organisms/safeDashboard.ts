import type {Component} from "../interfaces/component";

export const safeDashboard: Component = {
  area: "main",
  layout: "LayoutMain",
  children: [{
    area: "main",
    component: "ListCompositor",
    mobile: {
      cssClasses: "overflow-y-auto p-2 bg-gray-200 overflow-x-hidden"
    },
    tablet: {
      cssClasses: "overflow-y-auto p-12 bg-gray-200"
    },
    children: [{
      area: "",
      component: "OmoBalance"
    }, {
      area: "",
      component: "OmoTransactions"
    }],
  }]
};
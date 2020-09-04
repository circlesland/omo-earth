import type {Component} from "../interfaces/component";

export const safeDashboard: Component = {
  area: "main",
  layout: "LayoutMain",
  children: [{
    mobile: {
      area: "main",
      cssClasses: "overflow-y-auto p-2 bg-gray-200 overflow-x-hidden",
      component: "ListCompositor",
      children: [{
          area: "",
          component: "OmoBalance"
      }, {
          area: "",
          component: "OmoTransactions"
      }]
    },
    tablet: {
      area: "main",
      cssClasses: "overflow-y-auto p-12 bg-gray-200",
      component: "ListCompositor",
      children: [{
          area: "",
          component: "OmoBalance"
      }, {
          area: "",
          component: "OmoTransactions"
      }]
    }
  }]
};
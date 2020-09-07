import type {Component} from "../interfaces/component";

export const products: Component = {
  area: "main",
  layout: "LayoutMain",
  children: [{
    area: "main",
    cssClasses: "overflow-y-auto",
    component: "OmoMarketProducts"
  }]
};

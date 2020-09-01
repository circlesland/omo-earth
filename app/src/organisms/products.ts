import type {Component} from "../interfaces/component";

export const products : Component = {
  mobile: {
  area: "main",
  layout: "LayoutMain",
  children: [{
    mobile: {
      area: "main",
      cssClasses: "",
      component: "OmoMarketProducts",
    }
  }]
  }
};

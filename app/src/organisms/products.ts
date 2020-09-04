import type {Component} from "../interfaces/component";
import {DeviceClass} from "../interfaces/component";

export const products: Component = {
  area: "main",
  layout: "LayoutMain",
  children: [{
    area: "main",
    cssClasses: "",
    component: "OmoMarketProducts"
  }]
};

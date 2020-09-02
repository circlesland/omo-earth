import type {Component} from "../interfaces/component";
import {DeviceClass} from "../interfaces/component";

export const products: Component = {
  [DeviceClass.mobile]: {
    area: "main",
    layout: "LayoutMain",
    children: [{
      [DeviceClass.mobile]: {
        area: "main",
        cssClasses: "",
        component: "OmoMarketProducts",
      }
    }]
  }
};

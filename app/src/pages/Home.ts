import type {Component} from "../interfaces/component";
import {DeviceClass} from "../interfaces/component";

export const Home: Component = {
  [DeviceClass.mobile]: {
    area: "main",
    layout: "LayoutHeaderMain",
    children: [{
      [DeviceClass.mobile]: {
        area: "header",
        component: "OmoNavTop",
      }
    }, {
      [DeviceClass.mobile]: {
        area: "main",
        component: "OmoLanding",
      }
    }]
  }
};

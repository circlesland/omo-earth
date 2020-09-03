import type { Component } from "../interfaces/component";
import {DeviceClass} from "../interfaces/component";

export const safeDashboard: Component = {
  [DeviceClass.mobile]: {
    area: "main",
    layout: "LayoutMain",
    children: [
      {
        [DeviceClass.mobile]: {
          area: "main",
          cssClasses: "overflow-y-scroll p-2 bg-gray-200 overflow-x-hidden",
          component: "SafeDashboard",
        },
        [DeviceClass.tablet]: {
          area: "main",
          cssClasses: "overflow-y-scroll p-12 bg-gray-200",
          component: "SafeDashboard",
        },
        [DeviceClass.desktop]: {
          area: "main",
          cssClasses: "overflow-y-scroll p-12 bg-gray-200",
          component: "SafeDashboard",
        },
      },
    ],
  },
};

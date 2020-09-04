import type { Component } from "../interfaces/component";
import { DeviceClass } from "../interfaces/component";

export const safeDashboard: Component = {
  [DeviceClass.mobile]: {
    area: "main",
    layout: "LayoutMain",
    children: [
      {
        [DeviceClass.mobile]: {
          area: "main",
          cssClasses: "overflow-y-auto p-2 bg-gray-200 overflow-x-hidden",
          component: "ListCompositor",
          children: [{
            mobile: {
              area: "",
              component: "OmoBalance"
            }
          }, {
            mobile: {
              area: "",
              component: "OmoTransactions"
            }
          }]
        },
        [DeviceClass.tablet]: {
          area: "main",
          cssClasses: "overflow-y-auto p-12 bg-gray-200",
          component: "ListCompositor",
          children: [{
            mobile: {
              area: "",
              component: "OmoBalance"
            }
          }, {
            mobile: {
              area: "",
              component: "OmoTransactions"
            }
          }]
        }
      }
    ],
  },
};

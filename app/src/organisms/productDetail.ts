import {LayoutMain} from "../layouts/LayoutMain";
import type {Component} from "../interfaces/component";
import {DeviceClass} from "../interfaces/component";

export const productDetail = (id) =>
{
  const component: Component = {
    [DeviceClass.mobile]: {
      area: "main",
      layout: "LayoutMain",
      children: [{
        [DeviceClass.mobile]: {
          area: "main",
          component: "OmoProductDetail",
          data: {title: "title", id},
        }
      }]
    }
  };
  return component;
};

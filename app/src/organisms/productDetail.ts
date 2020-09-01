import {LayoutMain} from "../layouts/LayoutMain";
import type {Component} from "../interfaces/component";

export const productDetail = (id) =>
{
  const component: Component = {
    mobile: {
      area: "main",
      layout: "LayoutMain",
      children: [{
        mobile: {
          area: "main",
          component: "OmoProductDetail",
          data: {title: "title", id},
        }
      }]
    }
  };
  return component;
};

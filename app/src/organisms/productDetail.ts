import { LayoutMain } from "../layouts/LayoutMain";
import type {Component} from "../interfaces/component";

export const productDetail = (id) => {
  return <Component>{
    area: "main",
    layout: "LayoutMain",children: [
      {
        area: "main",
        component: "OmoProductDetail",
        data: { title: "title", id },
      },
    ],
  };
};

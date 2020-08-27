import { LayoutMain } from "../layouts/LayoutMain";
import type {Component} from "../interfaces/component";

export const token : Component = {
  area: "main",
  layout: "LayoutMain",children: [
    {
      area: "main",
      component: "OmoPlaceholder",
      data: "I am the token placeholder",
    },
  ],
};

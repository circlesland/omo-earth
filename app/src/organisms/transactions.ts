import { LayoutMainAside } from "../layouts/LayoutMainAside";
import type {Component} from "../interfaces/component";

export const transactions : Component = {
  area: "main",
  cssClasses: "bg-green-200 p-6",
  layout: "LayoutMainAside",children: [
    {
      area: "top",
      component: "OmoBalance",
      cssClasses: "bg-blue-200 p-4",
      data: "I am the omo firends detail",
    },
    {
      area: "main",
      cssClasses: "bg-blue-200 p-4",
      component: "OmoTransactions",
      data: "I am the omo firends detail",
    },
  ],
};

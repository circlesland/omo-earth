import { LayoutMain } from "../layouts/LayoutMain";
import type {Component} from "../interfaces/component";

export const profile = (id:string) =>
{
  const component : Component = {
    area: "main",
    layout: "LayoutMain",
    children: [{
      area: "main",
      component: "OmoProfile",
      data: {
        id
      }
    }]
  }
  return component;
};
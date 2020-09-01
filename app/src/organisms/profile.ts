import { LayoutMain } from "../layouts/LayoutMain";
import type {Component} from "../interfaces/component";

export const profile = (id:string) =>
{
  const component : Component = {
    mobile: {
      area: "main",
      layout: "LayoutMain",
      children: [{
        mobile: {
          area: "main",
          component: "OmoProfile",
          data: {
            id
          },
        }
      }],
    }
  }
};
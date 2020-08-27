import { LayoutMain } from "../layouts/LayoutMain";
import type {Component} from "../interfaces/component";

export const profile = (id:string) =>
{
  return <Component>{
    area: "main",
    layout: "LayoutMain",children: [
      {
        area: "main",
        component: "OmoProfile",
        data: {
          id
        },
      },
    ],
  }
};
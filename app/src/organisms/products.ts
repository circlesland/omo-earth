import type {Component} from "../interfaces/component";
import { v4 as uuidv4 } from 'uuid';

export const products = () =>
{
  return {
    area: "main",
    layout: "LayoutMain",
    children: [
      {
        id: uuidv4(),
        area: "main",
        cssClasses: "",
        component: "OmoMarketProducts",
        data: "I am the omo firends detail",
      },
    ],
  }
}
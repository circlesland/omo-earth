import { LayoutMain } from "../layouts/LayoutMain";
import type {Component} from "../interfaces/component";
import {DeviceClass} from "../interfaces/component";

export const profile = (id:string) =>
{
  const component : Component = {
    [DeviceClass.mobile]: {
      area: "main",
      layout: "LayoutMain",
      children: [{
        [DeviceClass.mobile]: {
          area: "main",
          component: "OmoProfile",
          data: {
            id
          },
        }
      }],
    }
  }
  return component;
};
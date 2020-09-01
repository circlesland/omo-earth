import { LayoutHeaderMainFooter } from "../layouts/LayoutHeaderMainFooter";
import type { Trigger } from "../trigger/trigger";
import type { Component } from "../interfaces/component";

export function generatePageSingle(
  title: string,
  menu: any,
  content: any,
  quickActions: Trigger[]
) {
  let component: Component = {
    mobile: {
      area: "main",
      layout: "LayoutHeaderMainFooter",
      children: [
        {
          mobile: {
            area: "header",
            component:
              "OmoNavTopMobile" /* {
            mobile: "OmoNavTopMobile",
            tablet: "OmoNavTopTablet",
            desktop: "OmoNavTopDesktop",
          },*/,
            data: {
              title,
            },
          },
        },
        {
          mobile: {
            area: "main",
            layout:
              "LayoutMain" /*{
            mobile: "LayoutMain",
            tablet: "LayoutMain",
            desktop: "LayoutNavMain",
          },*/,
            children: [menu, content],
          },
        },
        {
          mobile: {
            area: "dapp",
            component: "OmoNavDapp",
          },
        },
        {
          mobile: {
            area: "footer",
            component: "OmoNavBottom",
            data: {
              triggers: quickActions,
            },
          },
        },
      ],
    },
  };
  return component;
}

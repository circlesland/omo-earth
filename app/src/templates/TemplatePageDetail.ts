import {LayoutHeaderMainFooter} from "../layouts/LayoutHeaderMainFooter";
import type {Trigger} from "../trigger/trigger";
import type {Component} from "../interfaces/component";

export function generatePageSingle(
  title: string,
  menu: any,
  content: any,
  quickActions: Trigger[]
)
{
  let component: Component = {
    area: "main",
    layout: "LayoutHeaderMainFooter",
    children: [{
      area: "header",
      component: "OmoNavTop",
      data: {
        title
      }
    }, {
      id: "content",
      mobile: {
        area: "main",
        layout: "LayoutMain",
        children: [menu, content]
      },
      tablet: {
        area: "main",
        layout: "LayoutNavMain",
        children: [menu, content]
      }
    }, {
      area: "footer",
      component: "OmoNavBottom",
      data: {
        triggers: quickActions,
      }
    }]
  };
  return component;
}

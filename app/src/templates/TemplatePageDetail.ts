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
    mobile: {
      area: "main",
      layout: "LayoutHeaderMainFooter",
      children: [
        {
          mobile: {
            area: "header",
            component: "OmoNavTop",
            data: {
              title,
            },
          },
        },
        {
          id: "content", /* WARNING: This will only work well when this page document is displayed as the only document (full-window) */
          mobile: {
            area: "main",
            layout: "LayoutMain",
            children: [
              menu,
              content
              // {
              // mobile:{
              //   area: "main",
              //   component: "PageCompositor",
              //   children:[
              //     content,
              //     content,
              //   ]
              // }
              // }
            ],
          },
          tablet: {
            area: "main",
            layout: "LayoutNavMain",
            children: [menu, content],
          },
          desktop: {
            area: "main",
            layout: "LayoutNavMain",
            children: [menu, content],
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

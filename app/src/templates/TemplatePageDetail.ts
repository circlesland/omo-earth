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
    area: "main",
    layout: "LayoutHeaderMainFooter",
    children: [
      {
        area: "header",
        component: "OmoNavTop",
        data: {
          title,
        },
      },
      {
        id: "content",
        area: "main",
        children: [menu, content],
        /* Specify only the parts that differ from the default component configuration */
        mobile: {
          layout: "LayoutMain",
        },
        tablet: {
          layout: "LayoutNavMain",
        },
      },
      {
        area: "footer",
        component: "OmoNavBottom",
        data: {
          triggers: quickActions,
        },
      },
    ],
  };
  return component;
}

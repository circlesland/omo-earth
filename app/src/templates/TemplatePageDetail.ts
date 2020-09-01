import { LayoutHeaderMainFooter } from "../layouts/LayoutHeaderMainFooter";
import type { Trigger } from "../trigger/trigger";

export function generatePageSingle(
  title: string,
  menu: any,
  content: any,
  quickActions: Trigger[]
) {
  return {
    layout: "LayoutHeaderMainFooter",
    children: [
      {
        area: "header",
        component: {
          mobile: "OmoNavTopMobile",
          tablet: "OmoNavTopTablet",
          desktop: "OmoNavTopDesktop",
        },
        data: {
          title,
        },
      },
      {
        area: "main",
        layout: {
          mobile: "LayoutMain",
          tablet: "LayoutMain",
          desktop: "LayoutNavMain",
        },
        children: [menu, content],
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
}

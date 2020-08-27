import { LayoutMain } from "../layouts/LayoutMain";
import { LayoutNavMain } from "../layouts/LayoutNavMain";
import { LayoutHeaderMainFooter } from "../layouts/LayoutHeaderMainFooter";
import type { Trigger } from "../trigger/trigger";

export const ResponsiveLayout = (() => {
  if (window.innerWidth > 800) return LayoutNavMain;
  else return LayoutMain;
})();

export function generatePageSingle(
  title: string,
  menu: any,
  content: any,
  quickActions: Trigger[]
) {
  return {
    layout: LayoutHeaderMainFooter,
    children: [
      {
        area: "header",
        component: "OmoNavTop",
        data: {
          title,
        },
      },
      {
        area: "main",
        layout: ResponsiveLayout,
        children: [menu, content],
      },
      {
        area: "dapp",
        component: "OmoNavDapp",
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

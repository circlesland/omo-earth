import { LayoutMain } from "../layouts/LayoutMain";
import { LayoutNavMain } from "../layouts/LayoutNavMain";
import { LayoutHeaderMainFooter } from "../layouts/LayoutHeaderMainFooter";

export const ResponsiveLayout = (() => {
  if (window.innerWidth > 800) return LayoutNavMain;
  else return LayoutMain;
})();

export function generatePageSingle(menu: any, content: any) {
  return {
    layout: LayoutHeaderMainFooter,
    children: [
      {
        area: "header",
        component: "OmoNavTop",
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
      },
    ],
  };
}

import { LayoutMain } from "../layouts/LayoutMain";
import { LayoutNavMain } from "../layouts/LayoutNavMain";
import { LayoutMainAside } from "../layouts/LayoutMainAside";
import { LayoutHeaderMainFooter } from "../layouts/LayoutHeaderMainFooter";

export const ResponsiveLayout = (() => {
  if (window.innerWidth > 800) return LayoutNavMain;
  else return LayoutMain;
})();

export const Safe = {
  layout: LayoutHeaderMainFooter,
  children: [
    {
      area: "header",
      component: "OmoNavTop",
    },
    {
      area: "main",
      layout: ResponsiveLayout,
      children: [
        {
          area: "nav",
          component: "OmoNavAside",
        },
        {
          area: "main",
          layout: LayoutMainAside,
          children: [
            { area: "main", component: "OmoTransactions" },
            {
              area: "aside",
              component: "OmoSapiens",
            },
          ],
        },
      ],
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

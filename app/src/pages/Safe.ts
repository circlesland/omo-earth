import { LayoutMain } from "../layouts/LayoutMain";
import { LayoutNavMainAside } from "../layouts/LayoutNavMainAside";
import { LayoutHeaderMainFooter } from "../layouts/LayoutHeaderMainFooter";

export const ResponsiveLayout = (() => {
  if (window.innerWidth > 800) return LayoutNavMainAside;
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
          component: "OmoTransactions",
        },
        {
          area: "aside",
          component: "OmoSapiens",
        },
      ],
    },
    {
      area: "start",
      component: "OmoNavBottom",
    },
    {
      area: "footer",
      component: "OmoNavBottom",
    },
  ],
};

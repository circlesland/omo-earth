import { LayoutHeaderAsideMainFooter } from "../layouts/LayoutHeaderAsideMainFooter";
import { LayoutMainAside } from "../layouts/LayoutMainAside";
import { LayoutHeaderMainFooter } from "../layouts/LayoutHeaderMainFooter";

export const MetaLayout = (() => {
  if (window.innerWidth > 800) return LayoutHeaderAsideMainFooter;
  else return LayoutHeaderMainFooter;
})();

export const Safe = {
  layout: MetaLayout,
  children: [
    {
      area: "header",
      component: "OmoNavTop",
    },
    {
      area: "aside",
      component: "OmoNavAside",
    },
    {
      area: "main",
      layout: LayoutMainAside,
      children: [
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
      area: "footer",
      component: "OmoNavBottom",
    },
  ],
};

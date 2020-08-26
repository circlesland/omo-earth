import { LayoutAsideMainFooter } from "../layouts/LayoutAsideMainFooter";
import { LayoutMainAside } from "../layouts/LayoutMainAside";
import {LayoutHeaderMain} from "../layouts/LayoutHeaderMain";


export const MetaLayout = (() => {
  if (window.innerWidth > 800)
    return LayoutAsideMainFooter
  else
    return LayoutHeaderMain
})()

export const Safe = {
  layout: MetaLayout,
  children: [
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

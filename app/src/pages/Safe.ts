import { LayoutAsideMainFooter } from "../layouts/LayoutAsideMainFooter";
import { LayoutMainAside } from "../layouts/LayoutMainAside";

export const Safe = {
  layout: LayoutAsideMainFooter,
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

import { LayoutMainAside } from "../layouts/LayoutMainAside";
import { LayoutBlock } from "../layouts/LayoutBlock";

export const transactions = {
  area: "main",
  layout: LayoutMainAside,
  children: [
    {
      area: "main",
      layout: LayoutBlock,
      children: [
        {
          area: "block",
          component: "OmoTransactions",
          data: "I am the omo firends detail",
        },
        {
          area: "block",
          component: "OmoBalance",
          data: "I am the omo firends detail",
        },
      ],
    },
  ],
};

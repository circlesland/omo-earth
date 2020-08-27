import { LayoutMainAside } from "../layouts/LayoutMainAside";

export const transactions = {
  area: "main",
  layout: "LayoutMainAside",children: [
    {
      area: "top",
      component: "OmoBalance",
      data: "I am the omo firends detail",
    },
    {
      area: "main",
      component: "OmoTransactions",
      data: "I am the omo firends detail",
    },
  ],
};

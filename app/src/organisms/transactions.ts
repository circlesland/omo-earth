import { LayoutMainAside } from "../layouts/LayoutMainAside";

export const transactions = {
  area: "main",
  layout: LayoutMainAside,
  children: [
    {
      area: "main",
      component: "OmoPlaceholder",
      data: "I am the transactions detail",
    },
    {
      area: "aside",
      component: "OmoPlaceholder",
      data: "I am the omo firends detail",
    },
  ],
};

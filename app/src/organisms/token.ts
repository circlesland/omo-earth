import { LayoutMain } from "../layouts/LayoutMain";

export const token = {
  area: "main",
  layout: LayoutMain,
  children: [
    {
      area: "main",
      component: "OmoPlaceholder",
      data: "I am the token placeholder",
    },
  ],
};

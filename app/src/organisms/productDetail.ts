import { LayoutMain } from "../layouts/LayoutMain";

export const productDetail = (id) => {
  return {
    area: "main",
    layout: LayoutMain,
    children: [
      {
        area: "main",
        component: "OmoPlaceholder",
        data: { title: "title", id },
      },
    ],
  };
};

import { LayoutMain } from "../layouts/LayoutMain";

export const productDetail = (id) => {
  return {
    area: "main",
    layout: LayoutMain,
    children: [
      {
        area: "main",
        component: "OmoProductDetail",
        data: { title: "title", id },
      },
    ],
  };
};

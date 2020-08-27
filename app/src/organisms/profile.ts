import { LayoutMain } from "../layouts/LayoutMain";

export const profile = (id:string) =>
{
  return {
    area: "main",
    layout: "LayoutMain",children: [
      {
        area: "main",
        component: "OmoProfile",
        data: {
          id
        },
      },
    ],
  }
};
import type { Component } from "../interfaces/component";

export const Home: Component = {
  area: "main",
  layout: "LayoutMain",
  children: [
    {
      area: "main",
      component: "OmoBanner",
      data: { title: "Follow your passion", image: "/start.jpg", link: "safe" },
      children: [
        {
          area: "",
          component: "OmoLogin",
        },
      ],
    },
  ],
};

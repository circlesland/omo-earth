import type { Component } from "../interfaces/component";

export const SignIn: Component = {
  area: "main",
  layout: "LayoutMain",
  children: [
    {
      area: "main",
      component: "OmoBanner",
      data: { title: "Follow your passion", image: "/start.jpg" },
      children: [
        {
          area: "",
          component: "OmoSpin",
        },
      ],
    },
  ],
};

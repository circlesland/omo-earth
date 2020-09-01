import type {Component} from "../interfaces/component";

export const Blog : Component = {
  mobile: {
    area: "main",
    layout: "LayoutHeaderMain",
    children: [{
      mobile: {
        area: "header",
        component: "OmoNavTop",
      }
    }, {
      mobile: {
          area: "main",
          component: "OmoBlog",
        }
    }]
  }
};

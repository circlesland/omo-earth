import type {Component} from "../interfaces/component";
import {DeviceClass} from "../interfaces/component";

export const Blog : Component = {
    area: "main",
    layout: "LayoutHeaderMain",
    children: [{
        area: "header",
        component: "OmoNavTop",
    }, {
          area: "main",
          component: "OmoBlog",
    }]
};

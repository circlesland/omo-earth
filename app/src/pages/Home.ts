import type {Component} from "../interfaces/component";

export const Home: Component = {
    area: "main",
    layout: "LayoutHeaderMain",
    children: [{
        area: "header",
        component: "OmoNavTop"
    }, {
        area: "main",
        component: "OmoLanding"
    }]
};

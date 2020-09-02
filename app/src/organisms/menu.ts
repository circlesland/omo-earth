import type { Menu } from "../components/OmoNavAside/OmoNavAsideInterfaces";
import { NavigateTo } from "../trigger/navigateTo";
import type { Component } from "../interfaces/component";
import {DeviceClass} from "../interfaces/component";

export const menu: Component = {
  [DeviceClass.mobile]: {
    area: "nav",
    component: "OmoNavAside",
    data: {
      menu: <Menu>{
        categories: [
          {
            title: "Account",
            trigger: [
              new NavigateTo("My Account", "/safe/transactions"),
              new NavigateTo("Token", "/safe/token"),
              new NavigateTo("Friends", "/safe/trust/received"),
            ],
          },
          {
            title: "Profile",
            trigger: [
              new NavigateTo("Me", "/safe/profile/1"),
              new NavigateTo("Notifications", "/profile/notifications"),
              new NavigateTo("Settings", "/profile/settings"),
            ],
          },
        ],
      },
    },
  },
};

import type { Menu } from "../components/OmoNavAside/OmoNavAsideInterfaces";
import { NavigateTo } from "../trigger/navigateTo";

export const menu = {
  area: "nav",
  component: "OmoNavAside",
  data: {
    menu: <Menu>{
      categories: [
        {
          title: "Account",
          trigger: [
            new NavigateTo("Transactions", "/safe/transactions"),
            new NavigateTo("Token", "/safe/token"),
            new NavigateTo("Received trust", "/safe/trust/received"),
            new NavigateTo("Expressed trust", "/safe/trust/expressed"),
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
};

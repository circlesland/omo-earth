import type { Menu } from "../components/OmoNavAside/OmoNavAsideInterfaces";
import { NavigateTo } from "../trigger/navigateTo";
import type {Component} from "../interfaces/component";

export const marketMenu : Component = {
  area: "nav",
  component: "OmoNavAside",
  data: {
    menu: <Menu>{
      categories: [
        {
          title: "Filter by",
          trigger: [
            new NavigateTo("Transactions", "/safe/transactions"),
            new NavigateTo("Token", "/safe/token"),
            new NavigateTo("Received trust", "/safe/trust/received"),
            new NavigateTo("Expressed trust", "/safe/trust/expressed"),
          ],
        }
      ],
    },
  },
};

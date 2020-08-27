import type { Menu } from "../components/OmoNavAside/OmoNavAsideInterfaces";
import { NavigateTo } from "../trigger/navigateTo";
import type {AddressableComponent, Component} from "../interfaces/component";
import {FilterBy} from "../trigger/filterBy";

export const marketMenu = (listing:AddressableComponent) => {
  return <Component>{
    area: "nav",
    component: "OmoNavAside",
    data: {
      menu: <Menu>{
        categories: [
          {
            title: "Filter by",
            trigger: [
              new FilterBy("1", listing, "products", "jsonPathFilter"),
              new NavigateTo("Transactions", "/safe/transactions"),
              new NavigateTo("Token", "/safe/token"),
              new NavigateTo("Received trust", "/safe/trust/received"),
              new NavigateTo("Expressed trust", "/safe/trust/expressed"),
            ],
          }
        ],
      }
    }
  }
};

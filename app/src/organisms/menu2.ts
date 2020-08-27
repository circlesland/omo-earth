import type { Menu } from "../components/OmoNavAside/OmoNavAsideInterfaces";
import { Actions, NavigateTo } from "../trigger/trigger";

export const menu2 = {
  area: "nav",
  component: "OmoNavAside",
  data: {
    menu: <Menu>{
      categories: [
        {
          title: "product",
          trigger: [new NavigateTo("Transactions", "/safe/transactions")],
        },
      ],
    },
  },
};

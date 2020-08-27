import {LayoutMain} from "../layouts/LayoutMain";
import {LayoutNavMain} from "../layouts/LayoutNavMain";
import {LayoutMainAside} from "../layouts/LayoutMainAside";
import {LayoutHeaderMainFooter} from "../layouts/LayoutHeaderMainFooter";
import type {Menu} from "../components/OmoNavAside/OmoNavAsideInterfaces";
import {NavigateTo} from "../trigger/navigateTo";

export const ResponsiveLayout = (() =>
{
  if (window.innerWidth > 800) return LayoutNavMain;
  else return LayoutMain;
})();

export const SafeTransactions = {
  layout: LayoutHeaderMainFooter,
  children: [{
      area: "header",
      component: "OmoNavTop",
    }, {
      area: "main",
      layout: ResponsiveLayout,
      children: [{
          area: "nav",
          component: "OmoNavAside",
          data: {
            menu: <Menu>{
              categories:[{
                title: "Account",
                trigger: [
                  new NavigateTo("Transactions", "/safe/transactions"),
                  new NavigateTo("Token", "/safe/token"),
                  new NavigateTo("Received trust", "/safe/trust/received"),
                  new NavigateTo("Expressed trust", "/safe/trust/expressed")
                ]
              },{
                title: "Profile",
                trigger: [
                  new NavigateTo("My Devices", "/profile/devices"),
                  new NavigateTo("Notifications", "/profile/notifications"),
                  new NavigateTo("Settings", "/profile/settings")]
              }]
            }
          }
        }, {
          area: "main",
          layout: LayoutMainAside,
          children: [{
              area: "main",
              component: "OmoTransactions"
            },
          ],
        },
      ],
    },
    {
      area: "dapp",
      component: "OmoNavDapp",
    }, {
      area: "footer",
      component: "OmoNavBottom",
    },
  ],
};

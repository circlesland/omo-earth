import OmoBlog from "./components/OmoBlog.svelte";
import OmoMarketProducts from "./components/OmoMarketProducts.svelte";
import OmoShopHeader from "./components/OmoShopHeader.svelte";
import OmoNavAside from "./components/OmoNavAside/OmoNavAside.svelte";
import OmoNavBottom from "./components/OmoNavBottom.svelte";
import OmoTransactions from "./components/OmoTransactions.svelte";
import OmoSapiens from "./components/OmoSapiens.svelte";
import OmoLanding from "./components/OmoLanding.svelte";
import OmoNavTopMobile from "./components/OmoNavTopMobile.svelte";
import OmoNavTopTablet from "./components/OmoNavTopTablet.svelte";
import OmoNavTopDesktop from "./components/OmoNavTopDesktop.svelte";
import OmoNavDapp from "./components/OmoNavDapp.svelte";
import OmoPlaceholder from "./components/OmoPlaceholder.svelte";
import OmoProductDetail from "./components/OmoProductDetail.svelte";
import OmoBalance from "./components/OmoBalance.svelte";
import OmoProfile from "./components/OmoProfile.svelte";
import {LayoutHeaderMain} from "./layouts/LayoutHeaderMain";
import {LayoutHeaderMainFooter} from "./layouts/LayoutHeaderMainFooter";
import {LayoutMain} from "./layouts/LayoutMain";
import {LayoutMainAside} from "./layouts/LayoutMainAside";
import {LayoutNavMain} from "./layouts/LayoutNavMain";

export const library = {
  getLayoutByName: (name) =>
  {
    switch (name)
    {
      case "LayoutHeaderMain":
        return LayoutHeaderMain;
      case "LayoutHeaderMainFooter":
        return LayoutHeaderMainFooter;
      case "LayoutMain":
        return LayoutMain;
      case "LayoutMainAside":
        return LayoutMainAside;
      case "LayoutNavMain":
        return LayoutNavMain;
    }
    throw new Error("Couldn't find layout with the name " + name);
  },
  getComponentByName: (name) =>
  {
    switch (name)
    {
      case "OmoNavBottom":
        return OmoNavBottom;
      case "OmoTransactions":
        return OmoTransactions;
      case "OmoNavAside":
        return OmoNavAside;
      case "OmoShopHeader":
        return OmoShopHeader;
      case "OmoMarketProducts":
        return OmoMarketProducts;
      case "OmoLanding":
        return OmoLanding;
      case "OmoBlog":
        return OmoBlog;
      case "OmoNavTopMobile":
        return OmoNavTopMobile;
      case "OmoNavTopTablet":
        return OmoNavTopTablet;
      case "OmoNavTopDesktop":
        return OmoNavTopDesktop;
      case "OmoSapiens":
        return OmoSapiens;
      case "OmoNavDapp":
        return OmoNavDapp;
      case "OmoPlaceholder":
        return OmoPlaceholder;
      case "OmoProductDetail":
        return OmoProductDetail;
      case "OmoBalance":
        return OmoBalance;
      case "OmoProfile":
        return OmoProfile;
    }
  },
};

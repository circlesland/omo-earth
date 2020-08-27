import OmoBlog from "./components/OmoBlog.svelte";
import OmoMarketProducts from "./components/OmoMarketProducts.svelte";
import OmoShopHeader from "./components/OmoShopHeader.svelte";
import OmoNavAside from "./components/OmoNavAside/OmoNavAside.svelte";
import OmoNavBottom from "./components/OmoNavBottom.svelte";
import OmoTransactions from "./components/OmoTransactions.svelte";
import OmoSapiens from "./components/OmoSapiens.svelte";
import OmoLanding from "./components/OmoLanding.svelte";
import OmoNavTop from "./components/OmoNavTop.svelte";
import OmoNavDapp from "./components/OmoNavDapp.svelte";

export const library = {
  getComponentByName: (name) => {
    switch (name) {
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
      case "OmoNavTop":
        return OmoNavTop;
      case "OmoSapiens":
        return OmoSapiens;
      case "OmoNavDapp":
        return OmoNavDapp;
    }
  },
};

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
import OmoPlaceholder from "./components/OmoPlaceholder.svelte";
import OmoProductDetail from "./components/OmoProductDetail.svelte";
import OmoBalance from "./components/OmoBalance.svelte";
import OmoProfile from "./components/OmoProfile.svelte";
import ListCompositor from "./components/ListCompositor.svelte";
import SafeToken from "./components/SafeToken.svelte";
import GridCompositor from "./components/GridCompositor.svelte";
import PageCompositor from "./components/PageCompositor.svelte";
import SlotCompositor from "./components/SlotCompositor.svelte";

import {LayoutHeaderMain} from "./layouts/LayoutHeaderMain";
import {LayoutHeaderMainFooter} from "./layouts/LayoutHeaderMainFooter";
import {LayoutMain} from "./layouts/LayoutMain";
import {LayoutTopMainAside} from "./layouts/LayoutTopMainAside";
import {LayoutNavMain} from "./layouts/LayoutNavMain";
import {LayoutNav} from "./layouts/LayoutNav";
import type {Observable} from "rxjs";
import type {Trigger} from "./trigger/trigger";
import {Component, ComponentDefinition, DeviceClass} from "./interfaces/component";

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
      case "LayoutTopMainAside":
        return LayoutTopMainAside;
      case "LayoutNavMain":
        return LayoutNavMain;
      case "LayoutNav":
        return LayoutNav;
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
      case "OmoNavTop":
        return OmoNavTop;
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
      case "ListCompositor":
        return ListCompositor;
      case "SafeToken":
        return SafeToken;
      case "GridCompositor":
        return GridCompositor;
      case "PageCompositor":
        return PageCompositor;
      case "SlotCompositor":
        return SlotCompositor;
    }
  },

  runtime: {
    _instances: {},
    _topics: {},
    register(id: string, instance: any): Observable<Trigger>
    {
      this._instances[id] = instance;
      this._topics[id] = window.eventBroker.createTopic("omo", id);
      console.log("registered new instance with id: " + id, instance);
      return this._topics[id].observable;
    },
    find(id: string): any
    {
      return this._instances[id];
    },
    remove(id: string)
    {
      const oldInstance = this._instances[id];
      delete this._instances[id];
      window.eventBroker.removeTopic("omo", id);
      console.log("removed instance with id: " + id, oldInstance);
    },
    getDeviceClass(): DeviceClass
    {
      if (window.innerWidth <= 600) return DeviceClass.mobile;
      else if (window.innerWidth <= 1024) return DeviceClass.tablet;
      else return DeviceClass.desktop;
    },
    _clone(obj)
    {
      const json = JSON.stringify(obj);
      const clone = JSON.parse(json);
      return clone;
    },
    findComponentDefinition(component: Component): ComponentDefinition
    {
      const deviceClass = library.runtime.getDeviceClass();

      // Find a matching definition (searching from large to small)
      const sizeMap = [DeviceClass.mobile, DeviceClass.tablet, DeviceClass.desktop];
      let testSize = sizeMap.indexOf(deviceClass);

      for (let i = testSize; i >= 0; i--)
      {
        const definition = component[sizeMap[i]];
        if (definition)
        {
          return this._clone(definition);
        }
      }

      // No definition was found. Is the Component itself the definition?
      // TODO: Replace evil duck-typing with correct types
      let componentAsDefinition: any = component;
      if (componentAsDefinition.area
        || componentAsDefinition.layout
        || componentAsDefinition.component)
      {
        return componentAsDefinition;
      }

      throw new Error("Couldn't find a matching component definition in the following Component:" + JSON.stringify(component));
    }
  }
};

import page from "page";
import {Actions} from "./actions";
import type {NavigateTo} from "../trigger/navigateTo";
import type {DummyTrigger} from "../trigger/dummyTrigger";
import type {FilterBy} from "../trigger/filterBy";
import type {ToggleSideNav} from "../trigger/shell/toggleSideNav";
import {allStores} from "../stores/allStores";
import { get } from 'svelte/store';
import {library} from "../library";
import {DeviceClass} from "../interfaces/component";
import {SetLayout} from "../trigger/compositor/setLayout";
import {ResetLayout} from "../trigger/compositor/resetLayout";

let sideBarToggleState:boolean = true;

export const actionRepository = {
  [Actions.dummyAction]:(trigger:DummyTrigger) => console.warn("dummyAction(text:" + trigger.text + ") was triggered by DummyTrigger."),
  [Actions.navigateTo]:(trigger:NavigateTo) => page(trigger.to),
  [Actions.toggleSideNav]:(trigger:ToggleSideNav) => {
    const deviceClass = library.runtime.getDeviceClass();
    if (sideBarToggleState){
      if (deviceClass === DeviceClass.mobile) {
        window.trigger(new SetLayout("content", "LayoutNav"));
      } else {
        window.trigger(new SetLayout("content", "LayoutMain"));
      }
    } else {
      window.trigger(new ResetLayout("content"));
    }
    sideBarToggleState = !sideBarToggleState;
  },
  [Actions.filterBy]:(trigger:FilterBy) => {
    const store = allStores[trigger.storeName];
    if (!store)
      throw new Error("Couldn't find a store with the name '" + trigger.storeName + "'");


  }
}

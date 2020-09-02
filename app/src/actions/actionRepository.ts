import page from "page";
import {Actions} from "./actions";
import type {NavigateTo} from "../trigger/navigateTo";
import type {DummyTrigger} from "../trigger/dummyTrigger";
import type {FilterBy} from "../trigger/filterBy";
import {allStores} from "../stores/allStores";
import { get } from 'svelte/store';

export const actionRepository = {
  [Actions.dummyAction]:(trigger:DummyTrigger) => console.warn("dummyAction(text:" + trigger.text + ") was triggered by DummyTrigger."),
  [Actions.navigateTo]:(trigger:NavigateTo) => page(trigger.to),
  [Actions.filterBy]:(trigger:FilterBy) => {
    const store = allStores[trigger.storeName];
    if (!store)
      throw new Error("Couldn't find a store with the name '" + trigger.storeName + "'");

    const items = get(store);
    items.map(o => {
      if (!o.tags)
        o.tags = []; // TODO: Don't change the object!!
      return {
        id: o.id,
        tags: o.tags.map(t => {

        })
      }
    });
  }
}

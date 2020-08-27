import page from "page";
import {Actions} from "./actions";
import type {NavigateTo} from "../trigger/navigateTo";
import type {DummyTrigger} from "../trigger/dummyTrigger";

export const actionRepository = {
  [Actions.navigate]:(trigger:NavigateTo) => page(trigger.to),
  [Actions.dummyAction]:(trigger:DummyTrigger) => alert("dummyAction(text:" + trigger.text + ") was triggered by DummyTrigger.")
}

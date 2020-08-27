import {Actions, NavigateTo} from "../trigger/trigger";
import page from "page";

export const actionRepository = {
  [Actions.navigate]:(trigger:NavigateTo) => page(trigger.to),

}

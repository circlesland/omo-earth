import { Actions } from "../actions/actions";
import type { Trigger } from "./trigger";

export class NavigateTo implements Trigger {
  title: string;
  to: string;
  icon?: string;

  readonly triggers: Actions = Actions.navigateTo;

  constructor(title: string, to: string, icon?: string) {
    this.title = title;
    this.to = to;
    this.icon = icon;
  }
}

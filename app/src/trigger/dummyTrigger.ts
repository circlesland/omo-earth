import { Actions } from "../actions/actions";
import type { Trigger } from "./trigger";

export class DummyTrigger implements Trigger {
  title: string;
  text: string;
  icon: string;

  readonly triggers: Actions = Actions.dummyAction;

  constructor(title: string, text: string, icon: string) {
    this.title = title;
    this.text = text;
    this.icon = icon;
  }
}

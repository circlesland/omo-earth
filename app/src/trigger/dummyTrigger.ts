import {Actions} from "../actions/actions";
import type {Trigger} from "./trigger";

export class DummyTrigger implements Trigger
{
  title: string;
  text: string;

  readonly triggers: Actions = Actions.dummyAction;

  constructor(title:string, text:string)
  {
    this.title = title;
    this.text = text;
  }
}
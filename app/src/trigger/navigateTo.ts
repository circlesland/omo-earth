import {Actions} from "../actions/actions";
import type {Trigger} from "./trigger";

export class NavigateTo implements Trigger
{
  title: string;
  to: string;

  readonly triggers: Actions = Actions.navigate;

  constructor(title:string, to:string)
  {
    this.title = title;
    this.to = to;
  }
}
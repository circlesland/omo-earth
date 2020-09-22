import type {Trigger} from "../trigger";
import {Actions} from "../../actions/actions";

export class LoggedOn implements Trigger
{
  title: string = "Logged on";
  triggers: Actions = Actions.loggedOn;

  /**
   * Who or what logged on?
   */
  sub:string;

  constructor(sub:string)
  {
    this.sub  = sub;
  }
}
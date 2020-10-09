import type {Trigger} from "../trigger";
import {Actions} from "../../actions/actions";

export class RemoveKey implements Trigger {
  title: string = "Removes the specified key from the personal identity";
  triggers: Actions = Actions.removeKey;
  name: string;

  constructor(name:string)
  {
    this.name = name;
  }
}
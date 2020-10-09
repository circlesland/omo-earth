import type {Trigger} from "../trigger";
import {Actions} from "../../actions/actions";

export class ImportKey implements Trigger {
  title: string = "Imports a shared key entry into the own index entry";
  triggers: Actions = Actions.importKey;
  hash: string;
  name: string;

  constructor(hash:string, name: string)
  {
    this.hash = hash;
    this.name = name;
  }
}
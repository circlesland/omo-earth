import type {Trigger} from "../trigger";
import {Actions} from "../../actions/actions";

export class AddKey implements Trigger {
  title: string = "Adds a new key to the personal keystore or generates it";
  triggers: Actions = Actions.addKey;
  name: string;
  privateKey?:string;
  publicKey?:string;

  constructor(name:string, privateKey?:string, publicKey?:string)
  {
    if (!((!privateKey && !publicKey) || (privateKey && publicKey)))
      throw new Error("Either both, public- and private-key must be set or none.");

    this.name = name;
  }
}
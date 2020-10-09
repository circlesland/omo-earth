import type {Trigger} from "../trigger";
import {Actions} from "../../actions/actions";

export class ShareKey implements Trigger {
  title: string = "Encrypts an existing key with the public key of a different identity and creates a new entry with this key.";
  triggers: Actions = Actions.shareKey;
  name: string;
  publicKey: string;

  constructor(name:string, publicKey: string)
  {
    this.name = name;
    this.publicKey = publicKey;
  }
}
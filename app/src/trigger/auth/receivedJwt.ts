import type {Trigger} from "../trigger";
import {Actions} from "../../actions/actions";

export class ReceivedJwt implements Trigger {
  title: string = "Received JWT";
  triggers: Actions = Actions.receivedJwt;
  jwt:string;

  constructor(jwt:string)
  {
    this.jwt = jwt;
  }
}
import { Actions } from "../actions/actions";
import type { Request } from "./request";
import type {ResponseReceiver} from "../interfaces/responseReceiver";

export class DummyRequest implements Request {
  id: string;
  sender: ResponseReceiver;
  title: string;
  text: string;
  icon: string;

  readonly triggers: Actions = Actions.dummyAction;

  constructor(recipientId:string, sender: any, title: string, text: string, icon: string) {
    this.id = recipientId;
    this.sender = sender;
    this.title = title;
    this.text = text;
    this.icon = icon;
  }

}

import {Actions} from "../actions/actions";
import type {Request} from "./request";
import type {ResponseReceiver} from "../interfaces/responseReceiver";

export class FilterBy implements Request
{
  id:string;
  sender:ResponseReceiver;
  title: string;
  storeName:string;
  icon:string = "fa-filter";
  tags:{type:string, id:string}[];

  readonly triggers: Actions = Actions.filterBy;

  constructor(id: string, sender:ResponseReceiver, storeName:string, title:string, tags:{type:string, id:string}[])
  {
    this.id = id;
    this.title = title;
    this.storeName = storeName;
    this.tags = tags;
    this.sender = sender;
  }
}
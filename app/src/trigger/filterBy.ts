import {Actions} from "../actions/actions";
import type {Request} from "./request";
import type {AddressableComponent} from "../interfaces/component";

export class FilterBy implements Request
{
  requestId:string;
  sender:AddressableComponent;
  title: string = "<<no title>>";
  storeName:string;
  icon:string = "fa-filter";
  jsonPathFilter:string;

  readonly triggers: Actions = Actions.filterBy;

  constructor(requestId: string, sender:AddressableComponent, storeName:string, jsonPathFilter:string)
  {
    this.requestId = requestId;
    this.storeName = storeName;
    this.jsonPathFilter = jsonPathFilter;
    this.sender = sender;
  }
}
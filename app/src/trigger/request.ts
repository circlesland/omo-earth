import type {Trigger} from "./trigger";
import type {AddressableComponent} from "../interfaces/component";

export interface Request extends Trigger
{
  requestId:string;
  sender:AddressableComponent;
}
import type {ResponseReceiver} from "../interfaces/responseReceiver";
import type {Trigger} from "./trigger";

export interface Request extends Trigger
{
  id:string;
  sender:ResponseReceiver;
}
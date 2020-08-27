import type {Actions} from "../actions/actions";

export interface Trigger
{
  triggers:Actions,
  icon?:string,
  title:string,
  badge?:string
}
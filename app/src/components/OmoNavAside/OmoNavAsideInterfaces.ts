import type {Trigger} from "../../trigger/trigger";

export interface Menu
{
  categories:Category[]
}

export interface Category
{
  title:string,
  trigger:Trigger[]
}
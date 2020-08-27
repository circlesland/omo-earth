export interface Trigger
{
  triggers:Actions,
  icon?:string,
  title:string,
  badge?:string
}

export enum Actions
{
  navigate = "navigate"
}

export class NavigateTo implements Trigger
{
  to:string;
  title: string = "";

  triggers: Actions = Actions.navigate;

  constructor(title:string, to:string)
  {
    this.title = title;
    this.to = to;
  }
}
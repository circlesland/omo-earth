import type {Trigger} from "../trigger";
import {Actions} from "../../actions/actions";

export class ToggleSideNav implements Trigger {
  title: string = "ToggleSideNav";
  triggers: Actions = Actions.toggleSideNav;

  constructor()
  {
  }
}
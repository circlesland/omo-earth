export interface Component
{
  data?: any;
  component?: string;
  children?: Component[];
  area: string;
  /**
   * When set wraps a "<div>" element around the child component(s) and applies the cssClasses on it.
   */
  cssClasses?: string;
  layout?: string
}

export interface AddressableComponent extends Component
{
  /**
   * If the view-component in this "Component" wants to be notified about events and repsponsen,
   * it must provide a unique ID.
   */
  id?:string
}
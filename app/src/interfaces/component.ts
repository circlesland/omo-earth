import type { Layout } from "./layout";

export interface Component {
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

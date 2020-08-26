import type { Layout } from "./layout";

export interface Component {
  data?: any;
  component: string;
  children?: Component[];
  area: string;
  layout?: Layout
}

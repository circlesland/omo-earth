import { generatePageSingle } from "../templates/TemplatePageDetail";
import { quickActionsSafe } from "../organisms/quickActionsSafe";
import {marketMenu} from "../organisms/menus/marketMenu";

export const Product = (content: any) =>
  generatePageSingle("SafeContext", marketMenu, content, quickActionsSafe);

import { generatePageSingle } from "../templates/TemplatePageDetail";
import { menu2 } from "../organisms/menu2";
import { quickActionsSafe } from "../organisms/quickActionsSafe";

export const Product = (content: any) =>
  generatePageSingle("SafeContext", menu2, content, quickActionsSafe);

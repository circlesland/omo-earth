import { generatePageSingle } from "../templates/TemplatePageDetail";
import { menu } from "../organisms/menu";
import { quickActionsSafe } from "../organisms/quickActionsSafe";

export const Product = (content: any) =>
  generatePageSingle("SafeContext", menu, content, quickActionsSafe);

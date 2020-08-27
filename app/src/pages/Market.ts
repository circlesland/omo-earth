import { generatePageSingle } from "../templates/TemplatePageDetail";
import { menu } from "../organisms/menu";
import { quickActionsSafe } from "../organisms/quickActionsSafe";

export const Market = (content: any) =>
  generatePageSingle("Omo Market", menu, content, quickActionsSafe);

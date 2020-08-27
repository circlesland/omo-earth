import { generatePageSingle } from "../templates/TemplatePageDetail";
import { marketMenu } from "../organisms/marketMenu";
import { quickActionsSafe } from "../organisms/quickActionsSafe";

export const Market = (content: any) =>
  generatePageSingle("Omo Market", marketMenu, content, quickActionsSafe);

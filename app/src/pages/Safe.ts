import { generatePageSingle } from "../templates/TemplatePageDetail";
import { safeMenu } from "../organisms/menus/safeMenu";
import { quickActionsSafe } from "../organisms/quickActionsSafe";

export const Safe = (content: any) =>
  generatePageSingle("Welcome Samuel", safeMenu, content, quickActionsSafe);

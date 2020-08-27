import { generatePageSingle } from "../templates/TemplatePageDetail";
import { menu } from "../organisms/menu";

export const Safe = (content: any) => generatePageSingle(menu, content);

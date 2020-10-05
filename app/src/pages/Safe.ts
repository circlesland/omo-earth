import { generatePageSingle } from "../templates/TemplatePageDetail";
import { safeMenu } from "../organisms/menus/safeMenu";
import { quickActionsSafe } from "../organisms/quickActionsSafe";

export const Safe = (content: any) =>
{
  const me = sessionStorage.getItem("me");
  let title = "Welcome!";
  if (me) {
    try
    {
      const meObj = JSON.parse(me);
      title = "Welcome " + meObj.content.email;
    } catch (e) {
      console.error("Couldn't parse the 'me' value in the sessionStorage.");
    }
  }
  return generatePageSingle(title, safeMenu, content, quickActionsSafe);
};
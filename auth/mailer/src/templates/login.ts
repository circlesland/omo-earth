import {Template} from "../template";

export const login:Template = {
    subject: "Your OMO.earth login magic-link",
    bodyPlain: `Please click the link below to sign-in:
{{env.APP_ONE_TIME_TOKEN_SIGNIN_URL}}/{{challenge}}`,
    bodyHtml: `Please click the link below to sign-in:<br/>
<a href="{{env.APP_ONE_TIME_TOKEN_SIGNIN_URL}}/{{challenge}}">Sign-in</a>`
}

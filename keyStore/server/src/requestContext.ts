import {Request} from "express";

export class RequestContext
{
    readonly origin:string;
    readonly sessionId?:string;

    readonly setCookies = [];
    readonly setHeaders = [];

    private constructor(origin:string, sessionId?:string)
    {
        this.origin = origin;
        this.sessionId = sessionId;
    }

    public static create(arg:{req?:Request}) : RequestContext
    {
        if (!arg.req) {
            throw new Error("Only queries and mutations are allowed.")
        }

      const originHeaderValue = arg.req.headers["origin"];
      const cookieValue = arg.req.headers["cookie"];

      console.log("Origin: " + originHeaderValue);
      console.log("Cookies: " + cookieValue);
/*
        const sessionCookie = arg.req.cookies["session"];
        let sessionId:string|undefined = undefined;
        if(sessionCookie) {
          sessionCookie
        }
*/
        //if (!originHeaderValue)
        //    throw new Error("The incoming request doesn't have an Origin-header.")

        return new RequestContext(<string>originHeaderValue);
    }
}

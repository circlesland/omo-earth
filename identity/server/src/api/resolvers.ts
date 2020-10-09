import {
  MutationResolvers,
  QueryResolvers
} from "../generated/graphql";
import {Session} from "@omo/data/dist/session";
import {privateDecrypt} from "crypto";

export class Resolvers
{
  // TODO: Add rate limiting (e.g. with https://www.npmjs.com/package/graphql-rate-limit-directive)

  readonly queryResolvers: QueryResolvers;
  readonly mutationResolvers: MutationResolvers;

  static readonly sessionTimeoutInSeconds = 60;

  constructor()
  {
    if (!process.env.PROXY_DOMAIN)
      throw new Error("process.env.PROXY_DOMAIN must be set to a domain name or ip address.");

    this.mutationResolvers = {
      exchangeToken: async (parent, {jwt}, context) =>
      {
        try
        {
          const session = await Session.createSessionFromJWT(jwt);

          context.setCookies.push({
            name: "session",
            value: session.sessionId,
            // Use a session cookie that should only last for the one browser session
            options: {
              domain: process.env.PROXY_EXTERN_DOMAIN,
              httpOnly: true,
              path: "/",
              sameSite: true,
              secure: !process.env.DEBUG
            }
          });

          return {
            success: true
          }
        }
        catch (e)
        {
          console.error(e);
          return {
            success: false,
            errorMessage: "Couldn't create the session cookie from the supplied JWT. Please try again with a new JWT."
          }
        }
      }
    };
/*
    const findEntryByHashCleartext = async (hash:string, sessionId:string) => {
      const session = await Session.findByValidSessionId(sessionId);
      if (!session || !session.identity || !session.identity.indexEntryPrivateKey)
        throw new Error("Invalid session");

      const entry = await Entry.findByHash(hash);
      if (!entry)
        return null;

      const clearText = privateDecrypt(session.identity.indexEntryPrivateKey, Buffer.from(entry.content, "base64"));
      console.log("clearText: ", clearText.toString("utf8"));
      entry.content = JSON.parse(clearText.toString("utf8"));

      return entry;
    };
*/

    this.queryResolvers = {
      version: parent => {
        return {
          major: 1,
          minor: 0,
          revision: 0
        }
      }
    };
  }
}

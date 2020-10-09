import {
  MutationResolvers,
  QueryResolvers
} from "../generated/graphql";
import {Session} from "@omo/data/dist/session";
import {privateDecrypt} from "crypto";
import {Identity} from "@omo/data/dist/identity";

export class Resolvers
{
  // TODO: Add rate limiting (e.g. with https://www.npmjs.com/package/graphql-rate-limit-directive)

  readonly queryResolvers: QueryResolvers;
  readonly mutationResolvers: MutationResolvers;

  constructor()
  {
    if (!process.env.PROXY_DOMAIN)
    {
      throw new Error("process.env.PROXY_DOMAIN must be set to a domain name or ip address.");
    }

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
      },
      updatePublicData: async (parent, {data}, context) => {
        try
        {
          await Identity.updatePrivateData(context.sessionId, data);
          return {
            success: true
          };
        } catch (e) {
          console.error(e);
          return {
            success: false,
            errorMessage: "Couldn't update the public data."
          }
        }
      },
      updatePrivateData: async (parent, {data}, context) => {
        try
        {
          await Identity.updatePrivateData(context.sessionId, data);
          return {
            success: true
          };
        } catch (e) {
          console.error(e);
          return {
            success: false,
            errorMessage: "Couldn't update the private data."
          }
        }
      }
    };

    this.queryResolvers = {
      privateData: async (parent, args, context) => {
        const identity = await Identity.findIdentityBySession(context.sessionId);
        if (!identity) {
          throw new Error("Identity not found.");
        }
        return identity.privateData;
      },
      publicData: async (parent, {identityPublicKey}, context) => {
          const myIdentity = !identityPublicKey
            ? await Identity.findIdentityBySession(context.sessionId)
            : await Identity.findByPublicKey(identityPublicKey);
          if (!myIdentity)
          {
            throw new Error("Identity not found.");
          }
          return myIdentity.publicData;
      },
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

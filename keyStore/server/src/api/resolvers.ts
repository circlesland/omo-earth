import {
  MutationResolvers,
  QueryResolvers
} from "../generated/graphql";
import {Session} from "../../../data/dist/session";
import {Entry} from "../../../data/dist/entry";
import {Identity} from "@omo/keystore-data/dist/identity";
import {publicDecrypt} from "crypto";

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
      },
      createEntry: async (parent, {publicKey, entryContent}, context) => {
        try
        {
          if (!publicKey)
            throw new Error("No public key was supplied.");

          const entry = await Entry.createEntry(context.sessionId, entryContent, publicKey);
          console.log(JSON.stringify(entry));

          return {
            success: true
          }
        }
        catch (e)
        {
          console.error(e);
          return {
            success: false,
            errorMessage: "Couldn't create the entry."
          }
        }
      },
      upsertIndexEntry: async (parent, {indexEntryContent}, context) => {
        try
        {
          const result = await Identity.upsertIndexEntry(context.sessionId, indexEntryContent);
          console.log(JSON.stringify(result));

          return {
            success: true
          }
        }
        catch (e)
        {
          console.error(e);
          return {
            success: false,
            errorMessage: "Couldn't create the entry."
          }
        }
      }
    };

    this.queryResolvers = {
      findEntryByHash: async (parent, {hash}, context) => {
        return await Entry.findByHash(hash);
      },
      findEntryByHashCleartext: async (parent, {hash}, context) => {
        const session = await Session.findByValidSessionId(context.sessionId);
        if (!session || !session.identity || !session.identity.indexEntryPrivateKey)
          throw new Error("Invalid session");

        const entry = await Entry.findByHash(hash);
        if (!entry)
          return null;

        const clearText = publicDecrypt(session.identity.indexEntryPrivateKey, Buffer.from(entry.content, "base64"));
        entry.content = clearText.toString("utf8");

        return entry;
      }
    };
  }
}

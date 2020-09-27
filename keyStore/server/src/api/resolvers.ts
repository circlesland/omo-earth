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
          const entry = await Entry.createEntry(context.sessionId, entryContent, publicKey);

          return {
            success: true,
            entryHash: entry.entryHash
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
      importEntry: async (parent, {entryHash, name, overwrite}, context) => {
        try
        {
          const session = await Session.findByValidSessionId(context.sessionId);
          if (!session || !session.identity || !session.identity.indexEntryPublicKey)
            throw new Error("Invalid session");

          const indexEntry = await findIndexEntry(context.sessionId);
          const indexEntryContent = indexEntry && indexEntry.content
            ? JSON.parse(indexEntry.content)
            : <any>{};

          const entryToImport = await Entry.findByHash(entryHash);
          if (!entryToImport)
            throw new Error("Couldn't find an entry with hash " + entryHash + " to import");

          if (entryToImport.ownerFingerPrint != Identity.fingerprintPublicKey(session.identity.indexEntryPublicKey))
            throw new Error("You're not the owner of the specified entry and therefore cannot import it.")

          if (indexEntryContent[name] && !overwrite)
            throw new Error("There is already an entry with this name. Set the 'overwrite' parameter to 'true' if overwriting is intended.");

          indexEntryContent[name] = entryHash;

          const upsertIndexEntryResult = await Identity.upsertIndexEntry(context.sessionId, indexEntryContent);

          return {
            success: true,
            entryHash: upsertIndexEntryResult.entryHash,
            name: name
          }
        }
        catch (e)
        {
          console.error(e);
          return {
            success: false,
            errorMessage: "Couldn't import the entry."
          }
        }
      },
      removeEntry: async (parent, {name}, context) => {
        try {
          const indexEntry = await findIndexEntry(context.sessionId);
          const indexEntryContent = indexEntry && indexEntry.content
            ? JSON.parse(indexEntry.content)
            : <any>{};

          if (!indexEntryContent[name])
            throw new Error("Couldn't find a index entry with name '" + name + "'");

          delete indexEntryContent[name];

          const newIndexEntry = await Identity.upsertIndexEntry(context.sessionId, indexEntryContent);

          return {
            success: true,
            entryHash: newIndexEntry.entryHash,
            name: name
          }
        }
        catch (e)
        {
          console.error(e);
          return {
            success: false,
            errorMessage: "Couldn't remove the entry from the index."
          }
        }
      }
    };

    const findEntryByHashCleartext = async (hash:string, sessionId:string) => {
      const session = await Session.findByValidSessionId(sessionId);
      if (!session || !session.identity || !session.identity.indexEntryPrivateKey)
        throw new Error("Invalid session");

      const entry = await Entry.findByHash(hash);
      if (!entry)
        return null;

      const clearText = publicDecrypt(session.identity.indexEntryPrivateKey, Buffer.from(entry.content, "base64"));
      entry.content = JSON.parse(clearText.toString("utf8"));

      return entry;
    };

    const findIndexEntry = async (sessionId:string) => {
      const session = await Session.findByValidSessionId(sessionId);
      if (!session || !session.identity || !session.identity.indexEntryHash)
        throw new Error("Invalid session");

      let indexEntry = !session.identity.indexEntryHash ? Promise.resolve(null) : await findEntryByHashCleartext(session.identity.indexEntryHash, sessionId);
      return await indexEntry;
    }

    this.queryResolvers = {
      indexEntry: async (parent, {}, context) => {
        return findIndexEntry(context.sessionId);
      },
      findEntryByHash: async (parent, {hash}, context) => {
        return await Entry.findByHash(hash);
      },
      findEntryByHashCleartext: async (parent, {hash}, context) => {
        return findEntryByHashCleartext(hash, context.sessionId);
      }
    };
  }
}

import {prisma} from "./prisma";
import {publicEncrypt} from "crypto";
import {Identity} from "./identity";
import {Session} from "./session";
const multihash = require('multihashes');

export class Entry
{
  static async findByHash(entryHash: string)
  {
    return prisma.entry.findOne({where: {entryHash}})
  }

  private static async ipfsCompatibleHash(data: string)
  {
    const dataArr = Uint8Array.from(Buffer.from(data, "utf8"));
    const hashed = multihash.toB58String(multihash.encode(dataArr, 'sha2-256'));
    return hashed;
  }

  static async createEntry(sessionId:string, entryContent:object, ownerPublicKey:string|null|undefined)
  {
    const session = await Session.findByValidSessionId(sessionId);
    if (!session)
      throw new Error("Invalid session");

    if (!session.identity || !session.identity.indexEntryPublicKey)
      throw new Error("Invalid session")

    if (!ownerPublicKey)
      ownerPublicKey = session.identity.indexEntryPublicKey;

    const creatorFingerPrint = Identity.fingerprintPublicKey(session.identity.indexEntryPublicKey);
    const ownerFingerPrint = Identity.fingerprintPublicKey(<string>ownerPublicKey);
    const contentJson = JSON.stringify(entryContent);
    const contentJsonBuffer = Buffer.from(contentJson, "utf8");
    const encryptedContentJsonBuffer = publicEncrypt(session.identity.indexEntryPublicKey, contentJsonBuffer);
    const encryptedContentJsonNase64 = encryptedContentJsonBuffer.toString("base64");

    // Create a new index entry
    const memEntry = {
      creatorFingerPrint,
      ownerFingerPrint,
      content: encryptedContentJsonNase64
    };

    const memEntryJson = JSON.stringify(memEntry);
    const entryHash = await Entry.ipfsCompatibleHash(memEntryJson);

    const persistedEntry = await prisma.entry.create({
      data: {
        creatorFingerPrint,
        ownerFingerPrint,
        entryHash: entryHash,
        content: memEntry.content
      }
    });

    return persistedEntry;
  }
}

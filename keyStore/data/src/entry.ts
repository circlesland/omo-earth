import {prisma} from "./prisma";
import {ValueGenerator} from "../../../auth/util/dist/valueGenerator";
import {createHash, publicEncrypt} from "crypto";
import {Identity} from "./identity";
import * as bs58 from "bs58";

export class Entry
{
  static async findByHash(entryHash: string)
  {
    return prisma.entry.findOne({where: {entryHash}})
  }

  private static async ipfsCompatibleHash(data: string)
  {
    const hashed = createHash('sha256')
      .update(data)
      .digest();
    const bas58Hash = bs58.encode(Buffer.from("0x12", "hex")) + bs58.encode(hashed);
    return bas58Hash;
  }

  static async createEntry(publicKey:string, entryContent:object)
  {
    const ownerFingerPrint = Identity.fingerprintPublicKey(publicKey);
    const contentJson = JSON.stringify(entryContent);
    const contentJsonBuffer = Buffer.from(contentJson);
    const encryptedContentJsonBuffer = publicEncrypt(publicKey, contentJsonBuffer);
    const encryptedContentJsonNase64 = encryptedContentJsonBuffer.toString("base64");

    // Create a new index entry
    const memEntry = {
      nonce: ValueGenerator.generateRandomBase64String(32),
      content: encryptedContentJsonNase64,
      ownerFingerPrint: ownerFingerPrint
    };

    const memEntryJson = JSON.stringify(memEntry);
    const entryHash = await Entry.ipfsCompatibleHash(memEntryJson);

    const persistedEntry = await prisma.entry.create({
      data: {
        nonce: memEntry.nonce,
        ownerFingerPrint: ownerFingerPrint,
        entryHash: entryHash,
        content: memEntry.content
      }
    });

    return persistedEntry;
  }
}

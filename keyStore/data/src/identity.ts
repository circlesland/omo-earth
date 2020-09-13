import {createHash} from "crypto";
import {prisma} from "./prisma";
import * as bs58 from "bs58"
import {KeyGenerator} from "../../../auth/util/dist/keyGenerator";
import {ValueGenerator} from "../../../auth/util/dist/valueGenerator";

export class Identity
{
  private static async ipfsCompatibleHash(data: string)
  {
    const hashed = createHash('sha256')
      .update(data)
      .digest();
    const bas58Hash = bs58.encode(Buffer.from("0x12", "hex")) + bs58.encode(hashed);
    return bas58Hash;
  }

  /**
   * Creates a new OMO identity for the specified email-address.
   * The e-mail address must be taken from the "sub" claim of the JWT from omo-auth.
   * @param emailAddress
   */
  static async createFromEmail(emailAddress: string)
  {
    const ppk = await KeyGenerator.generateRsaKeyPair(2048);
    const fingerprint = createHash('sha512')
      .update(ppk.publicKeyPem)
      .digest('hex');

    // Store a new identity
    const identity = await prisma.identity.create({
      data: {
        identityId: ValueGenerator.generateRandomBase64String(32),
        challengeEmailAddress: emailAddress,
        indexEntryPrivateKey: ppk.privateKeyPem,
        indexEntryPublicKey: ppk.publicKeyPem,
        indexEntryKeyFingerprint: fingerprint
      }
    });

    return identity;
  }

  static async upsertIndexEntry(challengeEmailAddress: string, indexEntryContent:object)
  {
    const identities = await prisma.identity.findMany({where:{challengeEmailAddress}});
    if (!identities || identities.length !== 1)
      throw new Error("There is no known identity with the email address '" + challengeEmailAddress + "'");

    const identity = identities[0];

    // Create a new index entry
    const indexMemEntry = {
      nonce: ValueGenerator.generateRandomBase64String(32),
      content: indexEntryContent,
      ownerFingerPrint: identity.indexEntryKeyFingerprint
    };

    let inMemIndexEntryJson = JSON.stringify(indexMemEntry);
    const indexEntryHash = await Identity.ipfsCompatibleHash(inMemIndexEntryJson);

    delete indexMemEntry.nonce;
    inMemIndexEntryJson = JSON.stringify(indexMemEntry);

    const indexEntry = await prisma.entry.create({
      data: {
        nonce: indexMemEntry.nonce,
        ownerFingerPrint: identity.indexEntryKeyFingerprint,
        entryHash: indexEntryHash,
        content: inMemIndexEntryJson
      }
    });

    await prisma.identity.update({
      where:{
        identityId: identity.identityId
      },
      data: {
        indexEntryHash
      }
    });

    return indexEntry;
  }

  static async findById(identityId: string)
  {
    return prisma.identity.findOne({where: {identityId}})
  }
}
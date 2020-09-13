import {createHash, publicEncrypt} from "crypto";
import {prisma} from "./prisma";
import * as bs58 from "bs58"
import {KeyGenerator} from "../../../auth/util/dist/keyGenerator";
import {ValueGenerator} from "../../../auth/util/dist/valueGenerator";
import {Entry} from "./entry";

export class Identity
{
  static fingerprintPublicKey(publicKey:string)
  {
    const fingerprint = createHash('sha512')
      .update(publicKey)
      .digest('hex');

    return fingerprint;
  }

  /**
   * Creates a new OMO identity for the specified email-address.
   * The e-mail address must be taken from the "sub" claim of the JWT from omo-auth.
   * @param emailAddress
   */
  static async createFromEmail(emailAddress: string)
  {
    const ppk = await KeyGenerator.generateRsaKeyPair(2048);

    // Store a new identity
    const identity = await prisma.identity.create({
      data: {
        identityId: ValueGenerator.generateRandomBase64String(32),
        challengeEmailAddress: emailAddress,
        indexEntryPrivateKey: ppk.privateKeyPem,
        indexEntryPublicKey: ppk.publicKeyPem,
        indexEntryKeyFingerprint: Identity.fingerprintPublicKey(ppk.publicKeyPem)
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
    const persistedEntry = await Entry.createEntry(identity.indexEntryPublicKey, indexEntryContent);

    await prisma.identity.update({
      where:{
        identityId: identity.identityId
      },
      data: {
        indexEntryHash: persistedEntry.entryHash
      }
    });

    return persistedEntry;
  }

  static async findById(identityId: string)
  {
    return prisma.identity.findOne({where: {identityId}})
  }
}
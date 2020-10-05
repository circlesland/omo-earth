import {createHash} from "crypto";
import {prisma} from "./prisma";
import {KeyGenerator} from "../../../auth/util/dist/keyGenerator";
import {ValueGenerator} from "../../../auth/util/dist/valueGenerator";
import {Entry} from "./entry";
import {Session} from "./session";

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
        emailAddress: emailAddress,
        indexEntryPrivateKey: ppk.privateKeyPem,
        indexEntryPublicKey: ppk.publicKeyPem,
        indexEntryKeyFingerprint: Identity.fingerprintPublicKey(ppk.publicKeyPem),
      }
    });

    return identity;
  }

  /**
   * Sets a new index entry for the identity that is associated with the "challengeEmailAddress".
   * @param sessionId the session id
   * @param indexEntryContent
   */
  static async upsertIndexEntry(sessionId:string, indexEntryContent:object)
  {
    const session = await Session.findByValidSessionId(sessionId);
    if (!session)
      throw new Error("Invalid session");

    if (!session.identity || !session.identity.indexEntryPublicKey)
      throw new Error("Invalid session")

    const persistedEntry = await Entry.createEntry(sessionId, indexEntryContent, session.identity.indexEntryPublicKey);

    await prisma.identity.update({
      where:{
        identityId: session.identity.identityId
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
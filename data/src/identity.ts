import {Session} from "./session";
import {prisma} from "./prisma";

export class Identity {
  static async findByPublicKey(identityPublicKey: string)
  {
    return await prisma.identity.findOne({where:{identityPublicKey:identityPublicKey}});
  }

  static async findIdentityBySession(sessionId:string) {
    const session = await Session.findSessionBySessionId(sessionId);
    if (!session)
    {
      throw new Error("Couldn't find a valid session with the passed sessionId.");
    }
    const identity = await Identity.findByPublicKey(session.agent.identityPublicKey);
    if (!identity)
    {
      throw new Error("Couldn't find a identity with the passed sessionId.");
    }
    return identity;
  }

  static async updatePublicData(sessionId:string, publicData:string) {
    const identity = await Identity.findIdentityBySession(sessionId);
    if (!identity)
    {
      throw new Error("Couldn't find a identity with the passed sessionId.");
    }
    await prisma.identity.update({
      where: {
        identityPublicKey: identity.identityPublicKey
      },
      data: {
        publicData
      }
    });
  }

  static async updatePrivateData(sessionId:string, privateData:string) {
    const identity = await this.findIdentityBySession(sessionId);
    if (!identity)
    {
      throw new Error("Couldn't find a identity with the passed sessionId.");
    }
    await prisma.identity.update({
      where: {
        identityPublicKey: identity.identityPublicKey
      },
      data: {
        privateData
      }
    });
  }
}
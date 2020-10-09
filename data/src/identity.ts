import {Session} from "./session";
import {prisma} from "./prisma";

export class Identity {
  static async findIdentityBySession(sessionId:string) {
    const session = await Session.findSessionBySessionId(sessionId);
    if (!session)
    {
      throw new Error("Couldn't find a valid session with the passed sessionId.");
    }
    const identity = await prisma.identity.findOne({where:{identityPublicKey:session.agent.identityPublicKey}});
    if (!identity)
    {
      throw new Error("Couldn't find a identity with the passed sessionId.");
    }
    return identity;
  }

  static async updatePublicData(sessionId:string, publicData:string) {
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
import {prisma} from "./prisma";
import {Session} from "@omo/data/dist/session";

export class Offer {
  static async create(sessionId:string, name:string, description:string, price:number) {
    const ownerIdentityId = await Session.findIdentityIdBySessionId(sessionId);
    if (!ownerIdentityId) {
      throw new Error("Couldn't find a valid session for the give session id.");
    }
    const createdOffer = await prisma.offer.create({
      data: {
        ownerIdentityId,
        name,
        description,
        price
      },
      select: {
        description: true,
        name: true,
        ownerIdentityId: true,
        price: true,
        createdAt: true
      }
    });

    return {
      success: true,
      offer: createdOffer
    }
  }

  static findO() {
    return prisma.offer.findMany({
      select: {
        description: true,
        name: true,
        ownerIdentityId: true,
        price: true
      }
    });
  }
}
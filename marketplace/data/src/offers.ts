import {prisma} from "./prisma";
import {Identity} from "../../../data/dist/identity";

export class Offers {
  createOffer(sessionId:string, name:string, description:string, price:number) {
    const ownerIdentityId = Identity.findIdentityIdBySessionId(sessionId);
    if (!ownerIdentityId) {
      throw new Error("Couldn't find a valid session for the give session id.");
    }
    const createdOffer = prisma.offer.create({
      data: {
        ownerIdentityId,
        name,
        description,
        price
      }
    });
  }

  findOffers() {
    return prisma.offer.findMany();
  }
}
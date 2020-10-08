import {
  CreateOfferResponse,
  MutationResolvers,
  QueryResolvers
} from "../generated/graphql";
import {Offer} from "@omo/marketplace-data/dist/offer";

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
      createOffer: async (parent, {name, description, price}, context) => {
        const offer = await Offer.create(context.sessionId, name, description, price);
        return {
          success: true,
          offer: {
            name: offer.offer.name,
            description: offer.offer.description,
            price: offer.offer.price,
            createdAt: offer.offer.createdAt.toJSON(),
            ownerIdentityId: offer.offer.ownerIdentityId
          }
        };
      }
    };

    this.queryResolvers = {
      offers: async (parent, args, context) => {
        return (await Offer.find()).map(o => {
          return {
            name: o.name,
            description: o.description,
            price: o.price,
            createdAt: o.createdAt.toJSON(),
            ownerIdentityId: o.ownerIdentityId
          }
        });
      },
      version: (parent, args, context) => {
        return {
          major:1,
          minor: 0,
          revision: 0
        };
      }
    };
  }
}

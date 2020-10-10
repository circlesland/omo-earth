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
    };

    this.queryResolvers = {
    };
  }
}

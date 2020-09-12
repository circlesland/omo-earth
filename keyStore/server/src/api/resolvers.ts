import {
    MutationResolvers,
    QueryResolvers
} from "../generated/graphql";

export class Resolvers
{
    // TODO: Add rate limiting (e.g. with https://www.npmjs.com/package/graphql-rate-limit-directive)

    readonly queryResolvers: QueryResolvers;
    readonly mutationResolvers: MutationResolvers;

    constructor()
    {
        this.mutationResolvers = {
        };

        this.queryResolvers = {
        };
    }
}

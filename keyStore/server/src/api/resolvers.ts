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
          exchangeToken: (parent, args, context) => {
            context.setCookies.push({
              name: "session",
              value: "sessionFoo"
              /*options: {
                domain: "omo.local",
                expires: new Date("2021-01-01T00:00:00"),
                httpOnly: false,
                maxAge: 3600,
                path: "/",
                sameSite: true,
                secure: false
              }*/
            });
            return {
              success: true
            }
          }
        };

        this.queryResolvers = {
        };
    }
}

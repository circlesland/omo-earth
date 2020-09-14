import {ApolloServer} from "apollo-server";
import {Resolvers} from "./api/resolvers";

// TODO: Migrate to GraphQL-tools: https://www.graphql-tools.com/docs/migration-from-import/
import {importSchema} from "graphql-import";
import {RequestContext} from "./requestContext";

export class Main
{
    private readonly _server: ApolloServer;
    private readonly _resolvers: Resolvers;

    constructor()
    {
        if (!process.env.KEYSTORE_SERVICE_GRAPHQL_SCHEMA)
        {
            throw new Error("The KEYSTORE_SERVICE_GRAPHQL_SCHEMA environment variable must contain a valid path that " +
                "points to the GraphQL api schema.");
        }
        const apiSchemaTypeDefs = importSchema(process.env.KEYSTORE_SERVICE_GRAPHQL_SCHEMA);

        this._resolvers = new Resolvers();

        this._server = new ApolloServer({
            context: RequestContext.create,
            typeDefs: apiSchemaTypeDefs,
            resolvers: {
                Mutation: this._resolvers.mutationResolvers,
                Query: this._resolvers.queryResolvers
            }
        });
    }

    async run()
    {
        if (!process.env.AUTH_SERVICE_PORT)
        {
            throw new Error("The AUTH_SERVICE_PORT environment variable is not set.");
        }
        if (!process.env.AUTH_SERVICE_ROTATE_EVERY_N_SECONDS)
        {
            throw new Error("The AUTH_SERVICE_ROTATE_EVERY_N_SECONDS environment variable is not set.");
        }

        await this._server.listen({
            port: parseInt(process.env.AUTH_SERVICE_PORT)
        });
    }
}

new Main()
    .run()
    .then(() => "Running");

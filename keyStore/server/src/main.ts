import {ApolloServer} from "apollo-server";
import {Resolvers} from "./api/resolvers";
// TODO: Migrate to GraphQL-tools: https://www.graphql-tools.com/docs/migration-from-import/
import {importSchema} from "graphql-import";
import {RequestContext} from "./requestContext";

const httpHeadersPlugin = require("apollo-server-plugin-http-headers");

export class Main
{
  private readonly _server: ApolloServer;
  private readonly _resolvers: Resolvers;

  constructor()
  {
    if (!process.env.KEYSTORE_GRAPHQL_SCHEMA)
    {
      throw new Error("The KEYSTORE_GRAPHQL_SCHEMA environment variable must contain a valid path that " +
        "points to the GraphQL api schema.");
    }
    if (!process.env.KEYSTORE_CORS_ORIGINS){
      throw new Error("The KEYSTORE_CORS_ORIGINS environment variable must contain a valid URL terminated by a semicolon. Values in this list are allowed to request the api service.")
    }
    const apiSchemaTypeDefs = importSchema(process.env.KEYSTORE_GRAPHQL_SCHEMA);

    this._resolvers = new Resolvers();
    const corsOrigins = process.env.KEYSTORE_CORS_ORIGINS.split(";");

    this._server = new ApolloServer({
      context: RequestContext.create,
      typeDefs: apiSchemaTypeDefs,
      plugins:[httpHeadersPlugin],
      resolvers: {
        Mutation: this._resolvers.mutationResolvers,
        Query: this._resolvers.queryResolvers
      },
      cors: {
        origin: corsOrigins,
        credentials: true
      }
    });
  }

  async run()
  {
    if (!process.env.KEYSTORE_PORT)
    {
      throw new Error("The KEYSTORE_PORT environment variable is not set.");
    }

    await this._server.listen({
      port: parseInt(process.env.KEYSTORE_PORT),
    });

  }
}

new Main()
  .run()
  .then(() => "Running");

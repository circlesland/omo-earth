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
      plugins:[httpHeadersPlugin],
      resolvers: {
        Mutation: this._resolvers.mutationResolvers,
        Query: this._resolvers.queryResolvers
      },
      cors: {
        // TODO: Generate the CORS policy from config
        origin: ["http://omo.local:8080",
          "http://omo.local:80",
          "http://omo.earth:8080",
          "http://omo.earth:80",
          "http://localhost:5000"],
        credentials: true
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
      port: parseInt(process.env.AUTH_SERVICE_PORT),
    });

  }
}

new Main()
  .run()
  .then(() => "Running");

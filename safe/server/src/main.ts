import {ApolloServer} from "apollo-server";
import {Resolvers} from "./api/resolvers";
// TODO: Migrate to GraphQL-tools: https://www.graphql-tools.com/docs/migration-from-import/
import {importSchema} from "graphql-import";
import {RequestContext} from "./requestContext";
import Web3 from 'web3';
import CirclesCore from '@circles/core';
import { mnemonicToEntropy } from "bip39";
import {theGraphClient} from "./theGraph/theGraphClient";
const httpHeadersPlugin = require("apollo-server-plugin-http-headers");
const web3 = new Web3();

// Initialize core
const core = new CirclesCore(web3, {
  hubAddress: '0xab9E38F5f5798d26849Db4AA84Dd45199595B8B0',
  proxyFactoryAddress: '0xf15b5a833B14051141711e66fE045a4Aa27531a7',
  safeMasterAddress: '0x16c08FD4d098a6d72Da7196AD129D8B04425Df91',
  apiServiceEndpoint: 'https://api.test.circles.garden',
  graphNodeEndpoint: 'https://api.thegraph.com',
  relayServiceEndpoint: 'https://relay.test.circles.garden',
  subgraphName: 'circlesubi/circlesxdai',
});

async function muddaOida() {

  // Generate a nonce to predict Safe address
  const nonce = new Date().getTime();

  // Create account
  const account = web3.eth.accounts.create();

  // Prepare Safe deployment and receive a predicted safeAddress
  const safeAddress = await core.safe.prepareDeploy(account, { nonce });

  // Get our current trust network
  // const network = await core.trust.getNetwork(account, { safeAddress });

  // x
  /*const users = await core.user.resolve(account, {
    addresses: network.map((connection) => connection.safeAddress),
  });*/
  const isTrusted = await core.trust.isTrusted(account, {
    safeAddress: safeAddress,
    privateKey: account.privateKey
  });

  // Check if we have enough trust connections
  if (!isTrusted.isTrusted) {
    console.log('Not enough trust connections yet ..');
  } else {
    // Deploy Safe
    await core.safe.deploy(account, { safeAddress });

    // Deploy Circles Token
    await core.token.deploy(account, { safeAddress });
  }
}

async function createNewAccount() {
}

async function importExistingAccount(mnemonic:string) {
  const restoredKey = mnemonicToEntropy(mnemonic);
  const privateKeyHex = `0x${restoredKey}`;
  const safeOwner = web3.eth.accounts.privateKeyToAccount(privateKeyHex);

  const safeAddressResponse = await theGraphClient.safeAddressByOwner({
    address: safeOwner.address.toLowerCase()
  });
}

async function giveInitialTrust() {
}

export class Main
{
  private readonly _server: ApolloServer;
  private readonly _resolvers: Resolvers;

  constructor()
  {
    if (!process.env.SAFE_GRAPHQL_SCHEMA)
    {
      throw new Error("The SAFE_GRAPHQL_SCHEMA environment variable must contain a valid path that " +
        "points to the GraphQL api schema.");
    }
    if (!process.env.SAFE_CORS_ORIGINS){
      throw new Error("The SAFE_CORS_ORIGINS environment variable must contain a valid URL terminated by a semicolon. Values in this list are allowed to request the api service.")
    }
    const apiSchemaTypeDefs = importSchema(process.env.SAFE_GRAPHQL_SCHEMA);

    this._resolvers = new Resolvers();

    const corsOrigins = process.env.SAFE_CORS_ORIGINS.split(";");
    console.log("cors origins: ", corsOrigins);

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
    await muddaOida();

    if (!process.env.SAFE_PORT)
    {
      throw new Error("The SAFE_PORT environment variable is not set.");
    }

    await this._server.listen({
      port: parseInt(process.env.SAFE_PORT),
    });
  }
}

new Main()
  .run()
  .then(() => "Running");

import {GraphQLClient} from "graphql-request";
import {getSdk} from "./generated";

const client = new GraphQLClient("__PROXY_PROTOCOL__" + "__PROXY_EXTERN_DOMAIN__" + ":" + "__PROXY_EXTERN_PORT__" + "/__PROXY_SERVICE_MARKETPLACE_PATH__");
export const marketplaceClient = getSdk(client);
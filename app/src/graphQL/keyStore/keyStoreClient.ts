import {GraphQLClient} from "graphql-request";
import {getSdk} from "./generated";

const client = new GraphQLClient("__PROXY_PROTOCOL__" + "__PROXY_EXTERN_DOMAIN__" + ":" + "__PROXY_EXTERN_PORT__" + "/__PROXY_SERVICE_KEYSTORE_PATH__");
export const keyStoreClient = getSdk(client);
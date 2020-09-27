import { InMemoryCache } from '@apollo/client';
import { ApolloClient } from '@apollo/client/core';
import { gql } from '@apollo/client';
import {config} from "../../actions/actionRepository";

export class AuthClient {
  private _client:ApolloClient<any>;

  static get instance() {
    if (!AuthClient._instance)
      AuthClient._instance = new AuthClient();

    return AuthClient._instance;
  }
  private static _instance:AuthClient;

  private constructor()
  {
    this._client = new ApolloClient({
      uri: config.auth.url,
      cache: new InMemoryCache(),
      credentials: 'same-origin'
    });
  }

  async requestMagicLoginLink(appId:string, emailAddress:string) {
    const result = await this._client.mutate({
      mutation: gql`
      mutation Login($appId:String!, $emailAddress:String!) {
        login(appId: $appId, emailAddress: $emailAddress) {
          success
          errorMessage
        }
      }`,
      variables: {
        appId,
        emailAddress
      }
    });

    return result.data.login;
  }

  async exchangeOneTimeTokenForJwt(oneTimeToken:string) {
    const result = await this._client.mutate({
      mutation: gql`
      mutation Verify($oneTimeToken:String!) {
        verify(oneTimeToken: $oneTimeToken) {
          success
          errorMessage
          jwt
        }
      }`,
      variables: {
        oneTimeToken
      }
    });

    return result.data.verify;
  }

  async getKeyByKId(kid:string) {
    const result = await this._client.query({
      query : gql`
      query Keys($kid:String!) {
        keys(kid: $kid) {
          id
          publicKey
          validTo
        }
      }`,
      variables: {
        kid
      }
    });

    return result.data.keys;
  }
}
import { InMemoryCache } from '@apollo/client';
import { ApolloClient} from '@apollo/client/core';
import { gql } from '@apollo/client';
import {config} from "../../actions/actionRepository";

export class KeyStoreClient {
  private _client:ApolloClient<any>;

  static get instance() {
    if (!KeyStoreClient._instance)
      KeyStoreClient._instance = new KeyStoreClient();

    return KeyStoreClient._instance;
  }
  private static _instance:KeyStoreClient;

  private constructor()
  {
    this._client = new ApolloClient({
      uri: config.keyStoreServerUrl,
      cache: new InMemoryCache(),
      credentials: 'include'
    });
  }

  async exchangeTokenForSession(jwt:string) {
    const result = await this._client.mutate({
      mutation: gql`
        mutation ExchangeToken($jwt:String!) {
          exchangeToken(jwt: $jwt) {
            success
            errorMessage
          }
        }`,
      variables: {
        jwt
      }
    });

    return result.data.exchangeToken;
  }

  async createEntry(entryContent:object, publicKey?:string) {
    const result = await this._client.mutate({
      mutation: gql`
      mutation CreateEntry($entryContent:Json!, $publicKey:String) {
        createEntry(publicKey: $publicKey, entryContent: $entryContent) {
          success
          errorMessage
          entryHash
        }
      }`,
      variables: {
        entryContent,
        publicKey
      }
    });

    return result.data.createEntry;
  }

  async importEntry(entryHash:string, name:string) {
    const result = await this._client.mutate({
      mutation: gql`
      mutation ImportEntry($entryHash:String!, $name:String!) {
        importEntry(entryHash: $entryHash, name: $name) {
          success
          errorMessage
          entryHash
          name
        }
      }`,
      variables: {
        entryHash,
        name
      }
    });

    return result.data.importEntry;
  }

  async removeEntry(name:string) {
    const result = await this._client.mutate({
      mutation: gql`
      mutation RemoveEntry($name:String!) {
        removeEntry(name: $name) {
          success
          errorMessage
          entryHash
          name
        }
      }`,
      variables: {
        name
      }
    });

    return result.data.removeEntry;
  }

  async indexEntry() {
    const result = await this._client.query({
      query : gql`
      query IndexEntry {
        indexEntry {
          creatorFingerPrint
          ownerFingerPrint
          entryHash
          content
        }
      }`,
      variables: {
      }
    });

    return result.data.indexEntry;
  }

  async findEntryByHash(hash:string) {
    const result = await this._client.query({
      query : gql`
      query FindEntryByHash($hash:String!) {
        findEntryByHash(hash:$hash) {
          creatorFingerPrint
          ownerFingerPrint
          entryHash
          content
        }
      }`,
      variables: {
        hash
      }
    });

    return result.data.findEntryByHash;
  }

  async findEntryByHashCleartext(hash:string) {
    const result = await this._client.query({
      query : gql`
      query FindEntryByHashCleartext($hash:String!) {
        findEntryByHashCleartext(hash:$hash) {
          creatorFingerPrint
          ownerFingerPrint
          entryHash
          content
        }
      }`,
      variables: {
        hash
      }
    });

    return result.data.findEntryByHashCleartext;
  }
}
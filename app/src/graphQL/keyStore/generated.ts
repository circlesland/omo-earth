import type { GraphQLClient } from 'graphql-request';
import { print } from 'graphql';
import type { GraphQLError } from 'graphql-request/dist/types';
import type { Headers } from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Json: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


export type Mutation = {
  __typename?: 'Mutation';
  exchangeToken: ExchangeTokenResponse;
  createEntry: CreateEntryResponse;
  importEntry: ImportEntryResponse;
  removeEntry: RemoveEntryResponse;
};


export type MutationExchangeTokenArgs = {
  jwt: Scalars['String'];
};


export type MutationCreateEntryArgs = {
  publicKey?: Maybe<Scalars['String']>;
  entryContent: Scalars['Json'];
};


export type MutationImportEntryArgs = {
  entryHash: Scalars['String'];
  name: Scalars['String'];
  overwrite?: Maybe<Scalars['Boolean']>;
};


export type MutationRemoveEntryArgs = {
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  indexEntry?: Maybe<Entry>;
  findEntryByHash?: Maybe<Entry>;
  findEntryByHashCleartext?: Maybe<Entry>;
};


export type QueryFindEntryByHashArgs = {
  hash: Scalars['String'];
};


export type QueryFindEntryByHashCleartextArgs = {
  hash: Scalars['String'];
};

export type Entry = {
  __typename?: 'Entry';
  creatorFingerPrint: Scalars['String'];
  ownerFingerPrint: Scalars['String'];
  entryHash: Scalars['String'];
  content: Scalars['Json'];
};

export type ActionResponse = {
  success: Scalars['Boolean'];
  errorMessage?: Maybe<Scalars['String']>;
};

export type ExchangeTokenResponse = ActionResponse & {
  __typename?: 'ExchangeTokenResponse';
  success: Scalars['Boolean'];
  errorMessage?: Maybe<Scalars['String']>;
};

export type CreateEntryResponse = ActionResponse & {
  __typename?: 'CreateEntryResponse';
  success: Scalars['Boolean'];
  errorMessage?: Maybe<Scalars['String']>;
  entryHash?: Maybe<Scalars['String']>;
};

export type RemoveEntryResponse = ActionResponse & {
  __typename?: 'RemoveEntryResponse';
  success: Scalars['Boolean'];
  errorMessage?: Maybe<Scalars['String']>;
  entryHash?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type ImportEntryResponse = ActionResponse & {
  __typename?: 'ImportEntryResponse';
  success: Scalars['Boolean'];
  errorMessage?: Maybe<Scalars['String']>;
  entryHash?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type Version = {
  __typename?: 'Version';
  major: Scalars['Int'];
  minor: Scalars['Int'];
  revision: Scalars['Int'];
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type ExchangeTokenMutationVariables = Exact<{
  jwt: Scalars['String'];
}>;


export type ExchangeTokenMutation = (
  { __typename?: 'Mutation' }
  & { exchangeToken: (
    { __typename?: 'ExchangeTokenResponse' }
    & Pick<ExchangeTokenResponse, 'success' | 'errorMessage'>
  ) }
);

export type CreateEntryMutationVariables = Exact<{
  entryContent: Scalars['Json'];
  publicKey?: Maybe<Scalars['String']>;
}>;


export type CreateEntryMutation = (
  { __typename?: 'Mutation' }
  & { createEntry: (
    { __typename?: 'CreateEntryResponse' }
    & Pick<CreateEntryResponse, 'success' | 'errorMessage' | 'entryHash'>
  ) }
);

export type ImportEntryMutationVariables = Exact<{
  entryHash: Scalars['String'];
  name: Scalars['String'];
}>;


export type ImportEntryMutation = (
  { __typename?: 'Mutation' }
  & { importEntry: (
    { __typename?: 'ImportEntryResponse' }
    & Pick<ImportEntryResponse, 'success' | 'errorMessage' | 'entryHash' | 'name'>
  ) }
);

export type RemoveEntryMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type RemoveEntryMutation = (
  { __typename?: 'Mutation' }
  & { removeEntry: (
    { __typename?: 'RemoveEntryResponse' }
    & Pick<RemoveEntryResponse, 'success' | 'errorMessage' | 'entryHash' | 'name'>
  ) }
);

export type IndexEntryQueryVariables = Exact<{ [key: string]: never; }>;


export type IndexEntryQuery = (
  { __typename?: 'Query' }
  & { indexEntry?: Maybe<(
    { __typename?: 'Entry' }
    & Pick<Entry, 'creatorFingerPrint' | 'ownerFingerPrint' | 'entryHash' | 'content'>
  )> }
);

export type FindEntryByHashQueryVariables = Exact<{
  hash: Scalars['String'];
}>;


export type FindEntryByHashQuery = (
  { __typename?: 'Query' }
  & { findEntryByHash?: Maybe<(
    { __typename?: 'Entry' }
    & Pick<Entry, 'creatorFingerPrint' | 'ownerFingerPrint' | 'entryHash' | 'content'>
  )> }
);

export type FindEntryByHashCleartextQueryVariables = Exact<{
  hash: Scalars['String'];
}>;


export type FindEntryByHashCleartextQuery = (
  { __typename?: 'Query' }
  & { findEntryByHashCleartext?: Maybe<(
    { __typename?: 'Entry' }
    & Pick<Entry, 'creatorFingerPrint' | 'ownerFingerPrint' | 'entryHash' | 'content'>
  )> }
);


export const ExchangeTokenDocument = gql`
    mutation ExchangeToken($jwt: String!) {
  exchangeToken(jwt: $jwt) {
    success
    errorMessage
  }
}
    `;
export const CreateEntryDocument = gql`
    mutation CreateEntry($entryContent: Json!, $publicKey: String) {
  createEntry(publicKey: $publicKey, entryContent: $entryContent) {
    success
    errorMessage
    entryHash
  }
}
    `;
export const ImportEntryDocument = gql`
    mutation ImportEntry($entryHash: String!, $name: String!) {
  importEntry(entryHash: $entryHash, name: $name) {
    success
    errorMessage
    entryHash
    name
  }
}
    `;
export const RemoveEntryDocument = gql`
    mutation RemoveEntry($name: String!) {
  removeEntry(name: $name) {
    success
    errorMessage
    entryHash
    name
  }
}
    `;
export const IndexEntryDocument = gql`
    query IndexEntry {
  indexEntry {
    creatorFingerPrint
    ownerFingerPrint
    entryHash
    content
  }
}
    `;
export const FindEntryByHashDocument = gql`
    query FindEntryByHash($hash: String!) {
  findEntryByHash(hash: $hash) {
    creatorFingerPrint
    ownerFingerPrint
    entryHash
    content
  }
}
    `;
export const FindEntryByHashCleartextDocument = gql`
    query FindEntryByHashCleartext($hash: String!) {
  findEntryByHashCleartext(hash: $hash) {
    creatorFingerPrint
    ownerFingerPrint
    entryHash
    content
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = sdkFunction => sdkFunction();
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    ExchangeToken(variables: ExchangeTokenMutationVariables): Promise<{ data?: ExchangeTokenMutation | undefined; extensions?: any; headers: Headers; status: number; errors?: GraphQLError[] | undefined; }> {
        return withWrapper(() => client.rawRequest<ExchangeTokenMutation>(print(ExchangeTokenDocument), variables));
    },
    CreateEntry(variables: CreateEntryMutationVariables): Promise<{ data?: CreateEntryMutation | undefined; extensions?: any; headers: Headers; status: number; errors?: GraphQLError[] | undefined; }> {
        return withWrapper(() => client.rawRequest<CreateEntryMutation>(print(CreateEntryDocument), variables));
    },
    ImportEntry(variables: ImportEntryMutationVariables): Promise<{ data?: ImportEntryMutation | undefined; extensions?: any; headers: Headers; status: number; errors?: GraphQLError[] | undefined; }> {
        return withWrapper(() => client.rawRequest<ImportEntryMutation>(print(ImportEntryDocument), variables));
    },
    RemoveEntry(variables: RemoveEntryMutationVariables): Promise<{ data?: RemoveEntryMutation | undefined; extensions?: any; headers: Headers; status: number; errors?: GraphQLError[] | undefined; }> {
        return withWrapper(() => client.rawRequest<RemoveEntryMutation>(print(RemoveEntryDocument), variables));
    },
    IndexEntry(variables?: IndexEntryQueryVariables): Promise<{ data?: IndexEntryQuery | undefined; extensions?: any; headers: Headers; status: number; errors?: GraphQLError[] | undefined; }> {
        return withWrapper(() => client.rawRequest<IndexEntryQuery>(print(IndexEntryDocument), variables));
    },
    FindEntryByHash(variables: FindEntryByHashQueryVariables): Promise<{ data?: FindEntryByHashQuery | undefined; extensions?: any; headers: Headers; status: number; errors?: GraphQLError[] | undefined; }> {
        return withWrapper(() => client.rawRequest<FindEntryByHashQuery>(print(FindEntryByHashDocument), variables));
    },
    FindEntryByHashCleartext(variables: FindEntryByHashCleartextQueryVariables): Promise<{ data?: FindEntryByHashCleartextQuery | undefined; extensions?: any; headers: Headers; status: number; errors?: GraphQLError[] | undefined; }> {
        return withWrapper(() => client.rawRequest<FindEntryByHashCleartextQuery>(print(FindEntryByHashCleartextDocument), variables));
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;
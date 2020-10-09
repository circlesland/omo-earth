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
  updatePublicData: UpdatePublicDataResponse;
  updatePrivateData: UpdatePrivateDataResponse;
};


export type MutationExchangeTokenArgs = {
  jwt: Scalars['String'];
};


export type MutationUpdatePublicDataArgs = {
  data?: Maybe<Scalars['Json']>;
};


export type MutationUpdatePrivateDataArgs = {
  data?: Maybe<Scalars['Json']>;
};

export type Query = {
  __typename?: 'Query';
  version?: Maybe<Version>;
  publicData?: Maybe<Scalars['Json']>;
  privateData: Scalars['Json'];
  identityPrivateKey: Scalars['String'];
};


export type QueryPublicDataArgs = {
  identityPublicKey?: Maybe<Scalars['String']>;
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

export type UpdatePublicDataResponse = ActionResponse & {
  __typename?: 'UpdatePublicDataResponse';
  success: Scalars['Boolean'];
  errorMessage?: Maybe<Scalars['String']>;
};

export type UpdatePrivateDataResponse = ActionResponse & {
  __typename?: 'UpdatePrivateDataResponse';
  success: Scalars['Boolean'];
  errorMessage?: Maybe<Scalars['String']>;
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

export type UpdatePublicDataMutationVariables = Exact<{
  data?: Maybe<Scalars['Json']>;
}>;


export type UpdatePublicDataMutation = (
  { __typename?: 'Mutation' }
  & { updatePublicData: (
    { __typename?: 'UpdatePublicDataResponse' }
    & Pick<UpdatePublicDataResponse, 'success' | 'errorMessage'>
  ) }
);

export type UpdatePrivateDataMutationVariables = Exact<{
  data?: Maybe<Scalars['Json']>;
}>;


export type UpdatePrivateDataMutation = (
  { __typename?: 'Mutation' }
  & { updatePrivateData: (
    { __typename?: 'UpdatePrivateDataResponse' }
    & Pick<UpdatePrivateDataResponse, 'success' | 'errorMessage'>
  ) }
);

export type IdentityPrivateKeyQueryVariables = Exact<{ [key: string]: never; }>;


export type IdentityPrivateKeyQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'identityPrivateKey'>
);

export type PrivateDataQueryVariables = Exact<{ [key: string]: never; }>;


export type PrivateDataQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'privateData'>
);

export type PublicDataQueryVariables = Exact<{
  identityPublicKey?: Maybe<Scalars['String']>;
}>;


export type PublicDataQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'publicData'>
);


export const ExchangeTokenDocument = gql`
    mutation ExchangeToken($jwt: String!) {
  exchangeToken(jwt: $jwt) {
    success
    errorMessage
  }
}
    `;
export const UpdatePublicDataDocument = gql`
    mutation updatePublicData($data: Json) {
  updatePublicData(data: $data) {
    success
    errorMessage
  }
}
    `;
export const UpdatePrivateDataDocument = gql`
    mutation updatePrivateData($data: Json) {
  updatePrivateData(data: $data) {
    success
    errorMessage
  }
}
    `;
export const IdentityPrivateKeyDocument = gql`
    query identityPrivateKey {
  identityPrivateKey
}
    `;
export const PrivateDataDocument = gql`
    query privateData {
  privateData
}
    `;
export const PublicDataDocument = gql`
    query publicData($identityPublicKey: String) {
  publicData(identityPublicKey: $identityPublicKey)
}
    `;

export type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = sdkFunction => sdkFunction();
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    ExchangeToken(variables: ExchangeTokenMutationVariables): Promise<{ data?: ExchangeTokenMutation | undefined; extensions?: any; headers: Headers; status: number; errors?: GraphQLError[] | undefined; }> {
        return withWrapper(() => client.rawRequest<ExchangeTokenMutation>(print(ExchangeTokenDocument), variables));
    },
    updatePublicData(variables?: UpdatePublicDataMutationVariables): Promise<{ data?: UpdatePublicDataMutation | undefined; extensions?: any; headers: Headers; status: number; errors?: GraphQLError[] | undefined; }> {
        return withWrapper(() => client.rawRequest<UpdatePublicDataMutation>(print(UpdatePublicDataDocument), variables));
    },
    updatePrivateData(variables?: UpdatePrivateDataMutationVariables): Promise<{ data?: UpdatePrivateDataMutation | undefined; extensions?: any; headers: Headers; status: number; errors?: GraphQLError[] | undefined; }> {
        return withWrapper(() => client.rawRequest<UpdatePrivateDataMutation>(print(UpdatePrivateDataDocument), variables));
    },
    identityPrivateKey(variables?: IdentityPrivateKeyQueryVariables): Promise<{ data?: IdentityPrivateKeyQuery | undefined; extensions?: any; headers: Headers; status: number; errors?: GraphQLError[] | undefined; }> {
        return withWrapper(() => client.rawRequest<IdentityPrivateKeyQuery>(print(IdentityPrivateKeyDocument), variables));
    },
    privateData(variables?: PrivateDataQueryVariables): Promise<{ data?: PrivateDataQuery | undefined; extensions?: any; headers: Headers; status: number; errors?: GraphQLError[] | undefined; }> {
        return withWrapper(() => client.rawRequest<PrivateDataQuery>(print(PrivateDataDocument), variables));
    },
    publicData(variables?: PublicDataQueryVariables): Promise<{ data?: PublicDataQuery | undefined; extensions?: any; headers: Headers; status: number; errors?: GraphQLError[] | undefined; }> {
        return withWrapper(() => client.rawRequest<PublicDataQuery>(print(PublicDataDocument), variables));
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;
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
  login: LoginResponse;
  verify: VerifyResponse;
};


export type MutationLoginArgs = {
  appId: Scalars['String'];
  emailAddress: Scalars['String'];
};


export type MutationVerifyArgs = {
  oneTimeToken: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  keys?: Maybe<PublicKey>;
  version?: Maybe<Version>;
};


export type QueryKeysArgs = {
  kid: Scalars['String'];
};

export type ActionResponse = {
  success: Scalars['Boolean'];
  errorMessage?: Maybe<Scalars['String']>;
};

export type PublicKey = {
  __typename?: 'PublicKey';
  id: Scalars['Int'];
  publicKey: Scalars['String'];
  validTo: Scalars['String'];
};

export type Version = {
  __typename?: 'Version';
  major: Scalars['Int'];
  minor: Scalars['Int'];
  revision: Scalars['Int'];
};

export type LoginResponse = ActionResponse & {
  __typename?: 'LoginResponse';
  success: Scalars['Boolean'];
  errorMessage?: Maybe<Scalars['String']>;
};

export type VerifyResponse = ActionResponse & {
  __typename?: 'VerifyResponse';
  success: Scalars['Boolean'];
  errorMessage?: Maybe<Scalars['String']>;
  jwt: Scalars['String'];
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type LoginMutationVariables = Exact<{
  appId: Scalars['String'];
  emailAddress: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'success' | 'errorMessage'>
  ) }
);

export type VerifyMutationVariables = Exact<{
  oneTimeToken: Scalars['String'];
}>;


export type VerifyMutation = (
  { __typename?: 'Mutation' }
  & { verify: (
    { __typename?: 'VerifyResponse' }
    & Pick<VerifyResponse, 'success' | 'errorMessage' | 'jwt'>
  ) }
);

export type KeysQueryVariables = Exact<{
  kid: Scalars['String'];
}>;


export type KeysQuery = (
  { __typename?: 'Query' }
  & { keys?: Maybe<(
    { __typename?: 'PublicKey' }
    & Pick<PublicKey, 'id' | 'publicKey' | 'validTo'>
  )> }
);


export const LoginDocument = gql`
    mutation Login($appId: String!, $emailAddress: String!) {
  login(appId: $appId, emailAddress: $emailAddress) {
    success
    errorMessage
  }
}
    `;
export const VerifyDocument = gql`
    mutation Verify($oneTimeToken: String!) {
  verify(oneTimeToken: $oneTimeToken) {
    success
    errorMessage
    jwt
  }
}
    `;
export const KeysDocument = gql`
    query Keys($kid: String!) {
  keys(kid: $kid) {
    id
    publicKey
    validTo
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = sdkFunction => sdkFunction();
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    Login(variables: LoginMutationVariables): Promise<{ data?: LoginMutation | undefined; extensions?: any; headers: Headers; status: number; errors?: GraphQLError[] | undefined; }> {
        return withWrapper(() => client.rawRequest<LoginMutation>(print(LoginDocument), variables));
    },
    Verify(variables: VerifyMutationVariables): Promise<{ data?: VerifyMutation | undefined; extensions?: any; headers: Headers; status: number; errors?: GraphQLError[] | undefined; }> {
        return withWrapper(() => client.rawRequest<VerifyMutation>(print(VerifyDocument), variables));
    },
    Keys(variables: KeysQueryVariables): Promise<{ data?: KeysQuery | undefined; extensions?: any; headers: Headers; status: number; errors?: GraphQLError[] | undefined; }> {
        return withWrapper(() => client.rawRequest<KeysQuery>(print(KeysDocument), variables));
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;
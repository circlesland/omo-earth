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
  createOffer: CreateOfferResponse;
};


export type MutationCreateOfferArgs = {
  name: Scalars['String'];
  description: Scalars['String'];
  price: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  offers: Array<Offer>;
};

export type ActionResponse = {
  success: Scalars['Boolean'];
  errorMessage?: Maybe<Scalars['String']>;
};

export type Offer = {
  __typename?: 'Offer';
  ownerIdentityId: Scalars['String'];
  createdAt: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
  price: Scalars['Float'];
};

export type CreateOfferResponse = ActionResponse & {
  __typename?: 'CreateOfferResponse';
  success: Scalars['Boolean'];
  errorMessage?: Maybe<Scalars['String']>;
  offer?: Maybe<Offer>;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type CreateOfferMutationVariables = Exact<{
  name: Scalars['String'];
  description: Scalars['String'];
  price: Scalars['Float'];
}>;


export type CreateOfferMutation = (
  { __typename?: 'Mutation' }
  & { createOffer: (
    { __typename?: 'CreateOfferResponse' }
    & Pick<CreateOfferResponse, 'success' | 'errorMessage'>
    & { offer?: Maybe<(
      { __typename?: 'Offer' }
      & Pick<Offer, 'ownerIdentityId' | 'createdAt' | 'name' | 'description' | 'price'>
    )> }
  ) }
);

export type OffersQueryVariables = Exact<{ [key: string]: never; }>;


export type OffersQuery = (
  { __typename?: 'Query' }
  & { offers: Array<(
    { __typename?: 'Offer' }
    & Pick<Offer, 'ownerIdentityId' | 'createdAt' | 'name' | 'description' | 'price'>
  )> }
);


export const CreateOfferDocument = gql`
    mutation createOffer($name: String!, $description: String!, $price: Float!) {
  createOffer(name: $name, description: $description, price: $price) {
    success
    errorMessage
    offer {
      ownerIdentityId
      createdAt
      name
      description
      price
    }
  }
}
    `;
export const OffersDocument = gql`
    query offers {
  offers {
    ownerIdentityId
    createdAt
    name
    description
    price
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = sdkFunction => sdkFunction();
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    createOffer(variables: CreateOfferMutationVariables): Promise<{ data?: CreateOfferMutation | undefined; extensions?: any; headers: Headers; status: number; errors?: GraphQLError[] | undefined; }> {
        return withWrapper(() => client.rawRequest<CreateOfferMutation>(print(CreateOfferDocument), variables));
    },
    offers(variables?: OffersQueryVariables): Promise<{ data?: OffersQuery | undefined; extensions?: any; headers: Headers; status: number; errors?: GraphQLError[] | undefined; }> {
        return withWrapper(() => client.rawRequest<OffersQuery>(print(OffersDocument), variables));
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;
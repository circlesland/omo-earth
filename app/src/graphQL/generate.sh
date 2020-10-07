#!/bin/bash
# run the codegenerator
cd auth || exit
npx graphql-codegen
cd ../keyStore || exit
npx graphql-codegen
cd ../safe || exit
npx graphql-codegen

# replace some code that doesn't fit within our environment
cd .. || exit

sed -i "s/import { GraphQLClient } from 'graphql-request';/import type { GraphQLClient } from 'graphql-request';/" auth/generated.ts keyStore/generated.ts safe/generated.ts
sed -i "s/import { GraphQLError, Headers } from 'graphql-request\\/dist\\/src\\/types';/import type { GraphQLError } from 'graphql-request\\/dist\\/types';\nimport type { Headers } from 'graphql-request\\/dist\\/types.dom';/" auth/generated.ts keyStore/generated.ts safe/generated.ts
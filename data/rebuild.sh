#!/bin/bash

echo "Building data .."
pwd
echo "Building ../auth/util .."
cd ../auth/util || exit
rm -r dist
rm -r node_modules
rm -f package-lock.json
npm i || exit
npx tsc || exit

pwd
echo "Building ../client .."
cd ../client || exit
rm -r dist
rm -r node_modules
rm -f package-lock.json
npm i || exit
npx tsc || exit

pwd
echo "Building ../../data .."
cd ../../data || exit
rm -r dist
rm -r node_modules
rm -f package-lock.json
npm i || exit
npx tsc || exit
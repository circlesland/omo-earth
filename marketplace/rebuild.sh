#!/bin/sh

cd ../data || exit
rm -r dist
rm -r node_modules
rm -f package-lock.json
npm i || exit
npx tsc || exit

cd ../auth/util || exit
rm -r dist
rm -r node_modules
rm -f package-lock.json
npm i || exit
npx tsc || exit

cd ../client || exit
rm -r dist
rm -r node_modules
rm -f package-lock.json
npm i || exit
npx tsc || exit

cd ../../marketplace/server || exit
rm -r dist
rm -r node_modules
rm -f package-lock.json
npm i || exit
npm run generate || exit
npx tsc || exit

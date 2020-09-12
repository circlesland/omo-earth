#!/bin/sh
cd util || exit
rm -r dist
rm -r node_modules
rm -f package-lock.json
npm i || exit
npx tsc || exit

cd ../data || exit
rm -r dist
rm -r node_modules
rm -f package-lock.json
npm i || exit
npm run generate || exit
npx tsc || exit

cd ../mailer || exit
rm -r dist
rm -r node_modules
rm -f package-lock.json
npm i || exit
npx tsc || exit

cd ../server || exit
rm -r dist
rm -r node_modules
rm -f package-lock.json
npm i || exit
npm run generate || exit
npx tsc || exit

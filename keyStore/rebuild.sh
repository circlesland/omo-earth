#!/bin/sh

echo "Building keyStore .."
pwd
echo "Building ../data .."
cd ../data || exit
./rebuild.sh

pwd
echo "Building ../../keyStore/server .."
cd ../../keyStore/server || exit
rm -r dist
rm -r node_modules
rm -f package-lock.json
npm i || exit
npm run generate || exit
npx tsc || exit

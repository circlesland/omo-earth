#!/bin/sh

echo "Building marketplace .."
pwd
echo "Building ../data .."
cd ../data || exit
./rebuild.sh

pwd
echo "Building ../marketplace/server .."
cd ../marketplace/server || exit
rm -r dist
rm -r node_modules
rm -f package-lock.json
npm i || exit
npm run generate || exit
npx tsc || exit

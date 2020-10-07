#!/bin/sh

echo "Building safe .."
pwd
echo "Building ../data .."
cd ../data || exit
./rebuild.sh

pwd
echo "Building ../safe/server .."
cd ../safe/server || exit
rm -r dist
rm -r node_modules
rm -f package-lock.json
npm i || exit
npm run generate || exit
npx tsc || exit

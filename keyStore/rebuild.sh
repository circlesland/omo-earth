#!/bin/sh

currentDir=`pwd`

echo "Building keyStore .."
pwd
echo "Building ../data .."
cd ../data || exit
./rebuild.sh || exit

pwd
echo "Building ../../keyStore/server .."
cd ../../keyStore/server || exit
rm -r -f   dist
rm -r -f   node_modules
rm -f package-lock.json
npm i || exit
npm run generate || exit
npx tsc || exit

cd $currentDir || exit

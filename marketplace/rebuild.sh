#!/bin/sh

currentDir=`pwd`

echo "Building marketplace .."
pwd
echo "Building ../data .."
cd ../data || exit
./rebuild.sh || exit

pwd
echo "Building ../marketplace/server .."
cd ../marketplace/server || exit
rm -r -f   dist
rm -r -f   node_modules/@omo
rm -f package-lock.json
npm i || exit
npm run generate || exit
npx tsc || exit

cd $currentDir || exit
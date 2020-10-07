#!/bin/sh

currentDir=`pwd`

echo "Building safe .."
pwd
echo "Building ../data .."
cd ../data || exit
./rebuild.sh || exit

pwd
echo "Building ../safe/server .."
cd ../safe/server || exit
rm -r -f dist
rm -r -f node_modules
rm -f package-lock.json
npm i || exit
npm run generate || exit
npx tsc || exit

cd $currentDir || exit
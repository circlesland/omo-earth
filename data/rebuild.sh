#!/bin/bash

currentDir=`pwd`

echo "Building data .."
pwd
echo "Building ../auth .."
cd ../auth || exit
./rebuild.sh || exit

pwd
echo "Building ../data .."
cd ../data || exit
rm -r -f dist
rm -r -f node_modules
rm -f  package-lock.json
npm i || exit
cd src || exit
npx prisma generate || exit
cd .. || exit
npx tsc || exit

cd $currentDir || exit
#!/bin/sh

currentDir=`pwd`

echo "Building aut .."
pwd
echo "Building ./util .."

cd util || exit
rm -r -f  dist
rm -r -f  node_modules
rm -f package-lock.json
npm i || exit
npx tsc || exit

pwd
echo "Building ../data .."
cd ../data || exit
rm -r -f  dist
rm -r -f  node_modules
rm -f package-lock.json
npm i || exit
npm run generate || exit
npx tsc || exit

pwd
echo "Building ../mailer .."
cd ../mailer || exit
rm -r -f  dist
rm -r -f  node_modules
rm -f package-lock.json
npm i || exit
npx tsc || exit

pwd
echo "Building ../server .."
cd ../server || exit
rm -r -f  dist
rm -r -f  node_modules
rm -f package-lock.json
npm i || exit
npm run generate || exit
npx tsc || exit

cd $currentDir || exit
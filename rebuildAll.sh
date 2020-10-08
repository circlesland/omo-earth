#!/bin/bash
cd auth || exit
./rebuild.sh

cd ../data || exit
./rebuild.sh

cd ../keyStore || exit
./rebuild.sh

cd ../marketplace || exit
./rebuild.sh

cd ../safe || exit
./rebuild.sh

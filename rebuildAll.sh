#!/bin/bash
cd auth || exit
./rebuild.sh

cd ../data || exit
./rebuild.sh

cd ../identity || exit
./rebuild.sh

cd ../marketplace || exit
./rebuild.sh

cd ../safe || exit
./rebuild.sh

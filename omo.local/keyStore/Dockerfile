FROM node:latest

COPY ./auth/util/src ./auth/util/src
COPY ./auth/util/package.json ./auth/util/package.json
COPY ./auth/util/tsconfig.json ./auth/util/tsconfig.json

RUN cd ./auth/util/ && npm i
RUN cd ./auth/util/ && npx tsc

COPY ./keyStore/data/src ./keyStore/data/src
COPY ./keyStore/data/package.json ./keyStore/data/package.json
COPY ./keyStore/data/tsconfig.json ./keyStore/data/tsconfig.json

COPY ./keyStore/server/src ./keyStore/server/src
COPY ./keyStore/server/package.json ./keyStore/server/package.json
COPY ./keyStore/server/tsconfig.json ./keyStore/server/tsconfig.json
COPY ./keyStore/server/codegen.yml ./keyStore/server/codegen.yml

COPY ./keyStore/rebuild.sh ./keyStore/rebuild.sh

RUN cd keyStore && ./rebuild.sh

CMD ["node", "keyStore/server/dist/main.js"]

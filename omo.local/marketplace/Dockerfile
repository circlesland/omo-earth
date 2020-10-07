FROM node:latest

COPY ./auth/util/src ./auth/util/src
COPY ./auth/util/package.json ./auth/util/package.json
COPY ./auth/util/tsconfig.json ./auth/util/tsconfig.json

RUN cd ./auth/util/ && npm i
RUN cd ./auth/util/ && npx tsc

COPY ./auth/client/src ./auth/client/src
COPY ./auth/client/package.json ./auth/client/package.json
COPY ./auth/client/tsconfig.json ./auth/client/tsconfig.json

RUN cd ./auth/client/ && npm i
RUN cd ./auth/client/ && npx tsc

COPY ./data/src ./data/src
COPY ./data/package.json ./data/package.json
COPY ./data/tsconfig.json ./data/tsconfig.json

RUN cd ./data/ && npm i
RUN cd ./data/ && npx tsc

COPY ./marketplace/server/src ./marketplace/server/src
COPY ./marketplace/server/package.json ./marketplace/server/package.json
COPY ./marketplace/server/tsconfig.json ./marketplace/server/tsconfig.json
COPY ./marketplace/server/codegen.yml ./marketplace/server/codegen.yml

COPY ./marketplace/rebuild.sh ./marketplace/rebuild.sh

RUN cd marketplace && ./rebuild.sh

# Alias host "omo.local" with "auth" so that the marketplace can reach the auth-container.
# DOESN'T WORK - FCK...
# RUN echo "omo.local auth" > /etc/host.aliases
# RUN sh -c "export HOSTALIASES=/etc/host.aliases"

CMD ["node", "marketplace/server/dist/main.js"]

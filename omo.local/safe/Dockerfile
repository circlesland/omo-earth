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

#RUN git clone https://github.com/omoearth/omo-auth.git
COPY ./safe/server/src ./safe/server/src
COPY ./safe/server/package.json ./safe/server/package.json
COPY ./safe/server/tsconfig.json ./safe/server/tsconfig.json
COPY ./safe/server/codegen.yml ./safe/server/codegen.yml
COPY ./safe/rebuild.sh ./safe/rebuild.sh

RUN ./safe/rebuild.sh

CMD ["node", "safe/server/dist/main.js"]
